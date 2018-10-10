const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: 'vue-scrollactive.min.js',
    globalObject: 'typeof self !== \'undefined\' ? self : this',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    library: {
      root: 'vueScrollactive',
      amd: 'vue-scrollactive',
      commonjs: 'vue-scrollactive',
    },
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.vue$/,
        use: ['vue-loader', 'eslint-loader'],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
