/**
 * Created by zhoucaiguang on 16/10/14.
 */

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');



gulp.task('autoFx', function () {
  gulp.src(path.join(conf.paths.src, '/styles/**/*.less'))
    .pipe(less())
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android >= 4.0','iOS 7','> 5%','last 3 Safari versions'],
      cascade: true, //是否美化属性值 默认：true 像这样：
      //-webkit-transform: rotate(45deg);
      //        transform: rotate(45deg);
      remove:true //是否去掉不必要的前缀 默认：true
    }))
    .pipe(gulp.dest('src/styles/'));
});
