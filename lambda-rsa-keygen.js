var exec = require('child_process').exec;
var crypto = require('crypto');
var fs = require('fs');

exports.createRsaKeys = createRsaKeys;
exports.handler = handler;

function handler(event, context) {
  createRsaKeys(event.size, function(err, keys) {
    if(err) {
      return context.fail(err);
    }
    return context.succeed(keys);
  });
};

function createRsaKeys(size, callback) {
  var filename = '/tmp/' + generateRandomHexString(6);
  createPrivateRSA(filename, size || 2048, function(err) {
    if(err) {
      return callback(err);
    }

    fs.readFile(filename, 'utf8', function(err, privateKey) {
      if(err) {
        return callback(err);
      }

      createPublicRSA(filename, function(err, publicKey) {
        if(err) {
          return callback(err);
        }

        fs.unlink(filename, function(err) {
          if(err) {
            return callback(err);
          }

          return callback(null, {
            public: publicKey,
            private: privateKey
          });
        });
      });
    });
  });
}

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
