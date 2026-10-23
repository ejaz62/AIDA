/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhatYouWillLearnSection } from './components/WhatYouWillLearnSection';
import { BusinessSolutionsSection } from './components/BusinessSolutionsSection';
import { CoursesSection } from './components/CoursesSection';
import { ClaudeAcademySection } from './components/ClaudeAcademySection';
import { AboutSection } from './components/AboutSection';
import { WhyAidaSection } from './components/WhyAidaSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CourseModal } from './components/CourseModal';
import { CredentialModal } from './components/CredentialModal';
import { FutureArchitectureModal } from './components/FutureArchitectureModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { verifyAdminSession, getStoredAdminToken } from './services/courseApi';
import { Course, ClaudeCredential } from './types';

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedCredential, setSelectedCredential] = useState<ClaudeCredential | null>(null);
  const [selectedProgrammeForEnquiry, setSelectedProgrammeForEnquiry] = useState<string>('General Inquiry & Admissions');
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);

  // Admin Dashboard and Login states
  const [isAdminViewOpen, setIsAdminViewOpen] = useState(false);
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    async function checkAuth() {
      const isValid = await verifyAdminSession();
      setIsAdminAuthenticated(isValid);
      if (window.location.hash === '#admin') {
        if (isValid) {
          setIsAdminViewOpen(true);
        } else {
          setIsAdminLoginModalOpen(true);
        }
      }
    }
    checkAuth();

    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        if (getStoredAdminToken()) {
          setIsAdminViewOpen(true);
        } else {
          setIsAdminLoginModalOpen(true);
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleAdminTrigger = () => {
    if (isAdminAuthenticated) {
      setIsAdminViewOpen(true);
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnquireCourse = (courseTitle?: string) => {
    if (courseTitle) {
      setSelectedProgrammeForEnquiry(courseTitle);
    }
    scrollToSection('contact');
  };

  // If Admin Dashboard is active, render the dedicated Admin Dashboard interface
  if (isAdminViewOpen && isAdminAuthenticated) {
    return (
      <AdminDashboard
        onBackToWebsite={() => {
          setIsAdminViewOpen(false);
          if (window.location.hash === '#admin') {
            window.history.pushState('', document.title, window.location.pathname + window.location.search);
          }
        }}
        onLogout={() => {
          setIsAdminAuthenticated(false);
          setIsAdminViewOpen(false);
          if (window.location.hash === '#admin') {
            window.history.pushState('', document.title, window.location.pathname + window.location.search);
          }
        }}
      />
    );
  }

  return (
    <div className="min-h-screen w-full max-w-full bg-slate-950 text-slate-100 flex flex-col font-sans overflow-x-clip selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Top Bar Navigation */}
      <Header
        onOpenEnquiry={() => handleEnquireCourse()}
        onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
        onOpenAdmin={handleAdminTrigger}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full max-w-full overflow-x-clip">
        {/* 1. Home / Hero */}
        <Hero
          onExploreProgrammes={() => scrollToSection('what-you-will-learn')}
          onContactClick={() => scrollToSection('contact')}
        />

        {/* 2. What You Will Learn (Core 4 Programmes Focus) */}
        <WhatYouWillLearnSection
          onEnquireProgramme={(title) => handleEnquireCourse(title)}
        />

        {/* 3. Practical AI Solutions for Businesses */}
        <BusinessSolutionsSection
          onEnquire={(title) => handleEnquireCourse(title)}
        />

        {/* 4. Complete Curriculum & Course Catalog */}
        <CoursesSection
          onSelectCourse={(course) => setSelectedCourse(course)}
          onEnquireCourse={(courseTitle) => handleEnquireCourse(courseTitle)}
        />

        {/* 5. Anthropic Claude Academy Certifications & Completed Credentials by Muhammad Ejaz */}
        <ClaudeAcademySection
          onSelectCredential={(credential) => setSelectedCredential(credential)}
          onEnquirePathway={(title) => handleEnquireCourse(`Claude Pathway: ${title}`)}
        />

        {/* 6. About AIDA & Founder Profile (Muhammad Ejaz, Lahore) */}
        <AboutSection
          onContactClick={() => scrollToSection('contact')}
        />

        {/* 7. Why Learn with AIDA? Instructional Principles */}
        <WhyAidaSection
          onExploreProgrammes={() => scrollToSection('what-you-will-learn')}
        />

        {/* 8. Direct Contact & Admissions Enquiries */}
        <ContactSection
          initialProgramme={selectedProgrammeForEnquiry}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
        onExploreProgrammes={() => scrollToSection('what-you-will-learn')}
        onOpenAdmin={handleAdminTrigger}
      />

      {/* Modals */}
      <CourseModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onEnquire={(courseTitle) => handleEnquireCourse(courseTitle)}
      />

      <CredentialModal
        credential={selectedCredential}
        onClose={() => setSelectedCredential(null)}
        onEnquirePathway={(title) => handleEnquireCourse(`Claude Pathway: ${title}`)}
      />

      <FutureArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onSuccess={() => {
          setIsAdminAuthenticated(true);
          setIsAdminViewOpen(true);
        }}
      />
    </div>
  );
}
