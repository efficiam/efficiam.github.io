var gulp          = require('gulp'),
    sass          = require('gulp-sass'),
    cssnano       = require('cssnano'),
    autoprefixer  = require('autoprefixer'),
    postcss       = require('gulp-postcss'),
    browserSync   = require('browser-sync'),
    uglify        = require('gulp-uglify'),
    useref        = require('gulp-useref'),
    gulpif        = require('gulp-if'),
    cache         = require('gulp-cache'),
    del           = require('del'),
    imagemin      = require('gulp-imagemin'),
    htmlmin       = require('gulp-htmlmin');

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: '.'
    }
  })
});

gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
});

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*']);
});


gulp.task('sass', function() {
  return gulp.src('src/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'));
});

gulp.task('images', function() {
  return gulp.src('src/images/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist'))
});

gulp.task('useref', ['sass', 'images'], function () {
  return gulp.src('src/index.html')
      .pipe(useref())
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', postcss([
        autoprefixer({ browsers: ['last 2 versions'] }),
        cssnano()
      ])))
      .pipe(gulpif('*.html', htmlmin({
        collapseWhitespace: true
      })))
      .pipe(gulp.dest('.'))
      .pipe(browserSync.reload({
        stream: true
      }));
});

gulp.task('default', ['clean:dist', 'browserSync', 'useref'], function() {
  gulp.watch('./src/**/*', ['useref']);
});

gulp.task('build', ['clean:dist', 'useref']);
