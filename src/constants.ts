import type { EducationData, ExperienceData, PersonalInfoData, ProjectData, ResumeData } from "./types";

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
  description: "",
}

export const initialProject: ProjectData = {
  title: "",
  technologies: "",
  description: "",
}

export const initialResume: ResumeData = {
  personalInfo: initialPersonalInfo,
  educations: [],
  experiences: [],
  projects: []
}