// Run like this
// webpack -d --config webpack-rails.config.js && cp railsbuild/rails-bundle.js /Users/justin/j/react/react-rails-tutorial/app/assets/javascripts && cp railsbuild/rails-bundle.js.map /Users/justin/j/react/react-rails-tutorial/public

module.exports = {
  devtool: "source-map",
  entry: [
    './scripts/example',
    './scripts/rails_shims'
  ],
  output: {
    path: __dirname + "/railsbuild",
    filename: 'rails-bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      { test: /\.jsx$/,
        loaders: ['react-hot', 'es6', 'jsx?harmony'] }
    ]
  }
};