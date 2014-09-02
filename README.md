# React, React-Bootstrap, and ES-6 on Rails via WebPack

Example of the following technologies:

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

It's important to not run the rails server on the same port as the node server.

Change a JSX file and see it update right after you hit save in the browser. Any
data on the screen will still be there.



## Automatically Building the rails-bundle.js
Run this command to automatically build the rails-bundle.js file in the
javascript directory whenever your jsx files change.

```
cd webpack
webpack -w --config webpack.rails.config.js
```

# Deploying to Heroku
In order to deploy to heroku, you'll need run this command to set a custom
buildpack:

```
heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git
```

This runs the two buildpacks in the `.buildpacks` directory.



# TO DO
1. Integrate sass build and twitter bootstrap assets into webpack build
