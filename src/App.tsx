import { useState } from "react";
import ResumeForm from "./components/ResumeForm";
import type { ResumeData } from "./types";
import { initialResume } from "./constants";
import ResumeRender from "./components/ResumeRender/ResumeRender";
import Actions from "./components/Actions";

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResume);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="my-8 flex flex-col gap-1 text-center">
        <h1 className="font-bold tracking-widest">R E S U M E</h1>
        <h1 className="font-bold tracking-wider">B U I L D E R</h1>
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
