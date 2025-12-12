const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const axios = require("axios"); // Need to install axios or use fetch if node 18+

// Assuming Node 18+ fetch is available, or use axios if preferred. 
// Let's use axios for better handling of FormData streams in older node or just consistency.
// Actually, standard fetch in Node 18+ works well with FormData from 'form-data' package or built-in validation?
// Let's stick to 'axios' and 'form-data' which is robust for node.

exports.runFakeDetector = async (filePath) => {
  const modelUrl = process.env.MODEL_SERVER_URL || "http://localhost:5000";
  const url = `${modelUrl}/predict`;

  try {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath));

    const response = await axios.post(url, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    return response.data;
  } catch (error) {
    console.error("Model Server Error:", error.message);
    // Fallback stub if model server is down, so app doesn't crash during dev
    console.warn("Falling back to local stub...");

    // Original stub logic
    const crypto = require("crypto");
    const file = fs.readFileSync(filePath);
    const hash = crypto.createHash("sha256").update(file).digest("hex");
    const score = (parseInt(hash.slice(0, 6), 16) % 100) / 100;

    return {
      deepfake_score: Number(score.toFixed(2)),
      nudity_score: Number((1 - score).toFixed(2)),
      regions: [{ x: 50, y: 50, w: 100, h: 100, reason: "Fallback Stub" }]
    };
  }
};
