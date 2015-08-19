var exec = require('child_process').exec;
var crypto = require('crypto');
var fs = require('fs');

exports.handler = function handler(event, context) {
  var filename = '/tmp/' + generateRandomHexString(6);
  createPrivateRSA(filename, event.size || 2048, function(err) {
    if(err) { return context.fail(err); }

    fs.readFile(filename, 'utf8', function(err, privateKey) {
      if(err) { return context.fail(err); }

      createPublicRSA(filename, function(err, publicKey) {
        if(err) { return context.fail(err); }

        fs.unlink(filename, function(err) {
          if(err) { return context.fail(err); }

          return context.succeed({
            public: publicKey,
            private: privateKey
          });
        });
      });
    });
  });
};

function createPrivateRSA(filename, size, callback) {
  exec('openssl genrsa -out ' + filename + ' ' + size, function (error, stdout, stderr) {
    callback(error, stdout);
  });
}

function createPublicRSA(filename, callback) {
  exec('openssl rsa -in ' + filename + ' -outform PEM -pubout', function (error, stdout, stderr) {
    callback(error, stdout);
  });
}

function generateRandomHexString(length) {
  var rawKey = crypto.randomBytes(length);
  return rawKey.toString('hex');
}
