'use client';
import { useEffect, useRef } from 'react';

export default function ConstellationCanvas({ className = '' }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;
        let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        const NODE_COUNT = 90;
        const nodes = Array.from({ length: NODE_COUNT }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 2 + 1,
        }));

        const onMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        window.addEventListener('mousemove', onMouseMove);

        const LINK_DIST = 130;
        const MOUSE_DIST = 180;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const n of nodes) {
                const dx = mouse.x - n.x;
                const dy = mouse.y - n.y;
                const d = Math.hypot(dx, dy);
                if (d < MOUSE_DIST) {
                    n.vx += (dx / d) * 0.006;
                    n.vy += (dy / d) * 0.006;
                }
                n.vx *= 0.98;
                n.vy *= 0.98;
                n.x += n.vx;
                n.y += n.vy;
                if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
                if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
                n.x = Math.max(0, Math.min(canvas.width, n.x));
                n.y = Math.max(0, Math.min(canvas.height, n.y));
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(232,103,58,0.5)';
                ctx.fill();
            }

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const d = Math.hypot(dx, dy);
                    if (d < LINK_DIST) {
                        const alpha = (1 - d / LINK_DIST) * 0.35;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(232,103,58,${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            animId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animId);
            ro.disconnect();
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <canvas ref={canvasRef} className={className} style={{ display: 'block', width: '100%', height: '100%' }} />
    );
}