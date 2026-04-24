'use client';
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import certificate1 from "../assets/certificate/Web-Developer.jpeg";
import certificate2 from "@/assets/certificate/UI-UX.jpg";
import certificate3 from "@/assets/certificate/Full-stack-web.jpg";

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 18 } },
};

const certificateData = [
    {
        title: 'Web Developer Internship',
        technologies: 'MongoDB · Express.js · React.js · Node.js · Tailwind CSS',
        institute: 'Zidio Development',
        logo: 'https://media.licdn.com/dms/image/v2/D560BAQF0RBuLfWnchw/company-logo_200_200/company-logo_200_200/0/1718162647855/zidio_development_logo?e=1733356800&v=beta&t=0iZrwUMjKSFrddcSYNNCcq1PM6l8it3fQOXr6rdroGg',
        certi_img: certificate1,
    },
    {
        title: 'UI/UX Design with Figma',
        technologies: 'Figma · User Interface Design · Design Systems · Plugins',
        institute: 'Udemy',
        logo: 'https://media.licdn.com/dms/image/v2/D560BAQEf_NHzN2yVQg/company-logo_200_200/company-logo_200_200/0/1723593046388/udemy_logo?e=1733356800&v=beta&t=1_eSRQycJSag4YvdeZ8xBpyYq-_EBsJJ5jvE-cTkid0',
        certi_img: certificate2,
    },
    {
        title: 'Full Stack Web Development',
        technologies: 'Java · HTML5 · CSS3 · JavaScript · SQL · J2EE',
        institute: 'QSpiders Technology',
        logo: 'https://media.licdn.com/dms/image/v2/C4D0BAQGy1pEeaWGE-w/company-logo_200_200/company-logo_200_200/0/1654164498650/qspiders_logo?e=1733356800&v=beta&t=IktNnITceTFRDDyZM_hrsebVpNVBCmpekOnpyMJ8Ido',
        certi_img: certificate3,
    },
];

export default function Certificates() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
    const [hovered, setHovered] = useState(null);

    return (
        <section ref={sectionRef} className="relative min-h-screen flex items-center w-full py-24 px-6 overflow-hidden" style={{ backgroundColor: 'var(--bg-base)' }}>
            {/* Background accent */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(59,130,246,0.05) 0%, transparent 70%)', }} />

            <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
                {/* Left — Heading */}
                <motion.div initial={{ opacity: 0, x: -40 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }} transition={{ type: 'spring', stiffness: 70, damping: 18 }} className="flex flex-col gap-6">
                    <p className="section-label">Credentials</p>
                    <h2 className="section-heading">
                        Professional{' '}
                        <span style={{ background: 'linear-gradient(135deg, #fff 0%, var(--accent-light) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', }}>
                            Certificates
                        </span>
                    </h2>
                    <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                        Certified in modern web technologies and design — a commitment to continuous learning and professional growth.
                    </p>

                    {/* Decorative accent line */}
                    <div className="w-20 h-1 rounded-full" style={{ background: 'linear-gradient(90deg, var(--accent), transparent)' }} />
                </motion.div>

                {/* Right — Cards */}
                <motion.div variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="flex flex-col gap-5">
                    {certificateData.map((cert, index) => (
                        <motion.div key={index} variants={itemVariants} onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)} className="glass rounded-2xl overflow-hidden cursor-default" style={{ transition: 'box-shadow 0.25s ease, transform 0.25s ease', boxShadow: hovered === index ? '0 0 0 1px rgba(96,165,250,0.45), 0 0 28px rgba(59,130,246,0.2)' : '0 0 0 1px var(--border)', transform: hovered === index ? 'scale(1.02)' : 'scale(1)', }}>
                            <div className="flex gap-4 items-start p-5">
                                {/* Thumbnail */}
                                <div className="flex-shrink-0 w-24 h-20 md:w-28 md:h-22 relative rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                                    <Image src={cert.certi_img} alt={cert.title} fill className="object-cover" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0 space-y-2">
                                    <h3 className="font-bold text-sm md:text-base leading-snug" style={{ color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                                        {cert.title}
                                    </h3>

                                    {/* Institute chip */}
                                    <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full" style={{ background: 'var(--accent-muted)', color: 'var(--accent-light)', border: '1px solid rgba(96,165,250,0.2)', }}>
                                        {cert.institute}
                                    </span>

                                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                        {cert.technologies}
                                    </p>
                                </div>
                            </div>

                            {/* Bottom highlight line on hover */}
                            <div className="h-px w-full" style={{ background: hovered === index ? 'linear-gradient(90deg, var(--accent), transparent)' : 'transparent', transition: 'background 0.3s ease', }} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}