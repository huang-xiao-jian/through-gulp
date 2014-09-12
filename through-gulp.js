var util = require('util');
var Transform = require('stream').Transform;
var PassThrough = require('stream').PassThrough;

function throughGulp(options, transformFunction, flushFunction) {
    if (typeof options == 'function') {
      flushFunction = transformFunction;
      transformFunction = options;
      options = {}
    }
    if (typeof transformFunction !== 'function') {
        transformFunction = PassThrough;
    }
    if (typeof flushFunction !== 'function') {
        flushFunction = null;
    }

    util.inherits(Through, Transform);
    function Through(options) {
      Transform.call(options);
    }
    Through.prototype._transform = transformFunction;
    Through.prototype._flush = flushFunction;

    return new Through(options);
}

module.exports = throughGulp;