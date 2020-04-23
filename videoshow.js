// working example using videoshow & sharp lib
const videoshow = require('videoshow');
const ffmpeg = require('fluent-ffmpeg');

const sharp = require('sharp');

const audio = __dirname + '/fixtures/audio/song.mp3';

let images = ['insta1.jpg', 'insta2.jpg', 'insta3.jpg', 'insta4.jpg', 'insta5.jpg']
let resizePromise = [];

for (const image of images) {
  const [name, ext] = image.split('.');
  resizePromise
    .push(
      sharp(__dirname + `/fixtures/images/${image}`)
        .resize({ height: 1350, width: 1350, fit: 'contain' })
        .toFile(__dirname + `/fixtures/images/${name}-resized.${ext}`)
    )
}

Promise.all(resizePromise)
  .then(async _ => {
    images = images.map(image => {
      const [name, ext] = image.split('.');
      return __dirname + `/fixtures/images/${name}-resized.${ext}`
    })

    await combineImages(images);
    await resizeInstaVideo();
    await combineVideos();
    await addAudio();
  });




// util functions

const combineImages = (images) => {
  let videoOptions = {
    fps: 24,
    loop: 10, // seconds
    transition: true,
    transitionDuration: 1, // seconds
    videoBitrate: 2048,
    videoCodec: 'libx264',
    audioBitrate: '128k',
    audioChannels: 2,
    format: 'mp4',
    pixelFormat: 'yuv420p'
  }

  return new Promise((resovle, reject) => {
    videoshow(images, videoOptions)
      .save('video.mp4')
      .on('start', function (command) {
        console.log('ffmpeg process started:', command)
      })
      .on('error', function (err) {
        console.error('Error:', err)
        reject(err);
      })
      .on('end', function (output) {
        console.log('Images Combined:', output)
        resovle();
      });
  })
}

const resizeInstaVideo = () => {
  return new Promise((resolve, reject) => {
    ffmpeg(__dirname + '/fixtures/videos/insta1.mp4')
      .withSize('640x640')
      .applyAutopadding(true, 'black')
      .noAudio()
      .on('error', function (err) {
        console.log('an error happened: ' + err.message);
        reject(err);
      })
      .on('end', function () {
        console.log('Video resized')
        resolve();
      })
      .saveToFile('merged.mp4');;
  });
}

const combineVideos = () => {
  return new Promise((resolve, reject) => {
    ffmpeg('video.mp4')
      .addInput('merged.mp4')
      .mergeToFile('final.mp4')
      .on('error', function (err) {
        console.log('an error happened: ' + err.message);
        reject(err);
      })
      .on('end', () => {
        console.log('Videos combined');
        resolve();
      })
  })
}

const addAudio = () => {
  return new Promise((resolve, reject) => {
    ffmpeg('final.mp4')
      .addInput(audio)
      .setStartTime(0)
      .setDuration(70)
      .saveToFile(__dirname + '/fixtures/output/finalWithAudio.mp4')
      .on('error', function (err) {
        console.log('an error happened: ' + err.message);
        reject(err);
      })
      .on('end', () => {
        console.log('Audio Added');
        resolve();
      })
  })
}