import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Plus,
  Search,
  Filter,
  Eye,
  EyeOff,
  Edit3,
  Trash2,
  LogOut,
  ExternalLink,
  Database,
  Layers,
  BookOpen,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Loader2,
  Shield,
  ArrowLeft,
} from 'lucide-react';
import { Course } from '../../types';
import {
  fetchAllAdminCourses,
  createCourseApi,
  updateCourseApi,
  toggleCoursePublicationApi,
  deleteCourseApi,
  logoutAdmin,
  getStoredAdminUser,
} from '../../services/courseApi';
import { CourseFormModal } from './CourseFormModal';
import { DeleteCourseConfirmModal } from './DeleteCourseConfirmModal';
import { DatabaseStatusCard } from './DatabaseStatusCard';

interface AdminDashboardProps {
  onBackToWebsite: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToWebsite,
  onLogout,
}) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'All' | 'Published' | 'Unpublished'>('All');

  // Modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<Course | null>(null);
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null);
  const [showDbDiagnostics, setShowDbDiagnostics] = useState(false);

  const adminUser = getStoredAdminUser() || { name: 'Muhammad Ejaz', email: 'admin@learnwithaida.com' };

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const loadCourses = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await fetchAllAdminCourses();
      setCourses(data);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Failed to load courses from database.');
      if (err.message?.includes('Authentication')) {
        onLogout();
      }
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  // Handlers
  const handleCreateOrUpdateCourse = async (courseData: Partial<Course>) => {
    if (courseToEdit) {
      const updated = await updateCourseApi(courseToEdit.id, courseData);
      setCourses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      showToast(`Course "${updated.title}" updated successfully.`);
    } else {
      const created = await createCourseApi(courseData);
      setCourses((prev) => [...prev, created]);
      showToast(`Course "${created.title}" created in database.`);
    }
  };

  const handleTogglePublish = async (course: Course) => {
    const newStatus = !course.isPublished;
    try {
      const updated = await toggleCoursePublicationApi(course.id, newStatus);
      setCourses((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
      showToast(
        updated.isPublished
          ? `"${updated.title}" is now PUBLISHED on the public website.`
          : `"${updated.title}" is now UNPUBLISHED (saved as draft).`
      );
    } catch (err: any) {
      showToast(err.message || 'Failed to toggle publication status', 'error');
    }
  };

  const handleDeleteCourse = async (id: string) => {
    try {
      await deleteCourseApi(id);
      setCourses((prev) => prev.filter((c) => c.id !== id));
      showToast('Course permanently deleted from database.');
    } catch (err: any) {
      showToast(err.message || 'Failed to delete course', 'error');
      throw err;
    }
  };

  const handleLogoutClick = async () => {
    await logoutAdmin();
    onLogout();
  };

  // Filter logic
  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.number.includes(searchQuery);

    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;

    const matchesPublish =
      selectedStatusFilter === 'All'
        ? true
        : selectedStatusFilter === 'Published'
        ? c.isPublished
        : !c.isPublished;

    return matchesSearch && matchesCategory && matchesPublish;
  });

  const totalCourses = courses.length;
  const publishedCount = courses.filter((c) => c.isPublished).length;
  const unpublishedCount = totalCourses - publishedCount;
  const totalModules = courses.reduce((acc, c) => acc + (c.syllabus?.length || 0), 0);

  return (
    <div className="min-h-screen w-full max-w-full bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-2xl bg-slate-900 border-cyan-500/50 text-white animate-fade-in text-sm font-bold">
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Admin Top Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo & Portal title */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-950/60 text-cyan-400">
              <Shield className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg sm:text-xl text-white truncate">
                  AIDA Admin Portal
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                  Protected
                </span>
              </div>
              <span className="text-xs text-slate-400 truncate block">
                Logged in as: <strong className="text-slate-200">{adminUser.name}</strong> ({adminUser.email})
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => setShowDbDiagnostics(!showDbDiagnostics)}
              className={`hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                showDbDiagnostics
                  ? 'border-cyan-400 bg-cyan-950 text-cyan-300'
                  : 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white'
              }`}
            >
              <Database className="h-4 w-4" />
              <span>DB Diagnostics</span>
            </button>

            <button
              onClick={onBackToWebsite}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold text-slate-200 hover:text-white rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>View Public Website</span>
            </button>

            <button
              onClick={handleLogoutClick}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-bold text-red-300 hover:text-red-200 rounded-xl border border-red-900/60 bg-red-950/40 hover:bg-red-950/80 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Diagnostics Card (if toggled) */}
        {showDbDiagnostics && (
          <div className="animate-fade-in">
            <DatabaseStatusCard />
          </div>
        )}

        {/* Dashboard Title & Overview */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Curriculum & Course Database
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Add, modify, publish, or delete courses. Changes automatically sync to the public catalog.
            </p>
          </div>

          <button
            onClick={() => {
              setCourseToEdit(null);
              setIsFormModalOpen(true);
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all cursor-pointer shadow-lg shadow-cyan-950/60 self-start sm:self-auto"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Course</span>
          </button>
        </div>

        {/* Overview Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/70 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Courses</span>
              <BookOpen className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-white">{totalCourses}</div>
            <div className="text-xs text-slate-400 mt-1">Stored in persistent DB</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/70 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Published (Live)</span>
              <Eye className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400">{publishedCount}</div>
            <div className="text-xs text-slate-400 mt-1">Visible on public catalog</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/70 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Unpublished (Drafts)</span>
              <EyeOff className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-400">{unpublishedCount}</div>
            <div className="text-xs text-slate-400 mt-1">Hidden from public</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/70 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Syllabus Modules</span>
              <Layers className="h-4 w-4 text-teal-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-teal-300">{totalModules}</div>
            <div className="text-xs text-slate-400 mt-1">Across all programmes</div>
          </div>
        </div>

        {/* Search & Filters Bar */}
        <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Category Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-bold hidden sm:inline">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 text-xs font-bold rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="All">All Categories</option>
                <option value="Fundamentals">Fundamentals</option>
                <option value="Productivity & Code">Productivity & Code</option>
                <option value="Agents & Automation">Agents & Automation</option>
                <option value="Deployment">Deployment</option>
              </select>
            </div>

            {/* Publication Filter */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-bold hidden sm:inline">Status:</span>
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value as any)}
                className="px-3 py-2 text-xs font-bold rounded-xl border border-slate-700 bg-slate-950 text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="All">All Statuses</option>
                <option value="Published">Published Only</option>
                <option value="Unpublished">Drafts Only</option>
              </select>
            </div>

            <button
              onClick={loadCourses}
              disabled={isLoading}
              className="p-2 rounded-xl border border-slate-700 bg-slate-950 hover:bg-slate-800 text-slate-300 transition-colors"
              title="Refresh Courses"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-950/60 border border-red-800 text-red-200 text-sm flex items-center justify-between">
            <span>{errorMessage}</span>
            <button
              onClick={loadCourses}
              className="underline text-red-300 font-bold hover:text-white text-xs cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && courses.length === 0 ? (
          <div className="p-16 flex flex-col items-center justify-center text-center">
            <Loader2 className="h-10 w-10 text-cyan-400 animate-spin mb-4" />
            <h3 className="text-lg font-bold text-white">Loading Course Database...</h3>
            <p className="text-sm text-slate-400 mt-1">Retrieving records from persistent storage.</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          /* Empty State */
          <div className="p-12 rounded-2xl border border-slate-800 bg-slate-900/40 text-center space-y-3">
            <BookOpen className="h-10 w-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Courses Found</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">
              {searchQuery || selectedCategory !== 'All' || selectedStatusFilter !== 'All'
                ? 'No courses match your filter criteria. Try resetting your search or filters.'
                : 'No courses in database yet. Click "Add New Course" to create the first curriculum pathway.'}
            </p>
            {(searchQuery || selectedCategory !== 'All' || selectedStatusFilter !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedStatusFilter('All');
                }}
                className="mt-2 text-xs font-bold text-cyan-400 hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          /* Courses Table / Cards List */
          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className={`p-5 rounded-2xl border transition-all bg-slate-900/80 shadow-lg ${
                  course.isPublished ? 'border-slate-800' : 'border-amber-900/40 bg-slate-900/50'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Column: Number, Title, Tags, Summary */}
                  <div className="space-y-2 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-2.5 py-0.5 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-bold">
                        Track #{course.number}
                      </span>
                      <span className="text-xs font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                        {course.category}
                      </span>
                      <span className="text-xs text-slate-400">· {course.level}</span>
                      <span className="text-xs text-slate-400">· {course.durationEstimate}</span>

                      {/* Status pill */}
                      <span className="text-xs px-2 py-0.5 rounded font-semibold bg-slate-800/80 text-slate-300">
                        {course.status}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white break-words">
                      {course.title}
                    </h3>

                    <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
                      {course.shortDescription}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                      <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                        <Layers className="h-3.5 w-3.5" />
                        <span>{course.syllabus?.length || 0} Modules</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-300">
                        <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Price: <strong className="text-white">{course.price || 'Proposed'}</strong></span>
                      </span>
                      {course.updatedAt && (
                        <span className="text-slate-500">
                          Last Updated: {new Date(course.updatedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Publication Switch & Action Buttons */}
                  <div className="flex items-center gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-800/80 shrink-0 flex-wrap">
                    {/* Publication Toggle */}
                    <button
                      onClick={() => handleTogglePublish(course)}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        course.isPublished
                          ? 'border-emerald-600/60 bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900/60'
                          : 'border-amber-600/60 bg-amber-950/60 text-amber-300 hover:bg-amber-900/60'
                      }`}
                      title={course.isPublished ? 'Click to unpublish from site' : 'Click to publish to public site'}
                    >
                      {course.isPublished ? (
                        <>
                          <Eye className="h-4 w-4" />
                          <span>Published (Live)</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="h-4 w-4" />
                          <span>Draft (Hidden)</span>
                        </>
                      )}
                    </button>

                    {/* Edit button */}
                    <button
                      onClick={() => {
                        setCourseToEdit(course);
                        setIsFormModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-700 bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-750 transition-colors cursor-pointer"
                      title="Edit Course"
                    >
                      <Edit3 className="h-4 w-4" />
                      <span>Edit</span>
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={() => setCourseToDelete(course)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-red-900/60 bg-red-950/40 text-red-300 hover:bg-red-950/80 transition-colors cursor-pointer"
                      title="Delete Course Permanently"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      <CourseFormModal
        isOpen={isFormModalOpen}
        courseToEdit={courseToEdit}
        onClose={() => {
          setIsFormModalOpen(false);
          setCourseToEdit(null);
        }}
        onSave={handleCreateOrUpdateCourse}
      />

      <DeleteCourseConfirmModal
        course={courseToDelete}
        isOpen={Boolean(courseToDelete)}
        onClose={() => setCourseToDelete(null)}
        onConfirm={handleDeleteCourse}
      />
    </div>
  );
};
