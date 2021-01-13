const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

/** @type import('webpack').Configuration */
const baseConfig = {
  mode: isProduction ? 'production' : 'development',
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@main': path.resolve(__dirname, 'src/main'),
      '@renderer': path.resolve(__dirname, 'src/renderer'),
      '@components': path.resolve(__dirname, 'src/renderer/components'),
      '@shared': path.resolve(__dirname, 'src/shared'),
    },
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  cache: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(bmp|ico|gif|jpe?g|png|svg|ttf|eot|woff?2?)$/,
        loader: 'url-loader',
      },
    ],
  },
  devtool: isProduction ? false : 'inline-source-map',
};

/** @type import('webpack').Configuration */
const main = {
  ...baseConfig,
  name: 'main',
  target: 'electron-main',
  entry: {
    main: './src/main/index.ts',
  },
};

/** @type import('webpack').Configuration */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const preload = {
  ...baseConfig,
  name: 'preload',
  target: 'electron-preload',
  entry: {
    preload: './src/main/preload.ts',
  },
};

/** @type import('webpack').Configuration */
const renderer = {
  ...baseConfig,
  name: 'renderer',
  target: 'web',
  entry: {
    renderer: './src/renderer/index.tsx',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/renderer/index.html',
    }),
  ],
};

module.exports = [main, preload, renderer];
