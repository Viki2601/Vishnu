'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Anime from '@/assets/projects/Anime.png';
import CV from '@/assets/projects/CV.io.png';
import DOIT from '@/assets/projects/DO-IT.png';
import Ecourse from '@/assets/projects/E-course.png';
import JobPortal from '@/assets/projects/Job-Portal.png';
import Homura from '@/assets/projects/Homura.png';
import Torque from '@/assets/projects/Torque.png';
import Builderkit from '@/assets/projects/BuilderKit.png';
import Dragon from '@/assets/projects/DC.png';
import Myproject from '@/assets/projects/MAI.png';
import Verdana from '@/assets/projects/Verdana.png';

const projects = [
    { title: 'Verdana - Nature Retreats', description: "A modern interactive web experience showcasing creative design, smooth animations, and high-performance frontend development with a focus on user engagement and visual storytelling.", image: Verdana, url: 'https://verdana-three.vercel.app/', category: 'front-end', tags: ['React', 'Next.js', 'Framer', 'Tailwind', 'Responsive'] },
    { title: 'Homura - 3D Kitchen', description: "Leverages Three.js WebGL power directly in the browser with Next.js SSR rendering — no plugins necessary, smooth 3D experience for every user.", image: Homura, url: 'https://homura-kitchen.vercel.app/', category: 'fullstack', tags: ['React', 'Next.js', 'Framer', 'Three.js', '3D'] },
    { title: 'Builderkit', description: "Email template builder that makes the entire workflow effortless — from first draft to inbox delivery. One clean, fast interface replacing five tools.", image: Builderkit, url: 'https://builder-kit-six.vercel.app/', category: 'fullstack', tags: ['React', 'Next.js', 'Resend'] },
    { title: 'Myproject?.ai', description: "Internal project management platform at MAI Corporation — job postings, candidate tracking, dynamic dashboards, real-time updates, and analytics.", image: Myproject, url: 'https://myproject?.ai/', category: 'front-end', tags: ['Next.js', 'Redux', 'Tailwind', 'Framer Motion'] },
    { title: 'Dragon Customer', description: "Customer engagement and management platform — client interactions, activity monitoring, CRM tools, and a centralized communication hub.", image: Dragon, url: 'http://dragoncustomer.com/', category: 'front-end', tags: ['Next.js', 'Tailwind', 'Framer Motion'] },
    { title: 'Torque Grid', description: 'Interactive web experience showcasing JDM and old-school cars with modern UI/UX design principles.', image: Torque, url: 'https://incomparable-methods-180972.framer.app/', category: 'design', tags: ['Framer', 'UI/UX', 'Web Design'] },
    { title: 'Anime World', description: 'Responsive website for anime enthusiasts — design systems, animation principles, and user-centered experiences with immersive visuals.', image: Anime, url: 'https://energized-tone-070547.framer.app/', category: 'design', tags: ['Framer', 'Responsive', 'UI Design'] },
    { title: 'CV.io', description: 'Modern resume and CV builder platform with a sleek, intuitive interface for creating professional documents.', image: CV, url: 'https://resume-builder-client-lhlq.onrender.com/', category: 'fullstack', tags: ['React', 'Node.js', 'MongoDB'] },
    { title: 'DO-IT | Tasks', description: 'Task management app for personal tasks, work assignments, and long-term goals with milestone tracking.', image: DOIT, url: 'https://do-it-ui.onrender.com/', category: 'fullstack', tags: ['React', 'Express', 'UI'] },
    { title: 'E-Course', description: 'Online learning management system with interactive educational components and responsive design.', image: Ecourse, url: 'https://e-learning-website-client.onrender.com/', category: 'fullstack', tags: ['MERN', 'EdTech', 'Responsive'] },
    { title: 'Job Land', description: 'Dynamic job marketplace connecting candidates with employers — full-stack portal with live listings.', image: JobPortal, url: 'https://job-land-frontend.onrender.com/', category: 'fullstack', tags: ['Full Stack', 'Job Portal'] },
];

const categories = [
    { id: 'all', label: 'All' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'design', label: 'Design' },
    { id: 'front-end', label: 'Front-end' },
];

export default function Project() {
    const containerRef = useRef(null);
    const [filter, setFilter] = useState('all');
    const [hovered, setHovered] = useState(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.1 });
    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    return (
        <section ref={containerRef} className="relative w-full py-24 px-6 overflow-hidden" style={{ backgroundColor: 'var(--bg-base)', borderTop: '1px solid var(--border-solid)' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 15% 50%, rgba(232,103,58,0.04) 0%, transparent 70%)', }} />
            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div initial={{ opacity: 0, y: -24 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }} transition={{ type: 'spring', stiffness: 80, damping: 18 }} className="mb-12 space-y-4">
                    <p className="section-label">Selected Work</p>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.06, color: 'var(--text-primary)', }}>
                            Projects &amp; <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Builds</em>
                        </h2>

                        <div className="flex gap-2 flex-wrap">
                            {categories?.map(cat => (
                                <motion.button key={cat?.id} onClick={() => setFilter(cat?.id)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} style={{ padding: '7px 18px', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-dm-mono)', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', border: 'none', transition: 'all 0.2s ease', ...(filter === cat?.id ? { background: 'var(--accent)', color: '#fff', boxShadow: '0 0 20px rgba(232,103,58,0.3)' } : { background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'var(--text-secondary)' }), }}>
                                    {cat?.label}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered?.map((project, index) => (
                        <motion.div key={project?.title} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ type: 'spring', stiffness: 70, damping: 18, delay: index * 0.06 }} onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)} className="group cursor-pointer">
                            <motion.div className="glass overflow-hidden h-full flex flex-col" style={{ borderRadius: 'var(--radius-md)', transition: 'box-shadow 0.25s ease, transform 0.25s ease', boxShadow: hovered === index ? '0 0 0 1px rgba(232,103,58,0.45), 0 0 40px rgba(232,103,58,0.12), inset 0 1px 0 rgba(232,103,58,0.2)' : '0 0 0 1px var(--border)', transform: hovered === index ? 'scale(1.018) translateY(-3px)' : 'scale(1)', }}>
                                <div className="relative h-48 overflow-hidden" style={{ background: '#111' }}>
                                    <Image src={project?.image} alt={project?.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 50%)' }} />
                                    <span style={{ position: 'absolute', top: 12, right: 12, fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 10px', background: 'rgba(10,10,10,0.75)', backdropFilter: 'blur(8px)', border: '1px solid var(--border)', color: 'var(--text-secondary)', borderRadius: 'var(--radius-sm)', }}>
                                        {project?.category}
                                    </span>
                                </div>

                                <div className="flex-1 p-5 flex flex-col gap-3">
                                    <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                                        {project?.title}
                                    </h3>
                                    <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65, flex: 1 }}>
                                        {project?.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {project?.tags.map(tag => (
                                            <span key={tag} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', padding: '2px 8px', letterSpacing: '0.07em', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: 'var(--radius-sm)', }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <a href={project?.url} target="_blank" rel="noopener noreferrer"
                                        style={{ display: 'block', textAlign: 'center', padding: '9px', fontFamily: 'var(--font-dm-mono)', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 'var(--radius-sm)', marginTop: 4, background: hovered === index ? 'var(--accent)' : 'rgba(255,255,255,0.04)', border: `1px solid ${hovered === index ? 'var(--accent)' : 'var(--border)'}`, color: hovered === index ? '#fff' : 'var(--text-secondary)', transition: 'all 0.2s ease', }}>
                                        View Project →
                                    </a>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}