const fs = require('fs');

function scheduleAutoDelete(id, artifactsMap, ms = 24 * 60 * 60 * 1000) {
  if (artifactsMap.has(id)) {
    const item = artifactsMap.get(id);
    if (item.timer) clearTimeout(item.timer);
    item.timer = setTimeout(async () => {
      try {
        if (fs.existsSync(item.encryptedPdfPath)) fs.unlinkSync(item.encryptedPdfPath);
        if (fs.existsSync(item.encryptedImgPath)) fs.unlinkSync(item.encryptedImgPath);
        artifactsMap.delete(id);
        console.log(`Auto-deleted artifact ${id}`);
      } catch (e) {
        console.error('Auto-delete error', e);
      }
    }, ms);
  }
}

module.exports = { scheduleAutoDelete };
