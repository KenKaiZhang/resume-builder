import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { pdf } from "@react-pdf/renderer";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ children }: any) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const scaleRender = () => {
    const renderPreview: HTMLElement = document.querySelector("#resume-preview") as HTMLElement;
    const renderPreviewH: number = renderPreview.clientHeight;
    const renderPreviewW: number = renderPreview.clientWidth;

    const scaleH = renderPreviewH / (31.7 * 25.795276);
    const scaleW = renderPreviewW / (23 * 25.795276);
    const scaleFactor = Math.min(scaleH, scaleW);
    console.log(renderPreviewH, renderPreviewW, scaleFactor);
    if (scaleFactor >= 1) return;
    const renderBox: HTMLElement = document.querySelector(".document") as HTMLElement;
    renderBox.style.transform = `scale(${scaleFactor})`;
  };
  useEffect(() => scaleRender());
  window.addEventListener("resize", scaleRender);

  useEffect(() => {
    const child = React.Children.only(children);

    pdf(child)
      .toBlob()
      .then((blob) => {
        setPdfUrl(URL.createObjectURL(blob));
      });
  }, [children]);

  return (
    <div id="pdf-viewer">
      <div id="wrapper">
        <Document file={pdfUrl} className="document w-21cm h-29.7cm p-2cm m-1cm 0  relative flex flex-col justify-center shadow-md scale-110">
          <Page key={1} pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
        </Document>
      </div>
    </div>
  );
};

export default PDFViewer;
