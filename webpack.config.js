const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, './src/virtualDOM/index.ts'),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist/virtualDOM'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  }
}