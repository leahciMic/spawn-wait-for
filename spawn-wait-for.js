var debug = require('debug')('spawn-wait-for');
var ezspawn = require('ezspawn');

module.exports = function(cmd, regex) {
  debug('launching ' + cmd + ' and waiting for output that matches ' + regex);
  return ezspawn(cmd, false)
    .then(function(proc) {
      return new bluebird.Promise(function(resolve, reject) {
        proc.stdout.pipe(split())
          .on('data', function(data) {
            if (data.match(regex)) {
              debug('Matched!', data);
              resolve(proc);
            }
          });
      });
    });
};
