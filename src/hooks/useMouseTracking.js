import { useRef, useEffect } from 'react';

export const useMouseTracking = () => {
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const isMouseMovingRef = useRef(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      mousePositionRef.current = { x, y };
      isMouseMovingRef.current = true;
    };

    const handleMouseStop = () => {
      isMouseMovingRef.current = false;
    };

    let mouseStopTimer;
    const handleMouseMoveWithStop = (event) => {
      handleMouseMove(event);
      clearTimeout(mouseStopTimer);
      mouseStopTimer = setTimeout(handleMouseStop, 100);
    };

    window.addEventListener('mousemove', handleMouseMoveWithStop);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMoveWithStop);
      clearTimeout(mouseStopTimer);
    };
  }, []);

  return { mousePositionRef, isMouseMovingRef };
};