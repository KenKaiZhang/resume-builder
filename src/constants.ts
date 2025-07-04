import type { CertificationData, EducationData, ExperienceData, PersonalInfoData, ProjectData, ResumeData, SkillData } from "./types";

export const initialPersonalInfo: PersonalInfoData = {
  name: "",
  phone: "",
  email: "",
  address: "",
  links: "",
}

export const initialEducation: EducationData = {
  school: "",
  location: "",
  degree: "",
  gpa: "",
  years: "",
  classes: ""
}

export const initialExperience: ExperienceData = {
  company: "",
  title: "",
  location: "",
  years: "",
  tools: "",
  description: "",
}

export const initialProject: ProjectData = {
  title: "",
  technologies: "",
  description: "",
}

export const initialSkill: SkillData = {
  category: "",
  skills: ""
}

export const initialCertification: CertificationData = {
  issuer: "",
  title: "",
  date: "",
}

export const initialResume: ResumeData = {
  personalInfo: initialPersonalInfo,
  educations: [],
  experiences: [],
  projects: [],
  skills: [],
  certifications: []
}