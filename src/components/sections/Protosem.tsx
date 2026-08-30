import React, { useState } from 'react';
import Section from '../Section';
import { Lock, X } from 'lucide-react';

const weeks = Array.from({ length: 21 }, (_, i) => i); // 0..20

type Bullet = string | { text: string; subBullets: string[] };

interface WeekSection {
  heading?: string;
  bullets: Bullet[];
}

interface WeekDetail {
  subtitle: string;
  sections: WeekSection[];
  photos: { src: string; alt: string }[];
}

const weekDetails: Record<number, WeekDetail> = {
  0: {
    subtitle: 'at PRICE Protosem – Key Highlights',
    photos: [
      { src: '/protosem/week0-forge-lab.jpg', alt: 'Working session at the FORGE Innovation & Ventures lab' },
      { src: '/protosem/week0-team.jpg', alt: 'With teammates in FORGE polo tees' },
      { src: '/protosem/week0-yep-kickoff.jpg', alt: 'YEP Kickoff Batch 2026 session screen' },
    ],
    sections: [
      {
        bullets: [
          'Joined PRICE (Phygital Retail Intelligent Commerce & Entrepreneurship) at FORGE Innovation & Ventures, KCT Tech Park after receiving a second opportunity to apply and successfully clearing the interview.',
          'Attended Fusion 360 sessions before the program began, gaining early exposure to the protosem learning environment.',
        ],
      },
      {
        heading: 'Day 1 – New Faces and New Spaces',
        bullets: [
          'Participated in an ice-breaker activity and interacted with fellow participants.',
          {
            text: 'Took a tour of FORGE, exploring:',
            subBullets: ['3D Printing Machines', 'Laser Cutting Machines', 'HW Junction', 'Innovation workspaces and prototyping facilities'],
          },
        ],
      },
      {
        heading: 'Day 2 – Understanding Ourselves',
        bullets: [
          'Completed the 16 Personalities Test and identified as INFP (Mediator).',
          'Explored Zen Pencils comics.',
          'Presented insights on "Life\'s Pursuit" by Dr. A.P.J. Abdul Kalam, focusing on dreams, goals, and purpose.',
        ],
      },
      {
        heading: 'Day 3 – Teamwork and Challenges',
        bullets: [
          'Formed the first Beta Teams.',
          'Attended an introductory session on IDEX.',
          'Participated in the Imposter Game.',
          'Took part in the Marshmallow Tower Challenge, learning the importance of teamwork, communication, and following instructions.',
        ],
      },
      {
        heading: 'Day 4 – Technology and Leadership',
        bullets: [
          'Attended a Tech Talk on Prompt Engineering by Bhuvanesh.',
          'Served as the Emcee for the PRICE Inauguration Ceremony.',
          'Experienced first-time college event emceeing, developing confidence in public speaking.',
          'Listened to insights from Mr. Kumar Rajagopalan, CEO of the Retailers Association of India (RAI).',
        ],
      },
      {
        heading: 'Day 5 – Reflection and Future Opportunities',
        bullets: [
          'Participated in the YEP Kickoff Session for Entrepreneur\'s Day.',
          {
            text: 'Heard from entrepreneurs:',
            subBullets: ['Mr. Ramakrishna (Founder, Thulsi Pharmacy)', 'Mrs. Swathi (Founder, A Toddle Thing; KCT Alumna)'],
          },
          'Took part in a week recap and reflection session.',
        ],
      },
      {
        heading: 'Major Takeaways from Week 0',
        bullets: [
          'Built new connections with students across institutions.',
          'Gained exposure to innovation, entrepreneurship, and prototyping.',
          'Learned about personality traits and self-awareness.',
          'Developed teamwork and communication skills through activities.',
          'Enhanced understanding of AI through Prompt Engineering.',
          'Achieved a personal milestone by emceeing a college event.',
          'Experienced the hands-on, experiential learning approach of PRICE Protosem.',
        ],
      },
    ],
  },
};

function BulletItem({ bullet }: { bullet: Bullet }) {
  if (typeof bullet === 'string') {
    return (
      <li className="flex items-start gap-2 text-sm text-gray-300 font-light leading-relaxed">
        <span className="text-blue-400 mt-1.5 text-[6px]">●</span>
        <span>{bullet}</span>
      </li>
    );
  }
  return (
    <li className="text-sm text-gray-300 font-light leading-relaxed">
      <div className="flex items-start gap-2">
        <span className="text-blue-400 mt-1.5 text-[6px]">●</span>
        <span>{bullet.text}</span>
      </div>
      <ul className="mt-1.5 ml-5 space-y-1">
        {bullet.subBullets.map((sub) => (
          <li key={sub} className="flex items-start gap-2 text-sm text-gray-400 font-light leading-relaxed">
            <span className="text-blue-500/60 mt-1.5 text-[5px]">○</span>
            <span>{sub}</span>
          </li>
        ))}
      </ul>
    </li>
  );
}

function WeekDetailPanel({ week, detail, onClose }: { week: number; detail: WeekDetail; onClose: () => void }) {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm animate-fadeInUp">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <p className="text-blue-400 font-display text-xs font-medium tracking-[0.25em] uppercase mb-1 opacity-80">Week {week}</p>
          <h4 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">{detail.subtitle}</h4>
        </div>
        <button
          onClick={onClose}
          aria-label="Close week details"
          className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Photos */}
      {detail.photos.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-8">
          {detail.photos.map((photo) => (
            <div
              key={photo.src}
              className="w-36 sm:w-44 rounded-lg overflow-hidden border border-white/10 shadow-lg hover:scale-105 hover:-translate-y-1 transition-transform duration-300"
            >
              <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover aspect-square" />
            </div>
          ))}
        </div>
      )}

      <div className="space-y-6">
        {detail.sections.map((section, idx) => (
          <div key={idx}>
            {section.heading && (
              <h5 className="text-base font-semibold text-white mb-2 tracking-tight">{section.heading}</h5>
            )}
            <ul className="space-y-2">
              {section.bullets.map((b, i) => (
                <BulletItem key={i} bullet={b} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Protosem() {
  const [activeWeek, setActiveWeek] = useState<number | null>(null);

  return (
    <Section id="protosem" title="Protosem">
      <div className="space-y-10">
        {/* Header card */}
        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-white/10">
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 tracking-tight">Innovation & Prototyping</h3>
          <p className="text-gray-400 max-w-2xl mx-auto font-light leading-relaxed text-sm">
            Protosem is an intensive 20-week program focused on comprehensive product development, rapid prototyping, and solving complex problems.
            Follow my journey week by week as I transform ideas into fully functional, scalable prototypes.
          </p>
        </div>

        {/* Horizontally scrolling roadmap */}
        <div className="space-y-6">
          <p className="text-center text-gray-400 text-sm font-light">Weekly Journal — swipe to explore the roadmap</p>

          <div className="relative">
            {/* fade edges to hint scrollability */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-slate-950 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-slate-950 to-transparent z-10" />

            <div className="overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scroll-smooth scrollbar-hide">
              <div className="relative flex items-center gap-6 min-w-max px-6 py-4">
                {/* connecting line */}
                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-blue-500/10 via-blue-400/40 to-blue-500/10" />

                {weeks.map((week) => {
                  const isActive = activeWeek === week;
                  const hasDetail = Boolean(weekDetails[week]);
                  return (
                    <button
                      key={week}
                      onClick={() => setActiveWeek(isActive ? null : week)}
                      className="relative snap-center flex-shrink-0 group"
                    >
                      <span
                        className={`relative w-20 h-20 rounded-full flex items-center justify-center text-2xl font-heading font-bold transition-all duration-300 z-10
                          ${isActive
                            ? 'bg-gradient-to-br from-blue-400 via-sky-400 to-indigo-500 text-white scale-110 shadow-[0_0_30px_rgba(56,189,248,0.55)]'
                            : 'bg-gradient-to-br from-slate-800 to-slate-900 border border-white/15 text-gray-300 group-hover:from-blue-500/40 group-hover:to-indigo-600/40 group-hover:border-blue-400/40 group-hover:text-white group-hover:-translate-y-1'
                          }`}
                      >
                        {week}
                        {hasDetail && (
                          <span className={`absolute top-1 right-1 w-2.5 h-2.5 rounded-full ${isActive ? 'bg-white' : 'bg-blue-400'} shadow-[0_0_8px_rgba(56,189,248,0.8)]`} />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Detail / update panel */}
        {activeWeek !== null && (
          weekDetails[activeWeek] ? (
            <WeekDetailPanel
              week={activeWeek}
              detail={weekDetails[activeWeek]}
              onClose={() => setActiveWeek(null)}
            />
          ) : (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 border-dashed flex flex-col items-center gap-3 text-center animate-fadeInUp">
              <Lock className="w-5 h-5 text-gray-500" />
              <p className="text-gray-400 text-sm font-light">
                <span className="font-semibold text-white">Week {activeWeek}</span> update coming soon.
              </p>
            </div>
          )
        )}
      </div>
    </Section>
  );
}
