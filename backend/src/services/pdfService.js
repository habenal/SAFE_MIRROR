const puppeteer = require('puppeteer');

async function generatePdfReport({ id, imageBase64, deepfake_score, nudity_score, regions, hash, timestamp }) {
  const html = `
  <html><head><meta charset="utf-8"><title>SAFE MIRROR Report ${id}</title>
  <style>
    body{font-family:Arial,Helvetica,sans-serif;padding:20px;color:#222}
    .meta{font-size:12px;color:#666}
    h1{color:#111}
    img{max-width:100%;height:auto;border:1px solid #ddd;padding:6px}
    pre{background:#f7f7f7;padding:8px;border-radius:4px;}
  </style>
  </head><body>
  <h1>SAFE MIRROR — Evidence Report</h1>
  <p class="meta">ID: ${id} | Timestamp (UTC): ${timestamp} | SHA256: ${hash}</p>
  <h2>Detection summary</h2>
  <ul>
    <li>Deepfake likelihood: <strong>${deepfake_score}</strong></li>
    <li>Nudity (NSFW) score: <strong>${nudity_score}</strong></li>
  </ul>
  <h2>Suspicious regions</h2>
  <pre>${JSON.stringify(regions, null, 2)}</pre>
  <h2>Preview</h2>
  <img src="data:image/jpeg;base64,${imageBase64}" />
  <hr/>
  <p>If you plan to use this report for legal or enforcement purposes, preserve the original file and follow local guidance. SAFE MIRROR provides signed timestamps and integrity hashes for evidentiary support.</p>
  </body></html>
  `;

  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();
  return pdfBuffer;
}

module.exports = { generatePdfReport };
