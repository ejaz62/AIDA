import React from 'react';
import { ClaudeCredential } from '../types';
import { X, CheckCircle2, ArrowRight, Award, UserCheck } from 'lucide-react';

interface CredentialModalProps {
  credential: ClaudeCredential | null;
  onClose: () => void;
  onEnquirePathway: (title: string) => void;
}

export const CredentialModal: React.FC<CredentialModalProps> = ({
  credential,
  onClose,
  onEnquirePathway,
}) => {
  if (!credential) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-7 sm:p-9 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close credential modal"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="pr-10">
          <div className="flex items-center gap-2.5 text-sm sm:text-base text-slate-300 mb-2.5">
            <span className="font-mono text-cyan-400 font-bold">Track #{credential.number}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Attribution: <strong className="text-white">{credential.attribution}</strong></span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-cyan-400 flex items-center gap-1.5 font-bold">
              <CheckCircle2 className="h-4 w-4" />
              <span>Completed</span>
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
            {credential.title}
          </h3>

          <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
            {credential.syllabusOverview}
          </p>
        </div>

        {/* Credential Holder & Attribution Box */}
        <div className="mt-6 p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm sm:text-base">
          <div className="flex items-start gap-3.5">
            <UserCheck className="h-6 w-6 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 block text-xs sm:text-sm font-medium">Credential Holder:</span>
              <span className="font-bold text-white text-lg">{credential.recipient}</span>
              <span className="block text-slate-300 text-xs sm:text-sm mt-0.5">
                Founder, AIDA — Artificial Intelligence Digital Academy
              </span>
            </div>
          </div>

          <div className="sm:text-right">
            <span className="text-slate-400 block text-xs sm:text-sm font-medium">Curriculum Attribution:</span>
            <span className="font-bold text-cyan-300 text-base">{credential.attribution}</span>
            <span className="block text-slate-400 text-xs sm:text-sm mt-0.5">Official Coursework</span>
          </div>
        </div>

        {/* Target Audience */}
        <div className="mt-5 p-4 rounded-xl bg-slate-950/40 border border-slate-800/80 text-sm sm:text-base">
          <span className="text-slate-400 block text-xs sm:text-sm font-medium">Curriculum Depth & Scope:</span>
          <span className="font-semibold text-slate-200 mt-1 block">{credential.targetAudience}</span>
        </div>

        {/* Curriculum Highlights */}
        <div className="mt-7">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3.5">
            Core Curriculum Competencies Mastered
          </h4>
          <div className="space-y-3">
            {credential.curriculumHighlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-3 text-[15px] sm:text-base text-slate-200 leading-relaxed">
                <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Application in AIDA Mentorship */}
        <div className="mt-7 p-5 rounded-2xl border border-slate-800 bg-slate-950/80 space-y-2.5">
          <div className="flex items-center gap-2.5 text-sm font-bold text-cyan-400">
            <Award className="h-5 w-5" />
            <span>Applied in AIDA Mentorship</span>
          </div>
          <p className="text-[15px] sm:text-base text-slate-200 leading-relaxed">
            {credential.preparationNotice}
          </p>
          <p className="text-xs sm:text-sm text-slate-400 italic pt-2 border-t border-slate-800/60">
            Official curriculum and course materials are attributed to Anthropic. AIDA provides guided instruction and applied digital development based on these standards.
          </p>
        </div>

        {/* Modal Actions */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 text-[16px] sm:text-[17px] font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onEnquirePathway(credential.title);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 text-[16px] sm:text-[17px] font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors cursor-pointer"
          >
            <span>Enquire for Mentorship in this Area</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
