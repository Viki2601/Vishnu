'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function LoadingPage({ onLoadingComplete }) {
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isLoading) return;

        const interval = setInterval(() => {
            setCount(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsLoading(false);
                        onLoadingComplete?.();
                    }, 800);
                    return 100;
                }
                return prev + Math.random() * 8;
            });
        }, 120);

        return () => clearInterval(interval);
    }, [isLoading, onLoadingComplete]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div key="loading" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8, ease: 'easeInOut' }} className="fixed inset-0 z-50 overflow-hidden" style={{ backgroundColor: '#11120f', color: '#f4f1e8' }}>
                    <div className="relative grid h-full w-full grid-cols-1 grid-rows-[auto_1fr_auto] p-6 sm:p-10 lg:p-14" style={{ backgroundImage: 'linear-gradient(rgba(244,241,232,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(244,241,232,0.06) 1px, transparent 1px)', backgroundSize: 'clamp(32px, 5vw, 72px) clamp(32px, 5vw, 72px)' }}>
                        <header className="relative z-10 flex items-start justify-between border-b border-[#f4f1e8]/20 pb-5">
                            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem', letterSpacing: '0.12em', color: '#a7aa9d' }}>VM / 2026</span>
                            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem', letterSpacing: '0.12em', color: '#a7aa9d' }}>PORTFOLIO_01</span>
                        </header>

                        <main className="relative z-10 flex min-h-0 flex-col justify-center py-12 sm:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
                            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
                                <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.68rem', letterSpacing: '0.18em', color: '#d7ff3f', marginBottom: '1.5rem' }}>DIGITAL CRAFT / 001</p>
                                <h1 style={{ fontFamily: 'var(--font-montserrat)', fontSize: 'clamp(4rem, 14vw, 12rem)', lineHeight: 0.78, fontWeight: 900, letterSpacing: '-0.08em', color: '#f4f1e8', textTransform: 'uppercase' }}>
                                    VISH<span style={{ color: '#d7ff3f' }}>NU.</span>
                                </h1>
                            </motion.div>

                            <motion.div className="mt-12 w-full max-w-sm lg:mt-24" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
                                <div className="mb-5 flex items-end justify-between border-b border-[#f4f1e8]/20 pb-4">
                                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1rem, 2vw, 1.25rem)', lineHeight: 1.15, maxWidth: '220px', color: '#f4f1e8' }}>Building interfaces with intent.</p>
                                    <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: 'clamp(2.2rem, 5vw, 4rem)', lineHeight: 0.8, fontWeight: 800, letterSpacing: '-0.06em', color: '#d7ff3f' }}>{Math.round(Math.min(count, 100))}<small style={{ fontSize: '0.35em', letterSpacing: 0 }}>%</small></span>
                                </div>
                                <div style={{ height: '8px', background: '#292b24', overflow: 'hidden' }}>
                                    <motion.div style={{ height: '100%', width: `${Math.min(count, 100)}%`, background: '#d7ff3f', transformOrigin: 'left' }} transition={{ duration: 0.2 }} />
                                </div>
                                <div className="mt-4 flex justify-between" style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: '#a7aa9d' }}>
                                    <span>LOADING EXPERIENCE</span><span>PLEASE WAIT</span>
                                </div>
                            </motion.div>
                        </main>

                        <footer className="relative z-10 flex items-end justify-between border-t border-[#f4f1e8]/20 pt-5" style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: '#a7aa9d' }}>
                            <span>© VISHNU MUTHUKUMAR</span>
                            <motion.span animate={{ opacity: [0.35, 1, 0.35] }} transition={{ duration: 1.4, repeat: Infinity }} style={{ color: '#d7ff3f' }}>● ONLINE</motion.span>
                        </footer>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
