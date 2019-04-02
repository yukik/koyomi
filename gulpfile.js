var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

const output = {
  comments: 'some'
};

function build() {
  return browserify('lib/koyomi.js')
    .transform(babelify)
    .bundle()
    .pipe(source('koyomi.min.js'))
    .pipe(buffer())
    .pipe(uglify({ output }))
    .pipe(gulp.dest('public'));
}

function test() {
  return browserify('test/test.js')
    .transform(babelify)
    .bundle()
    .pipe(source('test.js'))
    .pipe(buffer())
    .pipe(gulp.dest('example/test'));
};

function watch() {
  return gulp.watch('lib/**/*.js', build);
};

exports.test = test;
exports.default = gulp.series(build, watch);;
