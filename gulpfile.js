var gulp = require('gulp');
var uglify = require("gulp-uglify");
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('js', function() {
  gulp.src(
      [
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/jquery/dist/jquery.min.map',
        'bower_components/d3/d3.min.js'
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

  gulp.src(
      [
      'resources/stylesheets/*.scss'
      ]
  ).pipe(
      sass()
  //).pipe(
  //    sourcemaps.init()
  ).pipe(
      minifyCss()
  //).pipe(
  //    sourcemaps.write()
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