import React from 'react';
import { Course } from '../types';
import { X, Clock, BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
  onEnquire: (courseTitle: string) => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({ course, onClose, onEnquire }) => {
  if (!course) return null;

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
          aria-label="Close course modal"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="pr-10">
          <div className="flex items-center gap-2.5 text-sm sm:text-base text-slate-300 mb-2.5">
            <span className="font-mono text-cyan-400 font-bold">Course #{course.number}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="font-medium text-slate-200">{course.level}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400 font-medium">{course.status}</span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
            {course.title}
          </h3>

          <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed">
            {course.fullDescription}
          </p>
        </div>

        {/* Quick specs */}
        <div className="mt-6 grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-sm sm:text-base">
          <div>
            <span className="text-slate-400 block text-xs sm:text-sm font-medium">Estimated Duration:</span>
            <span className="font-bold text-white flex items-center gap-2 mt-1">
              <Clock className="h-4 w-4 text-cyan-400" />
              {course.durationEstimate}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-xs sm:text-sm font-medium">Curriculum Depth:</span>
            <span className="font-bold text-white flex items-center gap-2 mt-1">
              <BookOpen className="h-4 w-4 text-cyan-400" />
              {course.syllabus.length} Core Modules
            </span>
          </div>
        </div>

        {/* Key Outcomes */}
        <div className="mt-7">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3.5">
            Core Learning Outcomes
          </h4>
          <div className="space-y-3">
            {course.keyOutcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-3 text-[15px] sm:text-base text-slate-200 leading-relaxed">
                <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Syllabus Modules */}
        <div className="mt-7 pt-6 border-t border-slate-800">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4">
            Curriculum Structure & Module Outlines
          </h4>
          <div className="space-y-3.5">
            {course.syllabus.map((mod) => (
              <div
                key={mod.moduleNumber}
                className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/50"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="text-sm font-mono text-cyan-400 font-bold">Module {mod.moduleNumber}</span>
                  <span className="text-base font-bold text-white">{mod.title}</span>
                </div>
                <p className="text-[15px] text-slate-300 leading-relaxed">
                  {mod.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-400 text-center sm:text-left">
            Advance interest registration is free and non-binding.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-3 text-[16px] sm:text-[17px] font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onEnquire(course.title);
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 py-3 text-[16px] sm:text-[17px] font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors cursor-pointer"
            >
              <span>Enquire for Cohort</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
