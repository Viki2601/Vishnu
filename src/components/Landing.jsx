'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import ConstellationCanvas from '@/common/ConstellationCanvas';
import { useHorizontalScroll } from '@/common/HorizontalScrollContext';

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70, damping: 16 } },
};

export default function Landing() {
    const { scrollY } = useScroll();
    const [isClient, setIsClient] = useState(false);
    const { scrollToPanel, isHorizontal } = useHorizontalScroll();

    useEffect(() => { setIsClient(true); }, []);
    
    // Maintain vertical fade-out when scrolled down
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const translateY = useTransform(scrollY, [0, 250], [0, 80]);

    if (!isClient) return null;

    return (
        <div className="relative w-full min-h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
            <div className="absolute inset-0 pointer-events-none bg-grid" style={{ opacity: 0.25 }} />
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 55% 50% at 65% 40%, rgba(123, 161, 133, 0.08) 0%, transparent 70%),radial-gradient(ellipse 40% 40% at 5% 80%, rgba(11,14,12,0.7) 0%, transparent 60%)`, }} />
            
            {/* Constellation background - acts as Breeze Canvas now */}
            <div className="absolute top-0 right-0 w-full md:w-3/5 h-full pointer-events-none">
                <ConstellationCanvas className="w-full h-full opacity-60" />
            </div>

            <motion.div style={{ opacity, y: translateY }} className="relative z-10 min-h-screen flex items-center pt-16">
                <div className="w-full max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
                    <div className="md:w-3/5 lg:w-1/2">
                        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-7">
                            <motion.div variants={itemVariants}>
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase" style={{ background: 'rgba(123, 161, 133, 0.08)', border: '1px solid rgba(123, 161, 133, 0.25)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-light)', fontFamily: 'var(--font-dm-mono)', }}>
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4ade80', boxShadow: '0 0 8px #4ade80', animation: 'pulse-ring 2s infinite' }} />
                                    Open to Opportunities
                                </span>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(3rem, 8vw, 5.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--text-primary)', }}>
                                    UI Developer<span style={{ color: 'var(--accent)' }}>.</span>
                                </h1>
                                <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.6rem, 4.5vw, 3rem)', fontWeight: 400, fontStyle: 'italic', letterSpacing: '-0.025em', color: 'var(--text-secondary)', marginTop: '8px', }}>
                                    &amp; Web Craftsman<span style={{ color: 'var(--accent)' }}>.</span>
                                </h2>
                            </motion.div>
                            <motion.div variants={itemVariants} className="w-20 h-px" style={{ background: 'var(--accent)' }} />
                            <motion.p variants={itemVariants} className="text-base md:text-lg max-w-md" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-dm-sans)', lineHeight: 1.75 }}>
                                Crafting high-performance web experiences across the MERN stack — blending engineering precision with design sensibility.
                            </motion.p>

                            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                                <motion.button whileHover={{ opacity: 0.88, y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => scrollToPanel('#projects')} style={{ padding: '10px 28px', background: 'var(--accent)', color: '#0b0e0c', border: 'none', borderRadius: '100px', fontFamily: 'var(--font-dm-sans)', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', }}>
                                    View Projects
                                </motion.button>
                                <motion.button whileHover={{ borderColor: 'rgba(255,255,255,0.4)', background: 'rgba(139,168,147,0.03)' }} whileTap={{ scale: 0.97 }} onClick={() => scrollToPanel('#contact')} style={{ padding: '10px 28px', background: 'transparent', color: 'var(--text-primary)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '100px', fontFamily: 'var(--font-dm-sans)', fontSize: '0.9rem', cursor: 'pointer', }}>
                                    Get In Touch
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
                animate={isHorizontal ? { x: [0, 8, 0] } : { y: [0, 8, 0] }} 
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} 
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20" 
                style={{ color: 'var(--text-muted)' }}
            >
                <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    {isHorizontal ? 'Scroll →' : 'Scroll'}
                </span>
                {isHorizontal ? (
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M1 7h16M11 1l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                ) : (
                    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M7 1v16M1 11l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </motion.div>
        </div>
    );
}