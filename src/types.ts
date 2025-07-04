export interface ResumeData {
  personalInfo: PersonalInfoData
  educations: EducationData[]
  experiences: ExperienceData[]
  projects: ProjectData[]
  skills: SkillData[]
  certifications: CertificationData[]
}

export interface PersonalInfoData {
  name: string;
  phone: string;
  email: string;
  address: string;
  links: string;
}

export interface EducationData {
  school: string;
  location: string;
  degree: string;
  gpa: string;
  years: string;
  classes: string;
}

export interface ExperienceData {
  company: string;
  title: string;
  location: string;
  years: string;
  description: string;
  tools: string;
}

export interface ProjectData {
  title: string;
  technologies: string;
  link?: string;
  description: string;
}

export interface SkillData {
  category: string;
  skills: string;
}

export interface CertificationData {
  issuer: string;
  title: string;
  date: string;
}