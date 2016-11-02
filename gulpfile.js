var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    cssnano       = require('cssnano'),
    autoprefixer  = require('autoprefixer'),
    postcss       = require('gulp-postcss'),
    webserver     = require('gulp-webserver');

gulp.task('build-css', function() {
  return gulp.src('src/css/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({ browsers: ['last 2 versions'] }),
      cssnano()
    ]))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('start-webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload:       true,
      directoryListing: true,
      open:             true,
      host:             '0.0.0.0'
    }));
});

gulp.task('watch-css', function() {
  gulp.watch('src/css/*.scss', ['build-css']);
});
