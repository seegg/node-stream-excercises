const { spawn } = require('child_process');
const duplexer2 = require('duplexer2');

module.exports = (cmd, args) => {
  let sp = spawn(cmd, args);

  return duplexer2(sp.stdin, sp.stdout);
}