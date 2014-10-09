var util = require('util');
var Transform = require('stream').Transform;
var throughGulp;

throughGulp = function(transformFunction, flushFunction) {
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
};

throughGulp.map = function(fileMaps) {
    return throughGulp(function(file, encoding, callback) {
        this.push(fileMaps(file));
        callback();
    });
};

throughGulp.filter = function(fileFilter) {
    return throughGulp(function(file, encoding, callback) {
        if (fileFilter(file)) {
            this.push(file);
        }
        callback();
    });
};

exports = module.exports = throughGulp;