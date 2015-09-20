var debug = require('debug')('ezspawnStub');
var defer = require('lodash.defer');
var resumer = require('resumer');
var bluebird = require('bluebird');

module.exports = {
  spawn: function(cmd) {
    var stdout = resumer();
    var stderr = resumer();
    
    debug('launching command', cmd);

    stdout.queue('This is fake output\nServer has started\nFoobar');
    stdout.unpipe = jasmine.createSpy('unpipe');

    var proc = {
      stdout: stdout,
      stderr: stderr,
      on: jasmine.createSpy('proc.on')
    };

    return proc;
  }
};
