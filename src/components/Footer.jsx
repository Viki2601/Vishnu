'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function FooterName() {
    const footerRef = useRef(null);
    const isInView = useInView(footerRef, { once: false, amount: 0.4 });

    return (
        <section ref={footerRef} className="w-full flex items-center justify-center overflow-hidden">
            <motion.p
                initial={{ y: 100, opacity: 0 }}
                animate={isInView ? { y: 20, opacity: 1 } : { y: 100, opacity: 0 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 200, damping: 30 }}
                className="text-7xl lg:text-[160px] tracking-tighter font-black bg-clip-text text-transparent bg-gradient-to-r from-stone-300 to-stone-800 text-center w-full"
            >
                Vishnu Muthukumar
            </motion.p>
        </section>
    );
}
