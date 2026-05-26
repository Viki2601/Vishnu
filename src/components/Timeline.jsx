'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const timelineData = [
    {
        title: 'UI Developer',
        company: 'MAI Corporation',
        date: 'Oct 2024 – Present',
        description: 'Lead frontend development across multiple live products using Next.js, Redux, and Tailwind CSS. Built reusable component libraries, managed complex Redux state at scale, handled REST API integrations, conducted code reviews, and built a centralized Admin Dashboard across all company products.',
        side: 'right',
        current: true,
    },
    {
        title: 'Web Developer Intern',
        company: 'Zidio Development',
        date: 'May 2024 – Aug 2024',
        description: 'Completed internship with the MERN stack (MongoDB, Express.js, React, Node.js) and developed three production-ready projects.',
        side: 'left',
    },
    {
        title: 'Full Stack Web Development',
        company: 'QSpiders Technology',
        date: 'Jan 2023 – Dec 2023',
        description: 'Comprehensive training in Full Stack Web Development — gained the skills to build dynamic, responsive web applications.',
        side: 'right',
    },
    {
        title: 'Quality Engineer',
        company: 'Caterpillar Inc.',
        date: 'Oct 2021 – Oct 2022',
        description: 'Quality control, inspections, and industry compliance. Awarded the Quality Trophy for reducing defects and improving product standards.',
        side: 'left',
    },
    {
        title: 'After Marketing',
        company: 'Wabco Pvt. Ltd.',
        date: 'Aug 2020 – Jul 2021',
        description: 'Aftermarket Management Team — supply chain optimisation and improving customer satisfaction metrics.',
        side: 'right',
    },
    {
        title: 'Diploma in Mechanical Engineering',
        company: 'Murugappa Polytechnic College',
        date: 'Jul 2017 – Aug 2020',
        description: 'First-Class Distinction. Strong foundation in thermodynamics, machine design, and engineering principles.',
        side: 'left',
    },
];

function TimelineItem({ item }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });
    const isLeft = item?.side === 'left';

    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }} transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.05 }} className={`flex items-center gap-6 md:gap-10 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
            <div className="w-full md:w-5/12">
                <motion.div className="glass glass-hover p-6 space-y-3 cursor-default" style={{ borderRadius: 'var(--radius-md)' }} whileHover={{ scale: 1.015 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                    <span style={{ display: 'inline-block', fontFamily: 'var(--font-dm-mono)', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 12px', background: 'var(--accent-muted)', color: 'var(--accent)', border: '1px solid rgba(232,103,58,0.25)', borderRadius: 'var(--radius-sm)', }}>
                        {item?.date}
                    </span>
                    {item?.current && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-dm-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: '#4ade80', marginLeft: 8, }}>
                            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80', display: 'inline-block' }} />
                            Current
                        </span>
                    )}

                    <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em', }}>
                        {item?.title}
                    </h3>

                    <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.78rem', color: 'var(--accent)', letterSpacing: '0.04em' }}>
                        {item?.company}
                    </p>

                    <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        {item?.description}
                    </p>
                </motion.div>
            </div>
            <motion.div className="hidden md:flex flex-col items-center flex-shrink-0" initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : { scale: 0 }} transition={{ type: 'spring', stiffness: 200, delay: 0.15 }}>
                <div className="w-4 h-4 rounded-full z-10" style={{ backgroundColor: 'var(--accent)', boxShadow: '0 0 0 4px rgba(232,103,58,0.18), 0 0 16px rgba(232,103,58,0.4)', }} />
            </motion.div>
            <div className="hidden md:block w-5/12" />
        </motion.div>
    );
}

export default function Timeline() {
    const headingRef = useRef(null);
    const headingInView = useInView(headingRef, { once: false, amount: 0.4 });

    return (
        <div className="relative w-full overflow-hidden py-24 px-6" style={{ backgroundColor: 'var(--bg-base)', borderTop: '1px solid var(--border-solid)' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 70% 30%, rgba(232,103,58,0.05) 0%, transparent 70%)', }} />

            <motion.div ref={headingRef} initial={{ opacity: 0, y: -24 }} animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }} transition={{ type: 'spring', stiffness: 80, damping: 18 }} className="relative z-10 text-center mb-20 max-w-2xl mx-auto">
                <div className="flex justify-center mb-4">
                    <p className="section-label">My Journey</p>
                </div>
                <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.06, color: 'var(--text-primary)', }}>
                    Experience &amp;{' '}
                    <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Education</em>
                </h2>
            </motion.div>

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block" style={{ background: 'linear-gradient(180deg, transparent, rgba(232,103,58,0.3) 20%, rgba(232,103,58,0.3) 80%, transparent)', }} />
                <div className="space-y-12 md:space-y-16">
                    {timelineData?.map((item, index) => (
                        <TimelineItem key={index} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}