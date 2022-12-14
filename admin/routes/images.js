const path = require('path')
const fs = require('fs')
const express = require('express');
const router = express.Router();
const sharp = require('sharp')

const srcDir = path.join(process.cwd(), 'assets/images/')
const destDir = path.join(process.cwd(), 'site/assets/images/')



//processAllImages();

function processImage(img) {
  sharp(srcDir + img)
    .resize({
      width: 840,
      height: 600,

    })
    .jpeg( {quality: 90})
    .toFile(destDir + img)

    .catch(err => {
    console.error(err.message)
  })
}

function processAllImages() {
  fs.promises.readdir(srcDir)
  .then(entries => {
    entries.forEach((entry, i) => {
      processImage(entry)
    });

  })
  .catch(err => {
    console.error(err.message)
  })
}


async function getMetadata() {
  const metadata = await sharp(imageDir + 'ooze-thumbnail.jpg').metadata();
  console.log(metadata);
}

module.exports = router
