'use client';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { categories, projects } from '@/lib/contents';

const INITIAL_COUNT = 6;

function Blob({ style }) {
    return (
        <div style={{ position: 'absolute', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0, ...style, }} />
    );
}

function ProjectCard({ project, index }) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ type: 'spring', stiffness: 70, damping: 18, delay: (index % 3) * 0.07 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ position: 'relative', display: 'flex', flexDirection: 'column', background: hovered ? 'rgba(192,38,211,0.04)' : 'rgba(5,5,12,0.5)', border: `1px solid ${hovered ? 'rgba(192,38,211,0.4)' : 'rgba(192,38,211,0.12)'}`, borderRadius: 'var(--radius-md)', overflow: 'hidden', cursor: 'pointer', transform: hovered ? 'translateY(-6px)' : 'translateY(0)', boxShadow: hovered ? '0 20px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(192,38,211,0.2)' : 'none', transition: 'all 0.35s cubic-bezier(0.25,0.1,0.25,1)', }}
        >
            <div style={{ position: 'relative', height: 200, overflow: 'hidden', background: '#020205' }}>
                <Image src={project?.image} alt={project?.title} fill style={{ objectFit: 'cover', transform: hovered ? 'scale(1.07)' : 'scale(1)', transition: 'transform 0.6s cubic-bezier(0.25,0.1,0.25,1)', }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(2,2,5,0.95) 0%, transparent 55%)' }} />
                <span style={{ position: 'absolute', top: 12, left: 12, fontFamily: 'var(--font-montserrat)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '3px 10px', background: 'rgba(5,5,12,0.82)', backdropFilter: 'blur(8px)', border: '1px solid rgba(192,38,211,0.3)', color: 'var(--accent-light)', borderRadius: 100, }}>
                    {project?.category}
                </span>

                <span style={{ position: 'absolute', bottom: 12, right: 14, fontFamily: 'var(--font-montserrat)', fontSize: '2.5rem', fontWeight: 900, color: 'rgba(255,255,255,0.06)', lineHeight: 1, userSelect: 'none', }}>
                    {String(index + 1).padStart(2, '0')}
                </span>
            </div>

            <div style={{ flex: 1, padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <h3 style={{ fontFamily: 'var(--font-montserrat)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', }}>
                    {project?.title}
                </h3>

                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.65, flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', }}>
                    {project?.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {project?.tags.slice(0, 3).map(tag => (
                        <span key={tag} style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.08em', padding: '2px 8px', background: hovered ? 'rgba(192,38,211,0.1)' : 'rgba(192,38,211,0.05)', border: `1px solid ${hovered ? 'rgba(192,38,211,0.3)' : 'rgba(192,38,211,0.1)'}`, color: hovered ? 'var(--accent-light)' : 'var(--text-muted)', borderRadius: 100, transition: 'all 0.2s ease', }}>
                            {tag}
                        </span>
                    ))}
                </div>

                <a href={project?.url} target="_blank" rel="noopener noreferrer" style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 14px', marginTop: 4, fontFamily: 'var(--font-montserrat)', fontSize: '0.68rem',
                    fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 'var(--radius-sm)', color: hovered ? '#fff' : 'var(--text-muted)', transition: 'all 0.25s ease',
                    background: hovered ? 'linear-gradient(135deg, var(--accent), var(--accent2))' : 'rgba(255,255,255,0.03)', border: `1px solid ${hovered ? 'transparent' : 'rgba(192,38,211,0.15)'}`,
                }}
                >
                    View Project
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M2 10L10 2M10 2H4M10 2v6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
            </div>

            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--accent), var(--accent2), transparent)', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease', }} />
        </motion.div>
    );
}

/* ── Main section ─────────────────────────────────────────────────────────── */
export default function Project() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.08 });
    const [filter, setFilter] = useState('all');
    const [showAll, setShowAll] = useState(false);
    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);
    const displayed = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
    const hasMore = filtered.length > INITIAL_COUNT && !showAll;
    const handleFilter = (id) => { setFilter(id); setShowAll(false); };

    return (
        <section ref={sectionRef} className="relative w-full py-24 px-6 overflow-hidden" style={{ backgroundColor: 'var(--bg-base)', borderTop: '1px solid var(--border-solid)' }}>
            <Blob style={{ width: 500, height: 500, top: -100, left: -150, background: 'rgba(125,42,232,0.07)' }} />
            <Blob style={{ width: 400, height: 400, bottom: 0, right: -100, background: 'rgba(0,217,255,0.05)' }} />
            <Blob style={{ width: 300, height: 300, top: '40%', left: '45%', background: 'rgba(192,38,211,0.04)' }} />
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, rgba(192,38,211,0.12) 1px, transparent 1px)', backgroundSize: '32px 32px', maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)', }} />

            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }} transition={{ type: 'spring', stiffness: 80, damping: 18 }} style={{ marginBottom: 48 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
                        <div>
                            <p className="section-label" style={{ color: 'var(--accent-light)', marginBottom: 10 }}>Selected Work</p>
                            <h2 style={{ fontFamily: 'var(--font-montserrat)', fontSize: 'clamp(2.6rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: 'var(--text-primary)', }}>
                                Projects &amp;{' '}
                                <span className="gradient-text" style={{ fontWeight: 800 }}>Builds</span>
                            </h2>
                        </div>

                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.3 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, }}>
                            <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: '3rem', fontWeight: 900, lineHeight: 1, color: 'rgba(192,38,211,0.15)', letterSpacing: '-0.04em', }}>
                                {String(projects.length).padStart(2, '0')}
                            </span>
                            <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', }}>
                                Total Projects
                            </span>
                        </motion.div>
                    </div>

                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {categories.map(cat => (
                            <motion.button
                                key={cat.id}
                                onClick={() => handleFilter(cat.id)}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                style={{ padding: '7px 18px', borderRadius: 100, fontFamily: 'var(--font-montserrat)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', border: 'none', transition: 'all 0.2s ease', ...(filter === cat.id ? { background: 'linear-gradient(135deg, var(--accent), var(--accent2))', color: '#fff', boxShadow: '0 0 18px rgba(192,38,211,0.35)' } : { background: 'rgba(5,5,12,0.6)', border: '1px solid rgba(192,38,211,0.15)', color: 'var(--text-secondary)' }), }}
                            >
                                {cat.label}
                                <span style={{ marginLeft: 6, fontSize: '0.6rem', opacity: filter === cat.id ? 0.8 : 0.4, }}>
                                    {cat.id === 'all' ? projects.length : projects.filter(p => p.category === cat.id).length}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                <AnimatePresence mode="popLayout">
                    <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {displayed?.map((project, index) => (
                            <ProjectCard key={project?.title} project={project} index={index} />
                        ))}
                    </motion.div>
                </AnimatePresence>

                <AnimatePresence>
                    {(hasMore || showAll) && (
                        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.2 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginTop: 40 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, width: '100%', maxWidth: 400 }}>
                                <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(192,38,211,0.25))' }} />
                                <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', }}>
                                    {showAll ? `All ${filtered.length} shown` : `${INITIAL_COUNT} of ${filtered.length}`}
                                </span>
                                <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(192,38,211,0.25), transparent)' }} />
                            </div>

                            <motion.button
                                onClick={() => setShowAll(v => !v)}
                                whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(192,38,211,0.3)' }}
                                whileTap={{ scale: 0.97 }}
                                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 32px', background: 'rgba(5,5,12,0.7)', border: '1px solid rgba(192,38,211,0.3)', borderRadius: 100, fontFamily: 'var(--font-montserrat)', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-light)', cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'all 0.25s ease', }}
                            >
                                {showAll ? (
                                    <>Show Less <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}>↓</span></>
                                ) : (
                                    <>View All {filtered.length} Projects ↓</>
                                )}
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}