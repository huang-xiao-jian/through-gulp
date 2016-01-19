/**
 * @module noop
 * @kind object
 * @description - noop transform stream implement
 */
exports.transform = transform;
exports.flush = flush;

/**
 * @description - noop transform implement
 * @param file
 * @param encoding
 * @param callback
 */
function transform(file, encoding, callback) {
  callback(null, file);
}

/**
 * @description - noop transform implement
 * @param callback
 */
function flush(callback) {
  callback();
}