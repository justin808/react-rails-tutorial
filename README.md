# React, React-Bootstrap, and ES-6 on Rails via WebPack

Example of the following technologies.

See article: <PENDING>


## Technology

1. react
2. react-bootstrap
3. webpack with hot-reload
4. es6-loader (es6 transpiler)
5. Simultaneously working with Rails 4.2
6. Deployable to Heroku

## Running without Rails

Setup node and run the node server.
```
npm install
cd webpack && node server.js
```

Point browser to http://0.0.0.0:3000.

## Rails

```
bundle install
rake db:setup
rails s -p 4000
```
Point browser to http://0.0.0.0:4000.

It's important to run the rails server on different port than the node server.

Change a JSX file and see it update right after you hit save in the browser. Any
data on the screen will still be there.


## Automatically Building the rails-bundle.js
Run this command to automatically build the rails-bundle.js file in the
javascript directory whenever your jsx files change.

```
cd webpack
webpack -w --config webpack.rails.config.js
```
# Webpack
`webpack.hot.config.js`: Used by server.js to run the demo server.
`webpack.rails.config.js`: Used to generate the rails-bundle.js file

# Javascript
The `webpack.rails.config.js` file generates rails-bundle.js which is included
by the Rails asset pipeline.

# Sass and images
1. The Webpack server loads the images from the **symlink** of of the
   app/assets/images directory.
2. Since the images are not moved, Rails loads images via the normal asset
   pipeline features.
3. The `image-url` sass helper takes care of mapping the correct directories for
   images. The image directory for the webpack server is configured by this
   line:

    { test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded&imagePath=/assets/images"}



# Source Maps
They work for both Rails and the Webpack Server.

# Deploying to Heroku
In order to deploy to heroku, you'll need run this command to set a custom
buildpack:

```
heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git
```

This runs the two buildpacks in the `.buildpacks` directory.

# TO DO
1. Integrate twitter bootstrap assets into webpack build
