var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

gulp.task('build', function () {
  browserify('lib/koyomi.js')
    .transform(babelify)
    .bundle()
    .pipe(source('koyomi.min.js'))
    .pipe(buffer())
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(gulp.dest('public'));
});

gulp.task('test', function () {
  browserify('test/test.js')
    .transform(babelify)
    .bundle()
    .pipe(source('test.min.js'))
    .pipe(buffer())
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
  gulp.watch('lib/**/*.js', ['build']);
});

gulp.task('default', ['build', 'watch']);
