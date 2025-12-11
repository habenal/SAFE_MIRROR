const puppeteer = require("puppeteer");
const fs = require("fs");

exports.generateReportPDF = async (id, imagePath, detection) => {
  const base64 = fs.readFileSync(imagePath).toString("base64");

  const html = `
  <html>
    <body>
      <h1>SAFE MIRROR Report</h1>
      <p>ID: ${id}</p>
      <p>Deepfake Score: ${detection.deepfake_score}</p>
      <pre>${JSON.stringify(detection.regions, null, 2)}</pre>
      <img src="data:image/jpeg;base64,${base64}" width="300"/>
    </body>
  </html>
  `;

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html);
  const pdf = await page.pdf({ format: "A4" });

  await browser.close();

  const outPath = `src/storage/${id}.pdf`;
  fs.writeFileSync(outPath, pdf);
  return outPath;
};
