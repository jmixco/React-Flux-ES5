"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect');//runs a local dev server
var open = require('gulp-open');//open url in browser

var browserify = require('browserify');// Bundles JS
var reactify = require('reactify');// transform JSX to JS
var source = require('vinyl-source-stream');//Use conventional text streams with gulp
var concat = require('gulp-concat');
var lint = require('gulp-eslint');

var config = {
    port: 3000,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js',
        images: './src/images/*',
        dist: './dist',
        mainJs: './src/main.js',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            'node_modules/toastr/toastr.css'
        ]
    }
}

//start local dev server
gulp.task('connect', () => {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        liverload: true
    });
});

//open dist on the url
gulp.task('open', ['connect'], () => {
    gulp.src('dist/index.html')
        .pipe(open({ uri: `${config.devBaseUrl}:${config.port}/` }))
})

//move html to dist
gulp.task('html', () => {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
})

gulp.task('js', () => {
    browserify(config.paths.mainJs)
        .transform(reactify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(`${config.paths.dist}/scripts`))
        .pipe(connect.reload());
});
gulp.task('css', () => {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(`${config.paths.dist}/css`))
    //.pipe(connect.reload());
})
gulp.task('images', () => {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(`${config.paths.dist}/images`))
        .pipe(connect.reload());
})
gulp.task('lint', () => {
    return gulp.src(config.paths.js)
        .pipe(lint({ config: 'eslint.config.json' }))
        .pipe(lint.format())
})
gulp.task('watch', () => {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js'/*,'lint'*/]);
});
//run this task by default
gulp.task('default', ['html', 'js', 'css', 'images'/*,'lint'*/, 'open', 'watch']);
