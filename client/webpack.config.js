const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader',
         {
           loader: 'css-loader',
           options: {
             importLoaders: 1,
             modules: true
           }
         }
        ],
        include: /\.module\.css$/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
        exclude: /\.module\.css$/
      },
      {
        test: /\.(svg|jpg|png|gif)$/,
        loader: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html'
    })
  ],
  devServer: {
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
          target: 'http://localhost:4000',
      },
    },
    port: 3000
  }
};