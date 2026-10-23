export interface FounderInfo {
  name: string;
  academy: string;
  email: string;
  mobile: string;
  location: string;
  preferredDomain: string;
}

export interface CoreLearningProgramme {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  keyHighlights: string[];
  businessApplication: string;
  scopeTag: string;
}

export interface BusinessSolutionArea {
  id: string;
  number: string;
  title: string;
  clientProblem: string;
  aiSolutionDescription: string;
  marketableSkill: string;
}

export interface Course {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  status: 'Curriculum Proposed' | 'Coming Soon' | 'In Development' | 'Enrolling' | string;
  level: 'Beginner' | 'Beginner to Intermediate' | 'Intermediate to Advanced' | string;
  category: 'Fundamentals' | 'Productivity & Code' | 'Agents & Automation' | 'Deployment' | string;
  price?: string;
  thumbnail?: string;
  isPublished: boolean;
  durationEstimate: string;
  keyOutcomes: string[];
  syllabus: {
    moduleNumber: string;
    title: string;
    summary: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminUser {
  email: string;
  role: 'admin';
  name: string;
}

export interface AdminAuthResponse {
  token: string;
  user: AdminUser;
  expiresAt: string;
}

export interface DatabaseStatus {
  configured: boolean;
  type: string;
  location: string;
  totalCourses: number;
  publishedCourses: number;
  unpublishedCourses: number;
  recommendation: string;
  cloudOptions: {
    name: string;
    description: string;
    setupRequired: string[];
  }[];
}

export interface ClaudeCredential {
  id: string;
  number: string;
  title: string;
  attribution: 'Anthropic';
  recipient: string;
  status: 'Completed Credential';
  competencyFocus: string;
  syllabusOverview: string;
  targetAudience: string;
  curriculumHighlights: string[];
  preparationNotice: string;
}

export interface LearningPrinciple {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  pedagogicalFocus: string;
}

export interface EnquiryFormState {
  fullName: string;
  email: string;
  mobile: string;
  programme: string;
  message: string;
}

export interface StoredEnquiry extends EnquiryFormState {
  id: string;
  createdAt: string;
}
