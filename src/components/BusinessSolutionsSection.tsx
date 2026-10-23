import React from 'react';
import { BUSINESS_SOLUTIONS_DATA } from '../data/academyData';
import { Building2, MessageCircle, Laptop, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';

interface BusinessSolutionsSectionProps {
  onEnquire: (programmeTitle: string) => void;
}

export const BusinessSolutionsSection: React.FC<BusinessSolutionsSectionProps> = ({ onEnquire }) => {
  const iconMap: Record<string, React.ElementType> = {
    '01': MessageCircle,
    '02': Laptop,
    '03': Wrench,
    '04': ShieldCheck,
  };

  return (
    <section id="business-solutions" className="py-16 sm:py-24 border-b border-slate-900 bg-slate-950 overflow-hidden w-full max-w-full">
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 w-full min-w-0">
        
        {/* Section Header (32-40px heading; Arial Bold) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wider uppercase text-cyan-400">
              <Building2 className="h-5 w-5 shrink-0" />
              <span>Real-World Client Utility</span>
            </div>
            <h2 className="mt-2 text-[28px] xs:text-[32px] sm:text-[38px] lg:text-[40px] font-bold tracking-tight text-white text-balance leading-tight break-words">
              Practical AI Solutions for Businesses
            </h2>
            <p className="mt-4 text-[17px] sm:text-[19px] lg:text-[20px] font-normal text-slate-200 leading-relaxed">
              At AIDA, learning is grounded in commercial utility. We show students how to identify high-friction business bottlenecks and build tangible, dependable AI implementations that clients genuinely need and value.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/60 text-[14px] sm:text-base text-slate-300 max-w-md leading-relaxed font-normal">
            <strong className="text-white block mb-1 font-bold text-sm sm:text-base">Marketable Skill Philosophy</strong>
            We teach the technical craftsmanship needed to deliver working software: prompt safety, API integrations, responsive interfaces, and production reliability.
          </div>
        </div>

        {/* 4 Solutions Grid */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {BUSINESS_SOLUTIONS_DATA.map((item) => {
            const Icon = iconMap[item.number] || Building2;
            const isWhatsApp = item.id === 'solution-whatsapp';

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900/90 hover:border-slate-700 transition-all p-5 sm:p-8 lg:p-9 flex flex-col justify-between shadow-xl min-w-0"
              >
                <div>
                  {/* Number & Icon */}
                  <div className="flex items-center justify-between mb-5 gap-2 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 sm:p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 shrink-0">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-bold text-cyan-400">
                        Solution #{item.number}
                      </span>
                    </div>

                    {isWhatsApp && (
                      <span className="text-xs sm:text-sm font-bold text-emerald-400">
                        WhatsApp Focused
                      </span>
                    )}
                  </div>

                  {/* Card Heading: 22-26px Arial Bold */}
                  <h3 className="text-[20px] sm:text-[23px] lg:text-[25px] font-bold text-white mb-4 leading-snug break-words">
                    {item.title}
                  </h3>

                  {/* Client Pain Point */}
                  <div className="mb-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[14px] sm:text-base">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Client Challenge:
                    </span>
                    <p className="text-[14px] sm:text-base text-slate-200 leading-relaxed font-normal break-words">
                      {item.clientProblem}
                    </p>
                  </div>

                  {/* AI Solution Description (18-20px Arial Regular) */}
                  <div className="mb-5">
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-400 block mb-1.5">
                      What Students Learn to Build:
                    </span>
                    <p className="text-[16px] sm:text-[18px] font-normal text-slate-200 leading-relaxed break-words">
                      {item.aiSolutionDescription}
                    </p>
                  </div>
                </div>

                {/* Marketable Skill Footer (17-19px Arial Bold CTA) */}
                <div className="pt-5 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-slate-400 block text-xs sm:text-sm font-medium">Marketable Capability:</span>
                    <span className="font-bold text-white text-[14px] sm:text-base">{item.marketableSkill}</span>
                  </div>

                  <button
                    onClick={() => onEnquire(`Business Solution: ${item.title}`)}
                    className="flex items-center gap-2 text-[15px] sm:text-[17px] font-bold text-cyan-400 hover:text-cyan-300 cursor-pointer self-start sm:self-auto py-1"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ethical Rationale & No-Hype Disclaimer */}
        <div className="mt-12 sm:mt-14 p-5 sm:p-7 rounded-2xl border border-slate-800 bg-slate-900/40 flex flex-col md:flex-row items-center justify-between gap-6 w-full min-w-0">
          <div className="space-y-1.5 text-[14px] sm:text-base text-slate-300 leading-relaxed max-w-3xl font-normal">
            <h4 className="text-base sm:text-lg font-bold text-white">Realistic, Transparent Skill Development</h4>
            <p>
              AIDA provides rigorous technical training, hands-on labs, and real project workflows. We do not make exaggerated marketing claims, income guarantees, or promises of overnight employment. Success in freelancing or digital consulting depends entirely on individual dedication, practice, and the quality of work delivered to clients.
            </p>
          </div>

          <button
            onClick={() => onEnquire('Corporate & Business AI Solutions')}
            className="w-full md:w-auto px-5 sm:px-6 py-3.5 text-[15px] sm:text-[17px] font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors cursor-pointer text-center shadow-sm shrink-0"
          >
            Consult on Business Solutions
          </button>
        </div>

      </div>
    </section>
  );
};
