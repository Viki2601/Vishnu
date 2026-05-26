'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

// ── Pull from your existing project assets ──────────────────────────────────
import Homura from '@/assets/projects/Homura.png';
import Builderkit from '@/assets/projects/BuilderKit.png';
import Myproject from '@/assets/projects/MAI.png';
import Dragon from '@/assets/projects/DC.png';
import Torque from '@/assets/projects/Torque.png';
import Anime from '@/assets/projects/Anime.png';
import CV from '@/assets/projects/CV.io.png';
import DOIT from '@/assets/projects/DO-IT.png';

const services = [
    {
        num: '01',
        name: 'Landing Page',
        desc: 'Conversion-focused, animated, pixel-perfect. Delivered in 5–7 days with mobile-first responsive design.',
        price: 'From $99',
        note: '~₹8,000',
        tags: ['Next.js', 'Framer Motion', 'Responsive'],
        previews: [Builderkit, Torque, Anime],
    },
    {
        num: '02',
        name: 'UI Component Pack',
        desc: 'A set of reusable, styled components for your product — buttons, forms, cards, modals, and more.',
        price: 'From $149',
        note: '~₹12,500',
        tags: ['React', 'Tailwind', 'Design System'],
        previews: [Myproject, Dragon, CV],
    },
    {
        num: '03',
        name: 'Full Web App UI',
        desc: 'End-to-end frontend — all screens, states, transitions, and responsive behaviour. Production-ready.',
        price: 'From $349',
        note: '~₹29,000',
        tags: ['MERN', 'Redux', 'Full Stack'],
        previews: [Homura, Myproject, Dragon],
    },
    {
        num: '04',
        name: 'Animation Sprint',
        desc: 'Bring your existing UI to life with motion and micro-interactions using Framer Motion.',
        price: 'From $79',
        note: '~₹6,500',
        tags: ['Framer Motion', 'CSS', 'Motion'],
        previews: [Torque, Anime, DOIT],
    },
];

function StackedPreviews({ images, hovered }) {
    const offsets = [
        { rotate: 7, x: 20, y: -10, z: 0 },
        { rotate: 2, x: 10, y: -5, z: 10 },
        { rotate: -3, x: 0, y: 0, z: 20 },
    ];

    return (
        <div style={{ position: 'relative', width: 120, height: 84, flexShrink: 0 }}>
            {images?.slice(0, 3).map((src, i) => (
                <motion.div key={i} animate={hovered ? { rotate: offsets[i].rotate, x: offsets[i].x, y: offsets[i].y, scale: 1 + i * 0.04 } : { rotate: 0, x: 0, y: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 20, delay: i * 0.05 }}
                    style={{ position: 'absolute', top: 0, right: 0, width: 180, height: 120, borderRadius: 7, overflow: 'hidden', border: `1px solid ${hovered ? 'rgba(232,103,58,0.4)' : 'rgba(255,255,255,0.12)'}`, boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.7), 0 0 0 1px rgba(232,103,58,0.15)' : '0 4px 14px rgba(0,0,0,0.6)', zIndex: offsets[i].z, transition: 'border 0.3s ease, box-shadow 0.3s ease', }}>
                    <Image src={src} alt="" fill className="object-cover" style={{ opacity: 1 }} />
                    <div style={{ position: 'absolute', inset: 0, background: hovered ? 'rgba(232,103,58,0.08)' : 'rgba(10,10,10,0.05)', transition: 'background 0.3s ease', }} />
                </motion.div>
            ))}
        </div>
    );
}

export default function Services() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.15 });
    const [hovered, setHovered] = useState(null);

    return (
        <section ref={sectionRef} className="relative w-full py-24 px-6 overflow-hidden" style={{ backgroundColor: 'var(--bg-base)', borderTop: '1px solid var(--border-solid)' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 60%, rgba(232,103,58,0.06) 0%, transparent 70%)', }} />
            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: -24 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }} transition={{ type: 'spring', stiffness: 80, damping: 18 }} className="mb-16 space-y-4 max-w-xl">
                    <p className="section-label">What I Offer</p>
                    <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.06, color: 'var(--text-primary)', }}>
                        Fixed-scope <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Services</em>
                    </h2>
                    <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                        Clear deliverables, clear timelines?. You know exactly what you're getting and when.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2" style={{ border: '1px solid var(--border-solid)' }}>
                    {services?.map((s, i) => (
                        <motion.div key={s?.num} initial={{ opacity: 0, y: 28 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }} transition={{ type: 'spring', stiffness: 70, damping: 18, delay: i * 0.08 }} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{ padding: '24px 28px', background: hovered === i ? 'rgba(255,255,255,0.035)' : 'var(--bg-base)', borderRight: i % 2 === 0 ? '1px solid var(--border-solid)' : 'none', borderBottom: i < 2 ? '1px solid var(--border-solid)' : 'none', transition: 'background 0.3s ease', cursor: 'default', position: 'relative', overflow: 'hidden', }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
                                <motion.div animate={{ color: hovered === i ? 'var(--accent)' : 'var(--border-solid2)' }} transition={{ duration: 0.3 }} style={{ fontFamily: 'var(--font-playfair)', fontSize: '2.4rem', fontWeight: 900, lineHeight: 1 }}>
                                    {s?.num}
                                </motion.div>
                                <StackedPreviews images={s?.previews} hovered={hovered === i} />
                            </div>
                            <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.02em', }}>
                                {s?.name}
                            </h3>
                            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 14, }}>
                                {s?.desc}
                            </p>
                            <div className="flex flex-wrap gap-1.5" style={{ marginBottom: 14 }}>
                                {s?.tags?.map(tag => (
                                    <span key={tag} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.62rem', letterSpacing: '0.08em', padding: '2px 8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: 'var(--radius-sm)', }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                                <span style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)', }}>
                                    {s?.price}
                                </span>
                                <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.05em', }}>
                                    {s?.note}
                                </span>
                            </div>
                            <motion.div animate={{ opacity: hovered === i ? 1 : 0 }} transition={{ duration: 0.3 }} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, var(--accent), transparent)', }} />
                        </motion.div>
                    ))}
                </div>
                <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.5 }} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.06em', marginTop: 16, textAlign: 'right', }}>
                    * Prices vary by scope & complexity. Get in touch for a custom quote.
                </motion.p>
            </div>
        </section>
    );
}