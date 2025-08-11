import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeJSStitching = ({ mousePositionRef, isMouseMovingRef }) => {
  const webCanvasRef = useRef(null);

  useEffect(() => {
    if (!webCanvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100vh';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.zIndex = '1';
    
    webCanvasRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    const maxStitchPoints = 100;
    const maxStitchLines = 200;
    const stitchThreshold = 0.05;
    const fadeTime = 10000;
    
    const lineGeometry = new THREE.BufferGeometry();

    const createStitchGeometry = () => {
      const stitchGeometry = new THREE.BufferGeometry();
      const stitchVertices = [
        -0.005, 0.005, 0,   0.005, -0.005, 0,
        0.005, 0.005, 0,   -0.005, -0.005, 0
      ];
      stitchGeometry.setAttribute('position', new THREE.Float32BufferAttribute(stitchVertices, 3));
      return stitchGeometry;
    };

    const createStitchMaterial = () => {
      return new THREE.LineBasicMaterial({
        color: 0xffffff,
        opacity: 0.9,
        transparent: true,
        linewidth: 2
      });
    };

    let stitchPoints = [];
    let stitchLines = [];
    let stitchMarkersGroup = new THREE.Group();
    let linesMesh = null;
    let lastStitchPosition = null;

    scene.add(stitchMarkersGroup);

    const screenTo3D = (screenX, screenY) => {
      const vector = new THREE.Vector3(screenX, screenY, 0);
      vector.unproject(camera);
      return vector;
    };

    const addStitchPoint = (worldPos, timestamp) => {
      stitchPoints.push({
        position: worldPos,
        timestamp: timestamp
      });

      const stitchMarker = new THREE.LineSegments(createStitchGeometry(), createStitchMaterial());
      stitchMarker.position.copy(worldPos);
      stitchMarker.userData = { timestamp: timestamp };
      stitchMarker.rotation.z = (Math.random() - 0.5) * 0.3;
      
      stitchMarkersGroup.add(stitchMarker);

      if (stitchPoints.length > maxStitchPoints) {
        stitchPoints.shift();
        
        if (stitchMarkersGroup.children.length > maxStitchPoints) {
          const oldestMarker = stitchMarkersGroup.children[0];
          stitchMarkersGroup.remove(oldestMarker);
          oldestMarker.geometry.dispose();
          oldestMarker.material.dispose();
        }
      }
    };

    const addStitchLine = (point1, point2, timestamp) => {
      stitchLines.push({
        start: point1.clone(),
        end: point2.clone(),
        timestamp: timestamp
      });

      if (stitchLines.length > maxStitchLines) {
        stitchLines.shift();
      }
    };

    const updateGeometries = (currentTime) => {
      stitchMarkersGroup.children.forEach((marker, index) => {
        const age = currentTime - marker.userData.timestamp;
        const fadeProgress = Math.min(age / fadeTime, 1);
        const opacity = Math.max(1 - fadeProgress, 0);
        
        marker.material.opacity = opacity * 0.9;
        
        const pulse = 1 + Math.sin(currentTime * 0.003 + index * 0.5) * 0.1;
        marker.scale.setScalar(pulse);
        
        if (opacity <= 0) {
          marker.userData.shouldRemove = true;
        }
      });

      for (let i = stitchMarkersGroup.children.length - 1; i >= 0; i--) {
        const marker = stitchMarkersGroup.children[i];
        if (marker.userData.shouldRemove) {
          stitchMarkersGroup.remove(marker);
          marker.geometry.dispose();
          marker.material.dispose();
        }
      }

      if (stitchLines.length > 0) {
        const positions = [];
        const colors = [];
        
        stitchLines.forEach(line => {
          const age = currentTime - line.timestamp;
          const fadeProgress = Math.min(age / fadeTime, 1);
          const opacity = Math.max(1 - fadeProgress, 0);
          
          if (opacity > 0) {
            positions.push(line.start.x, line.start.y, line.start.z);
            positions.push(line.end.x, line.end.y, line.end.z);
            
            colors.push(1, 1, 1);
            colors.push(1, 1, 1);
          }
        });

        if (positions.length > 0) {
          lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
          lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
          
          if (!linesMesh) {
            const gradientLineMaterial = new THREE.LineBasicMaterial({
              vertexColors: true,
              transparent: true,
              opacity: 0.6
            });
            linesMesh = new THREE.LineSegments(lineGeometry, gradientLineMaterial);
            scene.add(linesMesh);
          }
        }
      }

      stitchLines = stitchLines.filter(line => (currentTime - line.timestamp) < fadeTime);
    };

    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const currentTime = Date.now();
      
      // Update canvas position to follow scroll
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      renderer.domElement.style.transform = `translateY(${scrollY}px)`;
      
      if (isMouseMovingRef.current) {
        const mouse = mousePositionRef.current;
        const worldPos = screenTo3D(mouse.x, mouse.y);
        
        if (!lastStitchPosition || lastStitchPosition.distanceTo(worldPos) > stitchThreshold) {
          addStitchPoint(worldPos, currentTime);
          
          if (lastStitchPosition && stitchPoints.length > 1) {
            addStitchLine(lastStitchPosition, worldPos, currentTime);
          }
          
          lastStitchPosition = worldPos.clone();
        }
      }
      
      updateGeometries(currentTime);
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      if (webCanvasRef.current && renderer.domElement) {
        webCanvasRef.current.removeChild(renderer.domElement);
      }
      
      lineGeometry.dispose();
      
      stitchMarkersGroup.children.forEach(marker => {
        marker.geometry.dispose();
        marker.material.dispose();
      });
      scene.remove(stitchMarkersGroup);
      
      if (linesMesh) {
        scene.remove(linesMesh);
        linesMesh.geometry.dispose();
        linesMesh.material.dispose();
      }
      
      renderer.dispose();
    };
  }, [mousePositionRef, isMouseMovingRef]);

  return (
    <div 
      ref={webCanvasRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    ></div>
  );
};

export default ThreeJSStitching;