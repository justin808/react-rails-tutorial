# es6-loader
Transpiles ES6 syntax for [webpack](https://github.com/webpack/webpack).

## Usage

```js
import bamboo from 'es6!./bamboo.js';

class Panda {
  constructor(arg='default') {
    this.eat = bamboo;
  }
}

export default Panda;
```

```js
var Panda = require('es6!./panda.js').default;
new Panda().eat();
```

Or within the webpack config:

```js
module: {
  loaders: [
    { test: /\.js$/, loader: 'es6-loader' }
  ]
}
```

and then import normally:

```js
import bamboo from './bamboo.js';
```

## Install

`npm install es6-loader --save-dev`

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.

## Release History
* 0.2.0 - Using `es6-module-transpiler` and `es6-transpiler` to transpile ES6 syntax as well as modules (@jtangelder).
* 0.1.0 - Initial release

## License
Copyright (c) 2014 Kyle Robinson Young  
Licensed under the MIT license.
