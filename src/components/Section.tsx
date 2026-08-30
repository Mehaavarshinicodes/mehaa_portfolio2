import { useEffect, useRef, useState } from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  /** Font family used for the section heading. Defaults to 'heading' (Montserrat). */
  titleFont?: 'heading' | 'encrypt';
}

// Smooth ease-out curve so the reveal settles instead of ending linearly.
function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

export default function Section({ id, title, children, titleFont = 'heading' }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0); // 0 = not yet revealed, 1 = fully revealed

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // Progress climbs as the section's top rises from the bottom of the
      // viewport (0) up to ~35% of the viewport height (1), then holds.
      const raw = (vh - rect.top) / (vh * 0.75);
      const clamped = Math.min(Math.max(raw, 0), 1);
      setProgress(easeOutCubic(clamped));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const revealed = progress > 0.02;

  return (
    <section
      id={id}
      ref={sectionRef}
      className="py-16 px-4 sm:px-6 lg:px-8 text-white flex flex-col items-center justify-center border-t border-white/5 relative overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* Ambient glow — drifts and brightens with scroll progress for a subtle parallax feel */}
      <div
        className="absolute top-1/2 left-1/2 w-[60%] h-[60%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none transition-[opacity] duration-300"
        style={{
          transform: `translate(-50%, calc(-50% + ${(1 - progress) * 40}px)) scale(${0.85 + progress * 0.15})`,
          opacity: 0.5 + progress * 0.5,
        }}
      />

      <div className="max-w-5xl w-full relative z-10">
        {/* Title: rises with a slight 3D tilt-up and un-blurs as it settles */}
        <div className="flex flex-col items-center mb-10" style={{ transformStyle: 'preserve-3d' }}>
          <h2
            className={`text-3xl md:text-4xl ${titleFont === 'encrypt' ? 'font-encrypt tracking-wide' : 'font-heading tracking-tight'} font-bold text-center text-white`}
            style={{
              opacity: progress,
              transform: `translateY(${(1 - progress) * 26}px) rotateX(${(1 - progress) * 14}deg) scale(${0.94 + progress * 0.06})`,
              filter: `blur(${(1 - progress) * 6}px)`,
              transition: revealed ? 'opacity 80ms linear, filter 80ms linear' : undefined,
              willChange: 'transform, opacity, filter',
            }}
          >
            {title}
          </h2>
          <span
            className="mt-3 h-[3px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"
            style={{
              width: `${progress * 96}px`,
              opacity: progress,
            }}
          />
        </div>

        {/* Content: gentle 3D lift-in, slightly delayed relative to the title via a steeper curve */}
        <div
          style={{
            opacity: Math.min(progress * 1.15, 1),
            transform: `translateY(${(1 - progress) * 34}px) scale(${0.965 + progress * 0.035})`,
            filter: `blur(${(1 - progress) * 4}px)`,
            willChange: 'transform, opacity, filter',
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
