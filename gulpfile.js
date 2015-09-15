var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
//var sourcemaps = require('gulp-sourcemaps');
var coffee = require('gulp-coffee');
var gutil = require('gutil');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');


gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('js', function() {
  gulp.src(
      [
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/jquery/dist/jquery.min.map',
        'bower_components/d3/d3.min.js',
        'bower_components/underscore/underscore-min.js',
        'bower_components/underscore/underscore-min.map',
        'bower_components/moment/moment.js',
        'bower_components/bootstrap-table/dist/bootstrap-table.min.js'
      ]
  ).pipe(
      gulp.dest('public/javascripts')
  );


  gulp.src(['resources/scripts/*.coffee']
  ).pipe(
      coffee({bare: true}).on('error', gutil.log)
  //).pipe(
  //    uglify({})
  ).pipe(
      gulp.dest('public/javascripts')
  )
});

gulp.task('css', function() {
  gulp.src(
      [
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/bootstrap/dist/css/bootstrap.css.map',
        'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
        'bower_components/bootstrap/dist/css/bootstrap-theme.css.map',
        'bower_components/bootstrap-table/dist/bootstrap-table.min.css'
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