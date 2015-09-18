var debug = require('debug')('spawn-wait-for:debug');
var verbose = require('debug')('spawn-wait-for:verbose');

var ezspawn = require('ezspawn');
var bluebird = require('bluebird');
var split = require('split');

module.exports = function(cmd, regex) {
  debug('launching ' + cmd + ' and waiting for output that matches ' + regex);
  return ezspawn(cmd, false)
    .then(function(proc) {
      return new bluebird.Promise(function(resolve, reject) {
        proc.on('exit', function() {
          debug('process exited, unpiping stdout');
          proc.stdout.unpipe();
        });

        proc.stdout.pipe(split())
          .on('data', function(data) {
            var matches;
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
    });
};
