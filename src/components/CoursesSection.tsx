import React, { useState, useEffect } from 'react';
import { Course } from '../types';
import { fetchPublishedCourses } from '../services/courseApi';
import { COURSES_DATA } from '../data/academyData';
import { BookOpen, Clock, ArrowRight, Layers, CheckCircle2, DollarSign, Loader2, Sparkles } from 'lucide-react';

interface CoursesSectionProps {
  onSelectCourse: (course: Course) => void;
  onEnquireCourse: (courseTitle: string) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  onSelectCourse,
  onEnquireCourse,
}) => {
  const [courses, setCourses] = useState<Course[]>(COURSES_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      try {
        const { courses: fetched } = await fetchPublishedCourses();
        if (isMounted && fetched.length > 0) {
          setCourses(fetched);
        }
      } catch (err) {
        console.warn('Could not load dynamic courses, using initial catalog:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute categories dynamically from loaded courses
  const uniqueCategories = Array.from(new Set(courses.map((c) => c.category))).filter(Boolean);
  const categories = ['All', ...uniqueCategories];

  const filteredCourses = activeCategory === 'All'
    ? courses
    : courses.filter((c) => c.category === activeCategory);

  return (
    <section id="programmes" className="py-16 sm:py-24 border-b border-slate-900 bg-slate-950 overflow-hidden w-full max-w-full">
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 w-full min-w-0">
        
        {/* Section Header (32-40px scale; Arial Bold) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-sm font-bold tracking-wider uppercase text-cyan-400">Curriculum Catalog</span>
            <h2 className="mt-2 text-[32px] sm:text-[38px] lg:text-[40px] font-bold tracking-tight text-white leading-tight">
              Courses & Learning Programmes
            </h2>
            <p className="mt-4 text-[18px] sm:text-[19px] lg:text-[20px] font-normal text-slate-200 leading-relaxed">
              Explore AIDA’s curriculum pathways, stored and managed in our persistent academy database. Structured to guide learners from fundamental reasoning up to production-grade AI agents and commercial automation workflows.
            </p>
          </div>

          {/* Academic Transparency Note */}
          <div className="max-w-md p-4 rounded-2xl border border-slate-800 bg-slate-900/60 text-[15px] sm:text-base text-slate-300 leading-relaxed font-normal">
            <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1.5">
              <Layers className="h-5 w-5" />
              <span>Database Managed Catalog</span>
            </div>
            All programmes below are live and synchronized from the academy database. Select any programme to review the planned syllabus modules or submit an advance enquiry.
          </div>
        </div>

        {/* Category Filter Bar */}
        <div className="mt-12 flex flex-wrap items-center gap-2.5 border-b border-slate-800 pb-5">
          <span className="text-[17px] font-bold text-slate-200 mr-2">Filter Category:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-[17px] font-bold rounded-xl transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm shadow-cyan-950'
                  : 'text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-900 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State or Course Cards Grid */}
        {isLoading ? (
          <div className="mt-16 py-12 flex flex-col items-center justify-center text-center">
            <Loader2 className="h-8 w-8 text-cyan-400 animate-spin mb-3" />
            <p className="text-base text-slate-300 font-bold">Synchronizing courses from academy database...</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="mt-12 p-8 rounded-2xl border border-slate-800 bg-slate-900/40 text-center">
            <p className="text-base text-slate-300">No published courses found in this category.</p>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 hover:bg-slate-900/90 hover:border-slate-700 transition-all duration-300 p-7 group shadow-xl"
              >
                <div>
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex items-center justify-between text-sm sm:text-base text-slate-300 mb-4 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">Course #{course.number}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="font-bold text-slate-200">{course.level}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {course.price && (
                        <span className="px-2.5 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 font-bold text-xs sm:text-sm">
                          {course.price}
                        </span>
                      )}
                      <span className="text-slate-400 font-bold text-xs sm:text-sm">
                        {course.status}
                      </span>
                    </div>
                  </div>

                  {/* Optional Course Thumbnail */}
                  {course.thumbnail && (
                    <div className="mb-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 max-h-40">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-36 object-cover object-center"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  {/* Course Title: 22-26px Arial Bold */}
                  <h3 className="text-[22px] sm:text-[25px] font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {course.title}
                  </h3>

                  {/* Short Description: 18-20px Arial Regular */}
                  <p className="mt-3.5 text-[18px] sm:text-[19px] font-normal text-slate-200 leading-relaxed">
                    {course.shortDescription}
                  </p>

                  {/* Key Outcomes Teaser */}
                  <div className="mt-6 space-y-2.5 pt-5 border-t border-slate-800">
                    <div className="text-sm font-bold uppercase tracking-wider text-slate-300">
                      Target Competencies
                    </div>
                    {course.keyOutcomes.slice(0, 2).map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-[16px] sm:text-[17px] font-normal text-slate-200 leading-relaxed">
                        <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-1" />
                        <span className="line-clamp-2">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Controls & Metadata (17-19px Arial Bold) */}
                <div className="mt-8 pt-5 border-t border-slate-800">
                  <div className="flex items-center justify-between text-sm sm:text-[15px] text-slate-300 mb-4">
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span>{course.durationEstimate}</span>
                    </span>
                    <span className="flex items-center gap-2 text-cyan-400 font-bold">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.syllabus?.length || 0} Modules</span>
                    </span>
                  </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onSelectCourse(course)}
                    className="flex items-center justify-center gap-2 px-4 py-3 text-[17px] font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl transition-colors cursor-pointer"
                  >
                    <span>Syllabus</span>
                  </button>

                  <button
                    onClick={() => onEnquireCourse(course.title)}
                    className="flex items-center justify-center gap-2 px-4 py-3 text-[17px] font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors cursor-pointer shadow-sm"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

        {/* Global Catalog Footer Note */}
        <div className="mt-12 sm:mt-14 p-5 sm:p-7 rounded-2xl border border-slate-800 bg-slate-900/40 flex flex-col md:flex-row items-center justify-between gap-6 w-full min-w-0">
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white">Have a specific learning goal or corporate team?</h4>
            <p className="text-[14px] sm:text-base text-slate-300 mt-1 font-normal">
              AIDA can tailor learning tracks for small businesses, university students, or engineering teams.
            </p>
          </div>
          <button
            onClick={() => onEnquireCourse('Custom Training / General Inquiry')}
            className="w-full md:w-auto px-5 sm:px-6 py-3 text-[15px] sm:text-[17px] font-bold text-cyan-400 hover:text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 rounded-xl transition-colors cursor-pointer text-center shrink-0"
          >
            Request Custom Consultation
          </button>
        </div>

      </div>
    </section>
  );
};
