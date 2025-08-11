import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = forwardRef((props, ref) => {
  const [contactFormVisible, setContactFormVisible] = useState(false);
  const animationTriggered = useRef(false);
  const buttonRef = useRef(null);

  const toggleContactForm = () => {
    setContactFormVisible(!contactFormVisible);
    
    if (!contactFormVisible) {
      setTimeout(() => {
        // Clean form reveal
        gsap.fromTo(".contact-form", {
          opacity: 0,
          y: 30,
          scale: 0.95
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out"
        });
        
        // Stagger form links
        gsap.fromTo(".contact-form a", {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.2
        });
      }, 50);
    }
  };

  useEffect(() => {
    // Professional setup
    gsap.set(".contact-container", {
      opacity: 0,
      y: 60,
      scale: 0.95
    });
    gsap.set(".contact-title", {
      opacity: 0,
      y: 40
    });
    gsap.set(".contact-content p", {
      opacity: 0,
      y: 30
    });
    gsap.set(".contact-button", {
      opacity: 0,
      y: 20,
      scale: 0.95
    });
    
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 80%",
      onEnter: () => {
        if (animationTriggered.current) return;
        animationTriggered.current = true;
        
        const tl = gsap.timeline();
        
        // Container clean entrance
        tl.to(".contact-container", {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out"
        })
        
        // Title wipes up
        .to(".contact-title", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2
        })
        
        // Text elements stagger up
        .to(".contact-content p", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          delay: 0.4
        })
        
        // Button scales in
        .to(".contact-button", {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.6
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [ref]);

  return (
    <section ref={ref} className="py-32 px-6 relative">
      <div className="contact-container max-w-4xl mx-auto text-center relative z-10 backdrop-blur-sm bg-gray-600/30 border border-gray-400/20 rounded-3xl p-12 shadow-2xl shadow-black/40">
        <div className="contact-content">
          <h2 className="contact-title text-6xl font-black uppercase tracking-tight text-white mb-8 font-mono">
            BUILD.<br/>LAUNCH.<br/>SCALE.
          </h2>
          <div className="w-24 h-1 bg-white mb-8 mx-auto"></div>
          <p className="text-xl text-gray-300 mb-4 font-mono">
            READY TO GO FROM ZERO TO ONE?
          </p>
          <p className="text-lg text-gray-300 mb-12 font-mono max-w-2xl mx-auto">
            WE BUILD THE COMPLETE TECHNICAL AND MARKETING INFRASTRUCTURE THAT TAKES YOUR BUSINESS FROM IDEA TO REVENUE.
          </p>
          
          <div className="space-y-6">
            <button 
              onClick={toggleContactForm}
              className="contact-button bg-white text-black px-12 py-4 font-black uppercase tracking-wider hover:bg-gray-200 transition-all duration-200 font-mono transform hover:scale-105"
            >
              {contactFormVisible ? 'HIDE_CONTACT' : 'START_PROJECT'}
            </button>
            
            {contactFormVisible && (
              <div className="contact-form mt-8 bg-gray-700/40 backdrop-blur-sm border border-gray-500/30 p-8 max-w-md mx-auto font-mono rounded-2xl shadow-lg">
                <a 
                  href="mailto:hello@stch.studio" 
                  className="block border border-gray-400 text-white px-6 py-4 hover:bg-white hover:text-black transition-all duration-200 mb-4 uppercase tracking-wider transform hover:scale-105"
                >
                  HELLO@STCH.STUDIO
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;