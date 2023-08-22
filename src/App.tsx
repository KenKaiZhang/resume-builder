import { useRef, useState } from "react";
import { UserInfo } from "./sections/UserInfo";
import { EducationInfo } from "./sections/EducationInfo";
import { ExperienceInfo } from "./sections/ExperienceInfo";
import { ProjectInfo } from "./sections/ProjectInfo";
import { exportToPDF } from "./utils/exportPDF";

import example from "./test.json";
import { Template1 } from "./templates/Template1";

export const App = () => {
  const [userInfo, setUserInfo] = useState<User>(example.user);
  const [eduInfo, setEduInfo] = useState<Education[]>(example.education);
  const [expInfo, setExpInfo] = useState<Experience[]>(example.experience);
  const [projInfo, setProjInfo] = useState<Project[]>(example.project);

  const contentRef = useRef(null);

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
    <div className="p-8 min-h-screen w-screen grid grid-cols-2 gap-12 bg-[#1E1E1E] ">
      <div id="resume-maker" className="relative h-full w-full overflow-auto ">
        <div className="mt-4 absolute w-full grid gap-8">
          <UserInfo info={userInfo} update={handleUserChange} />
          <EducationInfo info={eduInfo} update={handleEduChange} />
          <ExperienceInfo info={expInfo} update={handleExpChange} />
          <ProjectInfo info={projInfo} update={handleProjChange} />
        </div>
      </div>
      <div id="resume-view" className="w-full h-full">
        <div className="w-full aspect-[8.5/11]">
          <Template1 user={userInfo} experience={expInfo} education={eduInfo} project={projInfo} />
        </div>
        <div id="action-buttons">
          <button onClick={() => exportToPDF(contentRef)}>CLICK ME</button>
        </div>
      </div>
    </div>
  );
};
