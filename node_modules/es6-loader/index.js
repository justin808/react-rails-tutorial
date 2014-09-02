var loaderUtils = require('loader-utils');
var path = require('path');
var extend = require('extend');

var es6mod = require('es6-module-transpiler').Compiler;
var es6tr = require('es6-transpiler');

function es6ModuleTranspiler(source, options, filename) {
  var ext = path.extname(filename);

  if (ext.slice(1) === 'coffee') {
    options.coffee = true;
  }

  var moduleName = path.join(path.dirname(filename), path.basename(filename, ext)).replace(/[\\]/g, '/');
  var compiler = new es6mod(source, moduleName, options);
  return compiler.toCJS();
}

function es6Transpiler(source, options) {
  options.src = source;

  var defaults = {
    environments: ['node', 'browser'],
    disallowVars: false,
    disallowDuplicated: true,
    disallowUnknownReferences: false,
    includePolyfills: false
  };

  var result = es6tr.run(extend({}, defaults, options));
  
  if (result.errors.length) {
    return source;
  }
  
  return result.src;
}

module.exports = function(source) {
  this.cacheable && this.cacheable();

  var options = loaderUtils.parseQuery(this.query);

  var result = es6ModuleTranspiler(source, options, options.filename || this.resourcePath);
  result = es6Transpiler(result, options);

  this.callback(null, result);
};
