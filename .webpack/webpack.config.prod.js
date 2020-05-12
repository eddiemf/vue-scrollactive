const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    filename: 'vue-scrollactive.min.js',
    globalObject: "typeof self !== 'undefined' ? self : this",
    path: path.resolve(__dirname, '../dist'),
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
        use: ['babel-loader'],
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
