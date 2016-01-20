# through-gulp
![Build Status](https://img.shields.io/travis/bornkiller/through-gulp/master.svg?style=flat)
![Coverage Report](http://img.shields.io/coveralls/bornkiller/through-gulp.svg?style=flat)
![Package Dependency](https://david-dm.org/bornkiller/through-gulp.svg?style=flat)
![Package DevDependency](https://david-dm.org/bornkiller/through-gulp/dev-status.svg?style=flat)

A tiny wrapper around Node streams. To make gulp plugin write easier.
Inspired by through2, (https://github.com/rvagg/through2/), but much simplify
for gulp-plugin development for some reason.

## Install
```js
npm install through-gulp --save
```

## API
Expose single API..

```javascript
var through = require('through-gulp');
var stream = through(transformFunction, flushFunction);
```

Both argument has default value to pipe data next without processing.


## Usage
A simple demonstrate about write gulp-plugin with through-gulp.
If you know nothing about gulp plugin, check this first.
(https://github.com/gulpjs/gulp/blob/master/docs/writing-a-plugin/guidelines.md)


```javascript
// PLUGIN_NAME: sample
var through = require('through-gulp');

// exporting the plugin 
module.exports = sample;

function sample() {
  // creating a stream through which each file will pass
  var stream = through(function(file, encoding,callback) {
  	// do whatever necessary to process the file
    if (file.isNull()) {

    }
    if (file.isBuffer()) {

    }
    if (file.isStream()) {

    }
    // just pipe data next, or just do nothing to process file later in flushFunction
    // never forget callback to indicate that the file has been processed.
      this.push(file);
      callback();
    }, function(callback) {
      // just pipe data next, just callback to indicate that the stream's over
      this.push(something);
      callback();
    });

  // returning the file stream
  return stream;
};
```

then use the plugin with gulp

```javascript
var gulp = require('gulp');
var sample = require('sample');
gulp.task('sample', function() {
  gulp.src(['source file'])
	.pipe(sample())
	.pipe(gulp.dest('file destiny'))
});
```

## Contact
*Email: hjj491229492@hotmail.com*.
