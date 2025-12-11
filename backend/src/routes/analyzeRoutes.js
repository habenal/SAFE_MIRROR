const express = require("express");
const multer = require("multer");
const controller = require("../controllers/analyze.controller");

const router = express.Router();
const upload = multer({ dest: "src/uploads/" });

router.post("/", upload.single("file"), controller.analyzeMedia);

router.get("/report/:id", controller.getReport);

router.post("/erase/:id", controller.eraseMedia);

module.exports = router;
