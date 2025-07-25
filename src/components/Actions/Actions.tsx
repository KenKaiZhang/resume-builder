import { Button } from "@/components/ui/button";
import { initialResume } from "@/constants";
import type { ResumeData } from "@/types";
import { faFileDownload, faRedoAlt, faSave, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import html2canvas from 'html2canvas-pro';
import jsPDF from "jspdf";

interface ActionProps {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const Actions: React.FC<ActionProps> = ({ resumeData, setResumeData }) => {
  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,application/json";
    input.onchange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;
      const text = await file.text();
      try {
        const data = JSON.parse(text);
        setResumeData(data);
      } catch {
        alert("Invalid JSON file.");
      }
    };
    input.click();
  };

  const handleSave = () => {
    const now = new Date();

    const mm = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const dd = String(now.getDate()).padStart(2, "0");
    const yyyy = now.getFullYear();

    const formattedDate = mm + dd + yyyy;

    const dataStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `resume-${formattedDate}-data`;
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleDownload = async () => {
    const element = document.querySelector(".border-2.shadow-xl.bg-white");
    if (!element) return;

    const canvas = await html2canvas(element as HTMLElement, {
      scale: 4,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: "letter",
    });

    const imgWidth = 8.5;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const yyyy = now.getFullYear();
    const formattedDate = mm + dd + yyyy;
    
    pdf.save(`resume-${formattedDate}.pdf`);
  };

  const handleReset = () => {
    setResumeData(initialResume);
  };

  return (
    <div className="flex mb-4 p-2 w-min gap-2 border-2 rounded-xl">
      <Button className="flex-1" onClick={handleUpload}>
        <FontAwesomeIcon icon={faUpload} />
        <p>Import Resume Data</p>
      </Button>
      <Button className="flex-1" onClick={handleSave}>
        <FontAwesomeIcon icon={faSave} />
        <p>Save Resume Data</p>
      </Button>
      <Button className="flex-1" onClick={handleDownload}>
        <FontAwesomeIcon icon={faFileDownload} />
        <p>Download Resume</p>
      </Button>
      <Button className="flex-1 text-white bg-purple-600 hover:bg-purple-700" onClick={handleReset}>
        <FontAwesomeIcon icon={faRedoAlt} />
        <p>Reset</p>
      </Button>
    </div>
  );
};

export default Actions;

