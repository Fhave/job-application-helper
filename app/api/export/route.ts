import { generateApplicationPdf } from '@/lib/export';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { cvData, coverLetterData } = await req.json();

  if (!cvData) {
    return new Response('CV data is required to export.', { status: 400 });
  }

  try {
    const buffer = await generateApplicationPdf(cvData, coverLetterData ?? null);
    const safeName = (cvData.fullName || 'resume').toLowerCase().replace(/[^a-z0-9]+/g, '-');

    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${safeName}-application.pdf"`,
      },
    });
  } catch (err) {
    console.error('PDF generation failed:', err);
    return new Response('Failed to generate PDF.', { status: 500 });
  }
}