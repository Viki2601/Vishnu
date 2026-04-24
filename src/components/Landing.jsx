'use client';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import ConstellationCanvas from '@/common/ConstellationCanvas';

/* ── Stagger container ──*/
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
    const statsRef = useRef(null);
    const statsInView = useInView(statsRef, { once: true, amount: 0 });

    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const translateY = useTransform(scrollY, [0, 400], [0, 80]);

    useEffect(() => { setIsClient(true); }, []);
    if (!isClient) return null;

    return (
        <div className="relative w-full min-h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
            {/* ── BASE RADIAL GLOW ── */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 60% 40%, rgba(30,58,138,0.22) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 10% 80%, rgba(15,23,42,0.6) 0%, transparent 60%)` }} />
            {/* ── CONSTELLATION — right panel ── */}
            <div className="absolute top-0 right-0 w-full md:w-3/5 h-full pointer-events-none">
                <ConstellationCanvas className="w-full h-full opacity-80" />
            </div>

            {/* ── MAIN CONTENT ── */}
            <motion.div style={{ opacity, y: translateY }} className="relative z-10 min-h-screen flex items-center pt-16">
                <div className="w-full max-w-7xl mx-auto px-8 md:px-14 lg:px-20">
                    <div className="md:w-3/5 lg:w-1/2">
                        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-7">
                            {/* Status badge */}
                            <motion.div variants={itemVariants}>
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(96,165,250,0.25)', color: 'var(--accent-light)' }}>
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#4ade80', boxShadow: '0 0 8px #4ade80', animation: 'pulse-ring 2s infinite', }} />
                                    Open to Opportunities
                                </span>
                            </motion.div>

                            {/* Headline — Bodaghee style: light weight, large, period accent */}
                            <motion.div variants={itemVariants}>
                                <h1 className="font-bold leading-tight" style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', letterSpacing: '-0.04em', color: 'var(--text-primary)', fontWeight: 700, }}>UI Developer<span style={{ color: 'var(--accent-light)' }}>.</span></h1>
                                <h2 className="font-light mt-1" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', letterSpacing: '-0.03em', color: 'var(--text-secondary)', fontWeight: 300, }}>
                                    &amp; Web Craftsman
                                    <span style={{ color: 'var(--accent-light)' }}>.</span>
                                </h2>
                            </motion.div>

                            {/* Divider accent line */}
                            <motion.div variants={itemVariants} className="w-20 h-0.5" style={{ background: 'var(--accent-light)' }} />

                            {/* Sub-headline */}
                            <motion.p variants={itemVariants} className="text-base md:text-lg leading-relaxed max-w-md" style={{ color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                                Crafting high-performance web experiences across the MERN stack — blending engineering precision with design sensibility.
                            </motion.p>

                            {/* CTA row  */}
                            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }} onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })} className="px-7 py-3 rounded-full font-semibold text-sm text-white" style={{ background: 'var(--accent)', boxShadow: '0 0 24px rgba(59,130,246,0.4)', }}>
                                    View Projects
                                </motion.button>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }} onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-7 py-3 rounded-full font-semibold text-sm" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: 'var(--text-primary)', }}>
                                    Get In Touch
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* ── SCROLL INDICATOR ── */}
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20" style={{ color: 'var(--text-muted)' }}>
                <span className="text-xs tracking-widest uppercase" style={{ letterSpacing: '0.16em' }}>Scroll</span>
                <svg width="14" height="18" viewBox="0 0 14 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M7 1v16M1 11l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </motion.div>
        </div>
    );
}