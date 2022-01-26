const trumpet = require('trumpet');
const through = require('through2');


const trp = trumpet();
const tr = through(write, end);

function write (buffer, encoding, next) {
  this.push(buffer.toString().toUpperCase());
  next();
}

function end (done) {
  done();
}

process.stdin.pipe(trp);
trp.pipe(process.stdout);

const stream = trp.select('.loud').createStream();
stream.pipe(tr).pipe(stream);