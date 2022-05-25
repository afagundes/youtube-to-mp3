const stream = require('youtube-audio-stream');
const fs = require('fs');

async function youtubeStreamToFile({ videoUri, outputPath }) {
    console.log(`Extracting audio from ${videoUri}`);

    const writeStream = fs.createWriteStream(outputPath);
    writeStream.on('finish', () => console.log(`File saved to ${outputPath}`));

    const videoStream = stream(videoUri);
    let size = 0;

    const interval = setInterval(() => printDownloadedBytes(size), 200);

    for await (chunk of videoStream) {
        writeStream.write(chunk);
        size += chunk.length;
    }

    writeStream.end();

    clearInterval(interval);
    printDownloadedBytes(size, false);
}

function printDownloadedBytes(bytes, returnCursor = true) {
    process.stdout.clearLine();
    process.stdout.write(`Downloaded ${getSizeFormatted(bytes)}${returnCursor ? '\r' : '\n'}`);
}

function getSizeFormatted(bytes) {
    const thresh = 1024;
    const dp = 2;
    
    if (Math.abs(bytes) < thresh) {
      return bytes + 'B';
    }
  
    const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
    let u = -1;
    const r = 10**dp;
  
    do {
      bytes /= thresh;
      ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
  
    return bytes.toFixed(dp) + units[u];
}

module.exports = youtubeStreamToFile;
