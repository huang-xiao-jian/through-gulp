/**
 * @description - Expose function to generate transform stream
 * @author bornkiller <hjj491229492@hotmail.com>
 * @version v0.5.0
 * @copyright bornkiller personal project
 * @license MIT
 */

/**
 * Module dependencies
 */
var util = require('util');
var stream = require('stream');
var _ = require('underscore');
var noop = require('./noop/implement');
var PluginError = require('plugin-error')

/**
 * @module through-gulp
 * @type function
 */
exports = module.exports = through;

/**
 * @description Emit PluginError if callback throws an error
 * @param {string} name
 * @param {function} callback
 * @returns {function}
 */
const makeError = (name, callback) => {
  return function() {
    try {
      callback.apply(this, arguments);
    } catch(err) {
      this.emit("error", new PluginError(name, err));
    }
  }
}

/**
 * @typedef {object} transformStream;
 * @property {function} _transform
 * @property {function} _flush
 */

/**
 * @description - Exposed function generate transform stream
 * @param {string} name
 * @param {function} transform
 * @param {function} flush
 * @param {number} highWaterMark
 * @returns {transformStream}
 */
function through(name, transform, flush, highWaterMark) {
  name = name || "Through";
  /**
   * @description Define transform stream structure
   * @constructor
   */
  function Transform() {
    stream.Transform.call(this, {objectMode: true, highWaterMark: highWaterMark || 16});
  }
  util.inherits(Transform, stream.Transform);

  Transform.prototype._transform = _.isFunction(transform) ? makeError(name, transform) : noop.transform;
  Transform.prototype._flush = _.isFunction(flush) ? makeError(name, flush) : noop.flush;

  return new Transform();
}