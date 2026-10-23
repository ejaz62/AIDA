import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, GraduationCap, Shield } from 'lucide-react';

interface HeaderProps {
  onOpenEnquiry: (courseTitle?: string) => void;
  onOpenArchitecture: () => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEnquiry, onOpenArchitecture, onOpenAdmin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'What You Will Learn', href: '#what-you-will-learn' },
    { label: 'Business Solutions', href: '#business-solutions' },
    { label: 'Courses', href: '#programmes' },
    { label: 'Claude Academy', href: '#claude-academy' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full max-w-full overflow-x-clip border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-2 sm:gap-6 px-3.5 sm:px-6 lg:px-8 w-full min-w-0">
        
        {/* Zone 1: Prominent Academy Name Wordmark (Flex-responsive with min-w-0 to prevent overflow) */}
        <a
          href="#home"
          className="group flex items-center gap-2.5 sm:gap-3.5 min-w-0 flex-1 sm:flex-initial text-decoration-none overflow-hidden"
        >
          <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-950/50 text-cyan-400 group-hover:border-cyan-400/80 transition-colors">
            <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-display text-[16px] sm:text-2xl lg:text-[25px] font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors truncate">
              AIDA DIGITAL ACADEMY
            </span>
            <span className="hidden sm:block text-xs font-semibold tracking-wider uppercase text-cyan-400/90 truncate">
              Artificial Intelligence Digital Academy
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation links with 17-19px typography (Arial Bold) */}
        <nav className="hidden xl:flex items-center gap-6 text-[17px] font-bold text-slate-200 shrink-0">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="whitespace-nowrap shrink-0 hover:text-cyan-400 transition-colors py-1.5 relative hover:after:w-full after:transition-all after:duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-400"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={onOpenArchitecture}
            className="text-[15px] font-medium text-slate-400 hover:text-cyan-300 transition-colors underline-offset-4 hover:underline cursor-pointer whitespace-nowrap"
            title="View future platform architecture for Claude Code expansion"
          >
            Roadmap
          </button>
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[14px] font-bold rounded-lg border border-slate-800 bg-slate-900 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors cursor-pointer whitespace-nowrap"
            title="Open Admin Portal to manage courses and database"
          >
            <Shield className="h-3.5 w-3.5 text-cyan-400" />
            <span>Admin</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action button with 17-19px typography & mobile toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => onOpenEnquiry()}
            className="hidden sm:inline-flex items-center gap-2.5 px-5 py-2.5 text-[17px] font-bold tracking-wide text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors whitespace-nowrap shadow-sm shadow-cyan-950/40 cursor-pointer"
          >
            <span>Explore Programmes</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 sm:p-2.5 text-slate-200 hover:text-white rounded-xl border border-slate-800 bg-slate-900 focus:outline-none shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-800 bg-slate-950/98 px-6 py-6 shadow-2xl">
          <div className="flex flex-col gap-4">
            <div className="pb-3 border-b border-slate-800/80">
              <span className="font-display text-xl font-bold text-white block">
                AIDA DIGITAL ACADEMY
              </span>
              <span className="text-xs font-medium text-cyan-400">
                Artificial Intelligence Digital Academy · Lahore
              </span>
            </div>
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-lg font-semibold text-slate-200 hover:text-cyan-400 py-2 border-b border-slate-900"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center justify-between py-2 border-b border-slate-900">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenArchitecture();
                }}
                className="text-left text-base text-slate-400 hover:text-cyan-400 cursor-pointer"
              >
                Platform Roadmap (Claude Code)
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-sm font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 rounded-lg cursor-pointer"
              >
                <Shield className="h-4 w-4" />
                <span>Admin Portal</span>
              </button>
            </div>
            <div className="pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 text-[17px] font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors cursor-pointer"
              >
                <span>Explore Programmes</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
