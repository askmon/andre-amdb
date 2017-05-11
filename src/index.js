require('ts-node/register');

//See the reason for this require here: https://github.com/Microsoft/TypeScript/issues/9259
require('./baseurl')();

var action = process.argv[2] || 'start';

var loadApp = function() {
  return require('main').exec(`./api/server`, null);
}

if (process.env.TEST == 'true') {
  action = 'test';
}

switch (action) {
  case 'test':
    loadApp().then(function(app) {
      return require('main').exec('./test', app);
    })
    break;
  case 'migration':
    module.exports = require('main').exec('./data/db/setup/database-migration');
    break;
  default:
    loadApp();
    break;
}
