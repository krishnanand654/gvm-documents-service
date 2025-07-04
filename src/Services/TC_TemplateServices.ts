import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";
import { PdfData } from "../Models/Data";
import { put, list, del } from "@vercel/blob";
import dotenv from "dotenv";
import { d } from "@vercel/blob/dist/create-folder-DGBfYPet.cjs";
const convertDate = require("date-convert");

dotenv.config();

export class TC_TemplateServices {
  // private filesDir:string;

  // constructor(){
  //     this.filesDir = path.join(__dirname, process.env.FILE_PATH);
  //     if (!fs.existsSync(this.filesDir)) {
  //         fs.mkdirSync(this.filesDir, { recursive: true });
  //     }
  // }
  private dob_with_word: string = "";

  async convertDatatoWord(data: PdfData): Promise<string> {
    return convertDate(data.dob);
  }

  async createPdf(data: PdfData): Promise<any> {

    try {
      const word = await this.convertDatatoWord(data);
      this.dob_with_word = data.dob + " (" + word + ")";
    } catch {
      console.log("Error in converting data to word");
    }

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4 size in points (8.27 x 11.69 inches)

    const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const fontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

    const fontSize = 10;

    const drawText = (text: string, x: number, y: number) => {
      page.drawText(text, { x, y, size: fontSize, font, color: rgb(0, 0, 0) });
    };

    const lineHeight = fontSize * 1.2;

    drawText("Form 5", 290, 800);
    const textWidth = 200;

    page.drawText("TRANSFER CERTIFICATE", {
      x: 225,
      y: 780,
      size: 14,
      font,
      color: rgb(0, 0, 0),
    });

    const underlineY = 778;
    const startX = 225;
    const endX = 390;

    page.drawLine({
      start: { x: startX, y: underlineY },
      end: { x: endX, y: underlineY },
    });

    drawText("TC No", 50, 750);
    drawText(":", 300, 750);
    drawText(data.tcNo || "", 320, 750);

    drawText("Name of School", 50, 715);
    drawText(":", 300, 715);
    const schoolName =
      "Gayathri Vidhya Mandir\nVazhappally,Changanassery,\nAccredicted Agency of NIOS, OBE Programme";
    schoolName.split("\n").forEach((line, index) => {
      drawText(line, 320, 725 - index * lineHeight);
    });

    drawText("Whether the school is a recognized School", 50, 675);
    drawText(":", 300, 675);
    const recognition = "Yes, Recognized By NIOS\nAccredition No OB914416";
    recognition.split("\n").forEach((line, index) => {
      drawText(line, 320, 680 - index * lineHeight);
    });

    drawText("Name of pupil", 50, 650);
    drawText(":", 300, 650);
    drawText(data.pupilName || "name", 320, 650);

    drawText("Admission No.", 50, 630);
    drawText(":", 300, 630);
    drawText(data.admissionNo || "123", 320, 630);

    const guardianText =
      "Name of parent/guardian and relationship of the pupil\nto the guardian";
    guardianText.split("\n").forEach((line, index) => {
      drawText(line, 50, 610 - index * lineHeight);
    });
    drawText(":", 300, 605);
    drawText(data.guardianName || "guardian", 320, 619 - lineHeight);

    drawText("Identification marks if any of the pupil", 50, 580);
    drawText(":", 300, 580);
    drawText(data.identificationMarks || "marks", 320, 580);

    drawText("Nationality", 50, 560);
    drawText(":", 300, 560);
    drawText(data.nationality || "Indian", 320, 560);

    drawText("Religion", 50, 540);
    drawText(":", 300, 540);
    drawText(data.religion || "religion", 320, 540);

    const casteText =
      "Whether the candidate belongs to SC/ST or OBC or\nwhether he/she is a convert from SC/ST";
    casteText.split("\n").forEach((line, index) => {
      drawText(line, 50, 520 - index * lineHeight);
    });
    drawText(":", 300, 515);
    drawText(data.casteCategory || "caste", 320, 515);

    drawText(
      "Date of birth according to Admission Register (in words)",
      50,
      488
    );
    drawText(":", 300, 488);
    // drawText(this.dob_with_word == "" ? data.dob : this.dob_with_word || "dob",320,488);
    drawText(data.dob || "dob",320,488);
    drawText("Standard in which the pupil was last enrolled (in words)",50,466);
    drawText(":", 300, 466);
    drawText(data.lastEnrolled || "standard", 320, 466);

    drawText("Date of Admission or promotion to that Standard", 50, 444);
    drawText(":", 300, 444);
    drawText(data.admissionDate || "date", 320, 444);

    drawText("Whether qualified for promotion to a Higher Standard:", 50, 422);
    drawText(":", 300, 422);
    drawText(data.qualifiedForPromotion ? "Yes" : "No", 320, 422);

    drawText("Whether the pupil has paid all the fees due to School:", 50, 400);
    drawText(":", 300, 400);
    drawText(data.feesPaid ? "Yes" : "No", 320, 400);

    drawText(
      "Whether the pupil was in receipt of the fee concession:",
      50,
      378
    );
    drawText(":", 300, 378);
    drawText(data.feeConcession ? "Yes" : "No", 320, 378);

    drawText("Date of the pupil's last attendance at School:", 50, 356);
    drawText(":", 300, 356);
    drawText(data.lastAttendanceDate || "date", 320, 356);

    drawText("Date on which the name was removed from rolls:", 50, 334);
    drawText(":", 300, 334);
    drawText(data.removedDate || "date", 320, 334);

    drawText("Date of Application for Certificate:", 50, 312);
    drawText(":", 300, 312);
    drawText(data.applicationDate || "date", 320, 312);

    drawText("Date of Issue of the Certificate:", 50, 290);
    drawText(":", 300, 290);
    drawText(data.certificateIssueDate || "date", 320, 290);

    drawText("Reason for leaving:", 50, 268);
    drawText(":", 300, 268);
    drawText(data.reasonForLeaving || "reason", 320, 268);

    drawText("School to which the pupil intends proceeding:", 50, 246);
    drawText(":", 300, 246);
    drawText(data.intendsProceeding || "school", 320, 246);

    drawText("Number of School days unto the date:", 50, 224);
    drawText(":", 300, 224);
    drawText(data.schoolDaysUntoDate || "0", 320, 224);

    drawText("Number of School days pupil attended:", 50, 202);
    drawText(":", 300, 202);
    drawText(data.schoolDaysAttended || "0", 320, 202);

    drawText("Character and Conduct:", 50, 180);
    drawText(":", 300, 180);
    drawText(data.characterAndConduct || "good", 320, 180);

    drawText("PRINCIPAL", 50, 100);
    drawText("School Seal", 250, 100);
    drawText("Co-Ordinator NIOS", 450, 100);
    page.drawText("Gayathri Vidya Mandir", {
      x: 450,
      y: 80,
      size: 10,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    // const outputPath = path.join(__dirname,process.env.FILE_PATH, 'TC.pdf');
    // const outputPath = path.join(process.env.FILE_PATH, 'TC.pdf');

    // this.deleteAllBlobs().catch((error) => {
    //     console.error('An error occurred:', error);
    //   });

    // const blob_url = await put('TC.pdf', pdfBytes, {
    //     access: 'public',
    //   });

    // fs.writeFileSync(outputPath, pdfBytes);
    // return pdfBytes;

    // return blob_url;

    try {
      await this.deleteAllBlobs();

      const blob_url = await put("TC.pdf", pdfBytes, {
        access: "public",
      });

      return blob_url;
    } catch (error) {
      console.error("An error occurred during blob deletion:", error);

      throw new Error("Failed to delete blobs before uploading the new file.");
    }
  }

  async deleteAllBlobs() {
    let cursor;

    do {
      const listResult: any = await list({
        cursor,
        limit: 1000,
      });

      if (listResult.blobs.length > 0) {
        await del(listResult.blobs.map((blob: any) => blob.url));
      }

      cursor = listResult.cursor;
    } while (cursor);

    console.log("All blobs were deleted");
  }
}
