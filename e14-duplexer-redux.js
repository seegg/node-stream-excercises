const through = require('through2');
const duplexer2 = require('duplexer2');

function countryCounter (counter) {

  let count = {};

  const inStream = through({ objectMode: true }, write, end);
  const duplexStream = duplexer2({ objectMode: true }, inStream, counter);

  function write (chunk, encoding, next) {
    count[chunk.country] = count[chunk.country] ? count[chunk.country] + 1 : 1;
    next();
  }

  function end (done) {
    counter.setCounts(count);
    done();
  }

  return duplexStream;

}

module.exports = countryCounter;