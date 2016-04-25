var gulp = require('gulp');
var server = require( 'gulp-develop-server' );

var PATHS = {
    clientSrc: 'client/src/**/*.ts',
    svrSrc: 'server/**/*.js'
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

gulp.task('server', function (cb) {
  server.listen( { path: './server/app.js' });
});

gulp.task('play', ['server','ts2js'], function () {
    // var http = require('http');
    // var connect = require('connect');
    // var serveStatic = require('serve-static');
    // var open = require('open');

    // var port = 9000, app;

    //gulp.watch(PATHS.clientSrc, ['ts2js']);
    //gulp.watch(PATHS.svrSrc, ['server']);

    // app = connect().use(serveStatic(__dirname));
    // http.createServer(app).listen(port, function () {
    //     open('http://localhost:' + port);
    // });
});

gulp.task('default', ['play']);