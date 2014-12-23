/**
 * Expose function to generate transform stream
 * @modules through-gulp
 * @versions v0.3.5
 * @typedef {object} transformStream;
 */

/**
 * Module dependencies
 */
var util = require('util');
var Transform = require('stream').Transform;
var through;

/**
 * Exposed function generate transform stream
 * @param {function} transformFunction
 * @param {function} flushFunction
 * @returns {transformStream}
 */
through = function(transformFunction, flushFunction) {
  var transform;
  var flush;

  // use default function when not pass in
  transform = typeof transformFunction === 'function' ?
    transformFunction :
    function(file, encoding, callback) {
      this.push(file);
      callback();
    };

  flush = typeof flushFunction === 'function' ?
    flushFunction :
    function(callback) {
      callback();
    };

  // implement transform stream
  util.inherits(Through, Transform);
  function Through() {
    Transform.call(this, {objectMode: true});
  }
  Through.prototype._transform = transform;
  Through.prototype._flush = flush;

  return new Through();
};

through.map = function(fileMaps) {
  return through(function(file, encoding, callback) {
    this.push(fileMaps(file));
    callback();
  });
};

through.filter = function(fileFilter) {
  return through(function(file, encoding, callback) {
    if (fileFilter(file)) {
      this.push(file);
    }
    callback();
  });
};

exports = module.exports = through;