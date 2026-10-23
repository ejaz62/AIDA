import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, BookOpen, AlertCircle, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import { Course } from '../../types';

interface CourseFormModalProps {
  isOpen: boolean;
  courseToEdit?: Course | null;
  onClose: () => void;
  onSave: (courseData: Partial<Course>) => Promise<void>;
}

export const CourseFormModal: React.FC<CourseFormModalProps> = ({
  isOpen,
  courseToEdit,
  onClose,
  onSave,
}) => {
  const isEditing = Boolean(courseToEdit);

  const [title, setTitle] = useState('');
  const [number, setNumber] = useState('');
  const [category, setCategory] = useState('Fundamentals');
  const [level, setLevel] = useState('Beginner');
  const [status, setStatus] = useState('In Development');
  const [price, setPrice] = useState('Curriculum Proposed');
  const [thumbnail, setThumbnail] = useState('');
  const [durationEstimate, setDurationEstimate] = useState('4–6 Weeks');
  const [isPublished, setIsPublished] = useState(true);
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [keyOutcomes, setKeyOutcomes] = useState<string[]>(['']);
  const [syllabus, setSyllabus] = useState<{ moduleNumber: string; title: string; summary: string }[]>([
    { moduleNumber: '01', title: 'Module 1: Introduction', summary: 'Core principles and setup.' },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (courseToEdit) {
      setTitle(courseToEdit.title || '');
      setNumber(courseToEdit.number || '');
      setCategory(courseToEdit.category || 'Fundamentals');
      setLevel(courseToEdit.level || 'Beginner');
      setStatus(courseToEdit.status || 'In Development');
      setPrice(courseToEdit.price || 'Curriculum Proposed');
      setThumbnail(courseToEdit.thumbnail || '');
      setDurationEstimate(courseToEdit.durationEstimate || '4–6 Weeks');
      setIsPublished(courseToEdit.isPublished ?? true);
      setShortDescription(courseToEdit.shortDescription || '');
      setFullDescription(courseToEdit.fullDescription || '');
      setKeyOutcomes(courseToEdit.keyOutcomes?.length ? courseToEdit.keyOutcomes : ['']);
      setSyllabus(
        courseToEdit.syllabus?.length
          ? courseToEdit.syllabus
          : [{ moduleNumber: '01', title: 'Module 1: Introduction', summary: 'Core principles and setup.' }]
      );
    } else {
      // Reset defaults for new course
      setTitle('');
      setNumber('');
      setCategory('Fundamentals');
      setLevel('Beginner');
      setStatus('In Development');
      setPrice('Curriculum Proposed');
      setThumbnail('');
      setDurationEstimate('4–6 Weeks');
      setIsPublished(true);
      setShortDescription('');
      setFullDescription('');
      setKeyOutcomes(['Master practical hands-on AI workflow capabilities']);
      setSyllabus([
        { moduleNumber: '01', title: 'Module 1: Foundations', summary: 'Setting up the environment and learning core concepts.' },
        { moduleNumber: '02', title: 'Module 2: Practical Implementation', summary: 'Building and configuring functional solutions.' },
      ]);
    }
    setErrorMessage(null);
  }, [courseToEdit, isOpen]);

  if (!isOpen) return null;

  // Add / Remove Outcome
  const handleAddOutcome = () => {
    setKeyOutcomes([...keyOutcomes, '']);
  };
  const handleOutcomeChange = (index: number, val: string) => {
    const updated = [...keyOutcomes];
    updated[index] = val;
    setKeyOutcomes(updated);
  };
  const handleRemoveOutcome = (index: number) => {
    if (keyOutcomes.length === 1) return;
    setKeyOutcomes(keyOutcomes.filter((_, i) => i !== index));
  };

  // Add / Remove Module
  const handleAddModule = () => {
    const nextNum = String(syllabus.length + 1).padStart(2, '0');
    setSyllabus([
      ...syllabus,
      { moduleNumber: nextNum, title: `Module ${nextNum}: `, summary: '' },
    ]);
  };
  const handleModuleChange = (index: number, field: 'moduleNumber' | 'title' | 'summary', val: string) => {
    const updated = [...syllabus];
    updated[index] = { ...updated[index], [field]: val };
    setSyllabus(updated);
  };
  const handleRemoveModule = (index: number) => {
    if (syllabus.length === 1) return;
    setSyllabus(syllabus.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim()) {
      setErrorMessage('Course title is required.');
      return;
    }
    if (!shortDescription.trim()) {
      setErrorMessage('Short description is required.');
      return;
    }

    const cleanedOutcomes = keyOutcomes.map((k) => k.trim()).filter(Boolean);
    if (cleanedOutcomes.length === 0) {
      setErrorMessage('Please include at least one target competency outcome.');
      return;
    }

    const cleanedSyllabus = syllabus.filter((m) => m.title.trim().length > 0);
    if (cleanedSyllabus.length === 0) {
      setErrorMessage('Please include at least one syllabus module.');
      return;
    }

    setIsLoading(true);
    try {
      await onSave({
        title: title.trim(),
        number: number.trim() || undefined,
        category,
        level,
        status,
        price: price.trim(),
        thumbnail: thumbnail.trim(),
        durationEstimate: durationEstimate.trim(),
        isPublished,
        shortDescription: shortDescription.trim(),
        fullDescription: fullDescription.trim() || shortDescription.trim(),
        keyOutcomes: cleanedOutcomes,
        syllabus: cleanedSyllabus,
      });
      setIsLoading(false);
      onClose();
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Failed to save course.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl p-5 sm:p-8 max-h-[90vh] overflow-y-auto min-w-0"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-11 w-11 rounded-xl bg-cyan-950/70 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
              Course Management
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {isEditing ? `Edit Course: ${courseToEdit?.title}` : 'Add New Course to Database'}
            </h2>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-sm flex items-start gap-2.5">
            <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Title & Number */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-9">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Course Title <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. AI Agents & Digital Workforce"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Catalog Track #
              </label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="e.g. 07"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Category, Level, Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Fundamentals">Fundamentals</option>
                <option value="Productivity & Code">Productivity & Code</option>
                <option value="Agents & Automation">Agents & Automation</option>
                <option value="Deployment">Deployment</option>
                <option value="Specialized">Specialized</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Skill Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Beginner">Beginner</option>
                <option value="Beginner to Intermediate">Beginner to Intermediate</option>
                <option value="Intermediate to Advanced">Intermediate to Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Curriculum Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="Curriculum Proposed">Curriculum Proposed</option>
                <option value="Coming Soon">Coming Soon</option>
                <option value="In Development">In Development</option>
                <option value="Enrolling Cohort">Enrolling Cohort</option>
              </select>
            </div>
          </div>

          {/* Row 3: Price, Duration, Publication Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
            <div className="sm:col-span-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Course Price / Fee
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. PKR 18,000 or Free / Proposed"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Estimated Duration
              </label>
              <input
                type="text"
                value={durationEstimate}
                onChange={(e) => setDurationEstimate(e.target.value)}
                placeholder="e.g. 6 Weeks"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <div className="sm:col-span-4 pt-3 sm:pt-0">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Publication Status
              </label>
              <div
                onClick={() => setIsPublished(!isPublished)}
                className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer select-none transition-colors ${
                  isPublished
                    ? 'border-emerald-600 bg-emerald-950/40 text-emerald-200'
                    : 'border-slate-700 bg-slate-950 text-slate-400'
                }`}
              >
                <span className="text-xs font-bold">
                  {isPublished ? '● Published (Live on Site)' : '○ Draft (Hidden from Public)'}
                </span>
                <span className={`h-3 w-3 rounded-full ${isPublished ? 'bg-emerald-400' : 'bg-slate-600'}`} />
              </div>
            </div>
          </div>

          {/* Row 4: Thumbnail URL */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Course Thumbnail URL (Optional)
            </label>
            <input
              type="text"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="e.g. https://... or /src/assets/images/... (optional image preview)"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Short Description (Card Summary) <span className="text-cyan-400">*</span>
            </label>
            <textarea
              rows={2}
              required
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Concise 1–2 sentence summary displayed on public cards..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {/* Full Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Full Description (Detailed Syllabus View)
            </label>
            <textarea
              rows={3}
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              placeholder="Comprehensive description for prospective learners reviewing the detailed syllabus..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {/* Key Outcomes */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Target Competencies & Outcomes
              </label>
              <button
                type="button"
                onClick={handleAddOutcome}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-cyan-200 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Outcome</span>
              </button>
            </div>

            {keyOutcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                <input
                  type="text"
                  value={outcome}
                  onChange={(e) => handleOutcomeChange(idx, e.target.value)}
                  placeholder={`Outcome ${idx + 1}...`}
                  className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-slate-800 bg-slate-900 text-white focus:outline-none focus:border-cyan-400"
                />
                {keyOutcomes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOutcome(idx)}
                    className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Syllabus Modules */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Syllabus Modules Breakdown
              </label>
              <button
                type="button"
                onClick={handleAddModule}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-cyan-200 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Module</span>
              </button>
            </div>

            {syllabus.map((mod, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={mod.moduleNumber}
                    onChange={(e) => handleModuleChange(idx, 'moduleNumber', e.target.value)}
                    placeholder="01"
                    className="w-14 px-2 py-1 text-center text-xs font-bold rounded-lg border border-slate-700 bg-slate-950 text-cyan-400"
                  />
                  <input
                    type="text"
                    value={mod.title}
                    onChange={(e) => handleModuleChange(idx, 'title', e.target.value)}
                    placeholder="Module Title..."
                    className="flex-1 px-3 py-1 text-sm font-bold rounded-lg border border-slate-700 bg-slate-950 text-white"
                  />
                  {syllabus.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveModule(idx)}
                      className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <textarea
                  rows={2}
                  value={mod.summary}
                  onChange={(e) => handleModuleChange(idx, 'summary', e.target.value)}
                  placeholder="Summary of topics covered in this module..."
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-800 bg-slate-950 text-slate-300 focus:outline-none focus:border-cyan-400"
                />
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 font-bold text-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm uppercase tracking-wider transition-colors cursor-pointer shadow-md shadow-cyan-950/50 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Saving to Database...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>{isEditing ? 'Save Changes' : 'Create Course'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
