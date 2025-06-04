import { useState } from "react";
import ResumeForm from "./components/ResumeForm";
import type { ResumeData } from "./types";
import { initialResume } from "./constants";

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResume);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="font-bold tracking-widest" >R E S U M E</h1>
        <h1 className="font-bold tracking-wider">B U I L D E R</h1>
      </div>
      <div className="w-[90%] h-[90%] flex">
        <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
        <div className="flex-1"></div>
      </div>
    </div>
  );
}

export default App;
