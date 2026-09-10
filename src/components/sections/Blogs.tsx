
import Section from '../Section';
import { ArrowUpRight } from 'lucide-react';

const blogs = [
  {
    title: 'Price Protosem – The Beginning',
    description: 'A reflective piece on the start of my Protosem journey — exploring the highs, the uncertainties, and what it means to build something from scratch.',
    platform: 'Substack',
    link: 'https://amimehaa.substack.com/p/price-protosem-the-beginning',
    date: '2025',
    tag: 'Protosem · Personal',
  },
];

export default function Blogs() {
  return (
    <Section id="blogs" title="Blogs">
      <div className="space-y-6 max-w-3xl mx-auto">
        {blogs.map((blog) => (
          <a
            key={blog.title}
            href={blog.link}
            target="_blank"
            rel="noreferrer"
            className="block p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/30 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-mono text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
                    {blog.tag}
                  </span>
                  <span className="text-xs text-gray-500">{blog.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight group-hover:text-orange-300 transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{blog.description}</p>
              </div>
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-orange-500/20 group-hover:text-orange-400 transition-all duration-200">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </a>
        ))}

      </div>
    </Section>
  );
}
