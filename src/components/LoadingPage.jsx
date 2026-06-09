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
        }, 200);

        return () => clearInterval(interval);
    }, [isLoading, onLoadingComplete]);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="loading"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    style={{ backgroundColor: 'var(--bg-base)' }}
                >
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                        {/* Animated background - mist green gradients */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            animate={{
                                background: [
                                    'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(123,161,133,0.1) 0%, transparent 70%)',
                                    'radial-gradient(ellipse 80% 60% at 40% 60%, rgba(123,161,133,0.08) 0%, transparent 70%)',
                                    'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(123,161,133,0.08) 0%, transparent 70%)',
                                    'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(123,161,133,0.1) 0%, transparent 70%)',
                                ],
                            }}
                            transition={{ duration: 8, repeat: Infinity }}
                        />

                        {/* Animated orbs - forest mist */}
                        <motion.div
                            className="absolute top-20 right-32 w-72 h-72 rounded-full pointer-events-none"
                            style={{
                                background: 'radial-gradient(circle, rgba(123,161,133,0.1) 0%, transparent 70%)',
                                filter: 'blur(80px)',
                            }}
                            animate={{
                                x: [0, 50, -30, 0],
                                y: [0, -50, 30, 0],
                            }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        />

                        <motion.div
                            className="absolute bottom-32 left-20 w-80 h-80 rounded-full pointer-events-none"
                            style={{
                                background: 'radial-gradient(circle, rgba(123,161,133,0.08) 0%, transparent 70%)',
                                filter: 'blur(80px)',
                            }}
                            animate={{
                                x: [0, -50, 30, 0],
                                y: [0, 50, -30, 0],
                            }}
                            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                        />

                        {/* Main content */}
                        <div className="relative z-10 text-center space-y-12">
                            {/* Logo/Title */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                            >
                                <h1
                                    style={{
                                        fontFamily: 'var(--font-playfair)',
                                        fontSize: 'clamp(2rem, 8vw, 4rem)',
                                        fontWeight: 700,
                                        letterSpacing: '-0.02em',
                                        color: 'var(--text-primary)',
                                    }}
                                >
                                    Vishnu
                                </h1>
                                <motion.div
                                    className="h-1 mt-4 rounded-full"
                                    style={{ background: 'var(--accent)' }}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                                />
                            </motion.div>

                            {/* Tagline */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                style={{
                                    fontFamily: 'var(--font-dm-sans)',
                                    fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
                                    color: 'var(--text-secondary)',
                                    letterSpacing: '0.05em',
                                    maxWidth: '500px',
                                    lineHeight: 1.6,
                                }}
                            >
                                Crafting Digital Experiences with Code & Creativity
                            </motion.p>

                            {/* Loading bar container */}
                            <motion.div className="space-y-4">
                                <div
                                    style={{
                                        width: '200px',
                                        height: '3px',
                                        background: 'rgba(255,255,255,0.06)',
                                        borderRadius: '2px',
                                        overflow: 'hidden',
                                        margin: '0 auto',
                                    }}
                                >
                                    <motion.div
                                        style={{
                                            height: '100%',
                                            background: 'linear-gradient(90deg, var(--accent) 0%, rgba(123,161,133,0.5) 100%)',
                                            width: `${Math.min(count, 100)}%`,
                                        }}
                                        transition={{ duration: 0.2 }}
                                    />
                                </div>

                                {/* Loading text */}
                                <motion.p
                                    style={{
                                        fontFamily: 'var(--font-dm-mono)',
                                        fontSize: '0.85rem',
                                        color: 'var(--text-muted)',
                                        letterSpacing: '0.1em',
                                    }}
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    {Math.round(count)}%
                                </motion.p>
                            </motion.div>

                            {/* Animated scroll indicator */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.6 }}
                                className="pt-8"
                            >
                                <motion.div
                                    animate={{ y: [0, 8, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    style={{
                                        fontFamily: 'var(--font-dm-mono)',
                                        fontSize: '0.75rem',
                                        color: 'var(--text-muted)',
                                        letterSpacing: '0.1em',
                                    }}
                                >
                                    ENTER PORTFOLIO
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Animated leaf particles background */}
                        <div className="absolute inset-0 pointer-events-none">
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-1 h-1 rounded-full"
                                    style={{ background: 'rgba(123,161,133,0.3)' }}
                                    initial={{
                                        x: Math.random() * 100 + '%',
                                        y: Math.random() * 100 + '%',
                                    }}
                                    animate={{
                                        y: [0, -400, 0],
                                        opacity: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 3 + Math.random() * 2,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
