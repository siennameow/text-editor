const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Dreamcatcher Text Editor'
    }),
  // TODO: Add and configure workbox plugins for a service worker and manifest file.
  //service worker
    new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'src-sw.js'
    }),
    //manifest.json
    new WebpackPwaManifest({
      fingerprints: false,
      inject: true,
      name: 'Dreamcatcher Text Editor',
      short_name: 'D.T.E',
      description: 'Keep track of important tasks!',
      background_color: '#8f7ee2',
      theme_color: '#8f7ee2',
      start_url: './',
      publicPath: './',
      icons: [
        {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    })
    ],

    module: {
      // TODO: Add CSS loaders and babel to webpack.
      //add css loader
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        //add babel
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
