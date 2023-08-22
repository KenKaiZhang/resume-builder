import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportToPDF = (ref: any) => {
  const content = ref.current;
  html2canvas(content).then((canvas) => {
    const imgData = canvas.toDataURL("/image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
    pdf.save("download.pdf");
  });
};
