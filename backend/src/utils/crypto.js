const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const KEY = crypto
  .createHash("sha256")
  .update(process.env.MASTER_KEY || "weakkey")
  .digest();

exports.encryptFile = async (filePath, outName) => {
  const data = fs.readFileSync(filePath);

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", KEY, iv);
  const enc = Buffer.concat([cipher.update(data), cipher.final()]);
  const tag = cipher.getAuthTag();

  const finalBuffer = Buffer.concat([iv, tag, enc]);
  const outPath = path.join("src/storage/", outName);

  fs.writeFileSync(outPath, finalBuffer);
  return outPath;
};

exports.decryptFile = async (encPath) => {
  const buffer = fs.readFileSync(encPath);

  const iv = buffer.slice(0, 12);
  const tag = buffer.slice(12, 28);
  const data = buffer.slice(28);

  const decipher = crypto.createDecipheriv("aes-256-gcm", KEY, iv);
  decipher.setAuthTag(tag);

  return Buffer.concat([decipher.update(data), decipher.final()]);
};
