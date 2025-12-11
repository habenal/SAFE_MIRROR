const { exiftool } = require('exiftool-vendored');
const fs = require('fs');

async function stripExif(inputPath, outputPath) {
  // exiftool -all= modifies file in place; to keep demo simple, copy then strip
  // Copy first
  fs.copyFileSync(inputPath, outputPath);
  // Remove all EXIF metadata in-place
  await exiftool.write(outputPath, {}, ['-all=']);
  return outputPath;
}

module.exports = { stripExif };
