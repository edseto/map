const path = require('path');

module.exports = {
  entry: './src/classes/Map.js',
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};