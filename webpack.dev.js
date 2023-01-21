const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    map: './src/classes/Map.js',
    app: './src/entry-points/app.js'
  },
  mode: 'development',
  devServer: {
      open: true,
      compress: true,
      historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
        chunks: ['map', 'app'],
    }),
  ],
};