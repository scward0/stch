import React, { useState, useRef } from 'react';
import HeroSection from './HeroSection';
import ServicesSection from './ServicesSection';
import FounderSection from './FounderSection';
import ContactSection from './ContactSection';
import ThreeJSStitching from './ThreeJSStitching';
import Logo from './Logo';
import { useMouseTracking } from '../hooks/useMouseTracking';

const Home = () => {
  const [typingComplete, setTypingComplete] = useState(false);
  const contactRef = useRef(null);
  const { mousePositionRef, isMouseMovingRef } = useMouseTracking();
  

  const handleTypingComplete = () => {
    setTypingComplete(true);
  };

  return (
    <>
      <ThreeJSStitching 
        mousePositionRef={mousePositionRef} 
        isMouseMovingRef={isMouseMovingRef} 
      />
      
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative">
          <Logo />
          
          <HeroSection 
            onTypingComplete={handleTypingComplete}
            contactRef={contactRef}
          />
          
          <ServicesSection />
          
          <FounderSection />
          
          <ContactSection ref={contactRef} />
        </div>
    </>
  );
};

export default Home;