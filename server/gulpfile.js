const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch')

gulp.task('default', () => {
    return watch('src/**/*.js', {
        ignoreInitial: false,
        verbose: true
    })
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

gulp.task('build', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('dist'));
});

