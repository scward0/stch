import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Logo = () => {
  const logoRef = useRef(null);
  const animationCompleted = useRef(false);

  useEffect(() => {
    if (animationCompleted.current || !logoRef.current) return;
    animationCompleted.current = true;

    const svg = logoRef.current;
    const allElements = svg.querySelectorAll('path');

    // Set initial state - all invisible
    gsap.set(allElements, { 
      opacity: 0
    });

    // Simple fade in with stagger
    gsap.to(allElements, {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.2,
      delay: 0.5
    });

  }, []);

  return (
    <div className="fixed top-6 left-6 z-10">
      {/* Stitching Logo Icon */}
      <svg ref={logoRef} width="96" height="96" viewBox="0 0 24 24" className="text-white">
        {/* Thread lines connecting the X marks */}
        <path 
          className="thread-line"
          d="M4 6 L8 10 L12 6 L16 10 L20 6" 
          stroke="currentColor" 
          strokeWidth="0.6" 
          fill="none"
          strokeLinecap="round"
        />
        <path 
          className="thread-line"
          d="M4 18 L8 14 L12 18 L16 14 L20 18" 
          stroke="currentColor" 
          strokeWidth="0.6" 
          fill="none"
          strokeLinecap="round"
        />
        {/* Connecting vertical threads */}
        <path 
          className="vertical-thread"
          d="M8 10 L8 14 M16 10 L16 14" 
          stroke="currentColor" 
          strokeWidth="0.5" 
          strokeLinecap="round"
        />
        {/* X stitch marks */}
        <g strokeWidth="0.6" stroke="currentColor" strokeLinecap="round">
          <path className="stitch-mark" d="M6 4 L10 8 M10 4 L6 8" />
          <path className="stitch-mark" d="M14 4 L18 8 M18 4 L14 8" />
          <path className="stitch-mark" d="M6 16 L10 20 M10 16 L6 20" />
          <path className="stitch-mark" d="M14 16 L18 20 M18 16 L14 20" />
        </g>
      </svg>
    </div>
  );
};

export default Logo;