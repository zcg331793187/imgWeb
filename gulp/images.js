/**
 * Created by zhoucaiguang on 16/10/14.
 */

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var imagemin = require('gulp-imagemin');

/*
gulp.task('images', function() {

 return  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('s/images'))
});
*/

gulp.task('images', function () {



  return gulp.src([
    path.join(conf.paths.src, '/images/*')
  ]).pipe((imagemin()))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/images/')))

});
