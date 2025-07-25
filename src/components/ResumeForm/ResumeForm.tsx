import type {
  CertificationData,
  EducationData,
  ExperienceData,
  PersonalInfoData,
  ProjectData,
  ResumeData,
  SkillData,
} from "@/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Badge } from "../ui/badge";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons/faGraduationCap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faCertificate,
  faCogs,
  faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons";
import { 
  PersonalInfo,
  Educations,
  Experiences,
  Projects,
  Skills,
  Certifications
} from "./components"

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
    setResumeData((prev) => ({ ...prev, educations: newValue }));
  };

  const handleSetExperiences = (newValue: ExperienceData[]) => {
    setResumeData((prev) => ({ ...prev, experiences: newValue }));
  };

  const handleSetProjects = (newValue: ProjectData[]) => {
    setResumeData((prev) => ({ ...prev, projects: newValue }));
  };

  const handleSetSkills = (newValue: SkillData[]) => {
    setResumeData((prev) => ({ ...prev, skills: newValue }));
  };

  const handleSetCertifications = (newValue: CertificationData[]) => {
    setResumeData((prev) => ({ ...prev, certifications: newValue }));
  };

  return (
    <div className="pr-2 h-full flex flex-col gap-4 overflow-auto">
      <PersonalInfo
        data={resumeData.personalInfo}
        setData={handleSetPersonalInfo}
      />
      <Accordion type="multiple">
        <AccordionItem value="educations">
          <AccordionTrigger>
            <div className="flex flex-1 gap-2 items-center">
              <FontAwesomeIcon
                icon={faGraduationCap}
                className="text-sm mt-0.5"
              />
              <h1>Education</h1>
              {resumeData.educations.length && (
                <Badge className="ml-auto">
                  {resumeData.educations.length}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Educations
              data={resumeData.educations}
              setData={handleSetEducations}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="experiences">
          <AccordionTrigger>
            <div className="flex flex-1 gap-2 items-center">
              <FontAwesomeIcon icon={faBriefcase} className="text-sm mt-0.5" />
              <h1>Experience</h1>
              {resumeData.experiences.length && (
                <Badge className="ml-auto">
                  {resumeData.experiences.length}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Experiences
              data={resumeData.experiences}
              setData={handleSetExperiences}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="projects">
          <AccordionTrigger>
            <div className="flex flex-1 gap-2 items-center">
              <FontAwesomeIcon
                icon={faProjectDiagram}
                className="text-sm mt-0.5"
              />
              <h1>Projects</h1>
              {resumeData.projects.length && (
                <Badge className="ml-auto">{resumeData.projects.length}</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Projects data={resumeData.projects} setData={handleSetProjects} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="skills">
          <AccordionTrigger>
            <div className="flex flex-1 gap-2 items-center">
              <FontAwesomeIcon icon={faCogs} className="text-sm mt-0.5" />
              <h1>Skills</h1>
              {resumeData.skills.length && (
                <Badge className="ml-auto">{resumeData.skills.length}</Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Skills data={resumeData.skills} setData={handleSetSkills} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="certificates">
          <AccordionTrigger>
            <div className="flex flex-1 gap-2 items-center">
              <FontAwesomeIcon
                icon={faCertificate}
                className="text-sm mt-0.5"
              />
              <h1>Certificates</h1>
              {resumeData.certifications.length && (
                <Badge className="ml-auto">
                  {resumeData.certifications.length}
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Certifications
              data={resumeData.certifications}
              setData={handleSetCertifications}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ResumeForm;
