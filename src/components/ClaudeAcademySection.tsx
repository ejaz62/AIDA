import React from 'react';
import { CLAUDE_CREDENTIALS_DATA } from '../data/academyData';
import { ClaudeCredential } from '../types';
import { CheckCircle2, Award, Terminal, ArrowUpRight, UserCheck } from 'lucide-react';
import founderImage from '../assets/images/founder_muhammad_ejaz.jpeg';

interface ClaudeAcademySectionProps {
  onSelectCredential: (credential: ClaudeCredential) => void;
  onEnquirePathway: (title: string) => void;
}

export const ClaudeAcademySection: React.FC<ClaudeAcademySectionProps> = ({
  onSelectCredential,
  onEnquirePathway,
}) => {
  return (
    <section id="claude-academy" className="py-16 sm:py-24 border-b border-slate-900 bg-slate-950/80 relative overflow-hidden w-full max-w-full">
      
      {/* Background subtle radial styling */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="h-[400px] sm:h-[600px] w-full max-w-[750px] rounded-full bg-cyan-950/15 blur-[100px] sm:blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 w-full min-w-0">
        
        {/* Section Header (32-40px heading; Arial Bold) */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-cyan-400">
            <Award className="h-5 w-5" />
            <span>Anthropic Claude Academy Learning Credentials</span>
          </div>
          
          <h2 className="mt-2 text-[32px] sm:text-[38px] lg:text-[40px] font-bold tracking-tight text-white text-balance leading-tight">
            Claude Academy Learning & Certifications
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-y-1.5 gap-x-3 text-base sm:text-lg text-slate-300">
            <span>Completed by Founder:</span>
            <span className="font-bold text-white tracking-wide">Muhammad Ejaz</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Attribution:</span>
            <span className="font-bold text-cyan-300">Anthropic</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-200 font-bold">10 of 10 Completed</span>
          </div>

          <p className="mt-4 text-[18px] sm:text-[19px] lg:text-[20px] font-normal text-slate-200 leading-relaxed">
            Anthropic’s Claude Academy provides a world-class standard for prompt reasoning, Model Context Protocol (MCP), agentic coding, and human-agent teams. Founder Muhammad Ejaz has completed all ten official Claude Academy courses, bringing first-hand proficiency into AIDA’s student mentorship and curriculum design.
          </p>
        </div>

        {/* Founder Credential Summary Banner with Actual Photograph */}
        <div className="mt-10 p-5 sm:p-7 rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-sm min-w-0">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 min-w-0">
            <div className="flex items-start gap-4 min-w-0">
              <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-md shrink-0 bg-slate-950">
                <img
                  src={founderImage}
                  alt="Muhammad Ejaz — Founder, AIDA Digital Academy"
                  className="h-full w-full object-cover object-center"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.triedPublic) {
                      target.dataset.triedPublic = 'true';
                      target.src = '/assets/aistudio/WhatsApp_Image_2026-10-21_at_2.25.23_AM_48048a4e.jpeg';
                    }
                  }}
                />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Muhammad Ejaz
                  </h3>
                  <span className="text-xs sm:text-sm text-cyan-400 font-bold">Completed All 10 Tracks</span>
                </div>
                <p className="text-sm sm:text-base text-slate-300 mt-1 font-normal break-words">
                  Founder, AIDA — Artificial Intelligence Digital Academy · Lahore, Pakistan
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1 text-xs sm:text-base text-slate-300">
                  <span className="text-cyan-400 font-bold">Verified Completion:</span>
                  <span>Full 10-Course Anthropic Claude Academy Curriculum</span>
                  <span aria-hidden="true" className="text-slate-600 hidden xs:inline">·</span>
                  <span className="text-slate-400 font-normal">Official Attribution: Anthropic</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onEnquirePathway('Claude Mentorship with Muhammad Ejaz')}
              className="w-full md:w-auto px-5 sm:px-6 py-3.5 text-[15px] sm:text-[17px] font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors cursor-pointer text-center shadow-sm shadow-cyan-950/40 shrink-0"
            >
              Learn with Muhammad Ejaz
            </button>
          </div>
        </div>

        {/* Technical Architecture Visual Banner */}
        <div className="mt-10 sm:mt-12 rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-2xl w-full max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="p-5 sm:p-7 lg:p-9 lg:col-span-7 min-w-0">
              <div className="flex items-center gap-2 text-xs sm:text-sm uppercase text-cyan-400 font-bold">
                <Terminal className="h-5 w-5 shrink-0" />
                <span>Frontier AI Tooling & MCP Architecture</span>
              </div>
              <h3 className="mt-2 text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight break-words">
                From Prompting to Autonomous Agent Tooling
              </h3>
              <p className="mt-3 text-[15px] sm:text-lg text-slate-200 leading-relaxed font-normal">
                Covering the complete progression from conversational nuances in Claude 101 up to building custom Model Context Protocol servers and human-agent teams. Students at AIDA benefit from battle-tested experience in terminal workflows and agentic problem-solving.
              </p>
            </div>

            <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-950 overflow-hidden">
              <img
                src="/src/assets/images/aida_ai_agents_code_1792526771999.jpg"
                alt="Technical visual of AI agent execution and code architecture"
                referrerPolicy="no-referrer"
                className="w-full max-w-full h-[220px] sm:h-[300px] object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        </div>

        {/* 10 Completed Claude Academy Credentials Grid (22-26px titles; Arial Bold) */}
        <div className="mt-12 sm:mt-14">
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-cyan-400">Curriculum Credentials</span>
              <h3 className="text-[24px] sm:text-[34px] font-bold text-white mt-0.5 break-words">
                Completed Course Credentials (10)
              </h3>
            </div>
            <span className="text-sm sm:text-base text-slate-300 font-normal">
              Completed by Muhammad Ejaz
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {CLAUDE_CREDENTIALS_DATA.map((cred) => (
              <div
                key={cred.id}
                onClick={() => onSelectCredential(cred)}
                className="group p-5 sm:p-7 rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900/90 hover:border-cyan-500/40 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xl min-w-0"
              >
                <div>
                  {/* Card Header with Track Number, Recipient, and Attribution */}
                  <div className="flex items-center justify-between text-xs sm:text-base text-slate-300 mb-3.5 gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">Track #{cred.number}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-slate-300">
                        Attribution: <strong className="text-white font-bold">{cred.attribution}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs sm:text-base text-cyan-300 font-bold shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                      <span>Completed</span>
                    </div>
                  </div>

                  {/* Course Title: 22-26px Arial Bold */}
                  <h4 className="text-[19px] sm:text-[23px] lg:text-[25px] font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug break-words">
                    {cred.title}
                  </h4>

                  {/* Recipient Subtext */}
                  <div className="mt-1.5 text-xs sm:text-base text-slate-300">
                    Credential Holder: <span className="text-white font-bold">{cred.recipient}</span>
                  </div>

                  {/* Competency Focus: 18-20px Arial Regular */}
                  <p className="mt-3 text-[15px] sm:text-[19px] font-normal text-slate-200 leading-relaxed">
                    {cred.competencyFocus}
                  </p>
                </div>

                {/* Card Action Link: 17-19px Arial Bold */}
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[15px] sm:text-[17px] font-bold">
                  <span className="text-slate-300 group-hover:text-white transition-colors">
                    Inspect Competencies & Syllabus
                  </span>
                  <span className="text-cyan-400 flex items-center gap-1.5 font-bold group-hover:translate-x-1 transition-transform shrink-0">
                    <span>Inspect</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Factual Disclaimer */}
        <div className="mt-12 p-5 rounded-2xl border border-slate-800/80 bg-slate-900/40 text-[15px] sm:text-base text-slate-300 leading-relaxed font-normal">
          <strong className="text-white font-bold">Attribution & Academic Transparency:</strong> All ten learning credentials above represent completed coursework by Muhammad Ejaz across the official Anthropic Claude Academy curriculum. The Claude Academy curriculum and trademarks are attributed to Anthropic. AIDA operates as an independent educational academy delivering hands-on coaching and applied training.
        </div>

      </div>
    </section>
  );
};
