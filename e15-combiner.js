const combine = require('stream-combiner');
const through = require('through2');
const zlip = require('zlib');

let st = { name: '', books: [] };
let inputs = '';

const lineStream = through(write, end);
function write (chunk, encoding, next) {
  inputs += chunk.toString();
  let lines = inputs.split(/\r?\n/);
  for (let i = 0; i < lines.length - 1; i++) {
    if (lines.length) {
      let temp = JSON.parse(chunk);
      if (temp.type === 'genre') {
        if (st.books.length > 0) this.push(JSON.stringify(st) + '\n');
        st.name = temp.name;
      } else {
        st.books.push(temp.name);
      }
    }
  }

  inputs = lines[lines.length - 1];

  next();

}

function end (done) {

  if (inputs.length) {
    st.books.push(JSON.parse(inputs).name);
  }

  this.push(JSON.stringify(st) + '\n');
  done();
}

module.exports = function () {
  return combine(
    // process.stdout,
    lineStream,
    zlip.createGzip()
  )
}