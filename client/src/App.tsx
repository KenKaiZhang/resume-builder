import { ProfileInfo } from "./sections/ProfileInfo";
import { SkillInfo } from "./sections/SkillInfo";
import { EducationInfo } from "./sections/EducationInfo";
import { ExperienceInfo } from "./sections/ExperienceInfo";
import { ProjectInfo } from "./sections/ProjectInfo";
import { Button } from "./components/Button";
import { faArrowsRotate, faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
import PDFViewer from "./templates";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Template2 } from "./templates/Template2";
import { useAppSelector } from "./app/hook";
import { UserButton } from "./components/UserButton";

export const App = () => {
  const resumeInfo: Resume = {
    user: useAppSelector((state) => state.profile),
    educations: useAppSelector((state) => state.education.history),
    experiences: useAppSelector((state) => state.experience.history),
    projects: useAppSelector((state) => state.project.history),
    skills: useAppSelector((state) => state.skill),
  };
  return (
    <div className="h-screen w-screen grid grid-cols-2 gap-4 bg-gradient-to-b from-blue-500 to-purple-500">
      <div id="resume-maker" className="relative h-full w-full overflow-auto no-scrollbar">
        <div className="py-8 pl-8 mt-4 absolute w-full grid gap-8">
          <ProfileInfo />
          <SkillInfo />
          <EducationInfo />
          <ExperienceInfo />
          <ProjectInfo />
        </div>
      </div>
      <div id="resume-view" className="relative p-4 w-full h-full grid grid-rows-preview gap-4 overflow-auto">
        <div id="action-buttons" className="w-full h-[45px] grid grid-cols-[1fr,45px] gap-4">
          <div id="resume-actions" className="w-full h-full grid grid-cols-3 gap-4">
            <PDFDownloadLink document={<Template2 resume={resumeInfo} />} fileName="example">
              <Button innerText="Download" innerIcon={faDownload} />
            </PDFDownloadLink>
            <Button innerText="Set as New Default" innerIcon={faUpload} />
            <Button innerText="Reset to Default" innerIcon={faArrowsRotate} />
          </div>
          <div id="user-actions" className="relative w-full h-full">
            <UserButton />
          </div>
        </div>
        <div id="resume-preview" className="w-full h-full flex justify-center items-center box-border overflow-hidden z-0">
          <PDFViewer>
            <Template2 resume={resumeInfo} />
          </PDFViewer>
        </div>
      </div>
    </div>
  );
};
