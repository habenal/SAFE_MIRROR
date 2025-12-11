const crypto = require("crypto");
const fs = require("fs");

exports.runFakeDetector = async (filePath) => {
  const file = fs.readFileSync(filePath);
  const hash = crypto.createHash("sha256").update(file).digest("hex");

  const score = (parseInt(hash.slice(0, 6), 16) % 100) / 100;

  return {
    deepfake_score: Number(score.toFixed(2)),
    regions: [
      { x: 50, y: 50, w: 100, h: 100, reason: "AI stub region" }
    ]
  };
};
