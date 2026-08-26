'use client';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useHorizontalScroll } from '@/common/HorizontalScrollContext';
import useHorizontalInView from '@/common/useHorizontalInView';
import { timelineData } from '@/lib/contents';

function TimelineCard({ item }) {
    return (
        <motion.div className="p-5 space-y-2.5 cursor-default w-full text-left" style={{ borderRadius: 'var(--radius-md)', background: 'rgba(5, 5, 12, 0.45)', border: '1px solid rgba(192, 38, 211, 0.15)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)', transition: 'all 0.3s ease' }} whileHover={{ scale: 1.025, borderColor: 'var(--accent-light)', boxShadow: '0 0 20px rgba(6, 182, 212, 0.15), inset 0 1px 0 rgba(6, 182, 212, 0.05)' }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
            <div className="flex items-center justify-between flex-wrap gap-2">
                <span style={{ display: 'inline-block', fontFamily: 'var(--font-montserrat)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 10px', background: 'rgba(6, 182, 212, 0.08)', color: 'var(--accent-light)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: 'var(--radius-sm)', }}>
                    {item?.date}
                </span>
                {item?.current && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-montserrat)', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em', color: '#4ade80' }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80', display: 'inline-block' }} />
                        Current
                    </span>
                )}
            </div>

            <h3 style={{ fontFamily: 'var(--font-montserrat)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                {item?.title}
            </h3>

            <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.72rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.04em' }}>
                {item?.company}
            </p>

            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6 }} className="line-clamp-4 hover:line-clamp-none transition-all duration-300">
                {item?.description}
            </p>
        </motion.div>
    );
}

function VerticalTimelineItem({ item }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.3 });
    const isLeft = item?.side === 'left';

    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }} transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.05 }} className={`flex items-center gap-6 md:gap-10 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
            <div className="w-full md:w-5/12">
                <TimelineCard item={item} />
            </div>
            <motion.div className="hidden md:flex flex-col items-center flex-shrink-0" initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : { scale: 0 }} transition={{ type: 'spring', stiffness: 200, delay: 0.15 }}>
                <div className="w-4 h-4 rounded-full z-10" style={{ backgroundColor: 'var(--accent)', boxShadow: '0 0 0 4px rgba(192, 38, 211, 0.15), 0 0 16px rgba(192, 38, 211, 0.45)', }} />
            </motion.div>
            <div className="hidden md:block w-5/12" />
        </motion.div>
    );
}

function VerticalTimeline() {
    const headingRef = useRef(null);
    const headingInView = useInView(headingRef, { once: false, amount: 0.4 });

    return (
        <div className="relative w-full overflow-hidden py-24 px-6" style={{ backgroundColor: 'var(--bg-base)', borderTop: '1px solid var(--border-solid)' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 70% 30%, rgba(192, 38, 211, 0.04) 0%, transparent 70%)', }} />
            <motion.div ref={headingRef} initial={{ opacity: 0, y: -24 }} animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }} transition={{ type: 'spring', stiffness: 80, damping: 18 }} className="relative z-10 text-center mb-20 max-w-2xl mx-auto">
                <div className="flex justify-center mb-4">
                    <p className="section-label" style={{ color: 'var(--accent-light)' }}>My Journey</p>
                </div>
                <h2 style={{ fontFamily: 'var(--font-montserrat)', fontSize: 'clamp(2.8rem, 6vw, 4.8rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--text-primary)', }}>
                    Experience &amp;{' '}
                    <span className="gradient-text font-bold" style={{ textShadow: '0 0 15px rgba(192,38,211,0.1)' }}>Education</span>
                </h2>
            </motion.div>

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block" style={{ background: 'linear-gradient(180deg, transparent, rgba(192, 38, 211, 0.25) 20%, rgba(192, 38, 211, 0.25) 80%, transparent)', }} />
                <div className="space-y-12 md:space-y-16">
                    {timelineData?.map((item, index) => (
                        <VerticalTimelineItem key={index} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function HorizontalTimelineItem({ item, index }) {
    const [ref, isInView] = useHorizontalInView({ once: false, amount: 'some' });
    const isEven = index % 2 === 0;

    return (
        <div ref={ref} className="flex flex-col items-center w-[330px] flex-shrink-0 relative" style={{ height: '480px' }}>
            <div className="h-[220px] flex items-end justify-center w-full pb-6">
                {isEven && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }} transition={{ type: 'spring', stiffness: 70, damping: 18 }} className="w-full">
                        <TimelineCard item={item} />
                    </motion.div>
                )}
            </div>

            <div className="h-[40px] relative flex items-center justify-center w-full">
                <div className="absolute w-[2px] bg-gradient-to-b" style={{ height: '110px', left: '50%', top: isEven ? '0' : 'auto', bottom: !isEven ? '0' : 'auto', transform: 'translateX(-50%)', backgroundImage: isEven ? 'linear-gradient(to top, var(--accent), transparent)' : 'linear-gradient(to bottom, var(--accent), transparent)' }} />
                <motion.div initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : { scale: 0 }} transition={{ type: 'spring', stiffness: 200, delay: 0.1 }} className="w-4.5 h-4.5 rounded-full z-10" style={{ backgroundColor: 'var(--accent-light)', boxShadow: '0 0 0 4px rgba(6, 182, 212, 0.15), 0 0 16px rgba(6, 182, 212, 0.45)', }} />
            </div>

            <div className="h-[220px] flex items-start justify-center w-full pt-6">
                {!isEven && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ type: 'spring', stiffness: 70, damping: 18 }} className="w-full">
                        <TimelineCard item={item} />
                    </motion.div>
                )}
            </div>
        </div>
    );
}

function HorizontalTimeline() {
    const [headingRef, headingInView] = useHorizontalInView({ once: false, amount: 'some' });

    return (
        <div className="relative w-full h-full flex items-center overflow-hidden py-10 px-16" style={{ background: 'linear-gradient(90deg, var(--bg-base) 0%, #09030F 100%)', borderTop: '1px solid var(--border-solid)' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 75% 30%, rgba(192, 38, 211, 0.04) 0%, transparent 70%)', }} />
            <motion.div ref={headingRef} initial={{ opacity: 0, x: -30 }} animate={headingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }} transition={{ type: 'spring', stiffness: 80, damping: 18 }} className="relative z-10 w-[350px] flex-shrink-0 flex flex-col justify-center pr-12 border-r border-[#16162a] h-[60%]">
                <div className="flex mb-4">
                    <p className="section-label" style={{ color: 'var(--accent-light)' }}>My Journey</p>
                </div>
                <h2 style={{ fontFamily: 'var(--font-montserrat)', fontSize: 'clamp(2.4rem, 4vw, 3.6rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, color: 'var(--text-primary)', }}>
                    Experience &amp; <br />
                    <span className="gradient-text font-bold" style={{ textShadow: '0 0 15px rgba(192,38,211,0.1)' }}>Education</span>
                </h2>
            </motion.div>

            <div className="relative flex-grow h-full flex items-center pl-16 pr-24 overflow-visible">
                <div className="absolute left-16 right-24 h-[2px]" style={{ top: '50%', background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 50%, rgba(192, 38, 211, 0.15) 80%, transparent 100%)', transform: 'translateY(-50%)', boxShadow: '0 0 8px rgba(6, 182, 212, 0.2)' }} />
                <div className="flex items-center gap-12 relative z-10">
                    {timelineData?.map((item, index) => (
                        <HorizontalTimelineItem key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Timeline() {
    const { isHorizontal } = useHorizontalScroll();

    return isHorizontal ? <HorizontalTimeline /> : <VerticalTimeline />;
}