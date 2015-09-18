var proxyquire = require('proxyquire');
var ezspawnMock = require('../spec/mocks/ezspawn.js');
var spawnWaitFor = proxyquire('../spawn-wait-for.js', {
  'ezspawn': ezspawnMock
});

describe('spawn-wait-for', function() {
  it('should wait for Server has started message', function(done) {
    spawnWaitFor('fakeserver --start', /Server (has) started/).then(function(result) {
      expect(result.process).toEqual(jasmine.any(Object));
      expect(result.matches).toEqual(jasmine.any(Array));
      expect(result.line).toEqual('Server has started');
      expect(result.matches[0]).toEqual('Server has started');
      expect(result.matches[1]).toEqual('has');
      done();
    });
  });
});
