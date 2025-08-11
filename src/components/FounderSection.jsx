import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FounderSection = () => {
  const founderRef = useRef(null);
  const animationTriggered = useRef(false);
  const imageRef = useRef(null);

  useEffect(() => {
    // Professional initial setup
    gsap.set(".founder-content", { 
      opacity: 0,
      x: -50,
      scale: 0.95
    });
    gsap.set(".founder-image", { 
      opacity: 0,
      x: 50,
      scale: 0.95
    });
    gsap.set(".founder-container", {
      opacity: 0,
      y: 40,
      scale: 0.98
    });
    
    ScrollTrigger.create({
      trigger: founderRef.current,
      start: "top 75%",
      onEnter: () => {
        if (animationTriggered.current) return;
        animationTriggered.current = true;
        
        const tl = gsap.timeline();
        
        // Container clean entrance
        tl.to(".founder-container", {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out"
        })
        
        // Content slides from left
        .to(".founder-content", {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          delay: 0.3
        })
        
        // Image slides from right
        .to(".founder-image", {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          delay: 0.5
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={founderRef} className="py-32 px-6 relative">
      <div className="founder-container max-w-7xl mx-auto relative z-10 backdrop-blur-sm bg-gray-600/30 border border-gray-400/20 rounded-3xl p-12 shadow-2xl shadow-black/40">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="founder-content">
            <h2 className="text-6xl font-black uppercase tracking-tight text-white mb-8 font-mono">
              BUSINESS<br/>BUILDER
            </h2>
            <div className="w-24 h-1 bg-white mb-8"></div>
            <p className="text-lg text-gray-300 leading-relaxed mb-6 font-mono">
              WE'RE NOT JUST DEVELOPERS WHO CAN CODE. WE'RE BUSINESS BUILDERS WHO HAPPEN TO BE EXCEPTIONAL AT TECHNOLOGY.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-6 font-mono">
              WE SPECIALIZE IN THE HARDEST PART: TAKING SOMETHING FROM NOTHING TO SOMETHING THAT WORKS.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed font-mono">
              TECHNICAL EXCELLENCE MEETS STRATEGIC EXECUTION.
            </p>
          </div>
          
          <div className="founder-image">
            <div className="w-full h-96 bg-gray-700/30 backdrop-blur-sm border border-gray-500/20 flex items-center justify-center relative overflow-hidden group rounded-2xl shadow-lg">
              <div className="absolute inset-0 border-2 border-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Connected Tech Stack Web */}
              <svg 
                width="320" 
                height="280" 
                viewBox="0 0 320 280" 
                className="text-gray-300 relative z-10"
              >
                {/* Central hub with stitching pattern */}
                <circle 
                  cx="160" 
                  cy="140" 
                  r="20" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  opacity="0.9"
                />
                
                {/* Center dot */}
                <circle 
                  cx="160" 
                  cy="140" 
                  r="3" 
                  fill="currentColor" 
                  opacity="0.9"
                />
                
                {/* Outer nodes with tech components */}
                <g className="text-xs font-mono" fill="currentColor" opacity="0.8">
                  {/* Top row */}
                  <circle cx="80" cy="60" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <text x="80" y="64" textAnchor="middle">CMS</text>
                  
                  <circle cx="160" cy="40" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <text x="160" y="44" textAnchor="middle">PIM</text>
                  
                  <circle cx="240" cy="60" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <text x="240" y="64" textAnchor="middle">AI</text>
                  
                  {/* Middle row */}
                  <circle cx="40" cy="140" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <text x="40" y="144" textAnchor="middle">CRM</text>
                  
                  <circle cx="280" cy="140" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <text x="280" y="144" textAnchor="middle">CRO</text>
                  
                  {/* Bottom row */}
                  <circle cx="80" cy="220" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <text x="80" y="224" textAnchor="middle">ESP</text>
                  
                  <circle cx="160" cy="240" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <text x="160" y="244" textAnchor="middle">CDP</text>
                  
                  <circle cx="240" cy="220" r="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <text x="240" y="224" textAnchor="middle">SEO</text>
                </g>
                
                {/* Connection lines from center to all nodes */}
                <g stroke="currentColor" strokeWidth="1" opacity="0.5" strokeLinecap="round">
                  <path d="M150 125 L88 72" />
                  <path d="M160 120 L160 52" />
                  <path d="M170 125 L232 72" />
                  <path d="M140 140 L52 140" />
                  <path d="M180 140 L268 140" />
                  <path d="M150 155 L88 208" />
                  <path d="M160 160 L160 228" />
                  <path d="M170 155 L232 208" />
                </g>
                
                {/* Interconnection lines between outer nodes */}
                <g stroke="currentColor" strokeWidth="0.5" opacity="0.3" strokeLinecap="round">
                  {/* Top row connections */}
                  <path d="M92 68 L148 48" />     {/* CMS to PIM */}
                  <path d="M172 48 L228 68" />    {/* PIM to AI */}
                  <path d="M92 68 L228 68" />     {/* CMS to AI */}
                  
                  {/* AI connections (AI integrates with many systems) */}
                  <path d="M240 72 L280 140" />   {/* AI to CRO */}
                  <path d="M232 72 L88 208" />    {/* AI to ESP */}
                  <path d="M240 72 L240 208" />   {/* AI to SEO */}
                  <path d="M228 68 L52 140" />    {/* AI to CRM */}
                  
                  {/* CRM connections */}
                  <path d="M52 140 L80 72" />     {/* CRM to CMS */}
                  <path d="M52 140 L80 212" />    {/* CRM to ESP */}
                  <path d="M52 140 L160 228" />   {/* CRM to CDP */}
                  
                  {/* CRO connections */}
                  <path d="M280 140 L160 52" />   {/* CRO to PIM */}
                  <path d="M268 140 L172 232" />  {/* CRO to CDP */}
                  <path d="M268 140 L232 208" />  {/* CRO to SEO */}
                  
                  {/* ESP connections */}
                  <path d="M92 212 L148 232" />   {/* ESP to CDP */}
                  <path d="M88 208 L232 208" />   {/* ESP to SEO */}
                  
                  {/* SEO connections */}
                  <path d="M172 232 L228 212" />  {/* CDP to SEO */}
                  <path d="M228 212 L148 48" />   {/* SEO to PIM */}
                  
                  {/* CMS connections */}
                  <path d="M88 72 L172 232" />    {/* CMS to CDP */}
                  <path d="M92 68 L232 208" />    {/* CMS to SEO */}
                  
                  {/* Additional cross connections */}
                  <path d="M160 52 L88 208" />    {/* PIM to ESP */}
                  <path d="M268 140 L88 208" />   {/* CRO to ESP */}
                </g>
                
                {/* Stitching X marks at key connection points */}
                <g stroke="currentColor" strokeWidth="1" opacity="0.7" strokeLinecap="round">
                  <path d="M118 96 L122 100 M122 96 L118 100" />
                  <path d="M198 96 L202 100 M202 96 L198 100" />
                  <path d="M118 184 L122 188 M122 184 L118 188" />
                  <path d="M198 184 L202 188 M202 184 L198 188" />
                </g>
                
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;