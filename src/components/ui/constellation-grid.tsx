'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    baseX: number;
    baseY: number;
    radius: number;
    label: string;
    pulse: number;
}

export default function ConstellationGrid() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;

        const mouse = {
            x: -1000,
            y: -1000,
            prevX: -1000,
            prevY: -1000,
            vx: 0,
            vy: 0,
            radius: 220,
        };

        let nodes: Node[] = [];

        const handleResize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);
            initNodes();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        const initNodes = () => {
            nodes = [];
            const spacing = 55;
            const cols = Math.ceil(width / spacing) + 1;
            const rows = Math.ceil(height / spacing) + 1;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * spacing;
                    const y = j * spacing;
                    nodes.push({
                        x,
                        y,
                        vx: 0,
                        vy: 0,
                        baseX: x,
                        baseY: y,
                        radius: Math.random() * 1.2 + 1.2,
                        label: `${(i * 7).toString(16).toUpperCase()}:${(j * 11).toString(16).toUpperCase()}`,
                        pulse: Math.random() * Math.PI * 2,
                    });
                }
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        let lastTime = performance.now();

        const render = (now: number) => {
            const dt = Math.min((now - lastTime) / 1000, 0.05);
            lastTime = now;

            mouse.vx = (mouse.x - mouse.prevX) / (dt * 1000 || 1);
            mouse.vy = (mouse.y - mouse.prevY) / (dt * 1000 || 1);
            mouse.prevX = mouse.x;
            mouse.prevY = mouse.y;

            const speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);

            // Black-to-blue gradient background
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, '#000000');
            gradient.addColorStop(1, '#020d1f');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            const nodeColor = '255, 255, 255';
            const accentColor = '56, 189, 248';

            const SPRING_K = 18;
            const DAMPING = 0.82;

            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                n.pulse += dt * 3;

                const dx = mouse.x - n.x;
                const dy = mouse.y - n.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius && dist > 0) {
                    const power = (1 - dist / mouse.radius);
                    const force = power * (1500 + speed * 150);
                    const angle = Math.atan2(dy, dx);
                    n.vx -= Math.cos(angle) * force * dt;
                    n.vy -= Math.sin(angle) * force * dt;
                }

                const homeDx = n.baseX - n.x;
                const homeDy = n.baseY - n.y;
                n.vx += homeDx * SPRING_K * dt;
                n.vy += homeDy * SPRING_K * dt;
                n.vx *= DAMPING;
                n.vy *= DAMPING;
                n.x += n.vx * dt * 60;
                n.y += n.vy * dt * 60;
            }

            const MAX_CONN_DIST = 75;
            const MAX_CONN_DIST_SQ = MAX_CONN_DIST * MAX_CONN_DIST;

            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                for (let j = i + 1; j < nodes.length; j++) {
                    const n2 = nodes[j];
                    const ndx = n.x - n2.x;
                    const ndy = n.y - n2.y;
                    const distSq = ndx * ndx + ndy * ndy;

                    if (distSq < MAX_CONN_DIST_SQ) {
                        const nDist = Math.sqrt(distSq);
                        const alpha = (1 - nDist / MAX_CONN_DIST) * 0.18;
                        ctx.strokeStyle = `rgba(${nodeColor}, ${alpha})`;
                        ctx.lineWidth = 0.7;
                        ctx.beginPath();
                        ctx.moveTo(n.x, n.y);
                        ctx.lineTo(n2.x, n2.y);
                        ctx.stroke();
                    }
                }
            }

            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                const dx = mouse.x - n.x;
                const dy = mouse.y - n.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const isNear = dist < mouse.radius;

                const baseAlpha = isNear ? 0.95 : 0.25 + Math.sin(n.pulse) * 0.1;
                ctx.fillStyle = isNear
                    ? `rgba(${accentColor}, ${baseAlpha})`
                    : `rgba(${nodeColor}, ${baseAlpha})`;

                const currentRadius = isNear
                    ? n.radius * 2.2
                    : n.radius + Math.sin(n.pulse) * 0.3;

                ctx.beginPath();
                ctx.arc(n.x, n.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
                ctx.fill();

                if (dist < 90) {
                    const pulseRing = ((n.pulse * 20) % 30) + 4;
                    const ringAlpha = (1 - pulseRing / 34) * 0.4;
                    ctx.strokeStyle = `rgba(${accentColor}, ${ringAlpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, pulseRing, 0, Math.PI * 2);
                    ctx.stroke();

                    ctx.font = '8px ui-monospace, SFMono-Regular, Consolas, monospace';
                    ctx.fillStyle = `rgba(${accentColor}, 0.85)`;
                    ctx.fillText(n.label, n.x + 10, n.y - 10);
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isDarkMode]);

    return (
        <div className="relative w-full h-screen overflow-hidden select-none" style={{ background: 'linear-gradient(135deg, #000000 0%, #020d1f 100%)' }}>
            <canvas ref={canvasRef} className="absolute inset-0 block cursor-crosshair" />

            {/* Hero Text Overlay */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4 pointer-events-none">
                <p className="text-blue-400 font-display text-xs font-medium tracking-[0.3em] uppercase mb-6 opacity-70 animate-fadeInUp">Computer Science Engineering · KCT, Coimbatore</p>
                <h1 className="tracking-tight leading-none text-white">
                    <span
                        className="block font-script text-7xl md:text-9xl text-blue-300 leading-[0.9] drop-shadow-[0_0_25px_rgba(56,189,248,0.35)] animate-heroPopIn"
                        style={{ animationDelay: '80ms' }}
                    >
                        Hi,
                    </span>
                    <span className="block font-heading text-5xl md:text-7xl font-extrabold tracking-tight mt-2">
                        <span className="inline-block animate-heroWordIn" style={{ animationDelay: '520ms' }}>I'm&nbsp;</span>
                        <span className="inline-block animate-heroWordIn" style={{ animationDelay: '680ms' }}>Mehaavarshini</span>
                    </span>
                </h1>
                <p className="mt-6 font-sans text-base md:text-lg text-gray-400 font-light tracking-wide max-w-xl leading-relaxed animate-fadeInUp" style={{ animationDelay: '1450ms' }}>
                    Prefinal year CSE student working on AI &amp; ML. Active member of my college's ACM club, and currently doing a Protosem at Forge Innovation and Ventures.
                </p>
                <a
                    href="#about"
                    className="pointer-events-auto mt-10 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-sm animate-fadeInUp"
                    style={{ animationDelay: '1650ms' }}
                >
                    Explore ↓
                </a>
            </div>
        </div>
    );
}
