const fs = require('fs');
const crypto = require('crypto');

/**
 * Stubbed detector functions.
 * Replace these with real model-service calls in production.
 */

async function detectDeepfake(filePath) {
  // Create deterministic pseudo-score based on sha256 to give demo variability
  const file = fs.readFileSync(filePath);
  const hash = crypto.createHash('sha256').update(file).digest('hex');
  const num = parseInt(hash.slice(0, 8), 16);
  const score = (num % 100) / 100;
  return {
    deepfake_score: Number(score.toFixed(2)),
    // A demo suspicious region (x,y,w,h)
    regions: [{ x: 80, y: 70, w: 120, h: 120, reason: 'demo-landmark-mismatch' }]
  };
}

async function detectNsfw(filePath) {
  const file = fs.readFileSync(filePath);
  const hash = crypto.createHash('md5').update(file).digest('hex');
  const num = parseInt(hash.slice(0, 6), 16);
  const score = (num % 40) / 100;
  return { nudity_score: Number(score.toFixed(2)) };
}

module.exports = { detectDeepfake, detectNsfw };
