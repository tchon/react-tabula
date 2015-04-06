module.exports = {
  entry: './src/main.js',
  output: {
    filename: './build/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader' }
    ]
  }
};
