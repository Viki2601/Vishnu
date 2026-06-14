'use client';
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HorizontalScrollContext } from './HorizontalScrollContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalScroll({ children }) {
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const trackRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [containerAnimation, setContainerAnimation] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setIsHorizontal(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ctx;

    if (!isHorizontal) {
      gsap.set(trackRef.current, { clearProps: 'all' });
      gsap.set(wrapperRef.current, { clearProps: 'all' });
      setScrollProgress(0);
      setContainerAnimation(null);
      return;
    }

    ctx = gsap.context(() => {
      const track = trackRef.current;
      const wrapper = wrapperRef.current;
      const getTranslateVal = () => -(track.scrollWidth - window.innerWidth);

      const anim = gsap.to(track, {
        x: getTranslateVal,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          scrub: 0.05,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onUpdate: (self) => { setScrollProgress(self.progress * 100); },
        },
      });

      setContainerAnimation(anim);
    }, wrapperRef);

    return () => {
      if (ctx) ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isHorizontal]);

  const scrollToPanel = (panelId) => {
    const targetElement = document.querySelector(panelId);
    if (!targetElement) return;

    if (isHorizontal && trackRef.current) {
      const trackRect = trackRef.current.getBoundingClientRect();
      const elRect = targetElement.getBoundingClientRect();
      const offsetLeft = elRect.left - trackRect.left;
      window.scrollTo({ top: offsetLeft, behavior: 'smooth', });
    } else {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HorizontalScrollContext.Provider value={{ scrollProgress, scrollToPanel, isHorizontal, containerAnimation, }}>
      <div ref={wrapperRef} className="horizontal-scroll__wrapper" style={{ width: '100%', position: 'relative', }}>
        <div ref={stickyRef} className="horizontal-scroll__sticky" style={{ position: isHorizontal ? 'sticky' : 'relative', top: 0, height: isHorizontal ? '100vh' : 'auto', width: '100%', overflow: 'hidden', }}>
          <div ref={trackRef} className="horizontal-scroll__track" style={{ display: isHorizontal ? 'flex' : 'block', flexDirection: isHorizontal ? 'row' : 'column', height: isHorizontal ? '100vh' : 'auto', width: isHorizontal ? 'max-content' : '100%', willChange: isHorizontal ? 'transform' : 'auto', backfaceVisibility: 'hidden', perspective: 1000, }}>
            {children}
          </div>
        </div>
      </div>
    </HorizontalScrollContext.Provider>
  );
}