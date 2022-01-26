const { Readable } = require('stream');

const readStream = new Readable();
readStream._read = () => { };


readStream.push(process.argv[2]);
readStream.pipe(process.stdout);