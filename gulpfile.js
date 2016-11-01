var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    cssnano       = require('cssnano'),
    autoprefixer  = require('autoprefixer'),
    postcss       = require('gulp-postcss');

gulp.task('build-css', function() {
  return gulp.src('src/css/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({ browsers: ['last 1 version'] }),
      cssnano()
    ]))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch-css', function() {
  gulp.watch('src/css/*.scss', ['build-css']);
});
