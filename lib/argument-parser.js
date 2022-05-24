function parseArguments(args) {
    if (args.length == 0 || (args.length > 1 && (args[1] != '-o' || !args[2]))) {
        return {
            errorMessage: "usage: app.js <YOUTUBE URL> [-o <OUTPUT PATH.mp3>]"
        };
    }
    
    const videoUri = args[0];
    const outputPath = getOutputPath(args);

    return {
        videoUri,
        outputPath
    }
}

function getOutputPath(args) {
    let outputPath = '/tmp/audio.mp3';

    if (args.length > 2) {
        outputPath = args[2];
    }

    return outputPath;
}

module.exports = parseArguments;
