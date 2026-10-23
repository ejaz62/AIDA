import React, { useState, useEffect } from 'react';
import { FOUNDER_DATA, COURSES_DATA, CORE_LEARNING_PROGRAMMES } from '../data/academyData';
import { EnquiryFormState, StoredEnquiry } from '../types';
import { saveEnquiry, generateMailtoUrl } from '../services/enquiryStorage';
import { Mail, Phone, MapPin, Globe, Send, CheckCircle, Copy, ExternalLink, AlertCircle } from 'lucide-react';

interface ContactSectionProps {
  initialProgramme?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialProgramme }) => {
  const [form, setForm] = useState<EnquiryFormState>({
    fullName: '',
    email: '',
    mobile: '',
    programme: initialProgramme || 'General Inquiry & Admissions',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryFormState, string>>>({});
  const [submittedEnquiry, setSubmittedEnquiry] = useState<StoredEnquiry | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (initialProgramme) {
      setForm(prev => ({ ...prev, programme: initialProgramme }));
    }
  }, [initialProgramme]);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof EnquiryFormState, string>> = {};

    if (!form.fullName.trim()) {
      errs.fullName = 'Full name is required.';
    } else if (form.fullName.trim().length < 2) {
      errs.fullName = 'Name must be at least 2 characters.';
    }

    if (!form.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!form.message.trim()) {
      errs.message = 'Please provide a brief message or question.';
    } else if (form.message.trim().length < 10) {
      errs.message = 'Message should be at least 10 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const saved = saveEnquiry(form);
    setSubmittedEnquiry(saved);
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(label);
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  const handleReset = () => {
    setSubmittedEnquiry(null);
    setForm({
      fullName: '',
      email: '',
      mobile: '',
      programme: 'General Inquiry & Admissions',
      message: '',
    });
    setErrors({});
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-950 border-b border-slate-900 overflow-hidden w-full max-w-full">
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 w-full min-w-0">
        
        {/* Section Header (32-40px heading; Arial Bold) */}
        <div className="max-w-3xl">
          <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-cyan-400">Direct Inquiries</span>
          <h2 className="mt-2 text-[28px] xs:text-[32px] sm:text-[38px] lg:text-[40px] font-bold tracking-tight text-white leading-tight break-words">
            Connect with AIDA & Founder
          </h2>
          <p className="mt-4 text-[17px] sm:text-[19px] lg:text-[20px] font-normal text-slate-200 leading-relaxed">
            Have questions about upcoming cohorts, course syllabi, corporate workshops, or student advisement? Reach out directly to founder Muhammad Ejaz.
          </p>
        </div>

        {/* 2-Column Split */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Left Column: Direct Contact Details & Info */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-7 min-w-0 w-full">
            
            <div className="p-5 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/70 shadow-xl space-y-6 sm:space-y-7 min-w-0">
              <div>
                <span className="text-xs sm:text-sm uppercase text-cyan-400 font-bold">Academy Headquarters</span>
                <h3 className="mt-1.5 text-xl sm:text-2xl font-bold text-white break-words">
                  Artificial Intelligence Digital Academy
                </h3>
                <p className="text-sm sm:text-base text-slate-300 mt-1 font-normal">
                  Founded by <strong className="text-white font-bold">{FOUNDER_DATA.name}</strong>
                </p>
              </div>

              <div className="space-y-4 pt-3 border-t border-slate-800">
                {/* Email with copy */}
                <div className="flex items-start justify-between gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-start gap-3.5">
                    <Mail className="h-6 w-6 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs sm:text-sm text-slate-400 font-medium">Official Email</div>
                      <a
                        href={`mailto:${FOUNDER_DATA.email}`}
                        className="text-base sm:text-lg font-bold text-white hover:text-cyan-300 transition-colors break-all"
                      >
                        {FOUNDER_DATA.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopyText(FOUNDER_DATA.email, 'Email copied')}
                    className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Copy email to clipboard"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </div>

                {/* Mobile / Phone with copy */}
                <div className="flex items-start justify-between gap-3 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-start gap-3.5">
                    <Phone className="h-6 w-6 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs sm:text-sm text-slate-400 font-medium">Mobile / WhatsApp Direct</div>
                      <a
                        href={`tel:${FOUNDER_DATA.mobile.replace(/\s+/g, '')}`}
                        className="text-base sm:text-lg font-bold text-white hover:text-cyan-300 transition-colors"
                      >
                        {FOUNDER_DATA.mobile}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopyText(FOUNDER_DATA.mobile, 'Mobile copied')}
                    className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Copy phone to clipboard"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <MapPin className="h-6 w-6 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs sm:text-sm text-slate-400 font-medium">Location</div>
                    <div className="text-base sm:text-lg font-bold text-white">{FOUNDER_DATA.location}</div>
                  </div>
                </div>

                {/* Preferred Domain */}
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <Globe className="h-6 w-6 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs sm:text-sm text-slate-400 font-medium">Preferred Academy Domain</div>
                    <div className="text-base sm:text-lg font-bold text-cyan-400">
                      {FOUNDER_DATA.preferredDomain}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400 mt-1 font-normal">
                      Target digital portal address for future full online learning platform.
                    </div>
                  </div>
                </div>
              </div>

              {copyFeedback && (
                <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-sm sm:text-base text-cyan-300 flex items-center gap-2 font-bold">
                  <CheckCircle className="h-5 w-5 text-cyan-400" />
                  <span>{copyFeedback}</span>
                </div>
              )}
            </div>

            {/* Response time commitment */}
            <div className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/40 text-[15px] sm:text-base text-slate-300 leading-relaxed font-normal">
              Muhammad Ejaz personally reviews student enquiries. For urgent guidance or custom training inquiries, direct email or WhatsApp/mobile contact is welcomed.
            </div>
          </div>

          {/* Right Column: Contact & Enquiry Form */}
          <div className="lg:col-span-7 min-w-0 w-full">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-8 lg:p-9 shadow-xl min-w-0">
              
              {!submittedEnquiry ? (
                <>
                  <div className="border-b border-slate-800 pb-5 mb-7">
                    <h3 className="text-2xl font-bold text-white">Student & Course Enquiry</h3>
                    <p className="text-base text-slate-300 mt-1.5 font-normal">
                      Complete this form to register interest or request course details.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm sm:text-base font-bold uppercase tracking-wider text-slate-200 mb-2">
                        Full Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        placeholder="e.g. Tariq Ahmed"
                        className={`w-full rounded-xl bg-slate-950 border px-4 py-3.5 text-base sm:text-lg text-white placeholder-slate-500 focus:outline-none transition-colors font-normal ${
                          errors.fullName
                            ? 'border-rose-500 focus:border-rose-500'
                            : 'border-slate-800 focus:border-cyan-400'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1.5 text-sm text-rose-400 flex items-center gap-1.5 font-bold">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Email & Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm sm:text-base font-bold uppercase tracking-wider text-slate-200 mb-2">
                          Email Address <span className="text-cyan-400">*</span>
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="name@example.com"
                          className={`w-full rounded-xl bg-slate-950 border px-4 py-3.5 text-base sm:text-lg text-white placeholder-slate-500 focus:outline-none transition-colors font-normal ${
                            errors.email
                              ? 'border-rose-500 focus:border-rose-500'
                              : 'border-slate-800 focus:border-cyan-400'
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-sm text-rose-400 flex items-center gap-1.5 font-bold">
                            <AlertCircle className="h-4 w-4" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm sm:text-base font-bold uppercase tracking-wider text-slate-200 mb-2">
                          Mobile Number <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <input
                          type="tel"
                          value={form.mobile}
                          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                          placeholder="+92 300 1234567"
                          className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3.5 text-base sm:text-lg text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition-colors font-normal"
                        />
                      </div>
                    </div>

                    {/* Programme of Interest */}
                    <div>
                      <label className="block text-sm sm:text-base font-bold uppercase tracking-wider text-slate-200 mb-2">
                        Programme of Interest
                      </label>
                      <select
                        value={form.programme}
                        onChange={(e) => setForm({ ...form, programme: e.target.value })}
                        className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3.5 text-base sm:text-lg text-white focus:border-cyan-400 focus:outline-none transition-colors font-normal"
                      >
                        <option value="General Inquiry & Admissions">General Inquiry & Admissions</option>
                        
                        <optgroup label="Core Focus Programmes">
                          {CORE_LEARNING_PROGRAMMES.map((prog) => (
                            <option key={prog.id} value={prog.title}>
                              {prog.number}. {prog.title}
                            </option>
                          ))}
                        </optgroup>

                        <optgroup label="Curriculum Courses">
                          {COURSES_DATA.map((course) => (
                            <option key={course.id} value={course.title}>
                              {course.number}. {course.title}
                            </option>
                          ))}
                        </optgroup>

                        <optgroup label="Specialized & Client Services">
                          <option value="WhatsApp AI Employees Consultation">
                            WhatsApp AI Employees (Commercial Solution)
                          </option>
                          <option value="Practical AI Solutions for Businesses">
                            Practical AI Solutions for Businesses
                          </option>
                          <option value="Claude Academy Mentorship with Muhammad Ejaz">
                            Claude Academy Mentorship with Muhammad Ejaz
                          </option>
                          <option value="Corporate / Custom Team Training">
                            Corporate / Custom Team Training
                          </option>
                        </optgroup>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm sm:text-base font-bold uppercase tracking-wider text-slate-200 mb-2">
                        Your Message or Learning Goals <span className="text-cyan-400">*</span>
                      </label>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us about your background, the skills you would like to master, or specific questions about the curriculum..."
                        className={`w-full rounded-xl bg-slate-950 border px-4 py-3.5 text-base sm:text-lg text-white placeholder-slate-500 focus:outline-none transition-colors font-normal ${
                          errors.message
                            ? 'border-rose-500 focus:border-rose-500'
                            : 'border-slate-800 focus:border-cyan-400'
                        }`}
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-sm text-rose-400 flex items-center gap-1.5 font-bold">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Transparency Notice */}
                    <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-sm sm:text-[15px] text-slate-300 leading-relaxed font-normal">
                      <strong className="text-white font-bold">Technical Note:</strong> In this informational release, enquiries are validated and recorded locally. Submitting will provide an instant confirmation and a direct 1-click mailto dispatch to <code className="text-cyan-400 font-bold">mentorsvalley@gmail.com</code>.
                    </div>

                    {/* Submit Button (17-19px Arial Bold) */}
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 px-7 py-4 text-[17px] sm:text-[18px] font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-md shadow-cyan-950/50 cursor-pointer"
                    >
                      <Send className="h-5 w-5" />
                      <span>Submit Programme Enquiry</span>
                    </button>
                  </form>
                </>
              ) : (
                /* Submission Confirmation State */
                <div className="py-4 space-y-7">
                  <div className="p-5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-start gap-3.5">
                    <CheckCircle className="h-7 w-7 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-white">Enquiry Formatted Successfully</h4>
                      <p className="text-base text-slate-200 mt-1.5 leading-relaxed font-normal">
                        Thank you, <strong className="text-white font-bold">{submittedEnquiry.fullName}</strong>. Your enquiry for <strong className="text-cyan-300 font-bold">{submittedEnquiry.programme}</strong> has been logged locally (Reference ID: <span className="text-cyan-400 font-bold">{submittedEnquiry.id}</span>).
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3.5 text-sm sm:text-base">
                    <div className="text-cyan-400 font-bold uppercase tracking-wider">
                      Recorded Enquiry Details
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-slate-200">
                      <div><span className="text-slate-400">Email:</span> <span className="font-bold text-white">{submittedEnquiry.email}</span></div>
                      <div><span className="text-slate-400">Phone:</span> <span className="font-bold text-white">{submittedEnquiry.mobile || 'N/A'}</span></div>
                      <div className="col-span-2"><span className="text-slate-400">Programme:</span> <span className="font-bold text-white">{submittedEnquiry.programme}</span></div>
                    </div>
                    <div className="pt-3 border-t border-slate-800 text-slate-200 font-normal">
                      <span className="text-slate-400 font-medium">Message:</span> &ldquo;{submittedEnquiry.message}&rdquo;
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-base text-slate-200 font-normal">
                      To send this message directly from your local email client right now, click the button below:
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href={generateMailtoUrl(submittedEnquiry)}
                        className="flex-1 flex items-center justify-center gap-2.5 px-6 py-4 text-[17px] font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors text-center"
                      >
                        <span>Send via Email Client</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>

                      <button
                        onClick={handleReset}
                        className="px-6 py-4 text-[17px] font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-750 rounded-xl transition-colors cursor-pointer"
                      >
                        Submit Another Enquiry
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
