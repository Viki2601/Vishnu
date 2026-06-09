'use client';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { useHorizontalScroll } from '@/common/HorizontalScrollContext';

const links = [
    { label: 'About', href: '#about' },
    { label: 'Journey', href: '#journey' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 60));

    const { scrollToPanel, scrollProgress } = useHorizontalScroll();

    const handleLogoClick = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Viewport-wide top progress bar */}
            <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/5 z-50 pointer-events-none">
                <div
                    className="h-full bg-[var(--accent)] transition-all duration-100 ease-out"
                    style={{ width: `${scrollProgress}%`, boxShadow: '0 0 10px var(--accent)' }}
                />
            </div>

            {/* Outer wrapper — full width, fixed, just provides the top padding */}
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
                style={{ padding: '16px 24px' }}>

                <motion.header
                    className="pointer-events-auto flex items-center justify-between w-full relative overflow-hidden"
                    style={{ maxWidth: 900 }}
                    animate={{
                        background: scrolled ? 'rgba(12, 12, 12, 0.82)' : 'rgba(12, 12, 12, 0)',
                        backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'blur(0px)',
                        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'blur(0px)',
                        border: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(255,255,255,0)',
                        borderRadius: scrolled ? '100px' : '16px',
                        padding: scrolled ? '10px 20px' : '8px 4px',
                        boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)' : 'none',
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    {/* Logo */}
                    <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.2 }}>
                        <button
                            onClick={handleLogoClick}
                            style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.03em', color: 'var(--text-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px', }}
                        >
                            Vishnu<span style={{ color: 'var(--accent)' }}>.</span>
                        </button>
                    </motion.div>

                    {/* Nav links — desktop */}
                    <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 100, damping: 18, delay: 0.3 }} className="hidden md:flex items-center gap-1">
                        {links.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => scrollToPanel(link.href)}
                                style={{
                                    fontFamily: 'var(--font-dm-mono)',
                                    fontSize: '0.72rem',
                                    fontWeight: 400,
                                    letterSpacing: '0.08em',
                                    textTransform: 'uppercase',
                                    color: 'var(--text-secondary)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '6px 14px',
                                    borderRadius: '100px',
                                    transition: 'color 0.2s ease, background 0.2s ease',
                                }}
                                onMouseEnter={e => {
                                    e.target.style.color = 'var(--text-primary)';
                                    e.target.style.background = 'rgba(255,255,255,0.07)';
                                }}
                                onMouseLeave={e => {
                                    e.target.style.color = 'var(--text-secondary)';
                                    e.target.style.background = 'none';
                                }}
                            >
                                {link.label}
                            </button>
                        ))}
                    </motion.nav>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.4 }}
                    >
                        <motion.button
                            onClick={() => scrollToPanel('#contact')}
                            whileHover={{ opacity: 0.88, scale: 1.03 }}
                            whileTap={{ scale: 0.96 }}
                            style={{
                                padding: '8px 20px',
                                background: 'var(--accent)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '100px',
                                fontFamily: 'var(--font-dm-sans)',
                                fontSize: '0.8rem',
                                fontWeight: 500,
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                boxShadow: '0 0 20px rgba(232,103,58,0.35)',
                            }}
                        >
                            Hire Me
                        </motion.button>
                    </motion.div>

                    {/* Progress line inside the pill navbar itself when scrolled */}
                    {scrolled && (
                        <div
                            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent to-[var(--accent)] transition-all duration-100 ease-out"
                            style={{ width: `${scrollProgress}%` }}
                        />
                    )}
                </motion.header>
            </div>
        </>
    );
}         