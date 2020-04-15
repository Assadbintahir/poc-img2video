## Research
[ffmpeg](https://www.ffmpeg.org/) is de-facto for media manipulation and creation. Different languages have wrappers for this library.

- [ffmpeg](https://www.ffmpeg.org/)'s official client for NodeJS is [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg#videofiltersfilter-add-custom-video-filters).
    - very complicated and very configurable.
    - was unable to add custom filters & audio to image clip.
    - spent a lot of time in documentation but couldn't find way to add audio

- [videoshow](https://github.com/h2non/videoshow) is a wrapper written on top of fluent-ffmpeg making it easier to add filters and audio
    - have good github presence with 498 stars, 104 forks and last updated on Feb 10, 2020
    - was able to add images with an audio
    - was able to define leangth for each image
    - was able to define bitrate and all other fluent-ffmpeg configuration in it
    - working example is part of code.
    - videoshow is more verbose and give proper errors.

## Blockers & Solution

- images with different aspect ratio or resolution size can't be combined by using ffmpeg's JS packages (as far as my research went)
    - hence first we resized the images to a custom size and presevering the aspect ratio and then passed to videoshow for creating video
    - preserving aspect ratio make sure that it is not distorted and appear as it appeared on instagram
    - [sharp](https://github.com/lovell/sharp) npm package was used for image manipulation
    - sharp package has 16.2K github stars, 845 forks and last updated in April 2020

- As we increase the value for video bitrate, quality of video goes up along with the creation time and video size. Hence we should get some input from client around this. In case the video creation is slow, we will want to use some queue to make server endpoint non blocking for other requests.

## How to run example:

- clone the repo and run `npm install`
- All the test images and audio is in fixtures folder.
- run `npm run videoshow`
- Resized images will be popped in `/fixtures/images/` and please delete the resized imaged before running `npm run videoshow` again
- A mp4 video will appear on the root of project. Please delete the video created before running `npm run videoshow` again. 
- insta images are taken from instagram feed. Hence real [aspect ratio](https://help.instagram.com/1631821640426723) from insta was tested