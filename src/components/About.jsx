'use client';
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function RevealText({ text, className, style, delay = 0 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const words = text.split(' ');
    return (
        <span ref={ref} className={className} style={{ ...style, display: 'block' }}>
            {words.map((word, i) => (
                <motion.span key={i} initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ type: 'spring', stiffness: 80, damping: 16, delay: delay + i * 0.04 }} style={{ display: 'inline-block', marginRight: '0.28em' }}>
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
    { label: 'Focus', value: 'UI / Web', color: 'var(--accent)' },
    { label: 'Stack', value: 'MERN', color: '#f59e0b' },
    { label: 'Location', value: 'Chennai, IN', color: 'var(--text-secondary)' },
];

export default function About() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

    return (
        <section ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-28 px-8 md:px-14 lg:px-20" style={{ backgroundColor: 'var(--bg-base)', borderTop: '1px solid var(--border-solid)' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 20% 50%, rgba(232,103,58,0.07) 0%, transparent 70%)', }} />
            <div className="relative z-10 w-full max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <motion.div initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }} transition={{ type: 'spring', stiffness: 70, damping: 18 }} className="space-y-6">
                        <p className="section-label">About Me</p>
                        <div>
                            <RevealText text="I build things for the web." style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.06, color: 'var(--text-primary)', }} delay={0.1} />
                        </div>
                        <div className="w-16 h-px" style={{ background: 'var(--accent)' }} />
                        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5, duration: 0.6 }} style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontFamily: 'var(--font-dm-sans)' }}>
                            Mechanical Engineering graduate who pivoted into web development. After training at{' '}
                            <span style={{ color: 'var(--accent)' }}>QSpiders Institute</span>, I've been crafting
                            high-quality UI experiences across the MERN stack, with a strong eye for design and user interaction.
                        </motion.p>
                    </motion.div>

                    {/* Right */}
                    <motion.div variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="space-y-4">
                        <motion.div variants={itemVariants} className="glass glass-hover p-8" style={{ borderRadius: 'var(--radius-md)' }}>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontFamily: 'var(--font-dm-sans)' }}>
                                I'm{' '}
                                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Vishnu Muthukumar</span>
                                , a UI Developer who bridges the gap between engineering rigour and pixel-perfect design. I've worked across{' '}
                                <span style={{ color: 'var(--accent)', fontWeight: 500 }}>Shopify, Zoho, MERN stack</span>
                                {' '}projects, delivering interfaces that don't just look good — they perform.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-3">
                            {stats?.map((stat) => (
                                <motion.div key={stat?.label} variants={itemVariants} className="flex items-center gap-3 px-4 py-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-solid)', borderRadius: 'var(--radius-sm)', }}>
                                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: stat?.color, boxShadow: `0 0 8px ${stat?.color}` }} />
                                    <div>
                                        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                            {stat?.label}
                                        </p>
                                        <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem', fontWeight: 600, color: stat?.color }}>
                                            {stat?.value}
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