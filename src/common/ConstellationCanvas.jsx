'use client';
import { useEffect, useRef } from 'react';

export default function ConstellationCanvas({ className = '' }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;
        let mouse = { x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0 };

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        // Particle configuration (Leaves)
        const LEAF_COUNT = 60;
        const leaves = Array.from({ length: LEAF_COUNT }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            length: Math.random() * 8 + 6,
            width: Math.random() * 4 + 3,
            vx: Math.random() * 0.7 + 0.3,
            vy: (Math.random() - 0.5) * 0.2,
            angle: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.02,
            swaySpeed: Math.random() * 0.02 + 0.01,
            swayTime: Math.random() * 100,
            alpha: Math.random() * 0.35 + 0.15,
            color: Math.random() > 0.4 ? 'rgba(123, 161, 133, ' : 'rgba(172, 197, 180, ',
        }));

        // Wind flow lines
        const WIND_LINE_COUNT = 6;
        const windLines = Array.from({ length: WIND_LINE_COUNT }, () => ({
            points: Array.from({ length: 6 }, (_, idx) => ({ x: 0, y: 0 })),
            xOffset: Math.random() * 200,
            yBase: Math.random() * canvas.height,
            speed: Math.random() * 1.5 + 0.8,
            width: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.06 + 0.02,
        }));

        const onMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const currentX = e.clientX - rect.left;
            const currentY = e.clientY - rect.top;
            
            // Calculate mouse velocity
            mouse.vx = currentX - mouse.lastX;
            mouse.vy = currentY - mouse.lastY;
            mouse.x = currentX;
            mouse.y = currentY;
            mouse.lastX = currentX;
            mouse.lastY = currentY;
        };
        window.addEventListener('mousemove', onMouseMove);

        const drawLeaf = (x, y, length, width, angle, color, alpha) => {
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.moveTo(0, -length / 2);
            ctx.quadraticCurveTo(width / 2, 0, 0, length / 2);
            ctx.quadraticCurveTo(-width / 2, 0, 0, -length / 2);
            ctx.closePath();
            ctx.fillStyle = `${color}${alpha})`;
            ctx.fill();
            ctx.restore();
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Decelerate mouse velocities
            mouse.vx *= 0.95;
            mouse.vy *= 0.95;

            // Draw wind lines
            for (const wl of windLines) {
                wl.xOffset += wl.speed;
                if (wl.xOffset > canvas.width + 300) {
                    wl.xOffset = -300;
                    wl.yBase = Math.random() * canvas.height;
                }

                ctx.beginPath();
                ctx.strokeStyle = `rgba(139, 168, 147, ${wl.alpha})`;
                ctx.lineWidth = wl.width;
                
                // Draw curve using quadratic lines
                for (let i = 0; i < 6; i++) {
                    const px = wl.xOffset + i * 80 - 150;
                    const py = wl.yBase + Math.sin((wl.xOffset + i * 40) * 0.01) * 30;
                    if (i === 0) {
                        ctx.moveTo(px, py);
                    } else {
                        ctx.lineTo(px, py);
                    }
                }
                ctx.stroke();
            }

            // Draw leaf particles
            for (const n of leaves) {
                // Move leaves to the right (simulating wind)
                n.swayTime += n.swaySpeed;
                n.x += n.vx;
                n.y += n.vy + Math.sin(n.swayTime) * 0.25;
                n.angle += n.rotSpeed;

                // Mouse interaction - push leaves away and accelerate them based on mouse velocity
                const dx = n.x - mouse.x;
                const dy = n.y - mouse.y;
                const dist = Math.hypot(dx, dy);
                if (dist < 120) {
                    const force = (120 - dist) / 120;
                    // Add wind gust speed from mouse velocity
                    n.x += (dx / dist) * force * 4 + mouse.vx * force * 0.15;
                    n.y += (dy / dist) * force * 4 + mouse.vy * force * 0.15;
                    n.angle += force * 0.1;
                }

                // Wrap-around screen bounds
                if (n.x > canvas.width + 20) {
                    n.x = -20;
                    n.y = Math.random() * canvas.height;
                }
                if (n.y < -20) n.y = canvas.height + 20;
                if (n.y > canvas.height + 20) n.y = -20;

                drawLeaf(n.x, n.y, n.length, n.width, n.angle, n.color, n.alpha);
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