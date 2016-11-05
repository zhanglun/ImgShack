var path = require('path');
var gulp = require('gulp');
var babel = require("gulp-babel");
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var webpackDevConfig = require('./webpack.config.dev.js');
var webpackBuildConfig = require('./webpack.config.build.js');
var electron = require('electron-connect').server.create();

var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

// 前端代码
var RESOURCE_SRC_PATH = path.resolve(SRC_PATH, 'resource');
var RESOURCE_BUILD_PATH = path.resolve(BUILD_PATH, 'resource');


// 开发
var webpackConfigDev = Object.create(webpackDevConfig);

var devCompiler = webpack(webpackConfigDev);

// renderer process 的 webpack 编译
gulp.task('webpack:dev', function () {
  console.log('------> webpack dev');
  devCompiler.run(function (err, status) {
    if (err) {
      throw new gutil.PluginError('webpack:dev', err);
    }
    gutil.log('[webpack:dev]', status.toString({
      colors: true
    }));
  });
});

gulp.task('webpack:build', function () {
  console.log('webpack: building');
  devCompiler.run(function (err, status) {
    if (err) {
      throw new gutil.PluginError('webpack:dev', err);
    }
    gutil.log('[webpack:dev]', status.toString({
      colors: true
    }));
  });
});


// bin process 的编译
gulp.task('babel:electron-main', function () {
  return gulp.src([SRC_PATH + '/config/**/*.js', SRC_PATH + '/bin/**/*.js', SRC_PATH + '/common/**/*.js'], { base: SRC_PATH })
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('build'));
});


gulp.task('watch', ['babel:electron-main', 'webpack:dev'], function () {

  electron.start();
  gulp.watch([BUILD_PATH + '/{bin, common, config}/**/*.js'], electron.restart);
  gulp.watch([RESOURCE_BUILD_PATH + '/**/*.{html,js,less,css,vue}'], electron.reload);
});

gulp.task('watch:build', function () {
  gulp.watch([RESOURCE_SRC_PATH + '/**/*.{html,js,less,css,vue}'], ['webpack:dev']);
  gulp.watch([SRC_PATH + '/bin/**/*.js', SRC_PATH + '/{common, config}/**/*.js'], ['babel:electron-main']);
});

gulp.task('copy:lib', function () {
  return gulp.src([RESOURCE_SRC_PATH + '/lib/**/*.{js,swf}'], { base: RESOURCE_SRC_PATH + '/lib' })
    .pipe(gulp.dest(RESOURCE_BUILD_PATH + '/lib/'));
});


gulp.task('dev', ['copy:lib', 'watch:build', 'watch']);
