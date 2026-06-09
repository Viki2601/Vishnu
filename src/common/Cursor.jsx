'use client';
import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Cursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const ringX = useMotionValue(-100);
    const ringY = useMotionValue(-100);

    // Inner dot — snappy
    const springX = useSpring(cursorX, { stiffness: 1000, damping: 45 });
    const springY = useSpring(cursorY, { stiffness: 1000, damping: 45 });

    // Outer ring — laggy (magnetic feel)
    const ringSX = useSpring(ringX, { stiffness: 120, damping: 22 });
    const ringSY = useSpring(ringY, { stiffness: 120, damping: 22 });

    useEffect(() => {
        const move = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            ringX.set(e.clientX);
            ringY.set(e.clientY);
        };
        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, [cursorX, cursorY, ringX, ringY]);

    return (
        <>
            {/* Outer ring — lags behind */}
            <motion.div style={{ translateX: ringSX, translateY: ringSY, x: '-50%', y: '-50%', position: 'fixed', top: 0, left: 0, zIndex: 9998, pointerEvents: 'none', width: 36, height: 36, borderRadius: '50%', border: '1.5px solid rgba(123, 161, 133, 0.35)', backdropFilter: 'blur(0px)', }} />
            {/* Inner dot — snappy */}
            <motion.div style={{ translateX: springX, translateY: springY, x: '-50%', y: '-50%', position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none', width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--accent-light)', boxShadow: '0 0 10px rgba(123, 161, 133, 0.6)', }} />
        </>
    );
}