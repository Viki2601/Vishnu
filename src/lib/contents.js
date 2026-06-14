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
import certificate1 from '../assets/certificate/Web-Developer.jpeg';
import certificate2 from '@/assets/certificate/UI-UX.jpg';
import certificate3 from '@/assets/certificate/Full-stack-web.jpg';

export const services = [
    {
        num: '01',
        name: 'Landing Page',
        desc: 'Conversion-focused, animated, pixel-perfect. Delivered in 5–7 days with mobile-first responsive design.',
        price: 'From $99',
        note: '~₹8,000',
        tags: ['Next.js', 'Framer Motion', 'Responsive'],
        previews: [Builderkit, Torque, Anime],
    },
    {
        num: '02',
        name: 'UI Component Pack',
        desc: 'A set of reusable, styled components for your product — buttons, forms, cards, modals, and more.',
        price: 'From $149',
        note: '~₹12,500',
        tags: ['React', 'Tailwind', 'Design System'],
        previews: [Myproject, Dragon, CV],
    },
    {
        num: '03',
        name: 'Full Web App UI',
        desc: 'End-to-end frontend — all screens, states, transitions, and responsive behaviour. Production-ready.',
        price: 'From $349',
        note: '~₹29,000',
        tags: ['MERN', 'Redux', 'Full Stack'],
        previews: [Homura, Myproject, Dragon],
    },
    {
        num: '04',
        name: 'Animation Sprint',
        desc: 'Bring your existing UI to life with motion and micro-interactions using Framer Motion.',
        price: 'From $79',
        note: '~₹6,500',
        tags: ['Framer Motion', 'CSS', 'Motion'],
        previews: [Torque, Anime, DOIT],
    },
];

export const stats = [
    { label: 'Status', value: 'Active', color: '#06b6d4' },
    { label: 'Focus', value: 'UI / Web', color: 'var(--accent)' },
    { label: 'Stack', value: 'MERN', color: '#c084fc' },
    { label: 'Location', value: 'Chennai, IN', color: '#94a3b8' },
];

export const timelineData = [
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

export const certificateData = [
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

export const projects = [
    { title: 'Verdana - Nature Retreats', description: "A modern interactive web experience showcasing creative design, smooth animations, and high-performance frontend development with a focus on user engagement and visual storytelling.", image: Verdana, url: 'https://verdana-three.vercel.app/', category: 'front-end', tags: ['React', 'Next.js', 'Framer', 'Tailwind', 'Responsive'] },
    { title: 'Homura - 3D Kitchen', description: "Leverages Three.js WebGL power directly in the browser with Next.js SSR rendering — no plugins necessary, smooth 3D experience for every user.", image: Homura, url: 'https://homura-kitchen.vercel.app/', category: 'fullstack', tags: ['React', 'Next.js', 'Framer', 'Three.js', '3D'] },
    { title: 'Builderkit', description: "Email template builder that makes the entire workflow effortless — from first draft to inbox delivery. One clean, fast interface replacing five tools.", image: Builderkit, url: 'https://builder-kit-six.vercel.app/', category: 'fullstack', tags: ['React', 'Next.js', 'Resend'] },
    { title: 'Myproject.ai', description: "Internal project management platform at MAI Corporation — job postings, candidate tracking, dynamic dashboards, real-time updates, and analytics.", image: Myproject, url: 'https://myproject.ai/', category: 'front-end', tags: ['Next.js', 'Redux', 'Tailwind', 'Framer Motion'] },
    { title: 'Dragon Customer', description: "Customer engagement and management platform — client interactions, activity monitoring, CRM tools, and a centralized communication hub.", image: Dragon, url: 'http://dragoncustomer.com/', category: 'front-end', tags: ['Next.js', 'Tailwind', 'Framer Motion'] },
    { title: 'Torque Grid', description: 'Interactive web experience showcasing JDM and old-school cars with modern UI/UX design principles.', image: Torque, url: 'https://incomparable-methods-180972.framer.app/', category: 'design', tags: ['Framer', 'UI/UX', 'Web Design'] },
    { title: 'Anime World', description: 'Responsive website for anime enthusiasts — design systems, animation principles, and user-centered experiences with immersive visuals.', image: Anime, url: 'https://energized-tone-070547.framer.app/', category: 'design', tags: ['Framer', 'Responsive', 'UI Design'] },
    { title: 'CV.io', description: 'Modern resume and CV builder platform with a sleek, intuitive interface for creating professional documents.', image: CV, url: 'https://resume-builder-client-lhlq.onrender.com/', category: 'fullstack', tags: ['React', 'Node.js', 'MongoDB'] },
    { title: 'DO-IT | Tasks', description: 'Task management app for personal tasks, work assignments, and long-term goals with milestone tracking.', image: DOIT, url: 'https://do-it-ui.onrender.com/', category: 'fullstack', tags: ['React', 'Express', 'UI'] },
    { title: 'E-Course', description: 'Online learning management system with interactive educational components and responsive design.', image: Ecourse, url: 'https://e-learning-website-client.onrender.com/', category: 'fullstack', tags: ['MERN', 'EdTech', 'Responsive'] },
    { title: 'Job Land', description: 'Dynamic job marketplace connecting candidates with employers — full-stack portal with live listings.', image: JobPortal, url: 'https://job-land-frontend.onrender.com/', category: 'fullstack', tags: ['Full Stack', 'Job Portal'] },
];

export const categories = [
    { id: 'all', label: 'All' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'design', label: 'Design' },
    { id: 'front-end', label: 'Front-end' },
];

export const socials = [
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/vishnu-muthukumar-0b247021a/',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: 'GitHub',
        href: 'https://github.com/Viki2601',
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
];