'use client';
import { motion } from 'framer-motion';
import useHorizontalInView from '@/common/useHorizontalInView';

const socials = [
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/vishnu-muthukumar-0b247021a/',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: 'GitHub',
        href: 'https://github.com/Viki2601',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
];

export default function FooterName() {
    const [footerRef, isInView] = useHorizontalInView({ once: false, amount: 'some' });

    return (
        <footer
            ref={footerRef}
            className="relative w-full h-full flex items-center overflow-hidden py-10"
            style={{ backgroundColor: 'var(--bg-base)', borderTop: '1px solid var(--border-solid)' }}
        >
            <div className="relative w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center gap-6">

                {/* Large watermark name */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.1 }}
                >
                    <p
                        className="select-none leading-none"
                        style={{
                            fontFamily: 'var(--font-playfair)',
                            fontSize: 'clamp(2.5rem, 10vw, 8rem)',
                            fontWeight: 900,
                            letterSpacing: '-0.05em',
                            color: 'var(--text-muted)',
                            opacity: 0.18,
                        }}
                    >
                        Vishnu<br />Muthukumar
                    </p>
                </motion.div>

                {/* Divider */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="w-24 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
                />

                {/* Role */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                    transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.35 }}
                    className="space-y-1.5"
                >
                    <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.68rem', color: 'var(--accent)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        UI Developer · Chennai, India
                    </p>
                    <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Crafting modern web experiences with precision.
                    </p>
                </motion.div>

                {/* Social icons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-4"
                >
                    {socials.map(link => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.label}
                            whileHover={{ scale: 1.15, color: 'var(--accent)' }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            className="w-10 h-10 flex items-center justify-center"
                            style={{
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid var(--border-solid)',
                                borderRadius: 'var(--radius-sm)',
                                color: 'var(--text-muted)',
                            }}
                        >
                            {link.icon}
                        </motion.a>
                    ))}
                </motion.div>

                {/* Bottom bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.6 }}
                    className="w-full flex flex-col items-center gap-2 pt-6"
                    style={{ borderTop: '1px solid var(--border-solid)' }}
                >
                    <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                        © {new Date().getFullYear()} Vishnu Muthukumar. All rights reserved.
                    </p>
                    <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
                        Built with Next.js · GSAP · Framer Motion
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}