/**
 * # Resize
 *
 * This script resizes images using a glob pattern and a defined array of sizes (640px, 1024px, 2048px)
 * by using `node-glob` and `sharp`.
 *
 * ## Usage
 * From the project root directory:
 * ```
 * node scripts/resize.mjs --path "[your path here]"
 * ```
 * Note the quotes around the path argument. They are necessary to prevent shell expansion of glob patterns
 */

import sharp from 'sharp';
import path from 'path';
import glob from 'glob';
import minimist from 'minimist';

// parse args: pass with two dashes: e.g. -path="../public/img/*.jpg"
const args = minimist(process.argv.slice(2));

// max width of the different sizes you wish to resize images to
const resizeArr = [
  640, //small
  1024, // medium
  2048, //large
];

if (args.path) {
  glob(args.path, (_err, matches) =>
    matches.forEach((file) => resizeImage(file, resizeArr))
  );
} else {
  console.log('💣 you must pass a `--path` argument, exiting...');
  process.exit(1);
}

async function resizeImage(imageName, sizeArr) {
  console.log(`✨ resizing ${imageName} @ ${JSON.stringify(sizeArr)}...`);
  await Promise.all(
    sizeArr.map((width) => resizeImageToWidth(imageName, width))
  );
  console.log(`👍 resized ${imageName}`);
}

async function resizeImageToWidth(file, newWidth) {
  try {
    const fileParsed = path.parse(file);
    const newFileName = path.resolve(
      fileParsed.dir,
      `${fileParsed.name}@${newWidth}.webp`
    );

    await sharp(file)
      .resize({
        fit: sharp.fit.contain,
        width: newWidth,
      })
      .webp({ lossless: true })
      .toFile(newFileName);

    console.log(`💾 saved ${path.relative(process.cwd(), newFileName)}`);
  } catch (error) {
    console.error(`💣 failed to resize ${file}! Error:`, error);
  }
}
