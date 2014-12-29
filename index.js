/**
 * Expose function to generate transform stream
 * @modules through-gulp
 * @versions v0.3.8
 */

/**
 * @typedef {object} transformStream;
 */

/**
 * @typedef {function} fileMap
 * @example resolve file map
 * function(file) {
 *   file.contents = Buffer.concat([new Buffer('love '), file.contents]);
 *   return file;
 * })
 */

/**
 * @typedef {function} fileFilter
 * @example resolve file filter
 * function(file) {
 *   return file.contents.toString().indexOf('define') !== -1;
 * })
 */

/**
 * Module dependencies
 */
var util = require('util');
var stream = require('stream');
var through;


// Default value for stream.Transform
function defaultTransformFunction(file, encoding, callback) {
  this.push(file);
  callback();
}
function defaultFlushFunction(callback) {
  callback();
}

/**
 * Exposed function generate transform stream
 * @param {function} transformFunction
 * @param {function} flushFunction
 * @returns {transformStream}
 */
through = function(transformFunction, flushFunction) {
  /**
   * Define transform stream structure
   * @constructor
   */
  function Transform() {
    stream.Transform.call(this, {objectMode: true});
  }
  util.inherits(Transform, stream.Transform);

  // use default function when not pass in
  Transform.prototype._transform =
    typeof transformFunction === 'function' ?
    transformFunction :
    defaultTransformFunction;

  Transform.prototype._flush =
    typeof flushFunction === 'function' ?
    flushFunction :
    defaultFlushFunction;

  return new Transform();
};


/**
 * shortcut method for map files
 * @param {fileMap} map
 * @returns {transformStream}
 */
through.map = function(map) {
  return through(function(file, encoding, callback) {
    this.push(map(file));
    callback();
  });
};


/**
 * shortcut method for filter files
 * @param {fileFilter} filter
 * @returns {transformStream}
 */
through.filter = function(filter) {
  return through(function(file, encoding, callback) {
    if (filter(file)) this.push(file);
    callback();
  });
};

exports = module.exports = through;