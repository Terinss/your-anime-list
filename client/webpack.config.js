const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },

  devServer: {
    port: 8080,
    hot: true,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        router: () => 'http://localhost:1234',
      },
    },
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
