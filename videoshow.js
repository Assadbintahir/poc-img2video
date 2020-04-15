// working example using videoshow & sharp lib
const videoshow = require('videoshow');
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

var videoOptions = {
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

Promise.all(resizePromise)
  .then(result => {
    images = images.map(image => {
      const [name, ext] = image.split('.');
      return __dirname + `/fixtures/images/${name}-resized.${ext}`
    })

    videoshow(images, videoOptions)
      .audio(audio)
      .save('video.mp4')
      .on('start', function (command) {
        console.log('ffmpeg process started:', command)
      })
      .on('error', function (err) {
        console.error('Error:', err)
      })
      .on('end', function (output) {
        console.log('Video created in:', output)
      })
  })