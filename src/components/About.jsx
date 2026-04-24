'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── Word-by-word scroll reveal ── */
function RevealText({ text, className, style, delay = 0 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const words = text.split(' ');

    return (
        <span ref={ref} className={className} style={{ ...style, display: 'block' }}>
            {words.map((word, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ type: 'spring', stiffness: 80, damping: 16, delay: delay + i * 0.04, }} style={{ display: 'inline-block', marginRight: '0.28em' }}>
                    {word}
                </motion.span>
            ))}
        </span>
    );
}

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 18 } },
};

const stats = [
    { label: 'Status', value: 'Active', color: '#4ade80' },
    { label: 'Focus', value: 'UI / Web', color: 'var(--accent-light)' },
    { label: 'Stack', value: 'MERN', color: '#f59e0b' },
    { label: 'Location', value: 'India', color: 'var(--text-secondary)' },
];

export default function About() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

    return (
        <section ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-28 px-8 md:px-14 lg:px-20" style={{ backgroundColor: 'var(--bg-base)' }}>
            {/* Subtle glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 25% 50%, rgba(30,58,138,0.12) 0%, transparent 70%)', }}></div>
            <div className="relative z-10 w-full max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left — Heading with word-reveal */}
                    <motion.div initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }} transition={{ type: 'spring', stiffness: 70, damping: 18 }} className="space-y-6">
                        <p className="section-label">About Me</p>
                        {/* Large word-by-word reveal heading */}
                        <div>
                            <RevealText text="I build things for the web." className="section-heading" style={{ lineHeight: 1.1 }} delay={0.1} />
                        </div>
                        <div className="w-16 h-0.5" style={{ background: 'var(--accent-light)' }}></div>
                        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5, duration: 0.6 }} className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                            Mechanical Engineering graduate who pivoted into web development. After training at{' '}
                            <span style={{ color: 'var(--accent-light)' }}>QSpiders Institute</span>,
                            I've been crafting high-quality UI experiences across the MERN stack, with a strong eye for design and user interaction.
                        </motion.p>
                    </motion.div>

                    {/* Right — Glass card with stats */}
                    <motion.div variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="space-y-5">
                        {/* Main glass card */}
                        <motion.div variants={itemVariants} className="glass rounded-2xl p-8" style={{ boxShadow: '0 0 0 1px var(--border)' }} whileHover={{ boxShadow: '0 0 0 1px rgba(96,165,250,0.35), 0 0 32px rgba(59,130,246,0.12)' }} transition={{ duration: 0.3 }}>
                            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: 1.85 }}>
                                I'm{' '}
                                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Vishnu Muthukumar</span>
                                , a UI Developer who bridges the gap between engineering rigour and pixel-perfect design. I've worked across{' '}
                                <span style={{ color: 'var(--accent-light)', fontWeight: 500 }}>Shopify, Zoho, MERN stack</span>
                                {' '}projects and internships, delivering interfaces that don't just look good — they perform.
                            </p>
                        </motion.div>

                        {/* Stat chips */}
                        <div className="grid grid-cols-2 gap-3">
                            {stats.map((stat) => (
                                <motion.div key={stat.label} variants={itemVariants} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', }}>
                                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: stat.color, boxShadow: `0 0 8px ${stat.color}` }}/>
                                    <div>
                                        <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                                            {stat.label}
                                        </p>
                                        <p className="text-sm font-semibold" style={{ color: stat.color }}>
                                            {stat.value}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}