const express = require("express");
const analyzeRoutes = require("./routes/analyzeRoutes");

const app = express();

app.use(express.json());
app.use("/api/v1/analyze", analyzeRoutes);

app.get("/_health", (req, res) => {
  res.json({ ok: true });
});

module.exports = app;
