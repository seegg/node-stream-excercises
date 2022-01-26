const through = require('through2');

const stream = through(write, end);

let st = '';
let count = 0;

function write (chunk, _, next) {
  st += chunk.toString();
  let lines = st.split(/\r?\n/);
  for (let i = 0; i < lines.length - 1; i++) {
    count++;
    if (count % 2 === 0) {
      lines[i] = lines[i].toUpperCase();
    } else {
      lines[i] = lines[i].toLowerCase();
    }
  }
  this.push(lines.slice(0, -1).join('\n') + ('\n'));
  next();
}

function end (done) {
  done();
}

process.stdin.pipe(stream).pipe(process.stdout);