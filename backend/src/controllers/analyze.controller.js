const { stripExif } = require("../utils/exif");
const { runFakeDetector } = require("../utils/detection");
const { encryptFile, decryptFile } = require("../utils/crypto");
const { generateReportPDF } = require("../utils/pdf");
const locker = require("../services/locker.service");
const fs = require("fs");
const path = require("path");

exports.analyzeMedia = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const id = locker.createId();
    const tempPath = req.file.path;

    // Remove EXIF
    const cleanedPath = await stripExif(tempPath, id);

    // Run deepfake stub
    const detection = await runFakeDetector(cleanedPath);

    // Generate PDF evidence
    const pdfPath = await generateReportPDF(id, cleanedPath, detection);

    // Encrypt PDF + Image
    const encryptedPdf = await encryptFile(pdfPath, `${id}.pdf.enc`);
    const encryptedImg = await encryptFile(cleanedPath, `${id}.img.enc`);

    // Save metadata in locker
    locker.saveRecord(id, {
      pdf: encryptedPdf,
      image: encryptedImg,
      detection,
      createdAt: new Date()
    });

    return res.json({
      id,
      ...detection,
      report_url: `/api/v1/analyze/report/${id}`
    });

  } catch (err) {
    console.error("Analyze ERROR:", err);
    res.status(500).json({ error: "Processing failed", details: err.message });
  }
};

exports.getReport = async (req, res) => {
  try {
    const { id } = req.params;
    const record = locker.getRecord(id);
    if (!record) return res.status(404).send("Not found");

    const pdfBuffer = await decryptFile(record.pdf);

    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).send("Error reading report");
  }
};

exports.listEvidence = (req, res) => {
  const records = locker.getAllRecords();
  // Sort by newest first
  records.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(records);
};

exports.eraseMedia = (req, res) => {
  const { id } = req.params;
  locker.deleteRecord(id);
  res.json({ ok: true });
};
