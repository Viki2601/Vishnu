'use client';
import { motion } from "framer-motion";
import { useRef } from "react";
import Image from 'next/image';

import Anime from '@/assets/projects/Anime.png';
import CV from '@/assets/projects/CV.io.png';
import DOIT from '@/assets/projects/DO-IT.png';
import Ecourse from '@/assets/projects/E-course.png';
import JobPortal from '@/assets/projects/Job-Portal.png';
import Portfolio from '@/assets/projects/portfolio.png';
import Torque from '@/assets/projects/Torque.png';
import { useRouter } from "next/navigation";

export default function Project() {
    const containerRef = useRef(null);
    const router = useRouter();

    const projects = [
        {
            title: 'Torque Grid',
            description: 'I designed and developed an interactive web experience focused on showcasing a curated collection of JDM (Japanese Domestic Market) and old-school cars. The primary goal was to create a visually compelling and emotionally engaging interface for car enthusiasts, while following modern UI/UX design principles.',
            image: Torque,
            url: 'https://incomparable-methods-180972.framer.app/',
        },
        {
            title: 'Anime World',
            description: 'Anime World is a fully responsive website designed to provide anime enthusiasts with a visually appealing platform to explore and engage with their favorite shows. The website is crafted with a focus on modern UI/UX principles, ensuring an intuitive and engaging user experience.',
            image: Anime,
            url: 'https://energized-tone-070547.framer.app/',
        },
        {
            title: 'CV.io',
            description: 'CV.io is a modern and user-friendly platform designed to help individuals create professional resumes and CVs with ease. The website features a sleek and intuitive interface, allowing users to input their information and customize their documents effortlessly.',
            image: CV,
            url: 'https://resume-builder-client-lhlq.onrender.com/',
        },
        {
            title: 'DO-IT | Activities tracker',
            description: 'ToDO application is ideal for individuals looking to manage their personal tasks, work assignments, and long-term goals efficiently, with the added benefit of tracking important events and milestones in one consolidated platform.',
            image: DOIT,
            url: 'https://do-it-ui.onrender.com/',
        },
        {
            title: 'E-Course | Online Learning Platform',
            description: 'Created an online learning management system to facilitate remote education and training. Key UX principles are adhered to, with interactive elements such as buttons and checkboxes that provide immediate visual feedback.',
            image: Ecourse,
            url: 'https://e-learning-website-client.onrender.com/',
        },
        {
            title: 'Job Land',
            description: 'Job Land is a dynamic platform that connects job seekers with employers. The website features advanced search capabilities, allowing users to find job listings that match their skills and preferences easily.',
            image: JobPortal,
            url: 'https://job-land-frontend.onrender.com/',
        },
        {
            title: 'Portfolio by UI/UX Design',
            description: "One of my portfolio which was developed by using Framer, and it show's my skills in Designing and Learning tech tools adequately and fast-paced. It's a complete responsive across various devices.",
            image: Portfolio,
            url: 'https://vishnu-muthukumar.framer.ai/',
        },
    ];

    return (
        <section ref={containerRef} className="w-full">
            <h1 className='p-10 bg-clip-text font-extrabold tracking-tighter text-transparent bg-gradient-to-r from-stone-300 to-stone-800 text-2xl lg:text-7xl'>
                Projects
            </h1>

            {projects.map((project, index) => (
                <div
                    key={index}
                    className={`grid grid-cols-1 md:grid-cols-2 gap-4 px-4 sm:px-10 py-6 items-center`}
                >
                    {index % 2 === 0 ? (
                        <>
                            {/* Content Left */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="backdrop-blur-2xl bg-cyan-800/20 text-white/80 rounded-3xl p-6 sm:p-12 space-y-4 shadow-xl"
                            >
                                <h1 className="text-3xl sm:text-6xl font-bold leading-tight">
                                    {`"${project.title}"`}
                                </h1>
                                <p className="text-xl sm:text-2xl font-bold">
                                    {project.description}
                                </p>
                                <button onClick={() => router.push(project.url)} className="cursor-pointer py-1 px-10 border rounded-2xl my-5">View Live</button>
                            </motion.div>

                            {/* Image Right */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1}}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="rounded-3xl overflow-hidden shadow-xl sticky top-10 h-fit self-start"
                            >
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    className="object-cover w-full h-fit"
                                    priority
                                />
                            </motion.div>
                        </>
                    ) : (
                        <>
                            {/* Image Left */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="rounded-3xl overflow-hidden shadow-xl sticky top-10 h-fit self-start"
                            >
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    className="object-cover w-full h-fit"
                                    priority
                                />
                            </motion.div>

                            {/* Content Right */}
                            <motion.div
                                initial={{ opacity: 0}}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="backdrop-blur-2xl bg-cyan-800/20 text-white/80 rounded-3xl p-6 sm:p-12 space-y-4 shadow-xl"
                            >
                                <h1 className="text-3xl sm:text-6xl font-bold leading-tight">
                                    {`"${project.title}"`}
                                </h1>
                                <p className="text-xl sm:text-2xl font-bold">
                                    {project.description}
                                </p>
                                <button onClick={() => router.push(project.url)} className="cursor-pointer py-1 px-10 border rounded-2xl my-5">View Live</button>
                            </motion.div>
                        </>
                    )}
                </div>
            ))}
        </section>
    );
}
