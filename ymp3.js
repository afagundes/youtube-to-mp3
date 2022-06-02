#!/usr/bin/env node

const parseArguments = require('./lib/argument-parser');
const youtubeStreamToFile = require('./lib/youtube-stream');

const args = parseArguments(process.argv.slice(2));

if (args.errorMessage) {
    console.error(args.errorMessage);
    process.exit(1);
}

youtubeStreamToFile(args);
