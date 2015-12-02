var webpack = require('webpack');
module.exports = {
  entry: [
    "./js/app.jsx"
  ],
  output: {
    path: __dirname + '/build',
    filename: "bundle.js",
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /\.s?css$/, loaders: ['style', 'css', 'sass'] }
    ]
  },
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],

  devtool: 'source-maps'
};
