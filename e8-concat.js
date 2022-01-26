const concat = require('concat-stream');
const { Readable } = require('stream');

const readStream = new Readable();
readStream._read = () => { };

process.stdin.pipe(concat((content) => {
  let reverseString = content.toString().split('').reverse().join('');
  readStream.push(reverseString);
}))

readStream.pipe(process.stdout);