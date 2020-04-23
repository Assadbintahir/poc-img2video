// not working example. unable to add audio to image clip

const ffmpeg = require('fluent-ffmpeg');

const images = [
    __dirname + '/fixtures/images/1.jpg',
    __dirname + '/fixtures/images/2.jpg',
    __dirname + '/fixtures/images/3.jpg',
    __dirname + '/fixtures/images/4.jpg',
    __dirname + '/fixtures/images/5.png'
]

var chainedInputs = images.reduce((result, inputItem) => result.input(inputItem), ffmpeg());


// chainedInputs
ffmpeg()
    .input()
    .loop(5)
    .fps(24)
    // .videoBitrate(2048)
    // .videoCodec('libx264')
    // .format('mp4')

    // setup event handlers
    .on('end', function () {
        console.log('files have been merged succesfully');
    })
    .on('error', function (err) {
        console.log('an error happened: ' + err.message);
    })
    .saveToFile('video.mp4');

// console.log(proc);