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

/**
 * @module through-gulp
 * @type function
 */
exports = module.exports = through;

/**
 * @typedef {object} transformStream;
 * @property {function} _transform
 * @property {function} _flush
 */

/**
 * @description - Exposed function generate transform stream
 * @param {function} transform
 * @param {function} flush
 * @param {number} highWaterMark
 * @returns {transformStream}
 */
function through(transform, flush, highWaterMark) {
  /**
   * @description Define transform stream structure
   * @constructor
   */
  function Transform() {
    stream.Transform.call(this, {objectMode: true, highWaterMark: highWaterMark || 16});
  }
  util.inherits(Transform, stream.Transform);

  Transform.prototype._transform = _.isFunction(transform) ? transform : noop.transform;
  Transform.prototype._flush = _.isFunction(flush) ? flush : noop.flush;

  return new Transform();
}