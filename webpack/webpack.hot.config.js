console.log("__dirname is " + __dirname);
var webpack = require("webpack");
module.exports = {
  devtool: "source-map",

  context: __dirname, //  + "/../app/assets/javascripts",
  entry: [
    "webpack-dev-server/client?http://localhost:3000",
    "webpack/hot/dev-server",
    // In case we don't require jQuery from CDN or asset pipeline, next file will export jQuery globally
    // "./scripts/rails_shims",
    "./scripts/webpack_shims",
    "../app/assets/javascripts/example"
  ],
  // Note, this file is not actually saved, but used by the express server
  output: {
    filename: "express-bundle.js",
    path: __dirname
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  // Let's load jQuery from the CDN
  externals: {
    jquery: "var jQuery"
  },
  resolve: {
    root: [ __dirname + "/scripts", __dirname + "/../app/assets/javascripts",
            __dirname + "/../app/assets/stylesheets" ],
    extensions: ["", ".js", ".jsx"]
  },
  resolveLoader: {
    root: [ __dirname + "/../app/assets/javascripts"],
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loaders: ["react-hot", "es6", "jsx?harmony"] },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  }
};
