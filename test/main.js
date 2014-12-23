var transform = require('stream').Transform;
var gulp = require('gulp');
var gutil = require('gulp-util');
var assert = require('stream-assert');
var through = require('../through-gulp.js');
var PluginError = gutil.PluginError;
var ERROR_NAME = 'through-gulp';
var should = require('should');

describe('through-gulp', function () {
  it('should implement transform class', function () {
    var expect = through(function(){}, function() {});
    (expect instanceof transform).should.be.true;
    (expect._transform).should.be.a.Function;
    (expect._flush).should.be.a.Function;
  });

  it('should receive data from gulp', function (done) {
    gulp.src('./test/fixtures/template.js')
      .pipe(through(function(file, encoding, callback) {
        (file.isBuffer()).should.be.true;
        (file.isStream()).should.be.false;
         callback();
         done();
      }))
    });

  it('should pass data to next when undeclared', function (done) {
    gulp.src('./test/fixtures/template.js')
      .pipe(through())
      .pipe(assert.first(function(file) {
        (file.isBuffer()).should.be.true;
        (file.isStream()).should.be.false;
        done();
      }))
    });

  it('should pass data to next when declared', function (done) {
    gulp.src('./test/fixtures/template.js')
      .pipe(through(function(file, encoding, callback) {
        this.push(file);
        callback();
      }))
      .pipe(assert.first(function(file) {
        (file.isBuffer()).should.be.true;
        (file.isStream()).should.be.false;
        done();
      }))
    });

  it('should support single data transmission', function (done) {
    gulp.src('./test/fixtures/template.js')
      .pipe(through(function(file, encoding, callback) {
        this.push(file);
        callback();
      }))
      .pipe(assert.first(function(file) {
        (file.contents.toString()).should.equal('define({});');
      }))
      .pipe(assert.end(done));
    });

  it('should support single data transmission', function (done) {
    gulp.src('./test/fixtures/template.js')
      .pipe(through(function(file, encoding, callback) {
          callback();
        }, function(callback) {
          this.push('beautiful');
          callback();
      }))
      .pipe(assert.first(function(file) {
        file.toString().should.equal('beautiful')
      }))
      .pipe(assert.end(done));
    });

  it('should support multi data transmission', function (done) {
    gulp.src('./test/fixtures/template.js')
      .pipe(through(function(file, encoding, callback) {
           this.push(file);
           callback();
        }), function(callback) {
           this.push('beautiful');
           callback();
      })
      .pipe(assert.first(function(file) {
        (file.contents.toString()).should.equal('define({});');
      }))
      .pipe(assert.second(function(file) {
        (file.toString()).should.equal('beautiful');
      }))
      .pipe(assert.end(done))
    });

  it('should support file process', function (done) {
    gulp.src('./test/fixtures/template.js')
      .pipe(through(function(file, encoding, callback) {
        var sample = new Buffer('love ');
        file.contents = Buffer.concat([sample, file.contents]);
        this.push(file);
        callback();
      }))
      .pipe(assert.first(function(file) {
        (file.contents.toString()).should.equal('love define({});');
      }))
      .pipe(assert.end(done));
    });

  it('should support event emit', function (done) {
    gulp.src('./test/fixtures/template.js')
      .pipe(through(function(file, encoding, callback) {
          var error = new PluginError(ERROR_NAME, 'missing something');
          this.emit('error', error);
          callback();
        }, function(callback) {
          this.push('beautiful');
          callback();
      }))
      .on('error', function(err) {
        err.should.be.an.Error;
        done();
      })
    });
});