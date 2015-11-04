module.exports = {
  devtool: '#source-map',
  entry: "./src/main.js",
  output: {
    path: "./build",
    publicPath: "/build/",
    filename: "build.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css!postcss-loader" },
      { test: /\.html$/, loader: "html" },
      { test: /\.js$/, loader: "babel" }
    ]
  },
  postcss: function () {return [
    require('autoprefixer')
  ]}
}
