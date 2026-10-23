import React from 'react';
import { X, Code, Database, Users, Shield, Award, Terminal, CheckCircle } from 'lucide-react';

interface FutureArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FutureArchitectureModal: React.FC<FutureArchitectureModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const modules = [
    {
      title: 'Student Authentication & Profiles',
      icon: Users,
      desc: 'JWT / OAuth authentication, student profile management, role-based access control (Student, Mentor, Admin).',
      files: 'src/modules/auth/ · src/services/auth.ts',
    },
    {
      title: 'Course Enrolment & Lesson Engine',
      icon: Code,
      desc: 'Modular lesson player, video streaming integrations, markdown reading materials, and resource downloads.',
      files: 'src/modules/courses/ · src/components/player/',
    },
    {
      title: 'Progress Tracking & Assessments',
      icon: CheckCircle,
      desc: 'Interactive quizzes, coding exercises with automated testing feedback, and milestone completion trackers.',
      files: 'src/modules/quizzes/ · src/services/progress.ts',
    },
    {
      title: 'AIDA Certificate Verification Engine',
      icon: Award,
      desc: 'Cryptographically signed PDF certificates issued by AIDA for eligible graduates with verifiable public URLs.',
      files: 'src/modules/certificates/ · src/api/verify/',
    },
    {
      title: 'Interactive AI Tutors & Agent Sandboxes',
      icon: Terminal,
      desc: 'AI pair-programmer assistant embedded in the student dashboard, powered by Claude Code patterns and MCP tools.',
      files: 'src/modules/ai-tutor/ · src/services/agentLoop.ts',
    },
    {
      title: 'Payment Gateway & Admin Console',
      icon: Shield,
      desc: 'Secure checkout (Stripe/local Pakistani payment rails), student cohort roster management, and telemetry analytics.',
      files: 'src/modules/billing/ · src/modules/admin/',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-7 sm:p-9 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close architecture roadmap"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="pr-10">
          <div className="flex items-center gap-2 text-sm font-mono uppercase text-cyan-400 font-bold mb-2">
            <Terminal className="h-5 w-5" />
            <span>Developer Blueprint & Expansion Roadmap</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
            Architecture for Claude Code Expansion
          </h3>

          <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
            This codebase has been purposefully structured with clean separation of data models (<code className="font-mono text-cyan-300 font-bold">src/types</code>), content definitions (<code className="font-mono text-cyan-300 font-bold">src/data</code>), and presentation components. When you are ready to expand AIDA into a complete online learning management platform using <strong>Claude Code</strong>, the following modules can be plugged in directly without rewriting the core layout.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          {modules.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/20 text-cyan-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white">{m.title}</h4>
                  </div>
                  <p className="text-[15px] sm:text-base text-slate-300 leading-relaxed">{m.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-900 font-mono text-xs sm:text-sm text-cyan-400/90 font-medium">
                  Target: {m.files}
                </div>
              </div>
            );
          })}
        </div>

        {/* Recommended Claude Code Command */}
        <div className="mt-8 p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
          <div className="text-sm font-mono uppercase text-slate-300 flex items-center gap-2 font-bold">
            <Database className="h-5 w-5 text-cyan-400" />
            <span>Claude Code Terminal Execution Pattern</span>
          </div>
          <div className="bg-slate-900/90 rounded-xl p-4 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto border border-slate-800 leading-relaxed">
            <code>claude "Read src/types/index.ts and src/data/academyData.ts. Implement student authentication and course video player modules in src/modules/courses/"</code>
          </div>
        </div>

        {/* Close action */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3.5 text-[17px] font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
