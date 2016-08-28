const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch')

gulp.task('default', () => {
    return watch('*.js', {
        ignoreInitial: false,
        verbose: true
    })
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});