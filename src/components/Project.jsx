'use client';
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from 'next/image';
import { useRouter } from "next/navigation";
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

const projects = [
    {
        title: 'Homura - 3D Kitchen ',
        description: `Using Three.js allowed me to leverage WebGL's power directly in the browser-no plugins neccessary-while Next.js ensures every user enjoys fast SSR rendering and a smooth experience.`,
        image: Homura,
        url: 'https://3d-kitchen-nu.vercel.app/',
        category: 'fullstack',
        tags: ['React', 'Next.js', 'Framer', 'Three.js', '3D'],
    },
    {
        title: 'Builderkit',
        description: `It's an email template builder designed to make the entire email workflow feel effortless — from first draft to inbox delivery. The goal was simple: stop jumping between 5 different tools just to send one email. BuilderKit brings everything into one clean, fast interface.`,
        image: Builderkit,
        url: 'https://builder-kit-six.vercel.app/',
        category: 'fullstack',
        tags: ['React', 'Next.js', 'Resend'],
    },
    {
        title: 'Myproject.ai',
        description: `Is an internal project management platform developed at MAI Corporation to streamline job postings, candidate applications, and workflow tracking. It provides dynamic dashboards, real-time updates, and analytics to improve efficiency and decision-making within the organization.`,
        image: Myproject,
        url: 'https://myproject.ai/',
        category: 'front-end',
        tags: ['Next.js', 'Redux', 'Tailwind', "Framer-motion", 'Reusable Components'],
    },
    {
        title: 'Dragon Customer',
        description: `Is a customer engagement and management platform designed to streamline client interactions, track customer data, and improve business communication. It offers tools for managing customer relationships, monitoring activities, and enhancing overall customer experience through a centralized system.`,
        image: Dragon,
        url: 'http://dragoncustomer.com/',
        category: 'front-end',
        tags: ['Next.js', 'Tailwind', "Framer-motion", 'Reusable Components'],
    },
    {
        title: 'Torque Grid',
        description: 'Interactive web experience showcasing JDM and old-school cars with modern UI/UX design.',
        image: Torque,
        url: 'https://incomparable-methods-180972.framer.app/',
        category: 'design',
        tags: ['Framer', 'UI/UX', 'Web Design'],
    },
    {
        title: 'Anime World',
        description: 'Responsive website for anime enthusiasts with a visually appealing platform. Through this project, I explored design systems, animation principles, and user-centered experiences, refining my skills in creating immersive digital products.',
        image: Anime,
        url: 'https://energized-tone-070547.framer.app/',
        category: 'design',
        tags: ['Framer', 'Responsive', 'UI Design'],
    },
    {
        title: 'CV.io',
        description: 'Modern resume and CV builder platform with a sleek, intuitive interface.',
        image: CV,
        url: 'https://resume-builder-client-lhlq.onrender.com/',
        category: 'fullstack',
        tags: ['React', 'Node.js', 'MongoDB'],
    },
    {
        title: 'DO-IT | Tasks',
        description: 'ToDo application is ideal for individuals looking to manage their personal tasks, work assignments, and long-term goals efficiently, with the added benefit of tracking important events and milestones in one consolidated platform.',
        image: DOIT,
        url: 'https://do-it-ui.onrender.com/',
        category: 'fullstack',
        tags: ['React', 'Express', 'UI'],
    },
    {
        title: 'E-Course',
        description: 'Online learning management system with interactive educational components.',
        image: Ecourse,
        url: 'https://e-learning-website-client.onrender.com/',
        category: 'fullstack',
        tags: ['MERN', 'EdTech', 'Responsive'],
    },
    {
        title: 'Job Land',
        description: 'Dynamic job marketplace connecting candidates with employers.',
        image: JobPortal,
        url: 'https://job-land-frontend.onrender.com/',
        category: 'fullstack',
        tags: ['Full Stack', 'Job Portal'],
    },
];

const categories = [
    { id: 'all', label: 'All' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'design', label: 'Design' },
    { id: 'front-end', label: 'Front-end' },
];

export default function Project() {
    const containerRef = useRef(null);
    const router = useRouter();
    const [filter, setFilter] = useState('all');
    const [hovered, setHovered] = useState(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.15 });

    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    return (
        <section ref={containerRef} className="relative w-full py-24 px-6 overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
            {/* Background accent */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 20% 50%, rgba(59,130,246,0.05) 0%, transparent 70%)', }}></div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: -24 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }} transition={{ type: 'spring', stiffness: 80, damping: 18 }} className="mb-12 space-y-4">
                    <p className="section-label">Selected Work</p>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <h2 className="section-heading">
                            Projects &amp;{' '}
                            <span style={{ background: 'linear-gradient(135deg, #fff 0%, var(--accent-light) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', }}>
                                Builds
                            </span>
                        </h2>

                        {/* Filter pills */}
                        <div className="flex gap-2 flex-wrap">
                            {categories.map(cat => (
                                <motion.button key={cat.id} onClick={() => setFilter(cat.id)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }} className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200" style={filter === cat.id ? { background: 'var(--accent)', color: '#fff', boxShadow: '0 0 20px rgba(59,130,246,0.35)', } : { background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'var(--text-secondary)', }}>
                                    {cat.label}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Project grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((project, index) => (
                        <motion.div key={project.title} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }} transition={{ type: 'spring', stiffness: 70, damping: 18, delay: index * 0.07 }} onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)} className="group cursor-pointer">
                            <motion.div className="glass rounded-2xl overflow-hidden h-full flex flex-col" style={{ transition: 'box-shadow 0.25s ease, transform 0.25s ease', boxShadow: hovered === index ? '0 0 0 1px rgba(96,165,250,0.5), 0 0 40px rgba(59,130,246,0.15), inset 0 1px 0 rgba(96,165,250,0.3)' : '0 0 0 1px var(--border)', transform: hovered === index ? 'scale(1.02) translateY(-4px)' : 'scale(1)', }}>
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden bg-zinc-900">
                                    <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(9,9,11,0.8) 0%, transparent 50%)', }}></div>
                                    {/* Category chip */}
                                    <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: 'rgba(9,9,11,0.7)', backdropFilter: 'blur(8px)', border: '1px solid var(--border)', color: 'var(--text-secondary)', }}>
                                        {project.category}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-5 flex flex-col gap-3">
                                    <h3 className="font-bold text-lg leading-snug" style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                                        {project.title}
                                    </h3>

                                    <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: 'var(--text-muted)', }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }} onClick={() => router.push(project.url)} className="w-full py-2.5 rounded-xl text-sm font-semibold mt-1" style={{ background: hovered === index ? 'var(--accent)' : 'rgba(255,255,255,0.05)', border: `1px solid ${hovered === index ? 'var(--accent)' : 'var(--border)'}`, color: hovered === index ? '#fff' : 'var(--text-secondary)', transition: 'all 0.2s ease', }}>
                                        View Project →
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty state */}
                {filtered.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20" style={{ color: 'var(--text-muted)' }}>
                        <p className="text-lg">No projects in this category yet.</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}