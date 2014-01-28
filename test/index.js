var pathetic = require('../');
var expect = require('expect.js');

describe('pathetic', function() {
  it('matches a simple path', function () {
    var paths = pathetic({
      '/path': 'value'
    });
    
    expect(paths('/path')).to.eql({
      value: 'value',
      params: {}
    });
  });
  
  it('matches a path with a key', function () {
    var paths = pathetic({
      '/user/:id': 'user with id'
    });
    
    expect(paths('/user/123')).to.eql({
      value: 'user with id',
      params: {
        id: 123
      }
    });
  });
});