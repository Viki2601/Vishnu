'use client';
import Globe from '@/common/Globe';
import StarsAndMeteors from '@/common/StarField';
import Astroid1 from '@/assets/img/Astroid1.png';
import Astroid2 from '@/assets/img/Astroid2.png';
import React from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <section className='relative w-full overflow-hidden'>
            {/* <div className='w-full h-screen absolute'>
                <Image className='w-full h-full object-contain rotate-90' src={GroupAstroids} alt='Group Astroids' width={100} height={100} />
            </div> */}
            <motion.div
                initial={{ x: 0, y: 300 }}
                animate={{ x: '-140vw', y: '100vh' }}
                transition={{
                    duration: 34,
                    ease: 'easeIn',
                    repeat: Infinity,
                    repeatType: 'loop',
                }}
            >
                <Image
                    className='absolute top-0 -right-40 opacity-70'
                    style={{
                        animation: 'spin 56s linear infinite',
                    }}
                    src={Astroid1}
                    alt='Asteroid'
                    width={100}
                    height={100}
                />
            </motion.div>

            <motion.div
            className='z-[9999]'
                initial={{ x: 0, y: 0 }}
                animate={{ x: '-180vw', y: '100vh' }}
                transition={{
                    duration: 48,
                    // delay: 2,
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatType: 'loop',
                }}
            >
                <Image
                    className='absolute top-0 -right-40 opacity-70'
                    style={{
                        animation: 'spin 12s linear infinite',
                    }}
                    src={Astroid2}
                    alt='Asteroid'
                    width={100}
                    height={100}
                />
            </motion.div>


            {/* <Globe /> */}
            <StarsAndMeteors />
            <div id="scrolling-background" className={`relative min-h-screen flex flex-col items-center justify-center`}>

                <div className='relative z-10 p-4 lg:p-10'>
                    <h1 className='bg-clip-text font-bold tracking-tighter text-transparent bg-gradient-to-r from-stone-300 to-stone-800 text-center text-4xl'>Get to know more</h1>
                    <h1 className='bg-clip-text font-extrabold tracking-tighter text-transparent bg-gradient-to-r from-stone-300 to-stone-800 text-7xl text-center'>About</h1>
                </div>
                <h1 className='relative z-10 mb-40 text-stone-300 font-montserrat max-w-4xl text-center'>
                    <span className='bg-clip-text text-transparent italic tracking-widest bg-gradient-to-r from-stone-300 to-stone-800 text-xl'>I am Vishnu, an UI Developer. </span>
                    <span className='bg-clip-text text-transparent italic tracking-widest bg-gradient-to-r from-stone-300 to-stone-500 text-lg'>A Mechanical Engineering diploma graduate who transitioned into the field of web development. After completing a Full Stack Web Development course at QSpiders Institute, and further expanded skill set by independently learning the UI/UX designing and MERN stack (MongoDB, Express.js, React.js, Node.js).</span>
                </h1>
            </div>
        </section >
    )
}
