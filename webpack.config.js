var webpack = require('webpack');
module.exports = {
    entry: "./js/app.jsx",
    output: {
        path: __dirname + '/build',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
      new webpack.NoErrorsPlugin()
    ],

    devtool: 'source-maps'
};
