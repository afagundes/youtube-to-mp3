#!/usr/bin/env node

const stream = require('youtube-audio-stream');
const fs = require('fs');

const args = process.argv.slice(2);

if (args.length == 0) {
    console.log("usage: app.js <YOUTUBE URL> [-o <OUTPUT PATH.mp3>]");
    process.exit(1);
}

const getOutputPath = (args) => {
    if (args.length == 1) return '/tmp/audio.mp3';

    if (args[1] != '-o') {
        console.log("Second parameter must be '-o'");
        process.exit(1);
    }

    if (!args[2]) {
        console.log("Output path must be informed");
        process.exit(1);
    }

    return args[2];
}

const videoUri = args[0];
const output = getOutputPath(args);

const downloadStream = async () => {
    console.log(`Extracting audio from ${videoUri}`);    
    const writeStream = fs.createWriteStream(output);

    for await (chunk of stream(videoUri)) {
        writeStream.write(chunk);
    }

    writeStream.on('finish', () => console.log(`File saved to ${output}`));
    writeStream.end();
}

downloadStream();
