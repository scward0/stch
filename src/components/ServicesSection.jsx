import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServicesSection = () => {
  const [activeService, setActiveService] = useState(null);
  const servicesRef = useRef(null);
  const animationTriggered = useRef(false);

  const services = [
    {
      category: "FOUNDATION",
      title: "TECHNICAL BACKBONE",
      code: "WEB / APP / CMS",
      description: "Custom applications and content systems built for your specific market"
    },
    {
      category: "GROWTH",
      title: "MARKETING INFRASTRUCTURE", 
      code: "MARTECH / AI / SEO",
      description: "Connected tools and automation that drive acquisition and retention"
    },
    {
      category: "SCALE",
      title: "REVENUE OPTIMIZATION",
      code: "EMAIL / SYSTEMS / CONVERSION",
      description: "Strategic layer that turns traffic into sustainable business"
    },
    {
      category: "STRATEGY",
      title: "BUSINESS EXECUTION",
      code: "ROADMAP / MANAGEMENT / ORCHESTRATION",
      description: "Market-focused strategy and seamless delivery from conception to launch"
    }
  ];

  const handleServiceHover = (index) => {
    setActiveService(index);
    
    const element = document.querySelector(`[data-service="${index}"]`);
    if (element) {
      // Clean professional hover
      gsap.to(element, {
        scale: 1.02,
        y: -5,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  const handleServiceLeave = (index) => {
    setActiveService(null);
    
    const element = document.querySelector(`[data-service="${index}"]`);
    if (element) {
      // Clean return
      gsap.to(element, {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  };

  useEffect(() => {
    // Clean initial setup
    gsap.set(".service-card", { 
      opacity: 0,
      y: 60,
      scale: 0.95
    });
    gsap.set(".services-title", { 
      opacity: 0,
      x: -40
    });
    gsap.set(".services-container", {
      opacity: 0,
      y: 50,
      scale: 0.98
    });
    
    ScrollTrigger.create({
      trigger: servicesRef.current,
      start: "top 80%",
      onEnter: () => {
        if (animationTriggered.current) return;
        animationTriggered.current = true;
        
        const tl = gsap.timeline();
        
        // Container clean fade and scale
        tl.to(".services-container", {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out"
        })
        
        // Title slides in from left
        .to(".services-title", {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.2
        })
        
        // Cards professional stagger up
        .to(".service-card", {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: {
            amount: 0.6,
            from: "start"
          },
          ease: "power3.out",
          delay: 0.4
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={servicesRef} className="py-32 px-6 relative">
      <div className="services-container max-w-7xl mx-auto relative z-10 backdrop-blur-sm bg-gray-600/30 border border-gray-400/20 rounded-3xl p-12 shadow-2xl shadow-black/40">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          <div className="services-title p-8 lg:p-16 backdrop-blur-md bg-gray-700/40 border border-gray-500/30 lg:rounded-l-2xl rounded-t-2xl lg:rounded-t-none flex flex-col justify-center">
            <h2 className="text-4xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white leading-none mb-6 lg:mb-8 font-mono">
              BUSINESS<br/>SYSTEMS
            </h2>
            <div className="w-16 lg:w-24 h-1 bg-white mb-6 lg:mb-8"></div>
            <p className="text-sm font-mono text-gray-300 leading-relaxed">
              FROM ZERO TO ONE.<br/>
              NO SHORTCUTS.<br/>
              NO COMPROMISES.
            </p>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-0">
            {services.map((service, index) => (
              <div 
                key={index}
                data-service={index}
                className={`service-card p-8 border border-gray-500/20 bg-gray-700/30 backdrop-blur-sm hover:bg-gray-600/90 hover:text-white transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                  activeService === index ? 'bg-gray-600/90 text-white' : 'text-white'
                }`}
                onMouseEnter={() => handleServiceHover(index)}
                onMouseLeave={() => handleServiceLeave(index)}
              >
                <div className="absolute top-0 left-0 w-full h-0.5 bg-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="h-full flex flex-col justify-between relative z-10">
                  <div>
                    <div className={`text-xs font-mono mb-2 uppercase tracking-wider ${activeService === index ? 'text-gray-300' : 'text-gray-300'}`}>
                      {service.category}
                    </div>
                    <div className={`text-sm font-mono mb-4 ${activeService === index ? 'text-gray-300' : 'text-gray-300'}`}>
                      [{String(index + 1).padStart(2, '0')}]
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight mb-4 leading-tight font-mono">
                      {service.title}
                    </h3>
                    <div className={`text-sm font-mono mb-4 ${activeService === index ? 'text-gray-200' : 'text-gray-200'}`}>
                      {service.code}
                    </div>
                  </div>
                  
                  <div className={`text-sm ${activeService === index ? 'text-gray-200' : 'text-gray-200'}`}>
                    {service.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;