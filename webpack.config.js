const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  // the entry file for the bundle
  entry: path.join(__dirname, './src/client/index.js'),

  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '/client/dist/js'),
    filename: 'app.js',
  },

  module: {

    // apply loaders to files that meet given conditions
    loaders: [{
      test: /\.js?$/,
      include: path.join(__dirname, '/src/client'),
      loader: 'babel',
      query: {
        presets: ["react", "es2015"]
      }
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
          'style', // The backup style loader
          'css?sourceMap!sass?sourceMap'
      )
    },
    {
      test: /\.css$/,
      loaders: ["style-loader","css-loader"]
    }
  ],
},
  // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
  watch: true
};
