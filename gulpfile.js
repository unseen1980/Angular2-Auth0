var gulp = require('gulp');
var server = require( 'gulp-develop-server' );

var PATHS = {
    clientSrc: 'client/src/*.ts',
    svrSrc: 'server/*.js'
};

gulp.task('clean', function (done) {
    var del = require('del');
    del(['dist'], done);
});

gulp.task('ts2js', function () {
    var typescript = require('gulp-typescript');
    var tscConfig = require('./tsconfig.json');

    var tsResult = gulp
        .src([PATHS.clientSrc, 'node_modules/angular2/typings/browser.d.ts'])
        .pipe(typescript(tscConfig.compilerOptions));

    return tsResult.js.pipe(gulp.dest('client/dist'));
});

gulp.task('server:restart', function (cb) {
  server.restart();
});

gulp.task('play', ['ts2js'], function () {
    gulp.watch(PATHS.clientSrc, ['ts2js']);
    gulp.watch(PATHS.svrSrc, ['server:restart']);
    server.listen( { path: './server/app.js' });
});

gulp.task('default', ['play']);