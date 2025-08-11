import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const HeroSection = ({ onTypingComplete, contactRef }) => {
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroButtonRef = useRef(null);
  const codeBlockRef = useRef(null);
  const heroContentRef = useRef(null);
  const animationCompleted = useRef(false);

  const typeTextWithGlitch = (element, text, speed = 50) => {
    return new Promise((resolve) => {
      if (!element || element.dataset.typing === 'true') {
        resolve();
        return;
      }

      element.dataset.typing = 'true';
      element.textContent = '';
      element.classList.remove('typing-cursor');
      element.classList.add('typing-cursor');
      
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          element.textContent = text.substring(0, i + 1);
          
          if (Math.random() < 0.05) {
            element.classList.add('glitch');
            setTimeout(() => element.classList.remove('glitch'), 100);
          }
          
          i++;
        } else {
          element.classList.remove('typing-cursor');
          element.dataset.typing = 'false';
          clearInterval(timer);
          resolve();
        }
      }, speed);
    });
  };

  const typeTitle = async () => {
    const stchLine = heroTitleRef.current?.querySelector('.stch-line');
    const studioLine = heroTitleRef.current?.querySelector('.studio-line');
    
    if (stchLine) {
      await typeTextWithGlitch(stchLine, 'STCH', 100);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    if (studioLine) {
      await typeTextWithGlitch(studioLine, 'STUDIO', 80);
    }
  };

  const typeCodeBlock = async (element) => {
    if (!element || element.dataset.codeTyped === 'true') return;
    
    element.dataset.codeTyped = 'true';
    element.innerHTML = '';

    const lines = [
      { text: "// 0-TO-1 BUSINESS CATALYST", class: "text-gray-300 mb-4" },
      { text: "class StchStudio {", class: "text-white" },
      { text: "  constructor() {", class: "text-gray-300" },
      { text: "    this.services = [", class: "text-gray-300" },
      { text: "      'technical_foundation',", class: "text-green-400" },
      { text: "      'growth_infrastructure',", class: "text-green-400" },
      { text: "      'revenue_optimization',", class: "text-green-400" },
      { text: "      'strategic_execution'", class: "text-green-400" },
      { text: "    ];", class: "text-gray-300" },
      { text: "    this.philosophy = 'complete_systems';", class: "text-green-400" },
      { text: "  }", class: "text-gray-300" },
      { text: "", class: "text-gray-300" },
      { text: "  buildBusinessInfrastructure(idea) {", class: "text-white" },
      { text: "    return this.transform(idea).to.revenue();", class: "text-gray-300" },
      { text: "  }", class: "text-gray-300" },
      { text: "}", class: "text-white" }
    ];

    for (let line of lines) {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const div = document.createElement('div');
      div.className = line.class;
      
      if (line.text.trim() === '') {
        div.innerHTML = '&nbsp;';
        element.appendChild(div);
      } else {
        element.appendChild(div);
        
        let i = 0;
        const typePromise = new Promise(resolve => {
          const timer = setInterval(() => {
            if (i < line.text.length) {
              div.textContent = line.text.substring(0, i + 1);
              i++;
            } else {
              clearInterval(timer);
              resolve();
            }
          }, 30);
        });
        
        await typePromise;
      }
    }
  };

  useEffect(() => {
    if (animationCompleted.current) return;
    animationCompleted.current = true;

    const animateHero = async () => {
      // Clean initial setup
      if (heroTitleRef.current) {
        const stchLine = heroTitleRef.current.querySelector('.stch-line');
        const studioLine = heroTitleRef.current.querySelector('.studio-line');
        if (stchLine) {
          stchLine.textContent = '';
          stchLine.dataset.typing = 'false';
        }
        if (studioLine) {
          studioLine.textContent = '';
          studioLine.dataset.typing = 'false';
        }
      }
      if (heroSubtitleRef.current) {
        heroSubtitleRef.current.textContent = '';
        heroSubtitleRef.current.dataset.typing = 'false';
      }
      if (codeBlockRef.current) {
        codeBlockRef.current.innerHTML = '';
        codeBlockRef.current.dataset.codeTyped = 'false';
      }

      // Professional container entrance - subtle scale and fade
      gsap.fromTo(heroContentRef.current, {
        opacity: 0,
        y: 40,
        scale: 0.95
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3
      });

      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Clean typing animation
      await typeTitle();
      await new Promise(resolve => setTimeout(resolve, 400));
      
      // Subtitle wipes in from left
      await typeTextWithGlitch(heroSubtitleRef.current, '> 0-TO-1 BUSINESS CATALYST', 50);
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Button clean scale-in
      gsap.fromTo(heroButtonRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 20
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      // Code block subtle slide from right
      setTimeout(() => {
        gsap.fromTo(codeBlockRef.current, {
          opacity: 0,
          x: 30,
          scale: 0.98
        }, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out"
        });
        typeCodeBlock(codeBlockRef.current);
      }, 1000);

      onTypingComplete();
    };

    animateHero();
  }, [onTypingComplete]);

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      <div ref={heroContentRef} className="hero-content max-w-7xl mx-auto w-full relative z-10 backdrop-blur-sm bg-gray-600/30 border border-gray-400/20 rounded-3xl p-12 shadow-2xl shadow-black/40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 
              ref={heroTitleRef}
              className="font-black uppercase tracking-tighter text-white leading-none mb-8 font-mono"
            >
              <div className="text-8xl md:text-9xl stch-line"></div>
              <div className="text-4xl md:text-5xl studio-line opacity-70"></div>
            </h1>
            <div className="w-32 h-1 bg-white mb-8"></div>
            <p 
              ref={heroSubtitleRef}
              className="text-xl font-mono uppercase tracking-widest text-gray-300 mb-12"
            >
            </p>
            <div className="text-lg text-gray-300 mb-8 font-mono leading-relaxed max-w-lg">
              WE DON'T JUST BUILD WEBSITES. WE STITCH TOGETHER THE COMPLETE TECHNICAL AND MARKETING FOUNDATION YOUR BUSINESS NEEDS TO GO FROM IDEA TO REVENUE.
            </div>
            <button 
              ref={heroButtonRef}
              className="bg-white text-black px-12 py-4 font-black uppercase tracking-wider hover:bg-gray-200 transition-all duration-200 opacity-0 transform hover:scale-105"
              onClick={() => contactRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              GET_STARTED
            </button>
          </div>
          
          <div className="hidden lg:block">
            <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-600 p-8 font-mono text-sm min-h-[400px] rounded-lg shadow-lg">
              <div ref={codeBlockRef} className="leading-relaxed">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;