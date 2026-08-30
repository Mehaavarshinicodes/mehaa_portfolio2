import React from 'react';
import Section from '../Section';

const skills = [
  'Python', 'JavaScript', 'TypeScript', 'SQL', 'C++', 'Java',
  'React', 'Flask', 'Pandas', 'Scikit-learn', 'Matplotlib', 'NumPy',
  'Machine Learning', 'Data Analysis', 'Microsoft Azure', 'Git', 'GitHub',
  'Tailwind CSS', 'Vite', 'VS Code',
];

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <div className="flex flex-wrap gap-4 max-w-3xl mx-auto justify-center">
        {skills.map((skill) => (
          <div
            key={skill}
            className="relative px-5 py-3 rounded-2xl text-gray-100 text-sm font-medium select-none
              bg-white/10 backdrop-blur-xl border border-white/20
              shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25),0_8px_20px_-8px_rgba(0,0,0,0.5)]
              hover:bg-white/20 hover:border-white/30 hover:-translate-y-1 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_16px_30px_-10px_rgba(56,189,248,0.35)]
              transition-all duration-300 cursor-default overflow-hidden"
          >
            {/* glass sheen */}
            <span className="pointer-events-none absolute -top-1/2 -left-1/4 w-1/2 h-[200%] bg-gradient-to-r from-white/25 to-transparent -rotate-12 blur-md" />
            <span className="relative z-10">{skill}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
