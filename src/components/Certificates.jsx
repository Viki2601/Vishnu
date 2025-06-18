'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import certificate1 from "../assets/certificate/Web-Developer.jpeg";
import certificate2 from "@/assets/certificate/UI-UX.jpg";
import certificate3 from "@/assets/certificate/Full-stack-web.jpg";
export default function Certificates() {

    const certificateData = [
        {
            title: 'Web Developer Internship',
            Technologies_Learned: 'MongoDB, Express.js, React.js, Node.js, Tailwind CSS.',
            institue: 'Zidio Developement',
            logo: 'https://media.licdn.com/dms/image/v2/D560BAQF0RBuLfWnchw/company-logo_200_200/company-logo_200_200/0/1718162647855/zidio_development_logo?e=1733356800&v=beta&t=0iZrwUMjKSFrddcSYNNCcq1PM6l8it3fQOXr6rdroGg',
            certi_img: certificate1
        },
        {
            title: 'UI/UX Design with Figma',
            Technologies_Learned: 'Figma Software, User Interface Design, Plugins.',
            institue: 'Udemy',
            logo: 'https://media.licdn.com/dms/image/v2/D560BAQEf_NHzN2yVQg/company-logo_200_200/company-logo_200_200/0/1723593046388/udemy_logo?e=1733356800&v=beta&t=1_eSRQycJSag4YvdeZ8xBpyYq-_EBsJJ5jvE-cTkid0',
            certi_img: certificate2
        },
        {
            title: 'Full Stack Web Development',
            Technologies_Learned: 'Java, HTML5, CSS3, Javascript, SQL, J2EE.',
            institue: 'Qspiders technology',
            logo: 'https://media.licdn.com/dms/image/v2/C4D0BAQGy1pEeaWGE-w/company-logo_200_200/company-logo_200_200/0/1654164498650/qspiders_logo?e=1733356800&v=beta&t=IktNnITceTFRDDyZM_hrsebVpNVBCmpekOnpyMJ8Ido',
            certi_img: certificate3
        },
    ];
    return (
        <section className="relative min-h-screen flex items-center w-full font-urbanist py-16 px-4 sm:px-6 lg:px-10">
            <div className="w-full grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <h1 className='bg-clip-text font-extrabold tracking-tighter text-transparent bg-gradient-to-r from-stone-300 to-stone-800 text-2xl lg:text-7xl'>Certificates</h1>
                </div>

                {/* Image Cards */}
                <motion.div
                    className="relative flex flex-col md:gap-4 gap-6 md:h-[500px]"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Mobile Stack */}
                    <div className="flex flex-col gap-6 md:hidden">
                        {certificateData.map((cert, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -10 }}
                                className="backdrop-blur-2xl bg-cyan-800/20 p-4 rounded-2xl shadow-xl flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5"
                            >
                                <Image src={cert.certi_img} alt={cert.title} width={300} height={200} className="rounded-xl object-cover" />
                                <div className="flex flex-col justify-center">
                                    <h3 className="text-2xl sm:text-3xl font-bold text-stone-300">{cert.title}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{cert.Technologies_Learned}</p>
                                    <p className="text-sm text-gray-500 mt-1">By {cert.institue}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Desktop Absolute Stack */}
                    <div className="hidden md:block relative h-full">
                        {certificateData.map((cert, index) => (
                            <motion.div
                                whileHover={{ y: -30 }}
                                className={`backdrop-blur-2xl bg-cyan-800/20 p-4 rounded-2xl shadow-xl absolute w-full flex space-x-5 ${index === 0 ? "top-0" : ""} ${index === 1 ? "top-[11rem]" : ""} ${index === 2 ? "top-[22rem]" : ""}`} >
                                <Image src={cert.certi_img} alt={cert.title} width={300} height={200} className="rounded-xl object-cover" />
                                <div className="flex flex-col justify-center">
                                    <h3 className="text-3xl font-bold text-white mt-3">{cert.title}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{cert.Technologies_Learned}</p>
                                    <p className="text-sm text-gray-500 mt-1">By {cert.institue}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
