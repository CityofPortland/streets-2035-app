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
  //console.log(`Hello, you passed the following: '${args.path}'`);

  glob.glob(args.path, function (err, matches) {
    matches.forEach((file) => {
      //console.log( 'file? ', file);
      resizeImage(file, resizeArr);
    });
  });
} else {
  console.log('Did not see --path passed, exiting.');
}

function resizeImage(imageName, sizeArr) {
  sizeArr.forEach((value) => {
    console.log('Resize ' + imageName + ' to ' + value);
    resizeImageToWidth(imageName, value);
  });
}

async function resizeImageToWidth(file, newWidth) {
  // console.log( '  >> ' + file + ' to: ' + newWidth );

  try {
    const fileParsed = path.parse(file);
    const newFileName =
      fileParsed.dir + '/' + fileParsed.name + '_' + newWidth + '.webp';
    console.log('  > saving to: ' + newFileName);

    await sharp(file)
      .resize({
        fit: sharp.fit.contain,
        width: newWidth,
      })
      .webp({ lossless: true })
      .toFile(newFileName);
  } catch (error) {
    console.log(error);
  }
}
