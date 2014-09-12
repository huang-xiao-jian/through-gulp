var transform = require('stream').Transform;
var gulp = require('gulp');
var gutil = require('gulp-util');
var throughGulp = require('../through-gulp.js');
require('should');
require('mocha');

describe('through-gulp', function () {
    beforeEach(function () {

    });

    it('should inherit transform', function () {
        var expect = throughGulp({}, function(){}, function() {});
        (expect instanceof transform).should.be.true;
        (expect._transform).should.be.ok;
        (expect._flush).should.be.ok;
    });

    it.skip('should receive data from gulp', function (done) {
        gutil.log('gulp data');
        gulp.src('./fixtures/template.js')
            .pipe(throughGulp(function(file, encoding, callback) {

            }));
        done();
    });
/*    it('should pass through when transform not pass-in', function () {
        gulp.src('./fixture/template.js')
            .pipe(throughGulp())

    });*/
});