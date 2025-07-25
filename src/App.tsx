import { useState } from "react";
import { initialResume } from "./constants";
import type { ResumeData } from "./types";

import ResumeForm from "./components/ResumeForm";
import ResumeRender from "./components/ResumeRender";
import Actions from "./components/Actions";
import Settings from "./components/Settings"


function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResume);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="p-8 flex w-full justify-between" >
        <div className="flex gap-1 font-bold">
          <h1>RESUME</h1>
          <h1 className="text-purple-500">BUILDER</h1>
        </div>
        <Settings />
      </div>
      <div className="mb-8 w-[95%] max-w-[1800px] min-w-[800px] max-h-[90%] flex-1 block xl:flex">
        <div className="flex-1">
          <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
        </div>
        <div className="flex flex-col items-center flex-1">
          <Actions resumeData={resumeData} setResumeData={setResumeData} />
          <ResumeRender renderType={0} resumeData={resumeData} />
        </div>
      </div>
    </div>
  );
}

export default App;
