var path = require('path');
var gulp = require('gulp');
var babel = require("gulp-babel");
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var electron = require('electron-connect').server.create();

var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
console.log(SRC_PATH);
// 前端代码
var RESOURCE_SRC_PATH = path.resolve(SRC_PATH, 'resource');
var RESOURCE_BUILD_PATH = path.resolve(BUILD_PATH, 'resource');


// 开发
var webpackConfigDev = Object.create(webpackConfig);
webpackConfigDev.devtool = 'eval-source-map';
webpackConfigDev.debug = true;

var devCompiler = webpack(webpackConfigDev);

// renderer process 的 webpack 编译
gulp.task('webpack:build-dev', function () {
  devCompiler.run(function (err, status) {
    if (err) {
      throw new gutil.PluginError('webpack:build-dev', err);
    }
    gutil.log('[webpack:build-dev]', status.toString({
      colors: true
    }));
  });
});

// bin process 的编译
gulp.task('babel:electron-main', function () {
  return gulp.src([SRC_PATH + '/config/**/*.js', SRC_PATH + '/bin/**/*.js}', SRC_PATH + '/common/**/*.js'], { base: SRC_PATH })
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('build'));
});


gulp.task('watch', ['babel:electron-main', 'webpack:build-dev'], function () {

  electron.start();
  gulp.watch([BUILD_PATH + '/{bin, common, config}/**/*.js'], electron.restart);
  gulp.watch([RESOURCE_BUILD_PATH + '/**/*.{html,js,less,css}'], electron.reload);
});

gulp.task('watch:build', function () {
  gulp.watch([RESOURCE_SRC_PATH + '/**/*.{html,js,less,css}'], ['webpack:build-dev']);
  gulp.watch([SRC_PATH + '/bin/**/*.js', SRC_PATH + '/{common, config}/**/*.js'], ['babel:electron-main']);
});


gulp.task('dev', ['watch:build', 'watch']);
