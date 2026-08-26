'use client';
import { useRef, useState, useLayoutEffect, useMemo } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useHorizontalScroll } from '@/common/HorizontalScrollContext';
import { categories, projects } from '@/lib/contents';
if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);
const PANEL_WIDTH_VW = 160;

export default function Project() {
    const sectionRef = useRef(null);
    const { containerAnimation, isHorizontal } = useHorizontalScroll();
    const [filter, setFilter] = useState('all');
    const [activeIndex, setActiveIndex] = useState(0);
    const [locked, setLocked] = useState(null);
    const filtered = useMemo(() => (filter === 'all' ? projects : projects.filter(p => p.category === filter)),[filter]);

    // Scroll progress through THIS panel drives which project is "live" —
    // independent of how many projects exist or how wide the panel is.
    useLayoutEffect(() => {
        if (!isHorizontal || !sectionRef.current) return;

        const st = ScrollTrigger.create({
            trigger: sectionRef.current,
            containerAnimation,
            start: 'left right',
            end: 'right left',
            scrub: true,
            onUpdate(self) {
                if (locked !== null) return;
                const idx = Math.min(filtered.length - 1,Math.floor(self.progress * filtered.length));
                setActiveIndex(Math.max(0, idx));
            },
        });

        return () => st.kill();
    }, [isHorizontal, containerAnimation, filtered.length, locked]);

    const active = filtered[activeIndex] || filtered[0];

    return (
        <section ref={sectionRef} className="project-section relative h-full flex flex-col" style={{width: isHorizontal ? `${PANEL_WIDTH_VW}vw` : '100vw', background: 'var(--bg-base)', borderTop: '1px solid var(--border-solid)', }} >
            <div className="project-header relative z-10 pt-16 pb-8 px-10 flex items-end justify-between flex-wrap gap-6">
                <div>
                    <p className="section-label" style={{ color: 'var(--accent-light)', marginBottom: 10 }}>Selected Work</p>
                    <h2 style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-primary)' }}>
                        Projects &amp; <span className="gradient-text">Builds</span>
                    </h2>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button key={cat.id} onClick={() => { setFilter(cat.id); setActiveIndex(0); setLocked(null); }} style={{ padding: '7px 18px', borderRadius: 100, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', border: 'none', ...(filter === cat.id ? { background: 'linear-gradient(135deg, var(--accent), var(--accent2))', color: '#fff' } : { background: 'rgba(5,5,12,0.6)', border: '1px solid rgba(192,38,211,0.15)', color: 'var(--text-secondary)' }), }} >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="project-content relative flex-1 flex px-10 pb-16 gap-12 overflow-hidden">
                <div className="project-list flex flex-col gap-1 overflow-y-auto scroll-hide pr-4" style={{ width: 260, flexShrink: 0 }}>
                    {filtered.map((p, i) => (
                        <button
                            key={p.title}
                            onClick={() => { setLocked(i); setActiveIndex(i); }}
                            onMouseEnter={() => { setLocked(i); setActiveIndex(i); }}
                            style={{
                                display: 'flex', alignItems: 'baseline', gap: 14, padding: '10px 12px',
                                textAlign: 'left', border: 'none', background: 'transparent', cursor: 'pointer',
                                borderLeft: `2px solid ${i === activeIndex ? 'var(--accent-light)' : 'transparent'}`,
                                transition: 'border-color 0.25s ease',
                            }}
                        >
                            <span style={{ fontSize: '0.7rem', color: i === activeIndex ? 'var(--accent-light)' : 'var(--text-muted)' }}>
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <span style={{ fontSize: '0.95rem', fontWeight: 700, color: i === activeIndex ? 'var(--text-primary)' : 'var(--text-muted)', transition: 'color 0.25s ease',}}>
                                {p.title}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="project-preview relative flex-1 rounded-3xl overflow-hidden" style={{ maxWidth: '46%', minHeight: '30rem', border: '1px solid rgba(192,38,211,0.18)' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active?.title}
                            initial={{ opacity: 0, scale: 1.04 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                            className="absolute inset-0"
                        >
                            <Image src={active?.image} alt={active?.title} fill style={{ objectFit: 'cover' }} />
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(2,2,5,0.95) 30%, transparent 60%)' }} />

                            <div className="project-details absolute bottom-0 left-0 right-0 p-10 flex items-end justify-between gap-8">
                                <div className="project-description" style={{ maxWidth: '60%' }}>
                                    <span style={{fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-light)' }}>
                                        [ {active?.category} ]
                                    </span>
                                    <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', margin: '8px 0 12px', letterSpacing: '-0.02em' }}>
                                        {active?.title}
                                    </h3>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                        {active?.description}
                                    </p>
                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 14 }}>
                                        {active?.tags?.slice(0, 4).map(tag => (
                                            <span key={tag} style={{ fontSize: '0.6rem', padding: '3px 9px', border: '1px solid rgba(192,38,211,0.25)', color: 'var(--accent-light)' }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <a href={active?.url} target="_blank" rel="noopener noreferrer" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10, padding: '12px 26px', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', textDecoration: 'none', background: 'linear-gradient(135deg, var(--accent), var(--accent2))', borderRadius: 100, }}>
                                    View ↗
                                </a>
                            </div>

                            <span style={{position: 'absolute', top: 16, right: 22, fontSize: '3rem', fontWeight: 700, color: 'rgba(255,255,255,0.08)', lineHeight: 1,}}>
                                {String(activeIndex + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section >
    );
}