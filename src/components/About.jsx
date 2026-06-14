'use client';
import { motion } from 'framer-motion';
import useHorizontalInView from '@/common/useHorizontalInView';
import { stats } from '@/lib/contents';

function RevealText({ text, className, style, delay = 0 }) {
    const [ref, inView] = useHorizontalInView({ once: true, amount: 'some' });
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

export default function About() {
    const [sectionRef, isInView] = useHorizontalInView({ once: false, amount: 'some' });

    return (
        <section ref={sectionRef} className="relative w-full h-full flex items-center justify-center overflow-hidden py-28 px-8 md:px-14 lg:px-20 rounded-4xl border border-amber-500/20 shadow-lg shadow-amber-500">
            <div className="relative z-10 w-full max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <motion.div initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }} transition={{ type: 'spring', stiffness: 70, damping: 18 }} className="space-y-6">
                        <p className="section-label" style={{ color: 'var(--accent-light)' }}>About Me</p>
                        <div>
                            <RevealText text="I build things for the web." style={{ fontFamily: 'var(--font-montserrat)', fontSize: 'clamp(2.8rem, 6vw, 4.8rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--text-primary)', }} delay={0.1} />
                        </div>
                        <div className="w-20 h-[2px]" style={{ background: 'linear-gradient(90deg, var(--accent-light), transparent)' }} />
                        <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.5, duration: 0.6 }} style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontFamily: 'var(--font-sans)' }}>
                            Mechanical Engineering graduate who pivoted into software engineering. After comprehensive training at{' '}
                            <span style={{ color: 'var(--accent-light)', fontWeight: 600 }}>QSpiders Institute</span>, I've been crafting
                            highly interactive UI experiences across the MERN stack, blending logical engineering principles with creative design.
                        </motion.p>
                    </motion.div>

                    <motion.div variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="space-y-4">
                        <motion.div variants={itemVariants} className="glass p-8" style={{ borderRadius: 'var(--radius-md)', border: '1px solid rgba(192, 38, 211, 0.15)', boxShadow: 'inset 0 1px 0 rgba(192, 38, 211, 0.05)', background: 'rgba(5, 5, 12, 0.45)' }}>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontFamily: 'var(--font-sans)' }}>
                                I'm{' '}
                                <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>Vishnu Muthukumar</span>
                                , a frontend-focused developer bridging engineering rigor and pixel-perfect design. I've designed and delivered components across{' '}
                                <span style={{ color: 'var(--accent-light)', fontWeight: 600 }}>Shopify, Zoho, and MERN stack</span>
                                {' '}projects, ensuring clean code and immersive transitions.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-3">
                            {stats?.map((stat) => (
                                <motion.div key={stat?.label} variants={itemVariants} className="flex items-center gap-3 px-4 py-3" style={{ background: 'rgba(5, 5, 12, 0.35)', border: '1px solid var(--border-solid)', borderRadius: 'var(--radius-sm)', transition: 'all 0.3s ease' }} whileHover={{ borderColor: stat.color, boxShadow: `0 0 15px ${stat.color}25`, background: 'rgba(5, 5, 12, 0.55)' }}>
                                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: stat?.color, boxShadow: `0 0 10px ${stat?.color}` }} />
                                    <div>
                                        <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.62rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                                            {stat?.label}
                                        </p>
                                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 700, color: stat?.color }}>
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