'use client';

import { motion, useAnimation } from 'framer-motion';
import Banner from '@/assets/img/Banner.svg';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import StarsAndMeteors from '../common/StarField';

export default function Landing() {
    const controls = useAnimation();
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        console.log("start")
        controls.start({
            scale: [1, 1.10, 1],
            transition: {
                duration: 9,
                repeat: Infinity,
                ease: 'easeInOut',
            },
        });
        setAnimate(true);

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const scrollPercent = scrollPosition / (document.body.scrollHeight - window.innerHeight);
            const backgroundElement = document.getElementById('scrolling-background');
            backgroundElement.style.backgroundPosition = `${100 - scrollPercent * 100}% ${100 - scrollPercent * 100}%`;
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [controls]);

    return (
        <div id="scrolling-background" className="relative w-full flex flex-col-reverse md:flex-row items-center justify-center h-screen space-y-4 md:space-y-0 md:space-x-4 p-4">
            <motion.div animate={{ scale: [1, 1.2, 1.05, 0.78, 1.05, 1.2, 1] }} transition={{ duration: 6, ease: "linear", repeat: Infinity, repeatType: 'loop' }} className='hidden lg:absolute -top-2 left-20 w-24 h-24 rounded-full bg-gradient-to-b from-red-900 via-white to-green-900 blur-2xl z-0' />
            <motion.div animate={{ rotate: 360, width: [200, 500, 354, 354, 500, 200], height: [140, 90, 40, 40, 90, 140] }} transition={{ duration: 30, repeat: Infinity, repeatType: 'loop', ease: "linear" }} className='hidden lg:absolute bottom-24 left-10 w-60 h-60 rounded-full bg-gradient-to-r from-pink-700/50 via-blue-500/30 blur-2xl opacity-90 z-0' />
            <div className='hidden lg:absolute top-96 left-1/3 w-[750px] h-10 rounded-full rotate-45 bg-gradient-to-r from-fuchsia-900 via-teal-300 to-fuchsia-900 blur-3xl z-0' />
            <StarsAndMeteors />

            <div className="w-full px-4 py-12 flex flex-col z-10">
                <motion.h1
                    initial={{ opacity: 0, x: -50 }}
                    animate={animate ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-stone-300 text-4xl md:text-6xl uppercase font-extrabold leading-tight text-center md:text-right"
                >
                    <span className="tracking-tight italic text-cyan-900 stroke-1 stroke-cyan-500">Vishnu{" "}</span>
                    <span className="tracking-tighter italic text-cyan-900/50" style={{ WebkitTextStroke: '1px #0e7490', WebkitTextFillColor: 'transparent', }}>
                        Muthukumar
                    </span>
                </motion.h1>
                <motion.h2
                    initial={{ opacity: 0, x: 50 }}
                    animate={animate ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-stone-400 uppercase text-xl md:text-3xl lg:text-5xl font-medium text-center lg:text-right tracking-tighter italic" style={{ WebkitTextStroke: '1px', WebkitTextFillColor: 'transparent', }}
                >
                    UI Developer
                </motion.h2>
            </div>

            {/* Astronaut Image */}
            <motion.div animate={controls} className="z-10">
                <Image src={Banner} alt='Banner Background' className="w-56 lg:w-96 h-full object-cover" />
            </motion.div>
        </div>
    )
}
