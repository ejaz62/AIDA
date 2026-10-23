import React from 'react';
import { FOUNDER_DATA } from '../data/academyData';
import { Target, ShieldCheck, Wrench, Compass, Mail, Phone, MapPin, Globe } from 'lucide-react';
import founderImage from '../assets/images/founder_muhammad_ejaz.jpeg';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  return (
    <section id="about" className="py-16 sm:py-24 border-b border-slate-900 bg-slate-950/60 overflow-hidden w-full max-w-full">
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 w-full min-w-0">
        
        {/* Section Heading (32-40px heading; Arial Bold) */}
        <div className="max-w-3xl">
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-cyan-400">Institutional Profile</span>
          <h2 className="mt-2 text-[28px] xs:text-[32px] sm:text-[38px] lg:text-[40px] font-bold tracking-tight text-white text-balance leading-tight break-words">
            Democratising Practical AI Education
          </h2>
          <p className="mt-4 text-[17px] sm:text-[19px] lg:text-[20px] font-normal text-slate-200 leading-relaxed">
            AIDA — Artificial Intelligence Digital Academy was created with a clear imperative: to demystify advanced AI and equip learners with real, applicable digital craftsmanship.
          </p>
        </div>

        {/* 2-Column Content Split */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Left Column: Academy Mission & Values */}
          <div className="lg:col-span-7 space-y-8 min-w-0">
            <div className="space-y-5 text-[17px] sm:text-[19px] font-normal text-slate-200 leading-relaxed">
              <p>
                As artificial intelligence reshapes industries, the gap between theoretical knowledge and practical execution has widened. Many educational resources focus either on heavy mathematical proofs or superficial chatbot tricks. AIDA bridges this gap with structured, project-driven training tailored for beginners, aspiring technologists, and digital professionals.
              </p>
              <p>
                Our educational approach is built around four fundamental pillars:
              </p>
            </div>

            {/* 4 Pillars Grid (22-26px titles; Arial Bold) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-2">
              <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/50 min-w-0">
                <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5">
                  <Wrench className="h-5 w-5 text-cyan-400 shrink-0" />
                  <h3 className="text-[19px] sm:text-[22px] font-bold text-white break-words">Practical Learning</h3>
                </div>
                <p className="text-[14px] sm:text-base font-normal text-slate-300 leading-relaxed">
                  Every concept is tested on realistic scenarios—from document parsing and code pair-programming to building deployable apps.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/50 min-w-0">
                <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5">
                  <ShieldCheck className="h-5 w-5 text-cyan-400 shrink-0" />
                  <h3 className="text-[19px] sm:text-[22px] font-bold text-white break-words">Responsible AI Use</h3>
                </div>
                <p className="text-[14px] sm:text-base font-normal text-slate-300 leading-relaxed">
                  We emphasize accuracy verification, hallucination mitigation, ethical standards, and robust security protocols.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/50 min-w-0">
                <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5">
                  <Target className="h-5 w-5 text-cyan-400 shrink-0" />
                  <h3 className="text-[19px] sm:text-[22px] font-bold text-white break-words">Problem Solving</h3>
                </div>
                <p className="text-[14px] sm:text-base font-normal text-slate-300 leading-relaxed">
                  Focusing on outcomes rather than tool hype—identifying high-impact operational bottlenecks that AI can realistically resolve.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-slate-900/50 min-w-0">
                <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5">
                  <Compass className="h-5 w-5 text-cyan-400 shrink-0" />
                  <h3 className="text-[19px] sm:text-[22px] font-bold text-white break-words">Marketable Skills</h3>
                </div>
                <p className="text-[14px] sm:text-base font-normal text-slate-300 leading-relaxed">
                  Preparing students for commercial viability, service delivery, agency workflows, and modern digital entrepreneurship.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Meet the Founder Showcase with Actual Photograph */}
          <div className="lg:col-span-5 w-full min-w-0">
            <div className="rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-900/90 p-5 sm:p-7 backdrop-blur-sm shadow-2xl min-w-0">
              
              {/* Card Header: Meet the Founder */}
              <div className="border-b border-slate-800 pb-4 mb-5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-cyan-400">
                    Meet the Founder
                  </span>
                  <span className="text-xs font-bold text-slate-300 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700">
                    AIDA Leadership
                  </span>
                </div>
                <h3 className="mt-1.5 text-2xl sm:text-3xl font-bold text-white break-words">
                  Muhammad Ejaz
                </h3>
                <p className="text-sm sm:text-base text-cyan-300 font-bold mt-0.5 break-words">
                  Founder, AIDA Digital Academy
                </p>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Artificial Intelligence Digital Academy · Lahore, Pakistan
                </p>
              </div>

              {/* Founder Actual Photograph */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-xl mb-5">
                <img
                  src={founderImage}
                  alt="Muhammad Ejaz — Founder, AIDA Digital Academy (Artificial Intelligence Digital Academy)"
                  className="w-full max-w-full h-[340px] sm:h-[400px] lg:h-[420px] object-cover object-center"
                  onError={(e) => {
                    // Resilient fallback to public assets URL
                    const target = e.currentTarget;
                    if (!target.dataset.triedPublic) {
                      target.dataset.triedPublic = 'true';
                      target.src = '/assets/aistudio/WhatsApp_Image_2026-10-21_at_2.25.23_AM_48048a4e.jpeg';
                    } else if (!target.dataset.triedWhatsapp) {
                      target.dataset.triedWhatsapp = 'true';
                      target.src = '/assets/aistudio/whatsapp/WhatsApp_Image_2026-10-21_at_2.25.23_AM_48048a4e.jpeg';
                    }
                  }}
                />
              </div>

              {/* Founder Introduction & Commitment Statement */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 text-[14px] sm:text-[15px] text-slate-200 leading-relaxed space-y-2.5 mb-5 font-normal">
                <div className="text-xs uppercase tracking-wider font-bold text-cyan-400">
                  Founder Commitment
                </div>
                <p>
                  “My commitment at AIDA is to make modern artificial intelligence education accessible, practical, and grounded for everyone. Rather than focusing on abstract theory or superficial chatbot tricks, we equip beginners and digital builders with real, functional capabilities—from creating intelligent AI agents and automated WhatsApp employees to delivering dependable web solutions for business clients.”
                </p>
                <div className="pt-2 border-t border-slate-800/80 text-xs sm:text-[13px] text-slate-300">
                  <strong className="text-white font-bold">Verified Learning Credentials:</strong> Completed all 10 Anthropic Claude Academy certifications.
                </div>
              </div>

              {/* Direct Academy Contact Details */}
              <div className="grid grid-cols-1 gap-2.5 text-xs sm:text-[14px] text-slate-200 mb-5">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800/60 min-w-0">
                  <MapPin className="h-4 w-4 text-cyan-400 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-slate-400 block text-[11px] font-medium">Location</span>
                    <span className="font-bold text-white">{FOUNDER_DATA.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800/60 min-w-0">
                  <Mail className="h-4 w-4 text-cyan-400 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-slate-400 block text-[11px] font-medium">Institutional Email</span>
                    <a
                      href={`mailto:${FOUNDER_DATA.email}`}
                      className="font-bold text-cyan-300 hover:text-cyan-200 transition-colors break-all"
                    >
                      {FOUNDER_DATA.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800/60 min-w-0">
                  <Phone className="h-4 w-4 text-cyan-400 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-slate-400 block text-[11px] font-medium">Direct Mobile</span>
                    <a
                      href={`tel:${FOUNDER_DATA.mobile.replace(/\s+/g, '')}`}
                      className="font-bold text-white hover:text-cyan-300 transition-colors"
                    >
                      {FOUNDER_DATA.mobile}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/50 border border-slate-800/60 min-w-0">
                  <Globe className="h-4 w-4 text-cyan-400 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-slate-400 block text-[11px] font-medium">Target Academy Domain</span>
                    <span className="text-cyan-400 font-bold break-all">{FOUNDER_DATA.preferredDomain}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={onContactClick}
                className="w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-3.5 text-[15px] sm:text-[17px] font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors cursor-pointer text-center shadow-md shadow-cyan-950/50"
              >
                <span>Connect with Muhammad Ejaz</span>
              </button>

            </div>
          </div>

        </div>

        {/* 1. Interactive Learning Environment & Digital Workshops (Prominent Enlarged Feature with Pakistani Students) */}
        <div className="mt-14 sm:mt-20 w-full min-w-0">
          <div className="mb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-3">
            <div>
              <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-cyan-400">Campus & Studio Experience</span>
              <h3 className="text-[22px] xs:text-[24px] sm:text-[32px] lg:text-[36px] font-bold text-white mt-1 break-words">
                Interactive Learning Environment & Digital Workshops
              </h3>
            </div>
            <span className="text-xs sm:text-base text-slate-300 font-medium">
              Lahore AI Technology Lab · Collaborative Classrooms
            </span>
          </div>

          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl w-full max-w-full">
            {/* Enlarged realistic photograph featuring Pakistani male and female students */}
            <img
              src="/src/assets/images/workshop_pakistan_ai_lab_1792530100390.jpg"
              alt="Pakistani male and female students participating naturally in AI training, digital workshops, classroom discussions, and practical computer-based learning at AIDA Digital Academy"
              referrerPolicy="no-referrer"
              className="w-full max-w-full h-[320px] sm:h-[440px] md:h-[500px] lg:h-[560px] xl:h-[600px] object-cover object-center transform hover:scale-[1.01] transition-transform duration-700"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />

            {/* Bottom informative caption bar */}
            <div className="p-4 sm:p-7 lg:p-8 bg-slate-950/95 border-t border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 min-w-0">
              <div className="min-w-0">
                <h4 className="text-base sm:text-xl font-bold text-white break-words">
                  Modern Pakistani Educational Environment
                </h4>
                <p className="mt-1 text-xs sm:text-base text-slate-300 font-normal max-w-3xl break-words">
                  Pakistani male and female students working together in contemporary, welcoming digital workshops—collaborating on AI agent workflows, software development, code execution, and real client problem-solving.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 text-xs sm:text-sm font-bold">
                  Hands-On Computer Lab
                </span>
                <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs sm:text-sm font-bold">
                  Inclusive & Welcoming
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
