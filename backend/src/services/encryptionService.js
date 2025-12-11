const crypto = require('crypto');
const { MASTER_KEY } = require('../config');

/**
 * Simple AES-256-GCM encrypt/decrypt using MASTER_KEY env secret.
 * For production, use a KMS (AWS KMS / Vault) and rotate keys.
 */

function encryptBuffer(buffer) {
  const iv = crypto.randomBytes(12);
  const key = crypto.createHash('sha256').update(MASTER_KEY).digest();
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]); // iv(12) | tag(16) | ciphertext
}

function decryptBuffer(encBuffer) {
  const key = crypto.createHash('sha256').update(MASTER_KEY).digest();
  const iv = encBuffer.slice(0, 12);
  const tag = encBuffer.slice(12, 28);
  const ciphertext = encBuffer.slice(28);
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return decrypted;
}

module.exports = { encryptBuffer, decryptBuffer };
