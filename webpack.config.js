var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: "./src/main.js",
  output: {
    path: "./dist",
    publicPath: "/dist/",
    filename: "vue-toast.js",
    library: ["vueToasts"],
    libraryTarget: "umd"
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: "vue" },
      { test: /\.js$/, loader: "babel", exclude: /node_modules/ }
    ],
    resolve: {
      extensions: ['', '.js', '.vue', '.css']
    },
    resolveLoader: {
      root: path.join(__dirname, 'node_modules')
    }
  },
  vue: {
    postcss: [
      require('autoprefixer'),
      require('postcss-nested'),
      require('postcss-hexrgba'),
    ],
    loaders: {
      css: 'css-loader'
    }
  }
}
