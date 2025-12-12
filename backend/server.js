require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');

const analyzeRoutes = require('./src/routes/analyzeRoutes');

const app = express();
app.use(require('cors')());
app.use(express.json());

// ensure storage directories exist
// ensure storage directories exist
const STORAGE_DIR = path.join(__dirname, 'src/storage');
const UPLOADS_DIR = path.join(__dirname, 'src/uploads');
if (!fs.existsSync(STORAGE_DIR)) fs.mkdirSync(STORAGE_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// routes
app.use('/api/v1/analyze', analyzeRoutes);

// health
app.get('/_health', (req, res) => res.json({ status: 'ok' }));

// Root route for user friendliness
app.get('/', (req, res) => {
  res.send("Safe Mirror Backend is running. Please start the frontend to use the application.");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`SAFE MIRROR backend running on http://localhost:${PORT}`);
});
