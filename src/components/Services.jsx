'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { useHorizontalScroll } from '@/common/HorizontalScrollContext';
import { services } from '@/lib/contents';

function StackedPreviews({ images, hovered }) {
    const offsets = [
        { rotate: 7, x: 20, y: -10, z: 0 },
        { rotate: 2, x: 10, y: -5, z: 10 },
        { rotate: -3, x: 0, y: 0, z: 20 },
    ];

    return (
        <div style={{ position: 'relative', width: 120, height: 84, flexShrink: 0 }}>
            {images?.slice(0, 3).map((src, i) => (
                <motion.div key={i} animate={hovered ? { rotate: offsets[i].rotate, x: offsets[i].x, y: offsets[i].y, scale: 1 + i * 0.04 } : { rotate: 0, x: 0, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 20, delay: i * 0.05 }} style={{ position: 'absolute', top: 0, right: 0, width: 140, height: 95, borderRadius: 7, overflow: 'hidden', border: `1px solid ${hovered ? 'rgba(192,38,211,0.4)' : 'rgba(255,255,255,0.12)'}`, boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.7), 0 0 0 1px rgba(192,38,211,0.15)' : '0 4px 14px rgba(0,0,0,0.6)', zIndex: offsets[i].z, transition: 'border 0.3s ease, box-shadow 0.3s ease', }}>
                    <Image src={src} alt="" fill className="object-cover" style={{ opacity: 1 }} />
                    <div style={{ position: 'absolute', inset: 0, background: hovered ? 'rgba(192,38,211,0.08)' : 'rgba(10,10,10,0.05)', transition: 'background 0.3s ease', }} />
                </motion.div>
            ))}
        </div>
    );
}

function ServiceCard({ s, i, hovered, setHovered }) {
    const isHovered = hovered === i;
    return (
        <div onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ padding: '24px 28px', background: 'rgba(5, 5, 12, 0.45)', border: '1px solid rgba(192, 38, 211, 0.15)', borderRadius: 'var(--radius-md)', boxShadow: isHovered ? '0 0 20px rgba(6, 182, 212, 0.12)' : 'none', borderColor: isHovered ? 'var(--accent-light)' : 'rgba(192, 38, 211, 0.15)', transition: 'all 0.3s ease', cursor: 'default', position: 'relative', overflow: 'hidden', }} className="lg:w-[310px] flex-shrink-0 flex flex-col justify-between h-[360px]">
            <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyBetween: 'space-between', marginBottom: 14 }}>
                    <motion.div animate={{ color: isHovered ? 'var(--accent)' : 'rgba(255,255,255,0.1)' }} transition={{ duration: 0.3 }} style={{ fontSize: '2.4rem', fontWeight: 900, lineHeight: 1 }}>
                        {s?.num}
                    </motion.div>
                    <div className="flex-grow flex justify-end">
                        <StackedPreviews images={s?.previews} hovered={isHovered} />
                    </div>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.02em', }}>
                    {s?.name}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 14, }}>
                    {s?.desc}
                </p>
            </div>

            <div>
                <div className="flex flex-wrap gap-1.5" style={{ marginBottom: 14 }}>
                    {s?.tags?.map(tag => (
                        <span key={tag} style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.08em', padding: '2px 8px', background: 'rgba(192,38,211,0.05)', border: '1px solid rgba(192,38,211,0.12)', color: 'var(--text-muted)', borderRadius: 'var(--radius-sm)', }}>
                            {tag}
                        </span>
                    ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-light)', }}>
                        {s?.price}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.05em', }}>
                        {s?.note}
                    </span>
                </div>
            </div>
            <motion.div animate={{ opacity: isHovered ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--accent-light), transparent)', }} />
        </div>
    );
}

export default function Services() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.15 });
    const [hovered, setHovered] = useState(null);
    const { isHorizontal } = useHorizontalScroll();

    if (isHorizontal) {
        return (
            <section ref={sectionRef} className="relative w-full h-full flex flex-col items-center overflow-hidden py-10 px-16" style={{ backgroundColor: 'var(--bg-base)', borderTop: '1px solid var(--border-solid)' }}>
                <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }} transition={{ type: 'spring', stiffness: 80, damping: 18 }} className="relative z-10 w-full flex-shrink-0 flex flex-col items-center justify-center h-[40%] gap-4">
                    <p className="section-label" style={{ color: 'var(--accent-light)' }}>What I Offer</p>
                    <h2 style={{ fontSize: 'clamp(2.4rem, 100vw, 3.6rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text-primary)', }}>
                        Fixed-scope <span className="gradient-text font-bold" style={{ textShadow: '0 0 15px rgba(192,38,211,0.1)' }}>Services</span>
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        Clear deliverables, clear timelines. You know exactly what you are getting and when.
                    </p>
                </motion.div>

                <div className="flex-grow h-[70%] flex flex-col justify-center overflow-visible">
                    <div className="flex items-center gap-6 relative z-10">
                        {services?.map((s, i) => (
                            <motion.div key={s?.num} initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }} transition={{ type: 'spring', stiffness: 70, damping: 18, delay: i * 0.05 }}>
                                <ServiceCard s={s} i={i} hovered={hovered} setHovered={setHovered} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section ref={sectionRef} className="relative w-full py-12 md:py-24 px-6 overflow-hidden" style={{ backgroundColor: 'var(--bg-base)', borderTop: '1px solid var(--border-solid)' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 60%, rgba(192, 38, 211, 0.06) 0%, transparent 70%)', }} />
            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: -24 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }} transition={{ type: 'spring', stiffness: 80, damping: 18 }} className="mb-16 space-y-4 max-w-xl">
                    <p className="section-label" style={{ color: 'var(--accent-light)' }}>What I Offer</p>
                    <h2 style={{ fontSize: 'clamp(2.8rem, 6vw, 4.8rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--text-primary)', }}>
                        Fixed-scope <span className="gradient-text font-bold" style={{ textShadow: '0 0 15px rgba(192,38,211,0.1)' }}>Services</span>
                    </h2>
                    <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                        Clear deliverables, clear timelines. You know exactly what you are getting and when.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services?.map((s, i) => (
                        <motion.div key={s?.num} initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }} transition={{ type: 'spring', stiffness: 70, damping: 18, delay: i * 0.08 }}>
                            <ServiceCard s={s} i={i} hovered={hovered} setHovered={setHovered} />
                        </motion.div>
                    ))}
                </div>
                <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.5 }} style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', marginTop: 24, textAlign: 'right', }}>
                    * Prices vary by scope & complexity. Get in touch for a custom quote.
                </motion.p>
            </div>
        </section>
    );
}