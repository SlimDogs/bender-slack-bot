/// <reference path="typings/index.d.ts" />

var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    notify = require('gulp-notify'),
    path = require('path');

gulp.task('TypeScript compilation', function() {
    return gulp
        .src(['**/*.ts', '!node_modules/**/*.ts'], { base: '.' })
        .pipe(ts())
        .pipe(notify({
            'title': 'TypeScript compiled',
            'message': 'Thank you for being progressive!',
            'icon': path.join(__dirname, 'icons/gulp/ts.png'), // case sensitive
            'onLast': true
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['TypeScript compilation'], function() {
    gulp.watch(['**/*.ts', '!node_modules/**/*.ts'], ['TypeScript compilation']);
});