/// <reference path="typings/index.d.ts" />

(() => {
  const gulp = require('gulp');
  const ts = require('gulp-typescript');
  const tsConfig = require('./tsconfig.json');
  const notify = require('gulp-notify');
  const path = require('path');
  const params = require('yargs').argv;
  const gulpif = require('gulp-if');
  
  gulp.task('TypeScript compilation', () => {
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
  
  gulp.task('default', ['TypeScript compilation'], () => {
    if (params.env !== 'production') {
      gulp.watch(['**/*.ts', '!node_modules/**/*.ts'], ['TypeScript compilation']);
    }
  });
})();