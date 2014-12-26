var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var through = require('./index.js');

gulp.task('jshint', function() {
  gulp.src(['index.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('example', function() {
  gulp.src(['package.json'])
    .pipe(through())
	.pipe(gulp.dest('example'));
});