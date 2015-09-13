var gulp = require('gulp');
var uglify = require("gulp-uglify");
var concat = require('gulp-concat');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('js', function() {
  gulp.src(
      [
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/jquery/dist/jquery.min.map'
      ]
  ).pipe(
      gulp.dest('public/javascripts')
  );
});

gulp.task('css', function() {
  gulp.src(
      [
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/bootstrap/dist/css/bootstrap.css.map',
        'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
        'bower_components/bootstrap/dist/css/bootstrap-theme.css.map'
      ]
  ).pipe(
      gulp.dest('public/stylesheets')
  );
});

gulp.task('fonts', function() {
  gulp.src(
      [
        'bower_components/bootstrap/dist/fonts/*'
      ]
  ).pipe(
      gulp.dest('public/fonts')
  );
})