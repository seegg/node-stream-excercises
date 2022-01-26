const { Writable } = require('stream');


const myWritable = new Writable();
myWritable._write = (chunk, encoding, callback) => {
  console.log('writing:', chunk.toString());
  callback();
}

process.stdin.pipe(myWritable);