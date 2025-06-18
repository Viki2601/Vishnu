'use client';
import StarsAndMeteors from "@/common/StarField";
import { motion } from "framer-motion";

export default function Timeline() {
    const timelineData = [
        {
            title: 'UI Developer - Executive',
            company: 'MAI - Corporation',
            date: 'Oct 2024 - Present',
            description: `MAI, where I am actively expanding my technical expertise and demonstrating my skills across a range of innovative technologies such as Shopify, Blogin, Multivendor, Zoho products, Etc. Other than these MAI's had a different and lot of technologies that makes me to Expert in this Field.`,
        },
        {
            title: 'Web Developer Intern',
            company: 'Zidio Development',
            date: 'May 2024 - Aug 2024',
            description: `I have successfully completed my web development internship at Zidio Development! During that three months, I've had the opportunity to work with the MERN stack (MongoDB, Express.js, React, and Node.js) and have developed three exciting projects.`,
        },
        {
            title: 'Full Stack Web Development Training',
            institution: 'QSpiders Technology',
            date: 'January 2023 - December 2023',
            description: `I have successfully completed a comprehensive Full Stack Web Development course at QSpiders Institute! This journey has been incredibly rewarding, providing me with the skills and knowledge to build dynamic and responsive web applications from scratch.`,
        },
        {
            title: 'Quality Engineer',
            company: 'Caterpillar Inc',
            date: 'October 2021 - October 2022',
            description: `Worked as a Quality Engineer at Caterpillar Pvt. Ltd., focusing on quality control, inspections, and industry compliance. Gained hands-on experience with MS Office for data analysis and reporting. Awarded the Quality Trophy for significantly reducing defects and improving product quality.`,
        },
        {
            title: 'After Marketing',
            company: 'Wabco Pvt, Ltd',
            date: 'August 2020 - July 2021',
            description: 'Worked at Wabco Pvt. Ltd. in the Aftermarket Management Team, focusing on supply chain optimization and customer satisfaction. Gained foundational experience in SAP and enterprise process management.',
        },
        {
            title: 'Diploma in Mechanical Engineering',
            institution: 'Murugappa Polytechnic College',
            date: 'July 2017 - August 2020',
            description: `Graduated with a Diploma in Mechanical Engineering with First-Class Distinction. Gained strong foundational knowledge in thermodynamics, fluid mechanics, and machine design, along with hands-on skills in technical drawing and problem-solving.`,
        },
    ];

    return (
        <div className='relative z-10 w-full'>
            <div className="flex flex-col-reverse md:flex-row w-full">
                {/* Left Sticky Section */}
                <div className="w-full md:w-2/5 h-[56vh] md:h-screen flex flex-col items-center justify-center space-y-5 sticky bottom-0 md:top-0 rounded-t-full md:rounded-t-none md:rounded-r-full p-6 bg-gradient-to-t lg:bg-gradient-to-l from-[#0f0c29] via-[#24243e] to-[#303b63]">
                    <h1 className='bg-clip-text font-extrabold tracking-tighter text-transparent bg-gradient-to-r from-stone-300 to-stone-800 text-2xl lg:text-7xl'>Education & Experience</h1>
                </div>

                <StarsAndMeteors />

                {/* Right Scrolling Section */}
                <div className="w-full md:w-3/5 space-y-16 md:space-y-24 p-6 md:p-10">
                    {timelineData.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col justify-center items-center h-[70vh] space-y-4 text-center"
                        >
                            <div className="bg-clip-text font-extrabold tracking-tighter text-transparent bg-gradient-to-r from-stone-300 to-stone-800 text-2xl lg:text-5xl">
                                {item.title}
                            </div>
                            <p className="bg-clip-text text-transparent bg-gradient-to-r from-stone-300 to-stone-800 font-semibold text-xl">
                                {item.company} - {item.date}
                            </p>
                            <p className="bg-clip-text text-transparent italic tracking-widest bg-gradient-to-r from-stone-300 to-stone-500 text-lg max-w-3xl">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}