var gulp = require('gulp');
var assert = require('stream-assert');
var through = require('../index.js');
var should = require('should');

describe('through-gulp shortcut method', function () {
  it('should support file map', function (done) {
    gulp.src(['./test/fixtures/template.js','./test/fixtures/destiny.js'])
      .pipe(through.map(function(file) {
         file.contents = Buffer.concat([new Buffer('love '), file.contents]);
         return file;
      }))
      .pipe(assert.first(function(file) {
        (file.contents.toString()).should.equal('love define({});');
      }))
      .pipe(assert.end(done));
    });

  it('should support file map', function (done) {
    gulp.src(['./test/fixtures/template.js','./test/fixtures/destiny.js'])
      .pipe(through.map(function(file) {
        file.contents = Buffer.concat([new Buffer('love '), file.contents]);
        return file;
      }))
      .pipe(assert.second(function(file) {
        (file.contents.toString()).should.equal('love define(function(){});');
      }))
      .pipe(assert.end(done));
  });

  it('should support file filter', function (done) {
    gulp.src(['./test/fixtures/template.js','./test/fixtures/destiny.js'])
      .pipe(through.filter(function(file) {
        return file.contents.toString().indexOf('function') !== -1;
      }))
      .pipe(assert.first(function(file) {
        (file.contents.toString()).should.equal('define(function(){});');
      }))
      .pipe(assert.end(done));
  });

  it('should support file filter', function (done) {
    gulp.src(['./test/fixtures/template.js','./test/fixtures/destiny.js'])
      .pipe(through.filter(function(file) {
        return file.contents.toString().indexOf('define') !== -1;
      }))
      .pipe(assert.first(function(file) {
        (file.contents.toString()).should.equal('define({});');
      }))
      .pipe(assert.end(done));
  });
});