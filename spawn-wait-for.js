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
        proc.stdout.pipe(split())
          .on('data', function(data) {
            var matches;
            if (matches = data.match(regex)) {
              debug('Matched!', data);
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
