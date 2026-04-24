'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 18 } },
};

const contacts = [
    {
        platform: 'LinkedIn',
        handle: 'vishnu-muthukumar',
        description: 'Connect professionally, explore my work history, and stay in touch for career opportunities.',
        url: 'https://www.linkedin.com/in/vishnu-muthukumar-0b247021a/',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        color: '#0A66C2',
    },
    {
        platform: 'GitHub',
        handle: 'Viki2601',
        description: 'Explore my repositories, open source contributions, and code samples on GitHub.',
        url: 'https://github.com/Viki2601',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
        ),
        color: '#fff',
    },
];

export default function Contact() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.25 });
    const [hovered, setHovered] = useState(null);

    return (
        <section ref={sectionRef} className="relative min-h-screen w-full flex flex-col justify-center items-center py-24 px-6 overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
            {/* Background accent */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 100%, rgba(59,130,246,0.07) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 20%, rgba(99,102,241,0.05) 0%, transparent 60%)` }}></div>

            <motion.div variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="relative z-10 w-full max-w-5xl mx-auto">
                {/* Heading */}
                <motion.div variants={itemVariants} className="text-center mb-16 space-y-4">
                    <p className="section-label">Get In Touch</p>
                    <h2 className="section-heading">
                        Let's{' '}
                        <span style={{ background: 'linear-gradient(135deg, #fff 0%, var(--accent-light) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', }}>
                            Connect
                        </span>
                    </h2>
                    <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        Whether it's a project collaboration, job opportunity, or just a hello — I'm always open to a great conversation.
                    </p>
                </motion.div>

                {/* Contact cards */}
                <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {contacts.map((contact, index) => (
                        <motion.a key={contact.platform} href={contact.url} target="_blank" rel="noopener noreferrer" variants={itemVariants} onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)} whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="glass rounded-2xl p-8 flex flex-col gap-5 no-underline" style={{ boxShadow: hovered === index ? '0 0 0 1px rgba(96,165,250,0.45), 0 0 40px rgba(59,130,246,0.15)' : '0 0 0 1px var(--border)', transition: 'box-shadow 0.25s ease', }}>
                            {/* Icon */}
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: hovered === index ? `${contact.color}22` : 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: hovered === index ? contact.color : 'var(--text-secondary)', transition: 'all 0.25s ease', }}>
                                {contact.icon}
                            </div>

                            {/* Text */}
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                                    {contact.platform}
                                </h3>
                                <p className="text-sm font-semibold" style={{ color: 'var(--accent-light)' }}>
                                    @{contact.handle}
                                </p>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                    {contact.description}
                                </p>
                            </div>

                            {/* Arrow */}
                            <div className="flex items-center gap-2 text-sm font-semibold mt-auto" style={{ color: hovered === index ? 'var(--accent-light)' : 'var(--text-muted)', transition: 'color 0.2s ease' }}>
                                <span>{hovered === index ? 'Opening...' : 'Visit Profile'}</span>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ transform: hovered === index ? 'translateX(4px)' : '', transition: 'transform 0.2s ease' }}>
                                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}