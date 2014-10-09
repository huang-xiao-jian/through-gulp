/**
 * Created by Administrator on 2014/10/9.
 */
var gulp = require('gulp');
var assert = require('stream-assert');
var through = require('../through-gulp.js');
require('should');
require('mocha');
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
            .on('end', done);
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
            .on('end', done);
    });

    it('should support file filter', function (done) {
        gulp.src(['./test/fixtures/template.js','./test/fixtures/destiny.js'])
            .pipe(through.filter(function(file) {
                return file.contents.toString().indexOf('function') !== -1;
            }))
            .pipe(assert.first(function(file) {
                (file.contents.toString()).should.equal('define(function(){});');
            }))
            .on('end', done);
    });

    it('should support file filter', function (done) {
        gulp.src(['./test/fixtures/template.js','./test/fixtures/destiny.js'])
            .pipe(through.filter(function(file) {
                return file.contents.toString().indexOf('define') !== -1;
            }))
            .pipe(assert.first(function(file) {
                (file.contents.toString()).should.equal('define({});');
            }))
            .on('end', done);
    });
});