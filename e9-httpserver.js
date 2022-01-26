const through = require('through2');
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    req.pipe(tr).pipe(res);
  } else {
    res.end('stuff');
  }
})

const tr = through(write, end);
function write (buffer, encoding, next) {
  this.push(buffer.toString().toUpperCase());
  next();
}

function end (done) {
  done();
}

server.listen(process.argv[2]);