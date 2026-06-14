'use client';
import { motion } from 'framer-motion';
import useHorizontalInView from '@/common/useHorizontalInView';
import Starwars from '@/assets/img/Starwars.jpg';
import { socials } from '@/lib/contents';

export default function FooterName() {
    const [footerRef, isInView] = useHorizontalInView({ once: false, amount: 'some' });

    return (
        <footer ref={footerRef} className="relative w-full h-full flex items-center overflow-hidden py-10" style={{ backgroundImage: `url(${Starwars.src})`, backgroundSize: 'object-fit', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', opacity: 0.95, }}>
            <div className="relative w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center gap-6 z-10">
                <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.1 }}>
                    <p className="select-none leading-none uppercase" style={{ fontFamily: 'var(--font-montserrat)', fontSize: 'clamp(2.5rem, 10vw, 6rem)', fontWeight: 900, letterSpacing: '-0.05em', color: 'rgba(192, 38, 211, 0.28)', }}>
                        Vishnu<br />Muthukumar
                    </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="w-24 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />

                <motion.div initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }} transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.35 }} className="space-y-1.5">
                    <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent-light)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        UI Developer · Chennai, India
                    </p>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Crafting modern web experiences with precision.
                    </p>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.5 }} className="flex items-center gap-4">
                    {socials?.map(link => (
                        <motion.a
                            key={link?.label} href={link?.href} target="_blank" rel="noopener noreferrer" aria-label={link?.label} whileTap={{ scale: 0.95 }}
                            whileHover={{ scale: 1.15, color: 'var(--accent-light)', borderColor: 'var(--accent-light)', boxShadow: '0 0 15px rgba(6,182,212,0.2)' }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }} className="w-10 h-10 flex items-center justify-center"
                            style={{ background: 'rgba(5, 5, 12, 0.45)', border: '1px solid rgba(192, 38, 211, 0.15)', borderRadius: 'var(--radius-sm)', color: 'var(--text-muted)', }}
                        >
                            {link?.icon}
                        </motion.a>
                    ))}
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.6 }} className="w-full flex flex-col items-center gap-2 pt-6" style={{ borderTop: '1px solid var(--border-solid)' }}>
                    <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                        © {new Date().getFullYear()} Vishnu Muthukumar. All rights reserved.
                    </p>
                    <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.65rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                        Built with Next.js · GSAP · Framer Motion
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}