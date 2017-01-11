var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

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
      // { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader") },
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
      css: ExtractTextPlugin.extract('css')
    }
  },
  plugins: [
    new ExtractTextPlugin("vue-toast.css")
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.output.filename = "vue-toast.min.js",
  module.exports.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin("vue-toast.min.css")
  ];
} else {
  module.exports.devtool = '#source-map'
}
