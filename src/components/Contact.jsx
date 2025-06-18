'use client';
import StarsAndMeteors from '@/common/StarField';
import Moon from '@/assets/img/Moon.png';
import React from 'react';
import Image from 'next/image';

export default function Contact() {
    return (
        <div className='relative min-h-screen w-full p-4 lg:p-10 flex flex-col justify-center items-center gap-y-10'>
            <div className='w-52 h-52 absolute top-10 lg:left-96 -z-10'>
                <Image style={{ animation: 'spin 66s linear infinite' }} className='w-full h-full object-contain rotate-90' src={Moon} alt='Group Astroids' width={100} height={100} />
            </div>

            <StarsAndMeteors />
            <h1 className='bg-clip-text font-extrabold tracking-tighter text-transparent bg-gradient-to-r from-stone-300 to-stone-800 text-2xl lg:text-7xl'>Contact</h1>
            <div className='w-full max-w-2xl bg-opacity-50 backdrop-filter backdrop-blur-lg flex flex-col items-center rounded-2xl border border-stone-500 py-6 px-4 z-10'>
                <div className='w-full flex flex-col items-start gap-6'>
                    <div className='flex flex-col gap-3'>
                        <h1 className='text-stone-300 text-3xl font-bold tracking-tighter'>Linkedin</h1>
                        <h1 className='text-stone-300 text-sm'>
                            If you'd like to get in touch, please feel free to connect with me on LinkedIn. Leveraging the platform to connect with industry professionals, share insights, and stay updated on the latest trends in web development and technology.
                        </h1>
                        <h1 className='text-stone-300 text-sm'>You can connect with me on LinkedIn <a href='https://www.linkedin.com/in/vishnu-muthukumar-0b247021a/' target='_blank' rel="noreferrer" className='text-blue-800 font-bold underline'>here.</a> </h1>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h1 className='text-stone-300 text-3xl font-bold tracking-tighter'>GitHub</h1>
                        <h1 className='text-stone-300 text-sm'>
                            I am an active GitHub user, consistently contributing to both personal and collaborative projects. My GitHub repositories showcase my work in web development, particularly in the MERN stack and Java full stack development. I regularly update my repositories with code from my projects, demonstrating my commitment to continuous learning and improvement.
                        </h1>
                        <h1 className='text-stone-300 text-sm'>You can view my GitHub profile and explore my projects <a href='https://github.com/Viki2601' target='_blank' rel="noreferrer" className='text-blue-800 font-bold underline'>here.</a> </h1>
                    </div>
                </div>
            </div>
            <div className='w-full'>
                <p className='text-sm text-stone-300 text-center p-3'>Copyright &#169; 2024 - Vishnu Muthukumar</p>
            </div>
        </div>
    )
}
