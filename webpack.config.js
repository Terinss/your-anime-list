const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/client/app/index.tsx',

  output: {
    path: path.join(__dirname, '/dist/client'),
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
        router: () => 'http://api.terrence.io',
      },
    },
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './src/client/index.html',
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
        test: /.tsx?$/,
        exclude: /node_modules/,
        use: { loader: 'ts-loader' },
      },
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
