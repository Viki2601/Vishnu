'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import useHorizontalInView from '@/common/useHorizontalInView';
import { certificateData } from '@/lib/contents';
import Blackhole from '@/assets/img/Blackhole.png';

const sectionReveal = {
    hidden: { opacity: 0, scale: 0.48, y: 60, },
    visible: {
        opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 18, duration: 1.8, },
    },
};

const leftReveal = {
    hidden: { opacity: 0, x: -680, scale: 0.3 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 65, damping: 18, delay: 1.15 }, },
};

const rightReveal = {
    hidden: { opacity: 0, y: 680, scale: 0.3 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 65, damping: 18, delay: 1.25 }, },
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.82, y: 32 },
    visible: (i) => ({ opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 75, damping: 16, delay: 0.5 + i * 0.22, }, }),
};

export default function Certificates() {
    const [sectionRef, isInView] = useHorizontalInView({ once: false, amount: 'some' });
    const [hovered, setHovered] = useState(null);

    return (
        <motion.div variants={sectionReveal} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="relative h-full w-full" style={{ transformOrigin: 'center center' }}>
            <section ref={sectionRef} className="relative h-full flex items-center w-full py-24 px-6 overflow-hidden rounded-4xl" style={{ backgroundImage: `url(${Blackhole.src})`, backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', }}>
                <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 80% 80% at 50% 50%, rgba(5,5,12,0.35) 0%, rgba(5,5,12,0.72) 100%),linear-gradient(to right, rgba(5,5,12,0.55) 0%, transparent 40%, transparent 60%, rgba(5,5,12,0.4) 100%)`, }} />
                <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">

                    <motion.div variants={leftReveal} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="flex flex-col gap-6">
                        <p className="section-label" style={{ color: 'var(--accent-light)' }}>Credentials</p>
                        <h2 style={{ fontFamily: 'var(--font-montserrat)', fontSize: 'clamp(2.8rem, 6vw, 4.8rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--text-primary)', }}>
                            Professional <br />
                            <span className="gradient-text font-bold" style={{ textShadow: '0 0 15px rgba(192,38,211,0.1)' }}>
                                Certificates
                            </span>
                        </h2>
                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                            Certified in modern web technologies and user interface design — a testament to continuous learning and technical adaptation.
                        </p>
                        <div className="w-20 h-[2px]" style={{ background: 'linear-gradient(90deg, var(--accent-light), transparent)' }} />
                    </motion.div>

                    <motion.div variants={rightReveal} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="flex flex-col gap-4">
                        {certificateData?.map((cert, index) => (
                            <motion.div
                                key={index}
                                custom={index}
                                variants={cardVariants}
                                initial="hidden"
                                animate={isInView ? 'visible' : 'hidden'}
                                onMouseEnter={() => setHovered(index)}
                                onMouseLeave={() => setHovered(null)}
                                className="overflow-hidden cursor-default"
                                style={{ borderRadius: 'var(--radius-lg)', border: '1px solid rgba(192, 38, 211, 0.15)', background: 'rgba(5, 5, 12, 0.82)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)', transition: 'border-color 0.3s ease, box-shadow 0.3s ease', }}
                                whileHover={{ borderColor: 'var(--accent-light)', boxShadow: '0 0 28px rgba(6, 182, 212, 0.18), inset 0 1px 0 rgba(6, 182, 212, 0.06)', scale: 1.018, y: -2, transition: { type: 'spring', stiffness: 300, damping: 20 }, }}
                            >
                                <div className="flex gap-4 items-start p-5">
                                    <div className="flex-shrink-0 w-24 h-20 relative overflow-hidden" style={{ borderRadius: 'var(--radius-md)', border: '1px solid var(--border-solid)' }}>
                                        <Image src={cert?.certi_img} alt={cert?.title} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0 space-y-2">
                                        <h3 style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em', }}>
                                            {cert?.title}
                                        </h3>
                                        <span style={{ display: 'inline-block', fontFamily: 'var(--font-montserrat)', fontSize: '0.68rem', fontWeight: 700, padding: '2px 10px', background: 'rgba(192,38,211,0.08)', color: 'var(--accent)', border: '1px solid rgba(192,38,211,0.25)', borderRadius: 'var(--radius-sm)', letterSpacing: '0.06em', }}>
                                            {cert?.institute}
                                        </span>
                                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                                            {cert?.technologies}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </section>
        </motion.div>
    );
}