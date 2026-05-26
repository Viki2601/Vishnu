'use client';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

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
    useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 40));

    const scrollTo = (href) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16" animate={{ backgroundColor: scrolled ? 'rgba(10,10,10,0.94)' : 'rgba(10,10,10,0)', borderBottomColor: scrolled ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0)', backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)', }} transition={{ duration: 0.3 }} style={{ borderBottom: '1px solid transparent' }}>
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.2 }}>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.03em', color: 'var(--text-primary)', background: 'none', border: 'none', cursor: 'pointer', }}>
                    Vishnu<span style={{ color: 'var(--accent)' }}>.</span>
                </button>
            </motion.div>

            <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 100, damping: 18, delay: 0.3 }} className="hidden md:flex items-center gap-8">
                {links?.map((link) => (
                    <button key={link?.href} onClick={() => scrollTo(link?.href)} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        {link?.label}
                    </button>
                ))}
            </motion.nav>

            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.4 }}>
                <motion.button onClick={() => scrollTo('#contact')} whileHover={{ opacity: 0.88, y: -1 }} whileTap={{ scale: 0.96 }} style={{ padding: '8px 20px', background: 'var(--accent)', color: '#fff', border: '1px solid var(--accent)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-dm-sans)', fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer', }}>
                    Hire Me
                </motion.button>
            </motion.div>
        </motion.header>
    );
}