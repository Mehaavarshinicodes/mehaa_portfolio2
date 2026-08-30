import React, { useEffect, useRef, useState } from 'react';
import { Mail, Send, ArrowUp, Rss } from 'lucide-react';

const EMAIL = 'mehaavarshini@gmail.com';

const socials = [
  {
    name: 'GitHub',
    href: 'https://github.com/Mehaavarshinicodes',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mehaavarshini',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'Substack',
    href: 'https://amimehaa.substack.com',
    icon: <Rss className="w-5 h-5" />,
  },
  {
    name: 'Email',
    href: `mailto:${EMAIL}`,
    icon: <Mail className="w-5 h-5" />,
  },
];

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name || 'a visitor'}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative w-full border-t border-white/10 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div
        ref={ref}
        className={`relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 transition-all duration-700 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Left: heading + socials */}
          <div className="flex flex-col justify-between">
            <div className="relative">
              {/* floating accents */}
              <span className="hidden md:block absolute -top-10 left-4 text-3xl animate-float select-none" style={{ animationDelay: '0s' }}>💻</span>
              <span className="hidden md:block absolute -top-6 right-8 text-2xl animate-float select-none" style={{ animationDelay: '1.2s' }}>☕</span>
              <span className="hidden md:block absolute top-24 -left-6 text-2xl animate-float select-none" style={{ animationDelay: '2.1s' }}>🤖</span>

              <p className="text-blue-400 font-display text-xs font-medium tracking-[0.3em] uppercase mb-4 opacity-70">
                Let's Connect
              </p>
              <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.05]">
                Let's build
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                  something cool
                </span>
                <br />
                together<span className="font-script text-blue-300 text-5xl md:text-6xl">.</span>
              </h2>
              <p className="mt-4 text-gray-400 font-light text-sm max-w-sm leading-relaxed">
                I'm always happy to chat about AI/ML, opportunities, or collaborations. Reach out — I usually reply within a day or two.
              </p>
            </div>

            <div className="flex items-center gap-3 mt-8">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                  title={s.name}
                  className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-blue-500/20 hover:border-blue-500/40 hover:text-blue-400 hover:-translate-y-1 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right: contact form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-400 tracking-wide uppercase">Name</label>
              <input
                required
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-400 tracking-wide uppercase">Email</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-400 tracking-wide uppercase">Message</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="What's on your mind?"
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="mt-2 flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-blue-500/90 hover:bg-blue-500 text-white text-sm font-medium transition-all duration-200 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]"
            >
              {sent ? 'Opening your email app…' : 'Send Message'}
              <Send className="w-4 h-4" />
            </button>
            <p className="text-xs text-gray-500 text-center">
              This opens your email app addressed to {EMAIL}. Prefer to just email directly? <a href={`mailto:${EMAIL}`} className="text-blue-400 hover:underline">Click here</a>.
            </p>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs font-light tracking-wide">
            © {new Date().getFullYear()} Mehaavarshini. Built with React &amp; a lot of coffee.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-blue-400 transition-colors group"
          >
            Back to top
            <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-blue-500/40 group-hover:-translate-y-0.5 transition-all duration-200">
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
