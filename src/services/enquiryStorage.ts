import { EnquiryFormState, StoredEnquiry } from '../types';
import { FOUNDER_DATA } from '../data/academyData';

const STORAGE_KEY = 'aida_academy_enquiries_v1';

export function getStoredEnquiries(): StoredEnquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to parse stored enquiries:', err);
    return [];
  }
}

export function saveEnquiry(enquiry: EnquiryFormState): StoredEnquiry {
  const newRecord: StoredEnquiry = {
    ...enquiry,
    id: 'ENQ-' + Date.now().toString(36).toUpperCase(),
    createdAt: new Date().toISOString(),
  };

  try {
    const existing = getStoredEnquiries();
    const updated = [newRecord, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save enquiry to storage:', err);
  }

  return newRecord;
}

export function generateMailtoUrl(enquiry: EnquiryFormState): string {
  const recipient = encodeURIComponent(FOUNDER_DATA.email);
  const subject = encodeURIComponent(`[AIDA Enquiry] ${enquiry.programme || 'General Admission'} - ${enquiry.fullName}`);
  
  const bodyText = [
    `Dear AIDA Admissions / Muhammad Ejaz,`,
    ``,
    `I am interested in learning with AIDA — Artificial Intelligence Digital Academy.`,
    ``,
    `-- ENQUIRY DETAILS --`,
    `Full Name: ${enquiry.fullName}`,
    `Email Address: ${enquiry.email}`,
    `Mobile Number: ${enquiry.mobile || 'Not provided'}`,
    `Programme of Interest: ${enquiry.programme || 'General Admission'}`,
    ``,
    `Message:`,
    `${enquiry.message}`,
    ``,
    `-- Sent via AIDA Academy Website (${FOUNDER_DATA.preferredDomain}) --`
  ].join('\n');

  return `mailto:${recipient}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
}

export function clearStoredEnquiries(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear stored enquiries:', err);
  }
}
