'use client';
import { useEffect, useRef } from 'react';

export default function ConstellationCanvas({ className = '' }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;
        let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        let time = 0;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        // Center mouse initially
        mouse.x = window.innerWidth / 2;
        mouse.y = window.innerHeight / 2;
        mouse.targetX = mouse.x;
        mouse.targetY = mouse.y;

        // Configure stars
        const STAR_COUNT = 180;
        const stars = Array.from({ length: STAR_COUNT }, () => {
            const depth = Math.random() * 0.9 + 0.1; // 0.1 to 1.0
            return {
                x: Math.random() * window.innerWidth * 1.5 - window.innerWidth * 0.25,
                y: Math.random() * window.innerHeight * 1.5 - window.innerHeight * 0.25,
                size: Math.random() * 1.8 + 0.4, // size from 0.4px to 2.2px
                depth: depth,
                baseOpacity: Math.random() * 0.6 + 0.2,
                twinkleSpeed: Math.random() * 0.03 + 0.005,
                twinklePhase: Math.random() * Math.PI * 2,
                // Space theme star colors (mostly white, some cyan, fuchsia, yellow)
                color: (() => {
                    const r = Math.random();
                    if (r < 0.15) return '192, 38, 211';  // Fuchsia
                    if (r < 0.3) return '6, 182, 212';    // Cyan
                    if (r < 0.4) return '234, 179, 8';    // Yellow
                    return '255, 255, 255';               // White
                })()
            };
        });

        // Configure shooting stars
        const shootingStars = [];
        const spawnShootingStar = () => {
            if (shootingStars.length >= 2) return;
            
            shootingStars.push({
                x: Math.random() * canvas.width * 0.8,
                y: Math.random() * canvas.height * 0.5,
                vx: Math.random() * 8 + 6,
                vy: Math.random() * 4 + 3,
                length: Math.random() * 80 + 50,
                opacity: 1,
                life: 1.0,
                decay: Math.random() * 0.02 + 0.015,
                width: Math.random() * 1.5 + 0.8,
            });
        };

        const onMouseMove = (e) => {
            mouse.targetX = e.clientX;
            mouse.targetY = e.clientY;
        };
        window.addEventListener('mousemove', onMouseMove);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.5;

            // Smooth mouse interpolation for parallax lag
            mouse.x += (mouse.targetX - mouse.x) * 0.08;
            mouse.y += (mouse.targetY - mouse.y) * 0.08;

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Draw nebula background glow
            const nebGlow = ctx.createRadialGradient(
                centerX + (mouse.x - centerX) * 0.05,
                centerY + (mouse.y - centerY) * 0.05,
                10,
                centerX,
                centerY,
                canvas.width * 0.7
            );
            nebGlow.addColorStop(0, 'rgba(88, 28, 135, 0.04)'); // deep purple
            nebGlow.addColorStop(0.5, 'rgba(30, 58, 138, 0.03)'); // deep blue
            nebGlow.addColorStop(1, 'transparent');
            ctx.fillStyle = nebGlow;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Stars and calculate their projected positions
            const projectedStars = stars.map(star => {
                // Parallax translation: depth drives offset intensity
                const offsetX = (mouse.x - centerX) * star.depth * 0.03;
                const offsetY = (mouse.y - centerY) * star.depth * 0.03;
                
                let px = star.x + offsetX;
                let py = star.y + offsetY;

                // Keep stars inside screen boundary with wrapping
                if (px < -50) px = canvas.width + 50;
                if (px > canvas.width + 50) px = -50;
                if (py < -50) py = canvas.height + 50;
                if (py > canvas.height + 50) py = -50;

                // Update base star coordinates to follow wrapped position
                star.x = px - offsetX;
                star.y = py - offsetY;

                // Twinkle effect (sine wave opacity oscillation)
                const opacity = Math.max(0.05, Math.min(1, 
                    star.baseOpacity + Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.25
                ));

                ctx.beginPath();
                ctx.arc(px, py, star.size * (1 + (star.depth * 0.2)), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${star.color}, ${opacity})`;
                ctx.fill();

                return { x: px, y: py, depth: star.depth, color: star.color };
            });

            // Draw faint constellation links between close stars of similar depth
            ctx.lineWidth = 0.5;
            for (let i = 0; i < projectedStars.length; i++) {
                for (let j = i + 1; j < projectedStars.length; j++) {
                    const s1 = projectedStars[i];
                    const s2 = projectedStars[j];

                    // Check distance
                    const dx = s1.x - s2.x;
                    const dy = s1.y - s2.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < 90) {
                        // Check depth similarity to make structures look layered
                        const depthDiff = Math.abs(s1.depth - s2.depth);
                        if (depthDiff < 0.25) {
                            const alpha = (1 - (dist / 90)) * 0.07;
                            ctx.beginPath();
                            ctx.moveTo(s1.x, s1.y);
                            ctx.lineTo(s2.x, s2.y);
                            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`; // faint purple line
                            ctx.stroke();
                        }
                    }
                }
            }

            // Draw and update shooting stars
            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const ss = shootingStars[i];
                ss.x += ss.vx;
                ss.y += ss.vy;
                ss.life -= ss.decay;

                if (ss.life <= 0) {
                    shootingStars.splice(i, 1);
                    continue;
                }

                // Draw gradient tail
                const tailGlow = ctx.createLinearGradient(
                    ss.x, ss.y, 
                    ss.x - ss.vx * 3, ss.y - ss.vy * 3
                );
                tailGlow.addColorStop(0, `rgba(255, 255, 255, ${ss.life * 0.9})`);
                tailGlow.addColorStop(0.3, `rgba(6, 182, 212, ${ss.life * 0.5})`); // cyan glow
                tailGlow.addColorStop(1, 'rgba(192, 38, 211, 0)'); // fade to fuchsia transparent

                ctx.beginPath();
                ctx.moveTo(ss.x, ss.y);
                ctx.lineTo(ss.x - ss.vx * 3, ss.y - ss.vy * 3);
                ctx.strokeStyle = tailGlow;
                ctx.lineWidth = ss.width;
                ctx.stroke();

                // Draw head glow
                ctx.beginPath();
                ctx.arc(ss.x, ss.y, ss.width * 1.5, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${ss.life})`;
                ctx.fill();
            }

            // Periodically trigger shooting stars
            if (Math.random() < 0.003) {
                spawnShootingStar();
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