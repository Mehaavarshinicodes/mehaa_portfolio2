import React from 'react';
import Section from '../Section';
import { GraduationCap, Calendar, Award } from 'lucide-react';

export default function Education() {
  return (
    <Section id="education" title="Education">
      <div className="max-w-3xl mx-auto">
        <div className="p-7 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm relative group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_-15px_rgba(59,130,246,0.3)]">
           <div className="absolute top-0 right-0 p-8 opacity-10">
               <GraduationCap className="w-32 h-32" />
           </div>
           
           <h3 className="text-2xl font-bold text-white mb-2">Bachelor of Engineering in Computer Science Engineering</h3>
           <p className="text-xl text-blue-400 font-mono mb-6">Kumaraguru College of Technology, Coimbatore, Tamil Nadu</p>
           
           <div className="flex flex-col sm:flex-row gap-6 text-gray-300">
               <div className="flex items-center gap-2">
                   <Calendar className="w-5 h-5 text-gray-400" />
                   <span>Sept. 2024 - May 2028</span>
               </div>
               <div className="flex items-center gap-2">
                   <Award className="w-5 h-5 text-white" strokeWidth={1.5} />
                   <span className="font-normal text-white">8.95 CGPA</span>
               </div>
           </div>
        </div>
      </div>
    </Section>
  );
}
