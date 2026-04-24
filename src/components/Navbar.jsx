'use client';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

const links = [
    { label: 'About', href: '#about' },
    { label: 'Journey', href: '#journey' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certificates', href: '#certificates' },
];

export default function Navbar() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, 'change', (y) => {
        setScrolled(y > 40);
    });

    const scrollTo = (href) => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <motion.header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-16" animate={{backgroundColor: scrolled ? 'rgba(5,5,20,0.88)' : 'rgba(5,5,20,0)',borderBottomColor: scrolled ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0)',backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',}} transition={{ duration: 0.3 }} style={{ borderBottom: '1px solid transparent' }}>
            {/* Logo */}
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.2 }}>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-black tracking-tight text-lg flex items-center gap-1.5" style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                    VM
                    <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: 'var(--accent-light)', boxShadow: '0 0 8px var(--accent-light)' }}/>
                </button>
            </motion.div>

            {/* Nav links */}
            <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 100, damping: 18, delay: 0.3 }} className="hidden md:flex items-center gap-8">
                {links.map((link) => (
                    <button key={link.href} onClick={() => scrollTo(link.href)} className="nav-link">{link.label}</button>
                ))}
            </motion.nav>

            {/* CTA */}
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.4 }}>
                <motion.a href="https://www.linkedin.com/in/vishnu-muthukumar-0b247021a/" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }} className="px-5 py-2 rounded-full text-sm font-semibold" style={{ background: 'var(--accent)', color: '#fff', boxShadow: '0 0 18px rgba(59,130,246,0.4)', letterSpacing: '0.01em', }}>
                    Contact Me
                </motion.a>
            </motion.div>
        </motion.header>
    );
}