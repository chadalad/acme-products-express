const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, './client/index.js'),
  module: {
    rules: [
      {
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/
      },
    ],
  },
};