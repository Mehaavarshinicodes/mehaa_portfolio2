import { useState } from 'react';
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
      { src: `${import.meta.env.BASE_URL}protosem/week0-forge-lab.jpg`, alt: 'Working session at the FORGE Innovation & Ventures lab' },
      { src: `${import.meta.env.BASE_URL}protosem/week0-team.jpg`, alt: 'With teammates in FORGE polo tees' },
      { src: `${import.meta.env.BASE_URL}protosem/week0-yep-kickoff.jpg`, alt: 'YEP Kickoff Batch 2026 session screen' },
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
  1: {
    subtitle: 'Introduction to Technology, Design Thinking, and Retail',
    photos: [
      { src: `${import.meta.env.BASE_URL}protosem/week1-presentation.jpeg`, alt: 'A presentation on Design Thinking' },
      { src: `${import.meta.env.BASE_URL}protosem/week1-design-thinking.jpeg`, alt: 'Design Thinking session' },
      { src: `${import.meta.env.BASE_URL}protosem/week1-session.jpeg`, alt: 'Team members discussing during a session' },
    ],
    sections: [
      {
        bullets: [
          'Week 1 of the PRICE Protosem program provided an exciting introduction to technology, design thinking, and the retail industry.',
          'Focused on understanding real-world business challenges, developing an entrepreneurial mindset, and exploring how technology can be used to solve industry problems.',
        ],
      },
      {
        heading: 'Day 1 – Tech Talk & Design Thinking',
        bullets: [
          'Attended a Tech Talk on Instagram\'s Recommendation Algorithm, learning how data-driven systems personalize user experiences and influence content discovery.',
          'Participated in a Design Thinking session conducted by Dr. Lakshmi Meera, exploring user-centric problem-solving approaches.',
          'Gained an overview of the Food & Beverages Retail Industry, understanding its structure, stakeholders, and current trends.',
        ],
      },
      {
        heading: 'Day 2 – Industry Analysis',
        bullets: [
          'Explored the Value Chain and SWOT Analysis of the Food & Beverages sector as a team.',
          'Identified key business processes, strengths, weaknesses, opportunities, and challenges within the industry, laying the foundation for future problem identification and solution development.',
        ],
      },
      {
        heading: 'Day 3 – Decision Making & Portfolios',
        bullets: [
          'Attended a Tech Talk on Prospect Theory, gaining insights into human decision-making and consumer behavior.',
          'Started building our professional portfolios, learning how to effectively showcase our skills, projects, and achievements.',
        ],
      },
      {
        heading: 'Day 4 & 5 – Inspiration & Leadership',
        bullets: [
          'Attended a Tech Talk on Base44.',
          'Participated in sessions on Goal, Vision, and Glory.',
          'Listened to inspiring guest lectures by Sabareesh Natarajan, Pranesh, and Mounish Thangaraj. Their experiences and perspectives offered valuable lessons on innovation, career growth, leadership, and entrepreneurship.',
        ],
      },
      {
        heading: 'Major Takeaways from Week 1',
        bullets: [
          'Established a strong foundation for the Protosem journey by combining technology, business understanding, design thinking, and personal development.',
          'Encouraged to approach problems with curiosity, creativity, and a solution-oriented mindset.',
        ],
      },
    ],
  },
  2: {
    subtitle: 'Problem Identification, Algorithms, and App Development',
    photos: [
      { src: `${import.meta.env.BASE_URL}protosem/week2-5s-methodology.jpeg`, alt: '5S methodology activity session' },
      { src: `${import.meta.env.BASE_URL}protosem/week2-scratch-meme.png`, alt: 'Team meme created using Scratch' },
      { src: `${import.meta.env.BASE_URL}protosem/week2-app-inventor.png`, alt: 'Building an app using MIT App Inventor' },
    ],
    sections: [
      {
        bullets: [
          'Week 2 was focused on understanding problems, developing logical thinking, and building practical solutions.',
        ],
      },
      {
        heading: 'Day 1 – Problem Statements & 5S',
        bullets: [
          'Our beta team discussed various challenges in the retail industry and identified a potential problem statement to work on.',
          'Attended a session on the 5S methodology and implemented its principles through practical activities, understanding the importance of workplace organization, efficiency, and continuous improvement.',
        ],
      },
      {
        heading: 'Day 2 – Algorithms',
        bullets: [
          'Spent the day learning about algorithms, exploring the fundamentals of coding logic.',
          'Participated in an engaging activity that demonstrated how algorithms work and how different approaches can affect performance, strengthening problem-solving and computational thinking skills.',
        ],
      },
      {
        heading: 'Day 3 – Scratch',
        bullets: [
          'Introduced to Scratch, a visual programming platform.',
          'Created a meme using Scratch as part of a team activity and won first place among the participating teams — a fun and interactive way to understand programming concepts and logic building.',
        ],
      },
      {
        heading: 'Day 4 – Validation & App Development',
        bullets: [
          'Spent the first half of the day validating and refining problem statements to ensure they addressed real user needs.',
          'Transformed these ideas into functional mobile applications using MIT App Inventor in the second half, gaining hands-on experience in rapid application development and prototyping.',
        ],
      },
      {
        heading: 'Major Takeaways from Week 2',
        bullets: [
          'Moved from identifying problems to developing logical solutions and building working prototypes.',
          'Improved teamwork and creativity through hands-on activities.',
        ],
      },
    ],
  },
  3: {
    subtitle: 'Linux, Automation, Cloud, and Electronics',
    photos: [
      { src: `${import.meta.env.BASE_URL}protosem/week3-linux-setup.jpeg`, alt: 'Setting up and booting a Linux distro' },
      { src: `${import.meta.env.BASE_URL}protosem/week3-docker-cloud.png`, alt: 'Working with Docker and cloud deployment' },
      { src: `${import.meta.env.BASE_URL}protosem/week3-soldering.jpeg`, alt: 'Soldering components on a pin board' },
    ],
    sections: [
      {
        bullets: [
          'Week 3 provided exposure to a wide range of technologies, from operating systems and cloud computing to workflow automation and basic electronics.',
        ],
      },
      {
        heading: 'Day 1 – Linux',
        bullets: [
          'Learned about operating systems, with a particular focus on Linux and its various distributions.',
          'Explored the differences between popular Linux distros and learned how to boot Linux on our laptops.',
          'Built a small project using the Linux environment to reinforce our understanding.',
        ],
      },
      {
        heading: 'Day 2 – Terminal Games, Docker & Cloud',
        bullets: [
          'Developed a terminal-based game in Linux, becoming more comfortable with the command line and programming fundamentals.',
          'Introduced to containerization using Docker and learned how containers simplify application deployment.',
          'Deployed our game and gained an introduction to cloud technologies and their real-world applications.',
        ],
      },
      {
        heading: 'Day 3 – Workflow Automation',
        bullets: [
          'Explored tools and techniques for automating repetitive tasks and improving productivity.',
          'Connected my Obsidian vault to Antigravity as a practical implementation, creating a workflow that automatically updates the Protosem section of my portfolio every week — demonstrating the power of automation in reducing manual effort and maintaining consistency.',
        ],
      },
      {
        heading: 'Day 4 – Electronics Fundamentals',
        bullets: [
          'Introduced to the fundamentals of electrical and electronic components.',
          'Built and tested various circuit simulations using Tinkercad while conducting interactive experiments to better understand how electrical systems work.',
        ],
      },
      {
        heading: 'Day 5 – Multimeters & Soldering',
        bullets: [
          'Learned how to use a multimeter to measure electrical quantities and troubleshoot circuits.',
          'Moved to hands-on hardware work by building a circuit on a pin board and soldering the components together, gaining practical experience in circuit assembly and electronics prototyping.',
        ],
      },
      {
        heading: 'Major Takeaways from Week 3',
        bullets: [
          'Combined software, automation, cloud concepts, and hardware fundamentals into one well-rounded week.',
          'Connected theory with practical implementation across multiple domains.',
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
