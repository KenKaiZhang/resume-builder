import { useRef, useState } from "react";
import { UserInfo } from "./sections/UserInfo";
import { EducationInfo } from "./sections/EducationInfo";
import { ExperienceInfo } from "./sections/ExperienceInfo";
import { ProjectInfo } from "./sections/ProjectInfo";
// import { exportToPDF } from "./utils/exportPDF";

import example from "./test.json";
import { Button } from "./components/Button";
import { faArrowsRotate, faDownload, faUpload } from "@fortawesome/free-solid-svg-icons";
import { TemplatePreview } from "./templates";

export const App = () => {
  const [userInfo, setUserInfo] = useState<User>(example.user);
  const [eduInfo, setEduInfo] = useState<Education[]>(example.education);
  const [expInfo, setExpInfo] = useState<Experience[]>(example.experience);
  const [projInfo, setProjInfo] = useState<Project[]>(example.project);

  const handleUserChange = (key: string, value: any) => {
    setUserInfo((userInfo) => ({ ...userInfo, [key]: value }));
  };
  const handleEduChange = (update: Education[]) => {
    setEduInfo(update);
  };
  const handleExpChange = (update: Experience[]) => {
    setExpInfo(update);
  };
  const handleProjChange = (update: Project[]) => {
    setProjInfo(update);
  };

  return (
    <div className="h-screen w-screen grid grid-cols-2 gap-4 bg-gradient-to-b from-blue-500 to-purple-500">
      <div id="resume-maker" className="relative h-full w-full overflow-auto no-scrollbar">
        <div className="p-4 mt-4 absolute w-full grid gap-8">
          <UserInfo info={userInfo} update={handleUserChange} />
          <EducationInfo info={eduInfo} update={handleEduChange} />
          <ExperienceInfo info={expInfo} update={handleExpChange} />
          <ProjectInfo info={projInfo} update={handleProjChange} />
        </div>
      </div>
      <div id="resume-view" className="relative p-4 w-full h-full grid grid-rows-preview gap-4 overflow-hidden">
        <div id="action-buttons" className="w-full h-[60px] grid grid-cols-3 gap-4">
          <Button innerText="Download" innerIcon={faDownload} />
          <Button innerText="Set as New Default" innerIcon={faUpload} />
          <Button innerText="Reset to Default" innerIcon={faArrowsRotate} />
        </div>
        <div className="relative w-full flex justify-center align-middle overflow-auto no-scrollbar">
          <TemplatePreview id={1} data={{ user: userInfo, educations: eduInfo, experiences: expInfo, projects: projInfo }} />
        </div>
      </div>
    </div>
  );
};
