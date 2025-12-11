const { exiftool } = require("exiftool-vendored");
const fs = require("fs");
const path = require("path");

exports.stripExif = async (filePath, id) => {
  const outPath = path.join("src/storage/", `${id}_cleaned.jpg`);

  await exiftool.write(filePath, {}, ["-all="]);

  fs.copyFileSync(filePath, outPath);
  fs.unlinkSync(filePath);

  return outPath;
};
