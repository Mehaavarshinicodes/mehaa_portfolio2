
import Section from '../Section';
import StickyPhoto from '../StickyPhoto';
import { Bot, Activity } from 'lucide-react';

const GithubIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const projects = [
  {
    name: 'Treatment Feasibility Predictor',
    caption: 'check it out',
    description: 'A machine learning application that predicts the feasibility of specific medical treatments for patients based on health parameters, aiding clinical decision-making.',
    image: '/projects/treatment-feasibility.jpg',
    icon: <Activity className="w-6 h-6" />,
    iconBg: 'bg-purple-500/20',
    iconColor: 'text-purple-400',
    borderHover: 'hover:border-purple-500/30',
    tags: ['Python', 'Scikit-learn', 'Flask', 'ML'],
    github: 'https://github.com/Mehaavarshinicodes/treatment_app',
  },
  {
    name: 'NutriSouthAI',
    caption: 'peek inside',
    description: 'An AI-powered diet recommendation system tailored for South Indian dietary preferences, designed to help diabetic patients achieve better nutritional balance using machine learning.',
    image: '/projects/nutrisouthai.jpg',
    icon: <Bot className="w-6 h-6" />,
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    borderHover: 'hover:border-blue-500/30',
    tags: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib'],
    github: 'https://github.com/Mehaavarshinicodes/NutriSouthAI',
  },
];

export default function Projects() {
  return (
    <Section id="projects" title="Projects I've built">
      <div className="flex flex-col gap-16 max-w-4xl mx-auto">
        {projects.map((project, idx) => {
          const imageLeft = idx % 2 === 0;
          return (
            <div
              key={project.name}
              className={`flex flex-col ${imageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-14`}
            >
              <StickyPhoto
                src={project.image}
                alt={project.name}
                caption={project.caption}
                rotate={imageLeft ? -6 : 6}
                size="lg"
              />

              <div
                className={`flex-1 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm group ${project.borderHover} transition-all duration-300 w-full`}
              >
                <div className="flex items-start justify-between mb-4 gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl ${project.iconBg} flex items-center justify-center ${project.iconColor} flex-shrink-0`}>
                      {project.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white tracking-tight">{project.name}</h3>
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 text-xs font-medium transition-all duration-200"
                  >
                    <GithubIcon />
                    View on GitHub
                  </a>
                </div>

                <p className="text-gray-400 leading-relaxed mb-6 text-sm font-light">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-xs rounded-full bg-white/10 text-gray-300 border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
