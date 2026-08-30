
import { Menu, X, Download } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { name: 'About Me', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Blogs', href: '#blogs' },
  { name: 'Protosem', href: '#protosem' },
];

const RESUME_PATH = '/docs/Mehaavarshini_J_Resume.pdf';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex-shrink-0">
            <a href="#" className="text-white font-heading font-bold text-xl tracking-tighter">
              MEHAAVARSHINI
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors group"
                >
                  {link.name}
                  <span className="absolute left-3 right-3 -bottom-0.5 h-[1.5px] bg-blue-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
                </a>
              ))}
              <a
                href={RESUME_PATH}
                download="Mehaavarshini_J_Resume.pdf"
                className="ml-2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/90 hover:bg-blue-500 text-white text-sm font-medium transition-all duration-200 hover:shadow-[0_0_16px_rgba(56,189,248,0.4)]"
              >
                <Download className="w-3.5 h-3.5" />
                Resume
              </a>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </a>
            ))}
            <a
              href={RESUME_PATH}
              download="Mehaavarshini_J_Resume.pdf"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-white bg-blue-500/90 hover:bg-blue-500 px-3 py-2 rounded-md text-base font-medium mt-1"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
