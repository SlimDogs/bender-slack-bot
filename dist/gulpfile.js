(function () {
    var gulp = require('gulp');
    var ts = require('gulp-typescript');
    var tsConfig = require('./tsconfig.json');
    var notify = require('gulp-notify');
    var path = require('path');
    var params = require('yargs').argv;
    var gulpif = require('gulp-if');
    gulp.task('TypeScript compilation', function () {
        return gulp
            .src(['**/*.ts', '!node_modules/**/*.ts'], { base: '.' })
            .pipe(ts(tsConfig.compilerOptions))
            .pipe(gulpif(params.env !== 'production', notify({
            title: 'TypeScript compiled',
            message: 'Thank you for being progressive!',
            icon: path.join(__dirname, 'icons/gulp/ts.png'),
            onLast: true
        })))
            .pipe(gulp.dest('./dist'));
    });
    gulp.task('default', ['TypeScript compilation'], function () {
        if (params.env !== 'production') {
            gulp.watch(['**/*.ts', '!node_modules/**/*.ts'], ['TypeScript compilation']);
        }
    });
})();