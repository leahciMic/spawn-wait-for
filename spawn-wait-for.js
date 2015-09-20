var debug = require('debug')('spawn-wait-for:debug');
var verbose = require('debug')('spawn-wait-for:verbose');
var ezspawn = require('ezspawn');
var bluebird = require('bluebird');
var split = require('split');

module.exports = function(cmd, regex) {
  debug('launching ' + cmd + ' and waiting for output that matches ' + regex);
  var proc = ezspawn.spawn(cmd);

  return new bluebird.Promise(function(resolve, reject) {
    proc.on('close', function() {
      debug('process closed');
    });

    proc.stdout.pipe(split())
      .on('data', function(data) {
        var matches;
        debug(data);
        if (matches = data.match(regex)) {
          debug('Matched!', data);
          debug('matched, unpiping stdout');
          proc.stdout.unpipe();

          resolve({
            process: proc,
            matches: matches,
            line: data
          });
        } else {
          verbose('Did not match', data);
        }
      });
  });
};
