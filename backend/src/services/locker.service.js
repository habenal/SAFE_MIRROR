const fs = require("fs");
const path = require("path");

const LOCKER_FILE = path.join(__dirname, "../storage/locker.json");

let locker = new Map();

// Helper to save to disk
const saveLocker = () => {
  const obj = Object.fromEntries(locker);
  fs.writeFileSync(LOCKER_FILE, JSON.stringify(obj, null, 2));
};

// Helper to load from disk
const loadLocker = () => {
  if (fs.existsSync(LOCKER_FILE)) {
    try {
      const data = fs.readFileSync(LOCKER_FILE);
      const obj = JSON.parse(data);
      locker = new Map(Object.entries(obj));
    } catch (e) {
      console.error("Failed to load locker", e);
      locker = new Map();
    }
  }
};

// Load on startup
loadLocker();

exports.createId = () => {
  return Math.random().toString(36).slice(2, 10);
};

exports.saveRecord = (id, data) => {
  locker.set(id, data);
  saveLocker();
};

exports.getRecord = (id) => locker.get(id);

exports.getAllRecords = () => {
  return Array.from(locker.entries()).map(([id, data]) => ({
    id,
    ...data,
    pdf: undefined, // Don't leak file paths
    image: undefined
  }));
};

exports.deleteRecord = (id) => {
  const rec = locker.get(id);
  if (!rec) return;

  try { fs.unlinkSync(rec.pdf); } catch { }
  try { fs.unlinkSync(rec.image); } catch { }

  locker.delete(id);
  saveLocker();
};

