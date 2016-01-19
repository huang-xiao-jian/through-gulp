/**
 * module dependency
 */
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var should = require('should');
var through = require('../index.js');

describe('through-gulp', function () {
  it('should generate object mode stream', function (done) {
    var target = path.join(__dirname, 'destiny', 'template.js');

    gulp.src('test/fixtures/template.js')
      .pipe(through())
      .pipe(gulp.dest('test/destiny/'))
      .on('end', function() {
        fs.readFileSync(target).toString().should.equal('define({});');
        fs.unlinkSync(target);
        done();
      });
  });

  it('should support pass transform function', function (done) {
    var target = path.join(__dirname, 'destiny', 'base.js');

    gulp.src('test/fixtures/base.js')
      .pipe(through(function(file, encoding, callback) {
        file.contents = Buffer.concat([new Buffer('through stream;'), file.contents]);
        callback(null, file);
      }))
      .pipe(gulp.dest('test/destiny/'))
      .on('end', function() {
        fs.readFileSync(target).toString().should.equal('through stream;define({});');
        done();
      });
  });
});