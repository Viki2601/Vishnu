const items = [
    'UI Design', 'Next.js', 'React', 'Motion Design', 'Framer Motion',
    'Component Systems', 'Responsive Layouts', '3D Interfaces', 'Three.js',
    'Design Systems', 'MERN Stack', 'Tailwind CSS', 'Redux', 'TypeScript',
    // duplicate for seamless loop
    'UI Design', 'Next.js', 'React', 'Motion Design', 'Framer Motion',
    'Component Systems', 'Responsive Layouts', '3D Interfaces', 'Three.js',
    'Design Systems', 'MERN Stack', 'Tailwind CSS', 'Redux', 'TypeScript',
];

export default function Marquee() {
    return (
        <div style={{ borderTop: '1px solid var(--border-solid)', borderBottom: '1px solid var(--border-solid)', padding: '14px 0', overflow: 'hidden', background: 'rgba(255,255,255,0.015)', }}>
            <div style={{ display: 'flex', gap: 40, width: 'max-content', animation: 'marquee 28s linear infinite', }}>
                {items?.map((item, i) => (
                    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap', fontFamily: 'var(--font-dm-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', }}>
                        <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, }} />
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}