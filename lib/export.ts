import PDFDocument from 'pdfkit';
import type { CVData } from '@/components/dashboard/DashboardDisplay';
import type { CoverLetterData } from '@/lib/types';

function streamToBuffer(doc: PDFKit.PDFDocument): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
  });
}

function sectionHeader(doc: PDFKit.PDFDocument, title: string) {
  doc.moveDown(0.8);
  doc
    .fontSize(10)
    .font('Helvetica-Bold')
    .fillColor('#475072')
    .text(title.toUpperCase(), { characterSpacing: 0.5 });
  doc.moveDown(0.3);
  doc.fillColor('#000000');
}

function buildResumePages(doc: PDFKit.PDFDocument, cv: CVData) {
  doc
    .fontSize(20)
    .font('Helvetica-Bold')
    .text(cv.fullName || 'Candidate');

  const contactItems = [
    cv.contactInfo?.email,
    cv.contactInfo?.phone,
    cv.contactInfo?.location,
    cv.contactInfo?.linkedin,
    cv.contactInfo?.portfolio,
  ].filter(Boolean);

  if (contactItems.length > 0) {
    doc.fontSize(9).font('Helvetica').fillColor('#5B6478').text(contactItems.join('  •  '));
    doc.fillColor('#000000');
  }

  if (cv.summary) {
    sectionHeader(doc, 'Professional Summary');
    doc.fontSize(10).font('Helvetica').text(cv.summary, { lineGap: 2 });
  }

  if (cv.skills?.length > 0) {
    sectionHeader(doc, 'Skills');
    doc.fontSize(10).font('Helvetica').text(cv.skills.join('  •  '), { lineGap: 2 });
  }

  if (cv.experience?.length > 0) {
    sectionHeader(doc, 'Work Experience');
    cv.experience.forEach((exp, i) => {
      if (i > 0) doc.moveDown(0.6);
      doc
        .fontSize(10.5)
        .font('Helvetica-Bold')
        .text(`${exp.role} — ${exp.company}`, { continued: false });
      doc
        .fontSize(9)
        .font('Helvetica')
        .fillColor('#5B6478')
        .text(`${exp.location ? exp.location + '  •  ' : ''}${exp.period}`);
      doc.fillColor('#000000').moveDown(0.2);

      (exp.bulletPoints || []).forEach((bullet) => {
        doc.fontSize(10).font('Helvetica').text(`•  ${bullet}`, {
          indent: 10,
          lineGap: 2,
        });
      });
    });
  }

  if (cv.education?.length > 0) {
    sectionHeader(doc, 'Education');
    cv.education.forEach((edu) => {
      doc
        .fontSize(10)
        .font('Helvetica-Bold')
        .text(edu.degree, { continued: true })
        .font('Helvetica')
        .text(`  —  ${edu.institution}`);
      doc
        .fontSize(9)
        .fillColor('#5B6478')
        .text(`${edu.location ? edu.location + '  •  ' : ''}${edu.year}`);
      doc.fillColor('#000000');
      if (edu.details) doc.fontSize(9).text(edu.details);
      doc.moveDown(0.3);
    });
  }

  if (cv.projects?.length) {
    sectionHeader(doc, 'Projects');
    cv.projects.forEach((proj) => {
      doc.fontSize(10).font('Helvetica-Bold').text(proj.title);
      doc.fontSize(10).font('Helvetica').text(proj.description, { lineGap: 2 });
      if (proj.technologies?.length) {
        doc.fontSize(9).fillColor('#5B6478').text(proj.technologies.join(', '));
        doc.fillColor('#000000');
      }
      doc.moveDown(0.3);
    });
  }
}

function buildCoverLetterPage(doc: PDFKit.PDFDocument, letter: CoverLetterData) {
  doc.addPage();

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  doc.fontSize(9).font('Helvetica').fillColor('#5B6478').text(today);
  doc.text(
    `Re: ${letter.recipient.roleTitle}${letter.recipient.companyName ? ` at ${letter.recipient.companyName}` : ''}`
  );
  doc.fillColor('#000000').moveDown(1);

  doc.fontSize(10).font('Helvetica-Bold').text(letter.salutation);
  doc.moveDown(0.8);

  doc.font('Helvetica');
  [
    letter.paragraphs.opening,
    letter.paragraphs.bodyParagraph1,
    letter.paragraphs.bodyParagraph2,
    letter.paragraphs.closing,
  ].forEach((para) => {
    doc.text(para, { lineGap: 3 });
    doc.moveDown(0.6);
  });

  doc.moveDown(0.6);
  doc.text(letter.signOff);
  doc.font('Helvetica-Bold').text(letter.candidateName);
}

export async function generateApplicationPdf(
  cv: CVData,
  letter: CoverLetterData | null
): Promise<Buffer> {
  const doc = new PDFDocument({ size: 'A4', margin: 50, bufferPages: true });
  const bufferPromise = streamToBuffer(doc);

  buildResumePages(doc, cv);
  if (letter) buildCoverLetterPage(doc, letter);

  doc.end();
  return bufferPromise;
}
