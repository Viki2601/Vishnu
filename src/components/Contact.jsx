'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useHorizontalInView from '@/common/useHorizontalInView';

const socials = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vishnu-muthukumar-0b247021a/' },
    { label: 'GitHub', href: 'https://github.com/Viki2601' },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 18 } },
};

function ContactForm() {
    const [form, setForm] = useState({ name: '', email: '', type: '', message: '' });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle');
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    const options = [
        { value: 'Landing Page ($99+)', label: 'Landing Page', price: '$99+' },
        { value: 'UI Component Pack ($149+)', label: 'UI Component Pack', price: '$149+' },
        { value: 'Full Web App UI ($349+)', label: 'Full Web App UI', price: '$349+' },
        { value: 'Animation Sprint ($79+)', label: 'Animation Sprint', price: '$79+' },
        { value: 'Something Else', label: 'Something Else', price: '' }
    ];

    useEffect(() => {
        function handleClickOutside(event) {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function validate() {
        const e = {};
        if (!form.name.trim()) e.name = 'Name is required';
        if (!form.email.trim()) e.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
        if (!form.message.trim()) e.message = 'Tell me about your project';
        return e;
    }

    async function handleSubmit() {
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }
        setStatus('sending');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok || data.error) {
                throw new Error(data.error || 'Failed to send');
            }

            setStatus('sent');

        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    }

    const inputStyle = (field) => ({
        width: '100%', padding: '13px 16px',
        background: 'rgba(5, 5, 12, 0.45)',
        border: `1px solid ${errors[field] ? '#ef4444' : 'var(--border-solid)'}`,
        borderRadius: 'var(--radius-sm)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-sans)', fontSize: '0.9rem',
        outline: 'none', marginBottom: errors[field] ? 4 : 16,
        transition: 'all 0.2s',
    });

    const labelStyle = {
        display: 'block',
        fontFamily: 'var(--font-montserrat)', fontSize: '0.68rem',
        fontWeight: 700,
        color: 'var(--text-muted)', letterSpacing: '0.12em',
        textTransform: 'uppercase', marginBottom: 8,
    };

    if (status === 'sent') return (
        <div style={{ textAlign: 'center', padding: '48px 24px' }} className="glass rounded-xl border border-[rgba(192,38,211,0.2)]">
            <div style={{ fontSize: 48, marginBottom: 20 }}>🛸</div>
            <h3 style={{ fontFamily: 'var(--font-montserrat)', fontSize: '1.75rem', fontWeight: 800, marginBottom: 12, color: 'var(--text-primary)' }}>
                Message Transmitted!
            </h3>
            <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Signal received successfully. I will respond to your coordinates within 24 hours.
            </p>
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Name */}
            <label style={labelStyle}>Your Name</label>
            <input style={inputStyle('name')} placeholder="Wicky" value={form.name} onFocus={e => { e.target.style.borderColor = 'var(--accent-light)'; e.target.style.boxShadow = '0 0 10px rgba(6,182,212,0.15)'; }} onBlur={e => { e.target.style.borderColor = errors.name ? '#ef4444' : 'var(--border-solid)'; e.target.style.boxShadow = 'none'; }} onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })); }} />
            {errors.name && <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.7rem', fontWeight: 600, color: '#ef4444', marginBottom: 12 }}>{errors.name}</span>}

            {/* Email */}
            <label style={labelStyle}>Email</label>
            <input type="email" style={inputStyle('email')} placeholder="wicky@company.com" value={form.email} onFocus={e => { e.target.style.borderColor = 'var(--accent-light)'; e.target.style.boxShadow = '0 0 10px rgba(6,182,212,0.15)'; }} onBlur={e => { e.target.style.borderColor = errors.email ? '#ef4444' : 'var(--border-solid)'; e.target.style.boxShadow = 'none'; }} onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })); }} />
            {errors.email && <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.7rem', fontWeight: 600, color: '#ef4444', marginBottom: 12 }}>{errors.email}</span>}

            {/* Project type */}
            <label style={labelStyle}>Project Type</label>
            <div ref={selectRef} style={{ position: 'relative', marginBottom: 16 }}>
                <div onClick={() => { if (status !== 'sending') setIsOpen(!isOpen); }} style={{ width: '100%', padding: '13px 16px', background: 'rgba(5, 5, 12, 0.45)', border: `1px solid ${errors.type ? '#ef4444' : (isOpen ? 'var(--accent-light)' : 'var(--border-solid)')}`, borderRadius: 'var(--radius-sm)', color: form.type ? 'var(--text-primary)' : 'var(--text-muted)', fontFamily: 'var(--font-sans)', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: status === 'sending' ? 'default' : 'pointer', userSelect: 'none', transition: 'border-color 0.2s, background 0.2s', }}>
                    <span>{form.type ? (options.find(o => o.value === form.type)?.label || form.type) : 'Select a service…'}</span>
                    <motion.svg animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: 'var(--text-muted)' }}>
                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 4, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.98 }}
                            transition={{ duration: 0.15, ease: 'easeOut' }}
                            style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50, background: 'rgba(5, 5, 12, 0.92)', backdropFilter: 'blur(20px)', border: '1px solid rgba(192, 38, 211, 0.2)', borderRadius: 'var(--radius-sm)', boxShadow: '0 10px 30px rgba(0,0,0,0.65), 0 0 15px rgba(192,38,211,0.05)', overflow: 'hidden', padding: '6px', }}
                        >
                            {options?.map((option) => {
                                const isSelected = form.type === option?.value;
                                return (
                                    <div key={option?.value} onClick={() => { setForm(f => ({ ...f, type: option?.value })); setIsOpen(false); }}
                                        style={{ padding: '10px 12px', borderRadius: 'var(--radius-xs, 4px)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: isSelected ? 'rgba(192, 38, 211, 0.12)' : 'transparent', transition: 'background 0.2s', }}
                                        onMouseEnter={(e) => {
                                            if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isSelected) e.currentTarget.style.background = 'transparent';
                                        }}
                                    >
                                        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: isSelected ? 'var(--accent)' : 'var(--text-primary)', fontWeight: isSelected ? 700 : 400, }}>
                                            {option?.label}
                                        </span>
                                        {option?.price && (
                                            <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.72rem', fontWeight: 700, color: isSelected ? 'var(--accent)' : 'var(--text-muted)', }}>
                                                {option?.price}
                                            </span>
                                        )}
                                    </div>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Message */}
            <label style={labelStyle}>Tell me about your project</label>
            <textarea style={{ ...inputStyle('message'), resize: 'none', minHeight: 100 }} placeholder="What are you building? Timeline, budget…" value={form.message} onFocus={e => { e.target.style.borderColor = 'var(--accent-light)'; e.target.style.boxShadow = '0 0 10px rgba(6,182,212,0.15)'; }} onBlur={e => { e.target.style.borderColor = errors.message ? '#ef4444' : 'var(--border-solid)'; e.target.style.boxShadow = 'none'; }} onChange={e => { setForm(f => ({ ...f, message: e.target.value })); setErrors(er => ({ ...er, message: '' })); }} />
            {errors.message && <span style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.7rem', fontWeight: 600, color: '#ef4444', marginBottom: 12 }}>{errors.message}</span>}

            {/* Submit */}
            <button onClick={handleSubmit} disabled={status === 'sending'} style={{ padding: '14px', background: 'linear-gradient(135deg, var(--accent), var(--accent2))', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-montserrat)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', cursor: status === 'sending' ? 'default' : 'pointer', opacity: status === 'sending' ? 0.55 : 1, transition: 'opacity 0.2s, transform 0.2s', marginTop: 4, boxShadow: '0 4px 15px rgba(192,38,211,0.2)' }} onMouseEnter={e => { if (status !== 'sending') e.target.style.transform = 'translateY(-1px)'; }} onMouseLeave={e => { e.target.style.transform = 'none'; }}>
                {status === 'sending' ? 'Sending…' : 'Send Message →'}
            </button>
        </div>
    );
}

export default function Contact() {
    const [sectionRef, isInView] = useHorizontalInView({ once: false, amount: 'some' });

    return (
        <section ref={sectionRef} className="relative w-full h-full min-h-screen flex items-center py-24 px-6 overflow-hidden" style={{ backgroundColor: 'var(--bg-base)', borderTop: '1px solid var(--border-solid)' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(192, 38, 211, 0.05) 0%, transparent 70%)', }} />

            <motion.div variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="relative z-10 w-full max-w-7xl mx-auto">
                <motion.div variants={itemVariants} className="mb-12 space-y-3">
                    <p className="section-label" style={{ color: 'var(--accent-light)' }}>Let's Work Together</p>
                    <h2 style={{ fontFamily: 'var(--font-montserrat)', fontSize: 'clamp(2.8rem, 6vw, 4.8rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--text-primary)', }}>
                        Got a project <span className="gradient-text font-bold" style={{ textShadow: '0 0 15px rgba(192,38,211,0.1)' }}>in mind?</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
                    <motion.div variants={itemVariants} className="space-y-8">
                        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                            Open to freelance opportunities, UI/UX consulting, and core frontend roles. Located in Chennai — collaborating globally.
                        </p>

                        {/* Email */}
                        <a href="mailto:mcvicky2601@gmail.com" style={{ display: 'block', fontFamily: 'var(--font-montserrat)', fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', fontWeight: 800, color: 'var(--accent-light)', textDecoration: 'none', borderBottom: '2px solid transparent', paddingBottom: 4, transition: 'all 0.3s', wordBreak: 'break-all', textShadow: '0 0 10px rgba(6,182,212,0.1)' }} onMouseEnter={e => { e.target.style.color = 'var(--accent)'; e.target.style.borderBottomColor = 'var(--accent)'; }} onMouseLeave={e => { e.target.style.color = 'var(--accent-light)'; e.target.style.borderBottomColor = 'transparent'; }}>
                            mcvicky2601@gmail.com
                        </a>

                        {/* Socials */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                            {socials.map(s => (
                                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-montserrat)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', textDecoration: 'none', borderBottom: '1px solid transparent', paddingBottom: 2, transition: 'all 0.2s', }} onMouseEnter={e => { e.target.style.color = 'var(--text-primary)'; e.target.style.borderColor = 'var(--text-muted)'; }} onMouseLeave={e => { e.target.style.color = 'var(--text-muted)'; e.target.style.borderColor = 'transparent'; }}>
                                    {s.label}
                                </a>
                            ))}
                        </div>

                        <div className="availability-pill" style={{ border: '1px solid rgba(74, 222, 128, 0.25)', background: 'rgba(74, 222, 128, 0.05)', color: '#4ade80', borderRadius: 'var(--radius-sm)', boxShadow: '0 0 15px rgba(74, 222, 128, 0.05)' }}>
                            <span className="green-dot" style={{ background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
                            Available for new projects
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <ContactForm />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}