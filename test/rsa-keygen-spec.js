var main = require('../lambda-rsa-keygen.js');
var event = require('../event.json');

describe('rsa-keygen', function() {
  it('should return json and not crash', function(done) {
    var context = {
      succeed: function (result) {
        expect(result.public).toMatch(/^-----BEGIN PUBLIC KEY-----[\s\S]*-----END PUBLIC KEY-----\n$/);
        expect(result.private).toMatch(/^-----BEGIN RSA PRIVATE KEY-----[\s\S]*-----END RSA PRIVATE KEY-----\n$/);
        return done();
      },
      fail: function (err) {
        return done(err);
      },
      done: function (err, result) {
        return done(err);
      }
    }

    main.handler(event, context);
  });
});
