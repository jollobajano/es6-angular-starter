var gulp = require('gulp');
var path = require('path');
var url = require('url');
var webpack = require('webpack-stream');
var ngAnnotate = require('gulp-ng-annotate');
var wiredep = require('wiredep').stream;
var cdnizer = require("gulp-cdnizer");

var sass = require('gulp-sass');

var browserSync = require('browser-sync').create();
var proxy = require('proxy-middleware');
var modRewrite = require('connect-modrewrite');

var runSequence = require('run-sequence');




gulp.task('default', function() {
    runSequence(['transpile', 'webapp-resources', 'sass'], 'watch', 'browserSync');
});



gulp.task('watch', function() {
    gulp.watch(['src/main/webapp/**/*'], ['webapp-resources']);
    gulp.watch(['src/main/js/**/*.js'], ['transpile']);
    gulp.watch('src/main/scss/**/*.scss', ['sass']);
    gulp.watch(path.join('target/generated-webresources', '**/*')).on('change', browserSync.reload);    
});


gulp.task('transpile', function() {
    return gulp.src('src/main/js/*.js')
	.pipe(webpack({
            entry: {
		preload: './src/main/js/application.js'
            },
            output: {
		path: path.join(__dirname, 'target/generated-javascript'),
		filename: '[name].bundle.js',
		chunkFilename: '[id].bundle.js'
            },
	    module: {
		loaders: [{
		    loader: 'babel-loader'
		}]
	    }
	}))
        .pipe(ngAnnotate())
	.pipe(gulp.dest('target/generated-webresources'));
});



gulp.task('sass', function () {
    return gulp.src('src/main/scss/**/*.scss')
        .pipe(wiredep())
        .pipe(sass())
	.pipe(gulp.dest('target/generated-webresources'));
});


gulp.task('webapp-resources', function() {
    return gulp.src(['src/main/webapp/**/*'])
	.pipe(wiredep({
	    ignorePath: '../../../bower_components/'
	}))
	.pipe(gulp.dest('./target/generated-webresources'));
});





gulp.task('browserSync', function () {
    var proxyOptions = url.parse('http://localhost:8080/api');
    proxyOptions.route = '/api';

    browserSync.init({
        startPath: '/index.html',
        server: {
            baseDir: ['target/generated-webresources', 'bower_components'],
            index: 'index.html',
        },
        middleware: [
            proxy(proxyOptions),
            modRewrite([
                '^/.*\\.\\w+$ - [L]',
                '^/(.*)$ /index.html [L]'
            ])
        ]
    });
});

