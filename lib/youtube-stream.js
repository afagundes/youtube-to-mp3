const stream = require('youtube-audio-stream');
const fs = require('fs');

async function youtubeStreamToFile({ videoUri, outputPath }) {
    console.log(`Extracting audio from ${videoUri}`);

    const writeStream = fs.createWriteStream(outputPath);
    writeStream.on('finish', () => console.log(`File saved to ${outputPath}`));

    for await (chunk of stream(videoUri)) {
        writeStream.write(chunk);
    }

    writeStream.end();
}

module.exports = youtubeStreamToFile;
