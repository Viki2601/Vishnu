'use client';
import { useState, useEffect, useRef } from 'react';
import { useHorizontalScroll } from './HorizontalScrollContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function useHorizontalInView(options = {}) {
  const { once = true, amount = 'some' } = options;
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const { isHorizontal, containerAnimation } = useHorizontalScroll();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isHorizontal && containerAnimation) {
      // Determine starting point based on threshold
      const startTrigger = amount === 'all' ? 'left left+=20%' : 'left right-=15%';
      
      const trigger = ScrollTrigger.create({
        trigger: el,
        containerAnimation: containerAnimation,
        start: startTrigger,
        onEnter: () => {
          setIsInView(true);
        },
        onLeaveBack: () => {
          if (!once) {
            setIsInView(false);
          }
        },
      });

      return () => {
        trigger.kill();
      };
    } else {
      // Fallback: standard Intersection Observer for vertical scrolling (mobile)
      const threshold = amount === 'all' ? 0.8 : 0.15;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (once) {
              observer.unobserve(el);
            }
          } else if (!once) {
            setIsInView(false);
          }
        },
        { threshold }
      );

      observer.observe(el);
      return () => {
        observer.disconnect();
      };
    }
  }, [isHorizontal, containerAnimation, once, amount]);

  return [ref, isInView];
}
