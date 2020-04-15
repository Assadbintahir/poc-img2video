// not working example. unable to add audio to image clip

const ffmpeg = require('fluent-ffmpeg');
const path = require('path')

const images = [
    __dirname + '/fixtures/images/1.jpg',
    __dirname + '/fixtures/images/2.jpg',
    __dirname + '/fixtures/images/3.jpg',
    __dirname + '/fixtures/images/4.jpg',
    __dirname + '/fixtures/images/5.png'
]
const audio = __dirname + '/fixtures/audio/song.mp3';


const proc = ffmpeg()
    .addInput(images[0])
    .addInput(audio)
    //.input(fourthFile)
    //.input(...)
    // .loop(20)
    // using 25 fps
    // .fps(25)
    // setup event handlers
    .on('end', function () {
        console.log('files have been merged succesfully');
    })
    .on('error', function (err) {
        console.log('an error happened: ' + err.message);
    })
    .saveToFile('video.mp4');

// console.log(proc);