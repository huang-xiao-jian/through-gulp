var util = require('util');
var Transform = require('stream').Transform;

function throughGulp(transformFunction, flushFunction) {
    var transform;
    var flush;

    if (typeof transformFunction !== 'function') {
        transform = function(file, encoding, callback) {
            this.push(file);
            callback();
        }
    } else {
        transform = transformFunction;
    }

    if (typeof flushFunction !== 'function') {
        flush = function(callback) {
            callback();
        };
    } else {
        flush = flushFunction;
    }

    util.inherits(Through, Transform);
    function Through() {
      Transform.call(this, {objectMode: true});
    }
    Through.prototype._transform = transform;
    Through.prototype._flush = flush;

    return new Through();
}

module.exports = throughGulp;