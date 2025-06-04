import type { EducationData, ExperienceData, PersonalInfoData, ProjectData, ResumeData } from "@/types";
import PersonalInfo from "./PersonalInfo";
import Education from "./Educations";
import { useEffect } from "react";
import Experience from "./Experiences";
import Projects from "./Projects";

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const ResumeForm: React.FC<ResumeFormProps> = ({
  resumeData,
  setResumeData,
}) => {

  const handleSetPersonalInfo = (newValue: PersonalInfoData) => {
    setResumeData((prev) => ({ ...prev, personalInfo: newValue }));
  };

  const handleSetEducations = (newValue: EducationData[]) => {
    setResumeData((prev) => ({ ...prev, educations: newValue }))
  }
  
  const handleSetExperiences = (newValue: ExperienceData[]) => {
    setResumeData((prev) => ({ ...prev, experiences: newValue }))
  }

  const handleSetProjects = (newValue: ProjectData[]) => {
    setResumeData((prev) => ({ ...prev, projects: newValue }))
  }


  useEffect(() => console.log(resumeData), [resumeData])

  return (
    <div className="pr-2 flex flex-1 flex-col gap-4 overflow-auto">
      <PersonalInfo
        data={resumeData.personalInfo}
        setData={handleSetPersonalInfo}
      />
      <Education
        data={resumeData.educations}
        setData={handleSetEducations}
      />
      <Experience 
        data={resumeData.experiences}
        setData={handleSetExperiences}
      />
      <Projects
        data={resumeData.projects}
        setData={handleSetProjects}
      />
    </div>
  );
};

export default ResumeForm;
