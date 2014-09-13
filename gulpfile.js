var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var mocha = require('gulp-mocha');
var through = require('./through-gulp');

gulp.task('jshint', function() {
  return gulp.src(['through-gulp.js', 'test/main.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});


gulp.task('test', ['jshint'], function () {
    return gulp.src('test/main.js', {read: false})
        .pipe(mocha());
});

gulp.task('example', function() {
	return gulp.src(['package.json'])
	    .pipe(through(function(file, encoding, callback) {
	    	/*
	    	 * process the file whatever necessary
	    	 */
	    	this.push(file);
	    	callback();
	    }))
	    .pipe(gulp.dest('example'));
})