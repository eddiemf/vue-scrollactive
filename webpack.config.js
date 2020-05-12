const TARGET = process.env.TARGET;

if (TARGET === 'production') {
  module.exports = require('./.webpack/webpack.config.prod');
} else {
  module.exports = require('./.webpack/webpack.config.dev');
}
