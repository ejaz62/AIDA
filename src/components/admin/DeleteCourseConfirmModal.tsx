import React, { useState } from 'react';
import { AlertTriangle, Trash2, X, Loader2 } from 'lucide-react';
import { Course } from '../../types';

interface DeleteCourseConfirmModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => Promise<void>;
}

export const DeleteCourseConfirmModal: React.FC<DeleteCourseConfirmModalProps> = ({
  course,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen || !course) return null;

  const handleDelete = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await onConfirm(course.id);
      setIsLoading(false);
      onClose();
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Failed to delete course.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-md rounded-2xl border border-red-900/60 bg-slate-900 shadow-2xl p-6 sm:p-7 min-w-0"
        role="alertdialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-4 text-red-400">
          <div className="p-3 rounded-xl bg-red-950/80 border border-red-800/80 shrink-0">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Delete Course</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Are you sure you want to permanently delete{' '}
          <strong className="text-white font-bold break-words">"{course.title}"</strong> (Track #{course.number})?
        </p>

        <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 leading-normal">
          This action will immediately remove the course from the persistent database and the public website catalog. This operation cannot be undone.
        </div>

        {errorMessage && (
          <div className="mt-3 p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs">
            {errorMessage}
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 font-bold text-sm transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm uppercase tracking-wider transition-colors cursor-pointer shadow-md shadow-red-950/50 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                <span>Confirm Delete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
