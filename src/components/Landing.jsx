'use client';
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';
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

const PANEL_END = 0.13;

export default function Landing() {
    const [isClient, setIsClient] = useState(false);
    const { scrollToPanel, isHorizontal, scrollProgress } = useHorizontalScroll();
    const scrollMotion = useMotionValue(0);
    const nameScale = useTransform(scrollMotion, [0, PANEL_END], [1, 0.55]);
    const nameOpacity = useTransform(scrollMotion, [0, PANEL_END * 0.7, PANEL_END], [1, 0.6, 0]);
    const nameY = useTransform(scrollMotion, [0, PANEL_END], [0, -40]);
    const nameX = useTransform(scrollMotion, [0, PANEL_END], [0, -30]);
    const subTitleScale = useTransform(scrollMotion, [0, PANEL_END], [1, 2.55]);
    const subtitleOpacity = useTransform(scrollMotion, [0, PANEL_END * 0.5], [1, 0]);
    const subTitleY = useTransform(scrollMotion, [0, PANEL_END], [0, -60]);
    const subtitleX = useTransform(scrollMotion, [0, PANEL_END], [0, 900]);
    const contentOpacity = useTransform(scrollMotion, [0, PANEL_END * 0.4], [1, 0]);
    const contentX = useTransform(scrollMotion, [0, PANEL_END], [0, -80]);
    const parallaxX = useTransform(scrollMotion, [0, PANEL_END], [0, -120]);
    const smoothNameScale = useSpring(nameScale, { stiffness: 50, damping: 20 });
    const smoothNameOpacity = useSpring(nameOpacity, { stiffness: 50, damping: 20 });
    const smoothNameY = useSpring(nameY, { stiffness: 50, damping: 20 });
    const smoothNameX = useSpring(nameX, { stiffness: 50, damping: 20 });
    const smoothSubTitleScale = useSpring(subTitleScale, { stiffness: 50, damping: 20 });
    const smoothSubtitleOpacity = useSpring(subtitleOpacity, { stiffness: 50, damping: 20 });
    const smoothSubtitleY = useSpring(subTitleY, { stiffness: 50, damping: 20 });
    const smoothSubtitleX = useSpring(subtitleX, { stiffness: 50, damping: 20 });
    const smoothContentOpacity = useSpring(contentOpacity, { stiffness: 50, damping: 20 });
    const smoothContentX = useSpring(contentX, { stiffness: 50, damping: 20 });
    const smoothParallaxX = useSpring(parallaxX, { stiffness: 50, damping: 20 });
    const videoX = useTransform(scrollMotion, [0, PANEL_END], [0, 400]);
    const videoY = useTransform(scrollMotion, [0, PANEL_END], [0, -450]);
    const videoScale = useTransform(scrollMotion, [0, PANEL_END], [1, 1.12]);
    const smoothVideoX = useSpring(videoX, { stiffness: 40, damping: 18 });
    const smoothVideoY = useSpring(videoY, { stiffness: 40, damping: 18 });
    const smoothVideoScale = useSpring(videoScale, { stiffness: 40, damping: 18 });

    useEffect(() => { setIsClient(true); }, []);

    useEffect(() => {
        scrollMotion.set(scrollProgress);
    }, [scrollProgress, scrollMotion]);

    if (!isClient) return null;

    return (
        <div className="relative w-full min-h-screen overflow-hidden flex items-center" style={{ backgroundColor: 'var(--bg-accent)' }}>
            <motion.video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0" style={{ opacity: 0.16, x: smoothVideoX, y: smoothVideoY, scale: smoothVideoScale, }}>
                <source src="/Space.mp4" type="video/mp4" />
            </motion.video>

            <div className="absolute inset-0 pointer-events-none z-0" style={{ background: `radial-gradient(ellipse 55% 50% at 75% 35%, rgba(125, 42, 232, 0.09) 0%, transparent 70%), radial-gradient(ellipse 45% 45% at 20% 75%, rgba(0, 217, 255, 0.08) 0%, transparent 60%)` }} />

            <div className="absolute inset-0 pointer-events-none z-10">
                <ConstellationCanvas className="w-full h-full opacity-85" />
            </div>

            <motion.div className="relative z-20 w-full px-8 md:px-14 lg:px-20 pt-16" style={{ x: smoothParallaxX }}>
                <div className="md:w-3/5 lg:w-1/2">
                    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-7">
                        <motion.div variants={itemVariants} style={{ opacity: smoothContentOpacity, x: smoothContentX }}>
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold tracking-widest uppercase" style={{ background: 'rgba(125, 42, 232, 0.08)', border: '1px solid rgba(125, 42, 232, 0.25)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-light)', fontFamily: 'var(--font-montserrat)' }}>
                                <span className="w-2 h-2 rounded-full" style={{ background: '#00d9ff', boxShadow: '0 0 10px #00d9ff', animation: 'pulse-ring 2s infinite' }} />
                                Open to Opportunities
                            </span>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <motion.h1 style={{ fontFamily: 'var(--font-montserrat)', fontSize: 'clamp(3.2rem, 8.5vw, 6rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, color: 'var(--text-primary)', scale: smoothNameScale, opacity: smoothNameOpacity, y: smoothNameY, x: smoothNameX, transformOrigin: 'left center', display: 'block', }}>
                                VISHNU<span style={{ color: 'var(--accent)', textShadow: '0 0 15px var(--accent)' }}>.</span>
                            </motion.h1>

                            <motion.h2 style={{ fontFamily: 'var(--font-montserrat)', fontSize: 'clamp(1.5rem, 4.2vw, 2.6rem)', fontWeight: 400, letterSpacing: '-0.02em', color: 'var(--text-secondary)', marginTop: '12px', scale: smoothSubTitleScale, x: smoothSubtitleX, y: smoothSubtitleY, display: 'block', }}>
                                Front-End Developer
                            </motion.h2>
                        </motion.div>

                        <motion.div variants={itemVariants} className="w-24 h-[2px]" style={{ background: 'linear-gradient(90deg, var(--accent), var(--accent-light))', boxShadow: '0 0 8px var(--accent)', opacity: smoothContentOpacity, }} />
                        <motion.p variants={itemVariants} className="text-base md:text-lg max-w-md" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', lineHeight: 1.75, opacity: smoothContentOpacity, x: smoothContentX, }}>
                             Front-End Developer with hands-on experience building high-performance web experiences across the MERN stack. Currently pursuing BCA (Distance) at University of Madras — actively looking for full-time opportunities.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-wrap gap-4" style={{ opacity: smoothContentOpacity, x: smoothContentX }}>
                            <motion.button whileHover={{ opacity: 0.95, y: -2, boxShadow: '0 0 25px rgba(125,42,232,0.5)' }} whileTap={{ scale: 0.97 }} onClick={() => scrollToPanel('#projects')} style={{ padding: '12px 30px', background: 'linear-gradient(135deg, var(--accent), var(--accent2))', color: '#fff', border: 'none', borderRadius: '100px', fontFamily: 'var(--font-montserrat)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer' }}>
                                View Projects
                            </motion.button>
                            <motion.button whileHover={{ borderColor: 'rgba(125,42,232,0.5)', background: 'rgba(125,42,232,0.04)', boxShadow: '0 0 15px rgba(125,42,232,0.1)' }} whileTap={{ scale: 0.97 }} onClick={() => scrollToPanel('#contact')} style={{ padding: '12px 30px', background: 'transparent', color: 'var(--text-primary)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '100px', fontFamily: 'var(--font-montserrat)', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', transition: 'border-color 0.2s, background 0.2s' }}>
                                Get In Touch
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div animate={isHorizontal ? { x: [0, 8, 0] } : { y: [0, 8, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20" style={{ color: 'var(--text-muted)', opacity: smoothContentOpacity }}>
                <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    Scroll
                </span>
                {isHorizontal ? (
                    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="var(--accent-light)" strokeWidth="1.5">
                        <path d="M1 7h16M11 1l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 4px var(--accent-light))' }} />
                    </svg>
                ) : (
                    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" stroke="var(--accent-light)" strokeWidth="1.5">
                        <path d="M7 1v16M1 11l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" style={{ filter: 'drop-shadow(0 0 4px var(--accent-light))' }} />
                    </svg>
                )}
            </motion.div>
        </div>
    );
}