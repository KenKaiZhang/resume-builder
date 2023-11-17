import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Template1 } from "./Template1";

export interface TemplateProps {
  id: number;
  data: Resume;
}

export const TemplatePreview = (props: TemplateProps) => {
  const { id, data } = props;
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [template, setTemplate] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    const node: HTMLElement = contentRef?.contentWindow?.document?.body as HTMLElement;
    if (node) {
      setMountNode(node);
      setTemplate(<Template1 data={data} />);
    }
  }, [contentRef, data]);

  return (
    <iframe title="Preview" ref={(ref) => setContentRef(ref)} className="h-[1122px] w-[794px] scale-90">
      {mountNode && createPortal(template, mountNode)}
    </iframe>
  );
};
