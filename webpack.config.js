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
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader") },
      { test: /\.html$/, loader: "vue-html" },
      { test: /\.js$/, loader: "babel", exclude: /node_modules/ }
    ]
  },
  postcss: function () {return [
    require('autoprefixer'),
    require('postcss-nested'),
    require('postcss-hexrgba'),
  ]},
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
