import React from 'react';
import { LEARNING_PRINCIPLES } from '../data/academyData';
import { BookOpen, Hammer, Terminal, Bot, Briefcase, ShieldCheck } from 'lucide-react';

interface WhyAidaSectionProps {
  onExploreProgrammes: () => void;
}

export const WhyAidaSection: React.FC<WhyAidaSectionProps> = ({ onExploreProgrammes }) => {
  const iconMap: Record<string, React.ElementType> = {
    '01': BookOpen,
    '02': Hammer,
    '03': Terminal,
    '04': Bot,
    '05': Briefcase,
    '06': ShieldCheck,
  };

  return (
    <section id="why-aida" className="py-16 sm:py-24 border-b border-slate-900 bg-slate-950 overflow-hidden w-full max-w-full">
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 w-full min-w-0">
        
        {/* Section Header (32-40px heading; Arial Bold) */}
        <div className="max-w-3xl">
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-cyan-400">Pedagogical Philosophy</span>
          <h2 className="mt-2 text-[28px] xs:text-[32px] sm:text-[38px] lg:text-[40px] font-bold tracking-tight text-white text-balance leading-tight break-words">
            Why Learn with AIDA?
          </h2>
          <p className="mt-4 text-[17px] sm:text-[19px] lg:text-[20px] font-normal text-slate-200 leading-relaxed">
            Our instructional approach is intentionally designed to remove intimidation and prioritize practical utility. Rather than theoretical lectures or superficial prompts, AIDA grounds your learning in usable systems.
          </p>
        </div>

        {/* 6 Principles Bento Grid (22-26px titles; Arial Bold, 18-20px descriptions) */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {LEARNING_PRINCIPLES.map((principle) => {
            const Icon = iconMap[principle.number] || BookOpen;
            return (
              <div
                key={principle.id}
                className="p-5 sm:p-7 rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900/90 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-xl min-w-0"
              >
                <div>
                  {/* Top metadata */}
                  <div className="flex items-center justify-between text-xs sm:text-base text-slate-300 mb-4 gap-2 flex-wrap">
                    <span className="text-cyan-400 font-bold">Principle #{principle.number}</span>
                    <span className="text-slate-300 font-bold text-xs sm:text-sm">{principle.subtitle}</span>
                  </div>

                  {/* Icon & Title: 22-26px Arial Bold */}
                  <div className="flex items-center gap-3 sm:gap-3.5 mb-3.5">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/20 text-cyan-400 group-hover:border-cyan-400/50 transition-colors shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug break-words">
                      {principle.title}
                    </h3>
                  </div>

                  {/* Description: 18-20px Arial Regular */}
                  <p className="text-[16px] sm:text-[19px] font-normal text-slate-200 leading-relaxed">
                    {principle.description}
                  </p>
                </div>

                {/* Pedagogical focus callout */}
                <div className="mt-6 pt-5 border-t border-slate-800">
                  <div className="text-xs sm:text-sm text-slate-400 uppercase tracking-wider mb-1 font-bold">
                    Instructional Approach:
                  </div>
                  <p className="text-[14px] sm:text-base text-cyan-400 leading-relaxed font-normal break-words">
                    {principle.pedagogicalFocus}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ethical commitment notice */}
        <div className="mt-12 sm:mt-14 p-5 sm:p-7 rounded-2xl border border-slate-800 bg-slate-900/40 text-[14px] sm:text-base text-slate-300 flex flex-col md:flex-row items-center justify-between gap-6 leading-relaxed font-normal w-full min-w-0">
          <div className="space-y-1.5 max-w-3xl">
            <div className="text-base sm:text-lg font-bold text-white">Commitment to Honest Education</div>
            <p>
              These principles reflect the academy’s intended instructional methodology, designed to equip students with genuine, verifiable capability rather than unsubstantiated claims or guaranteed outcomes.
            </p>
          </div>
          <button
            onClick={onExploreProgrammes}
            className="w-full md:w-auto px-5 sm:px-6 py-3.5 text-[15px] sm:text-[17px] font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors cursor-pointer text-center shrink-0"
          >
            Review Courses
          </button>
        </div>

      </div>
    </section>
  );
};
