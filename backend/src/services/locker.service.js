const fs = require("fs");

const locker = new Map();

exports.createId = () => {
  return Math.random().toString(36).slice(2, 10);
};

exports.saveRecord = (id, data) => {
  locker.set(id, data);
};

exports.getRecord = (id) => locker.get(id);

exports.deleteRecord = (id) => {
  const rec = locker.get(id);
  if (!rec) return;

  try { fs.unlinkSync(rec.pdf); } catch {}
  try { fs.unlinkSync(rec.image); } catch {}

  locker.delete(id);
};
