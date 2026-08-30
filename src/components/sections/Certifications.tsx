import { useEffect, useState } from 'react';
import Section from '../Section';
import { Award, Briefcase, X, ZoomIn } from 'lucide-react';

interface Cert {
  title: string;
  org: string;
  period: string;
  color: string;
  iconBg: string;
  iconColor: string;
  badgeColor: string;
  points: string[];
  image: string | null;
}

const certs: Cert[] = [
  {
    title: 'Google AI-ML Virtual Internship',
    org: 'Eduskills (AICTE)',
    period: 'April 2025 – June 2025',
    color: 'hover:border-blue-500/30',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    points: [
      'Fundamentals of Artificial Intelligence and Machine Learning.',
      'Hands on projects using Google Developer tools.',
      'Exposure to real-world applications of AI across industries.',
    ],
    image: '${import.meta.env.BASE_URL}cert-google.png',
  },
  {
    title: 'Java Full Stack Development Internship',
    org: 'EduSkills (AICTE)',
    period: 'Aug 2026',
    color: 'hover:border-emerald-500/30',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
    badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    points: [
      'Completed an 8-week internship credential in Java Full Stack development.',
      'HTML, CSS, Bootstrap, JavaScript & jQuery for responsive front-end development.',
      'Core & Advanced Java, Spring Framework, Spring Boot, and Hibernate ORM.',
      'MySQL, Git & version control.',
    ],
    image: '${import.meta.env.BASE_URL}cert-eduskills.png',
  },
  {
    title: 'AWS Academy Graduate – Data Engineering',
    org: 'AWS Academy',
    period: 'Dec 30, 2025',
    color: 'hover:border-orange-500/30',
    iconBg: 'bg-orange-500/20',
    iconColor: 'text-orange-400',
    badgeColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    points: [
      '40 course hours completed.',
      'AWS Academy Data Engineering training badge.',
      'Digital badge verified on Credly.',
    ],
    image: '${import.meta.env.BASE_URL}cert-aws.png',
  },
];

export default function Certifications() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox]);

  return (
    <Section id="certifications" title="Certifications & Experience">
      {/* Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-md sm:max-w-lg w-full flex flex-col items-center animate-fadeInUp"
            style={{ animationDuration: '0.25s' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              aria-label="Close"
              className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src={lightbox}
              alt="Certificate"
              className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-xl shadow-2xl border border-white/10 bg-white"
            />
            <p className="mt-3 text-xs text-gray-500">Tap outside, press Esc, or use the close button to dismiss</p>
          </div>
        </div>
      )}

      <div className="space-y-5 max-w-3xl mx-auto">
        {certs.map((cert) => (
          <div
            key={cert.title}
            className={`p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group ${cert.color} transition-all duration-300`}
          >
            <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${cert.iconBg} flex items-center justify-center ${cert.iconColor} flex-shrink-0`}>
                  {cert.title.includes('Google') ? <Briefcase className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white leading-tight">{cert.title}</h3>
                  <p className="text-xs text-gray-400 mt-0.5 font-light">{cert.org}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-xs font-mono px-3 py-1 rounded-full border ${cert.badgeColor}`}>
                  {cert.period}
                </span>
                {cert.image && (
                  <button
                    onClick={() => setLightbox(cert.image)}
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all"
                    title="View Certificate"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <ul className="space-y-1 ml-12">
              {cert.points.map((p) => (
                <li key={p} className="text-sm text-gray-400 font-light flex items-start gap-2">
                  <span className="text-gray-600 mt-1">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
