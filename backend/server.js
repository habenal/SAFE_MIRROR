require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');

const analyzeRoutes = require('./src/routes/analyzeRoutes');

const app = express();
app.use(express.json());

// ensure storage directories exist
const STORAGE_DIR = path.join(__dirname, 'storage');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(STORAGE_DIR)) fs.mkdirSync(STORAGE_DIR);
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

// routes
app.use('/api/v1', analyzeRoutes);

// health
app.get('/_health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`SAFE MIRROR backend running on http://localhost:${PORT}`);
});
