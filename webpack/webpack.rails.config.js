// Run like this
// cd webpack && webpack -w --config webpack.rails.config.js

var devtool = (((typeof process.env["BUILDPACK_URL"]) == "undefined") ? "source-map" : "");
console.log("Webpack build for rails: devtool = " + devtool);

module.exports = {
  devtool: devtool,
  context: __dirname,
  entry: [
    // In case we don't require jQuery from CDN or asset pipeline
    "../app/assets/javascripts/example",
    "./scripts/rails_shims"
  ],
  output: {
    filename: "rails-bundle.js",
    path: __dirname + "/../app/assets/javascripts",
    sourceMapFilename: "../../../public/assets/[file].map"
    // Full path does not work
    // sourceMapFilename: __dirname + "/../public/assets/[file].map"
  },
  // Let's load jQuery from the CDN or rails asset pipeline
  externals: {
    jquery: "var jQuery"
  },
  resolve: {
    root: [ __dirname + "/scripts", __dirname + "/../app/assets/javascripts" ],
    extensions: ["", ".js", ".jsx"]
  },
  resolveLoader: {
    root: [ __dirname + "/../app/assets/javascripts" ],
    extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
  },
  module: {
    loaders: [
      { test: /\.jsx$/,
        loaders: ['es6', 'jsx?harmony'] }
    ]
  }
};
