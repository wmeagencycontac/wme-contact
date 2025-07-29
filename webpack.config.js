const path = require('path');

module.exports = {
  entry: './src/scripts/main.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public/scripts'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  optimization: {
    minimize: true
  }
};
