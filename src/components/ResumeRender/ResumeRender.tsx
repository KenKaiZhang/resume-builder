import type { ResumeData } from "@/types";
import { useEffect, useRef, useState } from "react";
import { Template1 } from "./templates";

const LETTER_HEIGHT = 1056; // 11in @ 96dpi
const LETTER_ASPECT_RATIO = 8.5 / 11; // width / height
const LETTER_WIDTH = LETTER_HEIGHT * LETTER_ASPECT_RATIO;

interface ResumeRenderProps {
  resumeData: ResumeData;
  renderType: number;
}

const ResumeRender: React.FC<ResumeRenderProps> = ({ renderType, resumeData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  let targetTemplate;
  switch (renderType) {
    case 1:
      targetTemplate = <Template1 resumeData={resumeData} />;
      break;
    // add more cases as needed
    default:
      targetTemplate = <Template1 resumeData={resumeData} />;
  }

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;

      try {
        const { width, height } = containerRef.current.getBoundingClientRect();

        const marginFactor = 0.95;
        const scaleByHeight = (height * marginFactor) / LETTER_HEIGHT;
        const scaleByWidth = (width * marginFactor) / LETTER_WIDTH;
        setScale(Math.min(scaleByHeight, scaleByWidth));
      } catch {
        return 1;
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div ref={containerRef} className="flex justify-center flex-1 overflow-hidden">
      <div
        ref={containerRef}
        className=" border-2 shadow-xl bg-white"
        style={{
          transform: `scale(${scale})`,
          width: `${LETTER_WIDTH}px`,
          height: `${LETTER_HEIGHT}px`,
          transformOrigin: "top",
        }}
      >
        {targetTemplate}
      </div>
    </div>
  );
};

export default ResumeRender;
