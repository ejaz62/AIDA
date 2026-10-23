import React from 'react';
import { FOUNDER_DATA } from '../data/academyData';
import { GraduationCap, Mail, Phone, MapPin, Globe, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenArchitecture: () => void;
  onExploreProgrammes: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenArchitecture, onExploreProgrammes, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-300 overflow-hidden w-full max-w-full">
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-18 w-full min-w-0">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-14 pb-12 sm:pb-14 border-b border-slate-900 min-w-0">
          
          {/* Brand & Overview */}
          <div className="lg:col-span-5 space-y-4 min-w-0">
            <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-950/50 text-cyan-400 shrink-0">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-white tracking-tight break-words">
                AIDA DIGITAL ACADEMY
              </span>
            </div>

            <p className="text-[15px] sm:text-[17px] text-slate-300 leading-relaxed max-w-md font-normal break-words">
              <strong className="text-white font-bold">Artificial Intelligence Digital Academy</strong> — Empowering beginners, developers, and entrepreneurs with practical AI tools, agentic workflows, website creation, and WhatsApp digital employees.
            </p>

            <div className="text-[14px] sm:text-base text-slate-300 space-y-1.5 pt-2">
              <div>Founder: <strong className="text-white font-bold">{FOUNDER_DATA.name}</strong></div>
              <div>Headquarters: <strong className="text-white font-bold">{FOUNDER_DATA.location}</strong></div>
              <div>Target Domain: <span className="text-cyan-400 font-bold break-all">{FOUNDER_DATA.preferredDomain}</span></div>
            </div>
          </div>

          {/* Quick Navigation Links (15-16px Arial) */}
          <div className="lg:col-span-3 space-y-4 min-w-0">
            <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-[14px] sm:text-base">
              <li>
                <a href="#home" className="hover:text-cyan-400 transition-colors">Home Overview</a>
              </li>
              <li>
                <a href="#what-you-will-learn" className="hover:text-cyan-400 transition-colors">What You Will Learn</a>
              </li>
              <li>
                <a href="#business-solutions" className="hover:text-cyan-400 transition-colors">Practical Business Solutions</a>
              </li>
              <li>
                <a href="#programmes" className="hover:text-cyan-400 transition-colors">Courses Catalog</a>
              </li>
              <li>
                <a href="#claude-academy" className="hover:text-cyan-400 transition-colors">Claude Academy Credentials</a>
              </li>
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">About & Founder</a>
              </li>
              <li>
                <a href="#why-aida" className="hover:text-cyan-400 transition-colors">Instructional Principles</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact & Admissions</a>
              </li>
              <li className="pt-1">
                <button
                  onClick={onOpenAdmin}
                  className="text-cyan-400 hover:text-cyan-300 hover:underline font-bold transition-colors cursor-pointer text-left"
                >
                  Admin Portal & DB
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Transparency */}
          <div className="lg:col-span-4 space-y-4 min-w-0">
            <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">
              Official Communication
            </h4>

            <div className="space-y-3 text-[14px] sm:text-base">
              <div className="flex items-center gap-3 min-w-0">
                <Mail className="h-5 w-5 text-cyan-400 shrink-0" />
                <a
                  href={`mailto:${FOUNDER_DATA.email}`}
                  className="hover:text-cyan-300 transition-colors break-all font-bold text-white text-xs sm:text-sm"
                >
                  {FOUNDER_DATA.email}
                </a>
              </div>

              <div className="flex items-center gap-3 min-w-0">
                <Phone className="h-5 w-5 text-cyan-400 shrink-0" />
                <a
                  href={`tel:${FOUNDER_DATA.mobile.replace(/\s+/g, '')}`}
                  className="hover:text-cyan-300 transition-colors font-bold text-white text-xs sm:text-sm"
                >
                  {FOUNDER_DATA.mobile}
                </a>
              </div>

              <div className="flex items-center gap-3 min-w-0">
                <MapPin className="h-5 w-5 text-cyan-400 shrink-0" />
                <span className="text-white font-bold text-xs sm:text-sm">{FOUNDER_DATA.location}</span>
              </div>

              <div className="flex items-center gap-3 min-w-0">
                <Globe className="h-5 w-5 text-cyan-400 shrink-0" />
                <span className="text-cyan-400 font-bold break-all text-xs sm:text-sm">{FOUNDER_DATA.preferredDomain}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenArchitecture}
                className="text-[14px] sm:text-base text-cyan-400 hover:text-cyan-300 hover:underline inline-flex items-center gap-1.5 cursor-pointer font-bold text-left"
              >
                Inspect Claude Code Expansion Blueprint →
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar (15-16px Arial) */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] sm:text-[15px] text-slate-400 font-normal text-center sm:text-left min-w-0">
          <div className="break-words">
            © {new Date().getFullYear()} AIDA DIGITAL ACADEMY. All rights reserved.
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 min-w-0">
            <span className="text-balance text-xs sm:text-sm">Anthropic Claude Academy is attributed to Anthropic PBC.</span>
            <button
              onClick={scrollToTop}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer shrink-0"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
