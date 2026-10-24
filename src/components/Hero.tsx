import React, { useState } from 'react';
import { ArrowRight, Sparkles, Terminal, Cpu, Bot, Workflow, Building, Users } from 'lucide-react';
import { FOUNDER_DATA } from '../data/academyData';
import heroStudentsImage from '../assets/images/hero_pakistan_ai_students_1792530100438.jpg';
import heroAidaImage from '../assets/images/hero_aida_academy_1792526770454.jpg';

interface HeroProps {
  onExploreProgrammes: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProgrammes, onContactClick }) => {
  const [activeBanner, setActiveBanner] = useState<'students' | 'academy'>('students');
  const currentBannerImg = activeBanner === 'students' ? heroStudentsImage : heroAidaImage;
  const learningAreas = [
    { title: 'AI Agents & Employees', icon: Bot, desc: 'Build autonomous digital employees for real operational tasks' },
    { title: 'Website Dev Using AI', icon: Terminal, desc: 'Create fast, responsive business websites using AI coding tools' },
    { title: 'AI Agent Deployment', icon: Workflow, desc: 'Configure, deploy, test, and maintain live AI agents in production' },
    { title: 'WhatsApp AI Employees', icon: Sparkles, desc: '24/7 client enquiry handling & support exclusively on WhatsApp' },
    { title: 'Business AI Solutions', icon: Building, desc: 'Deliver practical, high-impact AI implementations for business clients' },
  ];

  return (
    <section id="home" className="relative overflow-hidden w-full max-w-full pt-8 pb-16 sm:pt-10 sm:pb-20 lg:py-24 border-b border-slate-900 bg-slate-950">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="h-[400px] sm:h-[600px] w-full max-w-[800px] rounded-full bg-cyan-900/15 blur-[120px] sm:blur-[160px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 w-full min-w-0">
        
        {/* Top Header Block: Academy Name (Highest Priority), Tagline, Mission, and CTAs */}
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center w-full min-w-0">
          
          {/* Top Academy Kicker */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-base font-bold uppercase tracking-wider text-cyan-400 mb-3 bg-cyan-950/40 border border-cyan-800/40 px-3.5 py-1.5 rounded-full max-w-full">
            <span>Artificial Intelligence Digital Academy</span>
            <span aria-hidden="true" className="text-slate-600 hidden xs:inline">·</span>
            <span className="text-slate-200">Founded by {FOUNDER_DATA.name}</span>
            <span aria-hidden="true" className="text-slate-600 hidden sm:inline">·</span>
            <span className="text-cyan-300 hidden sm:inline">Lahore, Pakistan</span>
          </div>

          {/* HIGHEST PRIORITY: Prominent AIDA DIGITAL ACADEMY Title (48–64px desktop, 32–40px mobile; Arial Bold) */}
          <h1 className="text-[32px] xs:text-[36px] sm:text-[44px] md:text-[54px] lg:text-[62px] xl:text-[64px] font-bold tracking-tight text-white leading-[1.08] text-balance break-words">
            AIDA DIGITAL ACADEMY
          </h1>

          {/* Main Hero Tagline / Heading (44–56px on desktop; Arial Bold) */}
          <h2 className="mt-4 text-[24px] xs:text-[26px] sm:text-[34px] md:text-[42px] lg:text-[48px] font-bold tracking-tight text-slate-100 text-balance leading-tight break-words">
            Learn AI.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-300 to-sky-400">
              Build Intelligent Solutions.
            </span>{' '}
            Shape Your Future.
          </h2>

          {/* Supporting Copy (18–20px typography; Arial Regular) */}
          <p className="mt-5 text-[17px] sm:text-[19px] lg:text-[20px] font-normal text-slate-200 leading-relaxed max-w-3xl text-balance">
            AIDA is a practical educational academy dedicated to modern AI literacy, AI employees, and real-world execution. 
            We empower beginners, working professionals, and digital builders to master AI coding tools, 
            intelligent agents, and automated WhatsApp workflows that power real business results.
          </p>

          {/* Action Buttons (17–19px typography; Arial Bold) - Full width on mobile to prevent overflow */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={onExploreProgrammes}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 text-[16px] sm:text-[18px] font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-xl shadow-cyan-950/60 cursor-pointer text-center"
            >
              <span>Explore Our Programmes</span>
              <ArrowRight className="h-5 w-5 shrink-0" />
            </button>

            <button
              onClick={onContactClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 text-[16px] sm:text-[18px] font-bold text-slate-200 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-colors cursor-pointer shadow-lg text-center"
            >
              <span>Contact AIDA</span>
            </button>
          </div>

          {/* Metadata markers */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-3 sm:gap-x-4 text-[14px] sm:text-base text-slate-300">
            <span className="text-white font-bold">Core Focus:</span>
            <span>Hands-on practice</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span>Beginner-friendly pathways</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span>WhatsApp AI Employees</span>
            <span aria-hidden="true" className="text-slate-600">/</span>
            <span>Marketable client skills</span>
          </div>
        </div>

        {/* ENLARGED HERO BANNER: Full available content width with 450–600px desktop height */}
        <div className="mt-10 sm:mt-14 relative w-full max-w-full overflow-hidden">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl w-full">
            {/* Main high-resolution photograph: Students in Action or Academy Campus */}
            <img
              key={activeBanner}
              src={currentBannerImg}
              alt={activeBanner === 'students' 
                ? "Pakistani male and female students actively learning AI, working on computers, and building autonomous agent solutions at AIDA Digital Academy"
                : "AIDA Digital Academy technology workspace and artificial intelligence learning environment in Lahore, Pakistan"
              }
              referrerPolicy="no-referrer"
              className="w-full max-w-full h-[320px] sm:h-[420px] md:h-[480px] lg:h-[550px] xl:h-[600px] object-cover object-center transform hover:scale-[1.015] transition-transform duration-700"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.dataset.triedPublic) {
                  target.dataset.triedPublic = 'true';
                  target.src = activeBanner === 'students'
                    ? '/assets/images/hero_pakistan.jpg'
                    : '/assets/images/hero_aida.jpg';
                } else if (!target.dataset.triedFallback) {
                  target.dataset.triedFallback = 'true';
                  target.src = activeBanner === 'students' ? heroAidaImage : heroStudentsImage;
                } else {
                  target.style.display = 'none';
                  const fallback = target.parentElement?.querySelector('.img-fallback');
                  if (fallback) fallback.classList.remove('hidden');
                }
              }}
            />

            {/* Fallback in case of image failure */}
            <div className="img-fallback hidden w-full h-[400px] lg:h-[550px] flex-col items-center justify-center p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950 text-center">
              <Cpu className="h-14 w-14 sm:h-16 sm:w-16 text-cyan-400 mb-4 opacity-80" />
              <h3 className="text-2xl sm:text-3xl font-bold text-white">AIDA DIGITAL ACADEMY</h3>
              <p className="mt-2 text-base sm:text-lg font-normal text-slate-300 max-w-lg">
                Practical education in generative AI, Claude AI, intelligent agents, and digital automation.
              </p>
            </div>

            {/* Top-right floating controls & indicator */}
            <div className="absolute top-3 right-3 sm:top-6 sm:right-6 flex flex-col sm:flex-row items-end sm:items-center gap-2">
              <div className="inline-flex items-center p-1 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-700/80 shadow-lg text-[11px] sm:text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveBanner('students')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeBanner === 'students'
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Students Lab
                </button>
                <button
                  type="button"
                  onClick={() => setActiveBanner('academy')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    activeBanner === 'academy'
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  Academy Campus
                </button>
              </div>

              <div className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700/80 text-[11px] sm:text-sm font-bold text-slate-200 shadow-lg">
                <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-cyan-400"></span>
                </span>
                <span>Live Workshops</span>
              </div>
            </div>

            {/* Bottom gradient caption overlay */}
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-7 lg:p-9 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 text-slate-200 min-w-0">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-cyan-400 font-bold uppercase tracking-wider mb-1">
                    <Users className="h-4 w-4 shrink-0" />
                    <span>Modern Collaborative Learning Lab</span>
                  </div>
                  <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-white leading-snug break-words">
                    Pakistani Students Building Next-Gen AI Agents, Automated Workflows & AI Employees
                  </h3>
                  <p className="text-xs sm:text-base text-slate-300 font-normal mt-1 max-w-2xl break-words">
                    Hands-on digital training in Lahore, Pakistan: collaborative pair-programming, AI agent configuration, and practical business automation.
                  </p>
                </div>
                
                <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-xs sm:text-base">
                  <div className="text-left md:text-right">
                    <span className="block text-[11px] sm:text-xs uppercase tracking-wider text-slate-400 font-medium">Academy HQ</span>
                    <span className="font-bold text-white">Lahore, Pakistan</span>
                  </div>
                  <div className="h-6 sm:h-8 w-px bg-slate-700" />
                  <div className="text-left md:text-right">
                    <span className="block text-[11px] sm:text-xs uppercase tracking-wider text-slate-400 font-medium">Official Portal</span>
                    <span className="text-cyan-400 font-bold">learnwithaida.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Learning Areas Bar */}
        <div className="mt-16 sm:mt-20 pt-12 sm:pt-14 border-t border-slate-900">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-sm font-bold tracking-wider uppercase text-cyan-400">Curriculum Matrix</span>
              <h3 className="text-[28px] sm:text-[34px] font-bold text-white mt-1">Featured Learning Disciplines</h3>
            </div>
            <span className="text-base font-normal text-slate-400">Structured modular pathways</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {learningAreas.map((area, idx) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.title}
                  className="p-5 rounded-2xl border border-slate-800/90 bg-slate-900/50 hover:bg-slate-900/90 hover:border-cyan-500/30 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <span className="text-sm font-bold text-cyan-400">0{idx + 1}</span>
                    <Icon className="h-5 w-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>
                  {/* Course / discipline titles: 22-26px Arial Bold */}
                  <h4 className="text-[20px] sm:text-[22px] font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {area.title}
                  </h4>
                  <p className="mt-1.5 text-[15px] sm:text-[16px] font-normal text-slate-300 leading-relaxed">
                    {area.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
