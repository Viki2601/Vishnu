'use client';
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HorizontalScrollContext } from './HorizontalScrollContext';

// Register ScrollTrigger plugin on client-side
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

    let ctx;
    let scrollTriggerInstance;

    const initHorizontalScroll = () => {
      // Determine if screen is desktop size
      const checkIsDesktop = window.innerWidth >= 768;
      setIsHorizontal(checkIsDesktop);

      if (!checkIsDesktop) {
        // Clear styles and state on mobile
        gsap.set(trackRef.current, { clearProps: 'all' });
        gsap.set(wrapperRef.current, { clearProps: 'all' });
        setScrollProgress(0);
        setContainerAnimation(null);
        return;
      }

      ctx = gsap.context(() => {
        const track = trackRef.current;
        const wrapper = wrapperRef.current;

        // Calculate translation amount
        const getTranslateVal = () => -(track.scrollWidth - window.innerWidth);

        // Create the horizontal tween
        const anim = gsap.to(track, {
          x: getTranslateVal,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            pin: true,
            scrub: 0.5,
            start: 'top top',
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setScrollProgress(self.progress * 100);
            },
          },
        });

        // Set the animation reference to context so inner triggers can sync
        setContainerAnimation(anim);
      }, wrapperRef);
    };

    // Run setup
    initHorizontalScroll();

    // Re-initialize on resize
    const handleResize = () => {
      // Clear previous ScrollTriggers and reinitialize
      ScrollTrigger.getAll().forEach(t => t.kill());
      if (ctx) ctx.revert();
      initHorizontalScroll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (ctx) ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Scroll to a panel dynamically based on its offset relative to the track
  const scrollToPanel = (panelId) => {
    const targetElement = document.querySelector(panelId);
    if (!targetElement) return;

    if (isHorizontal && trackRef.current) {
      // Find the element's position relative to the track
      const trackRect = trackRef.current.getBoundingClientRect();
      const elRect = targetElement.getBoundingClientRect();
      
      // Calculate horizontal offset
      const offsetLeft = elRect.left - trackRect.left;
      
      // Vertical scroll position is proportional to horizontal offset
      window.scrollTo({
        top: offsetLeft,
        behavior: 'smooth',
      });
    } else {
      // Standard vertical scroll
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HorizontalScrollContext.Provider
      value={{
        scrollProgress,
        scrollToPanel,
        isHorizontal,
        containerAnimation,
      }}
    >
      <div
        ref={wrapperRef}
        className="horizontal-scroll__wrapper"
        style={{
          width: '100%',
          position: 'relative',
        }}
      >
        <div
          ref={stickyRef}
          className="horizontal-scroll__sticky"
          style={{
            position: isHorizontal ? 'sticky' : 'relative',
            top: 0,
            height: isHorizontal ? '100vh' : 'auto',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <div
            ref={trackRef}
            className="horizontal-scroll__track"
            style={{
              display: isHorizontal ? 'flex' : 'block',
              flexDirection: isHorizontal ? 'row' : 'column',
              height: isHorizontal ? '100vh' : 'auto',
              width: isHorizontal ? 'max-content' : '100%',
              willChange: isHorizontal ? 'transform' : 'auto',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </HorizontalScrollContext.Provider>
  );
}
