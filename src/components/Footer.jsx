'use client';
import { motion } from 'framer-motion';
import { useHorizontalScroll } from '@/common/HorizontalScrollContext';
import Starwars from '@/assets/img/Starwars.jpg';
import { socials } from '@/lib/contents';

export default function FooterName() {
    const { scrollProgress, isHorizontal } = useHorizontalScroll();
    const localProgress = isHorizontal ? Math.min(Math.max((scrollProgress - 85) / 15, 0), 1) : 1;

    return (
        <footer className="relative font-jura w-full h-full flex items-center overflow-hidden py-10" style={{ backgroundImage: `url(${Starwars.src})`, backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', opacity: isHorizontal ? localProgress : 0.95, transform: isHorizontal ? `scale(${1 + localProgress * 0.06})` : 'none', willChange: isHorizontal ? 'opacity, transform' : 'auto', }}>
            <div className="relative w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center gap-6 z-10">
                <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: localProgress, y: (1 - localProgress) * 80 }} transition={{ type: 'spring', stiffness: 70, damping: 18 }}>
                    <p className="select-none leading-none uppercase" style={{ fontSize: 'clamp(2.5rem, 10vw, 6rem)', fontWeight: 900, letterSpacing: '-0.05em', color: '#d7ff3f' }}>
                        Vishnu
                    </p>
                </motion.div>

                <div className="w-24 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)', opacity: localProgress }} />

                <div className="space-y-1.5" style={{ opacity: localProgress }}>
                    <p style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent-light)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        Front-End Developer · Chennai, India
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Crafting modern web experiences with precision.
                    </p>
                </div>

                <div className="flex items-center gap-4" style={{ opacity: localProgress }}>
                    {socials?.map(link => (
                        <motion.a key={link?.label} href={link?.href} target="_blank" rel="noopener noreferrer" aria-label={link?.label} whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.15, color: 'var(--accent-light)', borderColor: 'var(--accent-light)', boxShadow: '0 0 15px rgba(6,182,212,0.2)' }} transition={{ type: 'spring', stiffness: 400, damping: 20 }} className="w-10 h-10 flex items-center justify-center" style={{ background: 'rgba(5, 5, 12, 0.45)', border: '1px solid rgba(192, 38, 211, 0.15)', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)' }}>
                            {link?.icon}
                        </motion.a>
                    ))}
                </div>

                <div className="w-full flex flex-col items-center gap-2 pt-6" style={{ borderTop: '1px solid var(--border-solid)', opacity: localProgress }}>
                    <p style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                        © {new Date().getFullYear()} Vishnu Muthukumar. All rights reserved.
                    </p>
                    <p style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                        Built with Next.js · GSAP · Framer Motion
                    </p>
                </div>
            </div>
        </footer>
    );
}