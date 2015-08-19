var util = require('util');

var context = {
  succeed: function (result) {
    console.log('succeed:')
    console.log(JSON.stringify(result, null, 2));
    process.exit(0);
  },
  fail: function (error) {
    console.log('fail: %j', error);
    process.exit(-1);
  },
  done: function () {
    process.exit(0);
  }
}

var main = require('./lambda-rsa-keygen.js');
var event = require('./event.json');

main.handler(event, context);
