'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const SUGGESTIONS = [
    'What tech stack do you use?',
    'Tell me about Homura 3D',
    "What's your availability?",
    'How long for a landing page?',
];

export default function AskAI() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.15 });
    const bottomRef = useRef(null);
    const [messages, setMessages] = useState([{ role: 'bot', text: "Hey! I'm Vishnu's AI assistant. Ask me anything about his work, stack, availability, or pricing." },]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    async function send(text) {
        const q = (text ?? input).trim();
        if (!q || loading) return;
        setInput('');
        const userMsg = { role: 'user', text: q };
        setMessages(prev => [...prev, userMsg]);
        setLoading(true);

        try {
            const history = messages.filter((m, i) => !(m?.role === 'bot' && i === 0)).map(m => ({
                role: m?.role === 'bot' ? 'assistant' : 'user',
                content: m?.text,
            }));

            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...history, { role: 'user', content: q }], }),
            });

            const data = await res.json();

            if (!res.ok || data.error) {
                throw new Error(data.error || 'API error');
            }

            setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
        } catch (err) {
            console.error(err);
            setMessages(prev => [...prev, { role: 'bot', text: 'Something went wrong — please try again in a moment.' },]);
        } finally {
            setLoading(false);
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            send();
        }
    }

    return (
        <section ref={sectionRef} className="relative w-full py-24 px-6 overflow-hidden" style={{ backgroundColor: 'var(--bg-base)', borderTop: '1px solid var(--border-solid)' }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(232,103,58,0.06) 0%, transparent 70%)', }} />
            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }} transition={{ type: 'spring', stiffness: 70, damping: 18 }} className="space-y-6">
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', border: '1px solid var(--border-solid2)', borderRadius: 20, fontFamily: 'var(--font-dm-mono)', fontSize: '0.68rem', color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 2s ease-in-out infinite' }} />
                            AI-Powered
                        </div>

                        <p className="section-label">Ask Anything</p>

                        <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.06, color: 'var(--text-primary)', }}>
                            Chat with my <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>Portfolio</em>
                        </h2>

                        <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                            Have a question about my skills, timeline, pricing, or projects? My AI assistant knows everything — ask it right here, get an instant answer.
                        </p>

                        <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.75 }}>
                            Powered by Claude (Anthropic). Trained on my actual experience and projects — real, accurate answers, not generic responses.
                        </p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }} transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.1 }}>
                        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-solid)', borderRadius: 'var(--radius-md)', overflow: 'hidden', }}>
                            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-solid)', display: 'flex', alignItems: 'center', gap: 10, }}>
                                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 2s ease-in-out infinite' }} />
                                <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
                                    Ask about Vishnu's work
                                </span>
                            </div>

                            <div style={{ padding: 20, minHeight: 300, maxHeight: 360, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
                                {messages?.map((m, i) => (
                                    <div key={i} style={{ display: 'flex', flexDirection: m?.role === 'user' ? 'row-reverse' : 'row', gap: 10 }}>
                                        <div style={{ width: 28, height: 28, borderRadius: 4, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-dm-mono)', fontSize: '0.6rem', ...(m?.role === 'bot' ? { background: 'var(--accent-muted)', border: '1px solid rgba(232,103,58,0.35)', color: 'var(--accent)' } : { background: 'var(--border-solid)', color: 'var(--text-secondary)', fontSize: '0.85rem' }), }}>
                                            {m?.role === 'bot' ? 'AI' : '👤'}
                                        </div>
                                        <div style={{ padding: '10px 14px', borderRadius: 4, maxWidth: '80%', fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem', lineHeight: 1.65, ...(m?.role === 'bot' ? { background: 'var(--bg-surface)', border: '1px solid var(--border-solid)', color: 'var(--text-primary)' } : { background: 'var(--accent)', color: '#fff' }), }}>
                                            {m?.text}
                                        </div>
                                    </div>
                                ))}

                                {loading && (
                                    <div style={{ display: 'flex', gap: 10 }}>
                                        <div style={{ width: 28, height: 28, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--accent-muted)', border: '1px solid rgba(232,103,58,0.35)', fontFamily: 'var(--font-dm-mono)', fontSize: '0.6rem', color: 'var(--accent)', }}>AI</div>
                                        <div style={{ padding: '10px 14px', background: 'var(--bg-surface)', border: '1px solid var(--border-solid)', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 4, }}>
                                            {[0, 1, 2].map(i => (
                                                <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--text-muted)', animation: 'dotPulse 1.2s ease-in-out infinite', animationDelay: `${i * 0.2}s`, }} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div ref={bottomRef} />
                            </div>

                            <div style={{ display: 'flex', borderTop: '1px solid var(--border-solid)' }}>
                                <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask me anything..." style={{ flex: 1, padding: '14px 18px', background: 'transparent', border: 'none', outline: 'none', fontFamily: 'var(--font-dm-sans)', fontSize: '0.875rem', color: 'var(--text-primary)', }} />
                                <button onClick={() => send()} disabled={loading || !input.trim()} style={{ padding: '14px 20px', background: 'var(--accent)', border: 'none', color: '#fff', fontSize: '1rem', cursor: loading || !input.trim() ? 'default' : 'pointer', opacity: loading || !input.trim() ? 0.4 : 1, transition: 'opacity 0.2s', }}>
                                    ➤
                                </button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
                            {SUGGESTIONS?.map((s, i) => (
                                <button key={i} onClick={() => send(s)} style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.8rem', padding: '6px 14px', border: '1px solid var(--border-solid2)', background: 'transparent', color: 'var(--text-secondary)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'border-color 0.2s, color 0.2s', }} onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--text-primary)'; }} onMouseLeave={e => { e.target.style.borderColor = 'var(--border-solid2)'; e.target.style.color = 'var(--text-secondary)'; }}>
                                    {s}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            <style>{`
                @keyframes dotPulse {
                    0%, 80%, 100% { transform: scale(0.8); opacity: 0.4; }
                    40% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </section>
    );
}