import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import ReactPDF from "@react-pdf/renderer";

// export const exportToPDF = () => {
//   const domElement: HTMLElement = document.getElementById("resume-template") as HTMLElement;
//   html2canvas(domElement, { scale: 2 }).then((canvas: HTMLCanvasElement) => {
//     const doc: jsPDF = new jsPDF({
//       format: "a4",
//       unit: "px",
//     });
//     const domHTML: HTMLElement = document.getElementById("resume-template") as HTMLElement;
//     doc.html(domHTML, {
//       async callback(domHTML) {
//         await domHTML.save("resume");
//       },
//     });
//   });
// };
