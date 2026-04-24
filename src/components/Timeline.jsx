'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const timelineData = [
    {
        title: 'UI Developer',
        company: 'MAI Corporation',
        date: 'Oct 2024 – Present',
        description: 'Lead frontend development across multiple live products using Next.js, Redux, and Tailwind CSS. Built reusable component libraries and enforced component-driven architecture across all projects. Managed complex application state with structured Redux action/reducer patterns at scale. Handled REST API integrations with robust error handling and clean data flow management. Conducted code reviews ensuring quality and consistency across the development team. Built a centralized Admin Dashboard to manage all company products from a single interface. Designed and developed email templates for all product communications.',
        side: 'right',
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

function TimelineItem({ item, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });
    const isLeft = item.side === 'left';

    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }} transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.05 }} className={`flex items-center gap-6 md:gap-10 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
            {/* Card */}
            <div className="w-full md:w-5/12">
                <motion.div className="glass glass-hover rounded-2xl p-6 space-y-3 cursor-default" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                    {/* Date chip */}
                    <span className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full" style={{ background: 'var(--accent-muted)', color: 'var(--accent-light)', border: '1px solid rgba(96,165,250,0.2)', }}>
                        {item.date}
                    </span>

                    {/* Title */}
                    <h3 className="font-bold text-base md:text-lg leading-snug" style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                        {item.title}
                    </h3>

                    {/* Company */}
                    <p className="text-sm font-semibold" style={{ color: 'var(--accent-light)' }}>
                        {item.company}
                    </p>

                    {/* Description */}
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                        {item.description}
                    </p>
                </motion.div>
            </div>

            {/* Center dot */}
            <motion.div className="hidden md:flex flex-col items-center flex-shrink-0 gap-1" initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : { scale: 0 }} transition={{ type: 'spring', stiffness: 200, delay: 0.15 }}>
                <div className="w-4 h-4 rounded-full z-10" style={{ backgroundColor: 'var(--accent)', boxShadow: '0 0 0 4px rgba(59,130,246,0.2), 0 0 16px rgba(59,130,246,0.4)', }}></div>
            </motion.div>

            {/* Spacer */}
            <div className="hidden md:block w-5/12" />
        </motion.div>
    );
}

export default function Timeline() {
    const headingRef = useRef(null);
    const headingInView = useInView(headingRef, { once: false, amount: 0.4 });

    return (
        <div className="relative w-full overflow-hidden py-24 px-6" style={{ backgroundColor: 'var(--bg-base)' }}>
            {/* Background accent */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 70% 30%, rgba(59,130,246,0.05) 0%, transparent 70%)', }}></div>

            {/* Header */}
            <motion.div ref={headingRef} initial={{ opacity: 0, y: -24 }} animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }} transition={{ type: 'spring', stiffness: 80, damping: 18 }} className="relative z-10 text-center mb-20 max-w-2xl mx-auto">
                <p className="section-label mb-4">My Journey</p>
                <h2 className="section-heading">
                    Experience &amp;{' '}
                    <span style={{ background: 'linear-gradient(135deg, #fff 0%, var(--accent-light) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', }}>
                        Education
                    </span>
                </h2>
            </motion.div>

            {/* Timeline Container */}
            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Central spine — desktop */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block" style={{ background: 'linear-gradient(180deg, transparent, rgba(59,130,246,0.3) 20%, rgba(59,130,246,0.3) 80%, transparent)', }}></div>

                <div className="space-y-12 md:space-y-16">
                    {timelineData.map((item, index) => (
                        <TimelineItem key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}