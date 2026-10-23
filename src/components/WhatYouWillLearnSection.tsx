import React from 'react';
import { CORE_LEARNING_PROGRAMMES } from '../data/academyData';
import { CoreLearningProgramme } from '../types';
import { Bot, Globe, CloudUpload, MessageSquare, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

interface WhatYouWillLearnSectionProps {
  onEnquireProgramme: (programmeTitle: string) => void;
  onOpenProgrammeModal?: (programme: CoreLearningProgramme) => void;
}

export const WhatYouWillLearnSection: React.FC<WhatYouWillLearnSectionProps> = ({
  onEnquireProgramme,
}) => {
  const iconMap: Record<string, React.ElementType> = {
    '01': Bot,
    '02': Globe,
    '03': CloudUpload,
    '04': MessageSquare,
  };

  return (
    <section id="what-you-will-learn" className="py-16 sm:py-24 border-b border-slate-900 bg-slate-950/90 relative overflow-hidden w-full max-w-full">
      {/* Background subtle radial gradient */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="h-[400px] sm:h-[550px] w-full max-w-[700px] rounded-full bg-cyan-950/15 blur-[100px] sm:blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 w-full min-w-0">
        
        {/* Section Header (32-40px section heading; Arial Bold) */}
        <div className="max-w-3xl">
          <span className="text-sm font-bold tracking-wider uppercase text-cyan-400">Core Academy Curriculum</span>
          <h2 className="mt-2 text-[28px] xs:text-[32px] sm:text-[38px] lg:text-[40px] font-bold tracking-tight text-white text-balance leading-tight break-words">
            What You Will Learn
          </h2>
          <p className="mt-4 text-[17px] sm:text-[19px] lg:text-[20px] font-normal text-slate-200 leading-relaxed">
            AIDA’s flagship curriculum focuses squarely on practical, build-first skills. Rather than abstract theory or generic chatbots, our core programmes teach you to construct, launch, and maintain functional AI systems that solve genuine operational challenges for businesses.
          </p>
        </div>

        {/* 4 Core Programmes Grid */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {CORE_LEARNING_PROGRAMMES.map((prog) => {
            const Icon = iconMap[prog.number] || Bot;
            const isWhatsApp = prog.id === 'whatsapp-ai-employees';

            return (
              <div
                key={prog.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900/90 hover:border-cyan-500/30 transition-all duration-300 p-5 sm:p-8 lg:p-9 shadow-xl group min-w-0"
              >
                <div>
                  {/* Top card metadata */}
                  <div className="flex items-center justify-between text-xs sm:text-base text-slate-300 mb-4 gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold text-sm sm:text-base">Track #{prog.number}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-slate-200 font-bold text-xs sm:text-sm">{prog.scopeTag}</span>
                    </div>

                    {isWhatsApp && (
                      <span className="text-xs sm:text-sm text-emerald-400 font-bold">
                        Exclusively WhatsApp
                      </span>
                    )}
                  </div>

                  {/* Header & Icon */}
                  <div className="flex items-start gap-3.5 sm:gap-4 mb-4">
                    <div className="p-3 sm:p-3.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 group-hover:border-cyan-400/60 group-hover:scale-105 transition-all shrink-0">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>
                    <div className="min-w-0">
                      {/* Course / Programme Title: 22-26px Arial Bold */}
                      <h3 className="text-[20px] sm:text-[24px] lg:text-[25px] font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug break-words">
                        {prog.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-base text-cyan-400/90 font-bold">
                        {prog.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Full Description (18-20px Arial Regular) */}
                  <p className="mt-4 text-[17px] sm:text-[19px] font-normal text-slate-200 leading-relaxed">
                    {prog.fullDescription}
                  </p>

                  {/* Key Highlights */}
                  <div className="mt-6 space-y-3 pt-5 border-t border-slate-800">
                    <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300">
                      Core Practical Competencies
                    </div>
                    {prog.keyHighlights.map((hl, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 sm:gap-3 text-[15px] sm:text-[17px] font-normal text-slate-200 leading-relaxed">
                        <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="break-words">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Business Application Box */}
                  <div className="mt-6 p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-[14px] sm:text-base">
                    <span className="text-slate-300 block text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">
                      Business Application:
                    </span>
                    <span className="text-slate-200 block font-normal leading-relaxed break-words">
                      {prog.businessApplication}
                    </span>
                  </div>
                </div>

                {/* Bottom Card Action (17-19px Arial Bold button) */}
                <div className="mt-8 pt-5 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-[14px] sm:text-base font-normal text-slate-400">
                    Practical, beginner-friendly format
                  </div>

                  <button
                    onClick={() => onEnquireProgramme(prog.title)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-5 sm:px-6 py-3.5 text-[15px] sm:text-[17px] font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors cursor-pointer shadow-sm shadow-cyan-950/50 text-center"
                  >
                    <span>Enquire About Programme</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Channel Focus Safeguard Callout */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 text-[14px] sm:text-base text-slate-200 flex items-start gap-3.5 sm:gap-4 leading-relaxed font-normal">
          <ShieldAlert className="h-6 w-6 text-cyan-400 shrink-0 mt-0.5" />
          <div className="break-words">
            <strong className="text-white font-bold">Channel Specialization Notice:</strong> AIDA’s messaging AI employee training and business solutions are strictly focused on <strong>WhatsApp</strong>. We do not provide or teach AI bots for Telegram, Messenger, or alternative consumer chat networks, ensuring deep engineering focus on WhatsApp’s official business platform and high-touch customer support reliability.
          </div>
        </div>

      </div>
    </section>
  );
};
