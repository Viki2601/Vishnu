'use client';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const socials = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vishnu-muthukumar-0b247021a/' },
    { label: 'GitHub', href: 'https://github.com/Viki2601' },
    { label: 'Dribbble', href: '#' },
    { label: 'Instagram', href: '#' },
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
        await new Promise(r => setTimeout(r, 1600));
        setStatus('sent');
    }

    const inputStyle = (field) => ({
        width: '100%', padding: '13px 16px',
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${errors[field] ? '#c44444' : 'var(--border-solid)'}`,
        borderRadius: 'var(--radius-sm)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-dm-sans)', fontSize: '0.9rem',
        outline: 'none', marginBottom: errors[field] ? 4 : 16,
        transition: 'border-color 0.2s',
    });

    const labelStyle = {
        display: 'block',
        fontFamily: 'var(--font-dm-mono)', fontSize: '0.68rem',
        color: 'var(--text-muted)', letterSpacing: '0.12em',
        textTransform: 'uppercase', marginBottom: 8,
    };

    if (status === 'sent') return (
        <div style={{ textAlign: 'center', padding: '48px 24px' }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>✉️</div>
            <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.75rem', fontWeight: 700, marginBottom: 12, color: 'var(--text-primary)' }}>
                Message Sent!
            </h3>
            <p style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Thanks for reaching out. I'll get back to you within 24 hours.
            </p>
        </div>
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Name */}
            <label style={labelStyle}>Your Name</label>
            <input style={inputStyle('name')} placeholder="Wicky" value={form.name} onFocus={e => { e.target.style.borderColor = 'var(--accent)'; }} onBlur={e => { e.target.style.borderColor = errors.name ? '#c44444' : 'var(--border-solid)'; }} onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setErrors(er => ({ ...er, name: '' })); }} />
            {errors.name && <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem', color: '#c44444', marginBottom: 12 }}>{errors.name}</span>}

            {/* Email */}
            <label style={labelStyle}>Email</label>
            <input type="email" style={inputStyle('email')} placeholder="wicky@company.com" value={form.email} onFocus={e => { e.target.style.borderColor = 'var(--accent)'; }} onBlur={e => { e.target.style.borderColor = errors.email ? '#c44444' : 'var(--border-solid)'; }} onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })); }} />
            {errors.email && <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem', color: '#c44444', marginBottom: 12 }}>{errors.email}</span>}

            {/* Project type */}
            <label style={labelStyle}>Project Type</label>
            <select style={{ ...inputStyle('type'), appearance: 'none', cursor: 'pointer' }} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                <option value="">Select a service…</option>
                <option>Landing Page ($299+)</option>
                <option>UI Component Pack ($499+)</option>
                <option>Full Web App UI ($999+)</option>
                <option>Animation Sprint ($249+)</option>
                <option>Something Else</option>
            </select>

            {/* Message */}
            <label style={labelStyle}>Tell me about your project</label>
            <textarea style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 120 }} placeholder="What are you building? Timeline, budget…" value={form.message} onFocus={e => { e.target.style.borderColor = 'var(--accent)'; }} onBlur={e => { e.target.style.borderColor = errors.message ? '#c44444' : 'var(--border-solid)'; }} onChange={e => { setForm(f => ({ ...f, message: e.target.value })); setErrors(er => ({ ...er, message: '' })); }} />
            {errors.message && <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.7rem', color: '#c44444', marginBottom: 12 }}>{errors.message}</span>}

            {/* Submit */}
            <button
                onClick={handleSubmit}
                disabled={status === 'sending'}
                style={{ padding: '14px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-dm-sans)', fontSize: '0.9rem', fontWeight: 500, cursor: status === 'sending' ? 'default' : 'pointer', opacity: status === 'sending' ? 0.55 : 1, transition: 'opacity 0.2s, transform 0.2s', marginTop: 4, }}
                onMouseEnter={e => { if (status !== 'sending') e.target.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.target.style.transform = 'none'; }}
            >
                {status === 'sending' ? 'Sending…' : 'Send Message →'}
            </button>
        </div>
    );
}

export default function Contact() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

    return (
        <section ref={sectionRef} className="relative w-full py-24 px-6 overflow-hidden" style={{ backgroundColor: 'var(--bg-base)', borderTop: '1px solid var(--border-solid)' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(232,103,58,0.07) 0%, transparent 70%)', }} />
            <motion.div variants={containerVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'} className="relative z-10 w-full max-w-7xl mx-auto">
                <motion.div variants={itemVariants} className="mb-16 space-y-3">
                    <p className="section-label">Let's Work Together</p>
                    <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.8rem, 6vw, 5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.06, color: 'var(--text-primary)', }}>
                        Got a project <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>in mind?</em>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
                    <motion.div variants={itemVariants} className="space-y-8">
                        <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                            Open to freelance projects, UI consulting, and long-term product work. Based in Chennai — available globally, remote.
                        </p>

                        {/* Email */}
                        <a
                            href="mailto:mcvicky2601@gmail.com"
                            style={{ display: 'block', fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)', fontWeight: 700, color: 'var(--accent)', textDecoration: 'none', borderBottom: '2px solid transparent', paddingBottom: 4, transition: 'border-color 0.3s', wordBreak: 'break-all', }}
                            onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; }}
                            onMouseLeave={e => { e.target.style.borderColor = 'transparent'; }}
                        >
                            mcvicky2601@gmail.com
                        </a>

                        {/* Socials */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                            {socials.map(s => (
                                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                                    style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', textDecoration: 'none', borderBottom: '1px solid transparent', paddingBottom: 2, transition: 'color 0.2s, border-color 0.2s', }}
                                    onMouseEnter={e => { e.target.style.color = 'var(--text-primary)'; e.target.style.borderColor = 'var(--text-muted)'; }}
                                    onMouseLeave={e => { e.target.style.color = 'var(--text-muted)'; e.target.style.borderColor = 'transparent'; }}
                                >
                                    {s.label}
                                </a>
                            ))}
                        </div>

                        <div className="availability-pill">
                            <span className="green-dot" />
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