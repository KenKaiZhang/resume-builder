import { useState } from "react";
import ResumeForm from "./components/ResumeForm";
import type { ResumeData } from "./types";
import { initialResume } from "./constants";
import { Button } from "./components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faRedoAlt,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResume);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="font-bold tracking-widest">R E S U M E</h1>
        <h1 className="font-bold tracking-wider">B U I L D E R</h1>
        <div className="flex gap-2 items-center">
          <Button size="sm" variant="ghost" className="font">
            <FontAwesomeIcon icon={faUpload} />
          </Button>

          <Button size="sm" variant="ghost" className="font">
            <FontAwesomeIcon icon={faDownload} />
          </Button>
          <Button size="sm" variant="ghost" className="font">
            <FontAwesomeIcon icon={faRedoAlt} />
          </Button>
        </div>
      </div>
      <div className="w-[90%] h-[90%] flex">
        <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
        <div className="flex-1"></div>
      </div>
    </div>
  );
}

export default App;
