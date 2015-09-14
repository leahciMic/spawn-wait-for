var debug = require('debug')('ezspawnStub');
var defer = require('lodash.defer');
var resumer = require('resumer');
var bluebird = require('bluebird');

module.exports = function(cmd) {
  var stdout = resumer();
  var stderr = resumer();
  debug('launching command', cmd);
  stdout.queue('This is fake output\nServer has started\nFoobar');

  var proc = {
    stdout: stdout
  };

  proc.stdout.pause();

  return bluebird.resolve(proc).then(function() {
    debug('write stream');
    defer(function() {
      proc.stdout.resume();
    });

    return proc;
  });
};
