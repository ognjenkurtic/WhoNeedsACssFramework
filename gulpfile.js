const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const del = require('del');
const runSequence = require('run-sequence');

const DIST_PATH = 'dist';
const SRC_PATH = 'src';

gulp.task('watch', function () {

    browserSync.init({
        server: {
            baseDir: DIST_PATH
        }
    });

    gulp.watch(`${SRC_PATH}/**/*.css`, ['copy-css']).on('change', function () {
        browserSync.reload();
    });
    gulp.watch(`${SRC_PATH}/**/*.html`, ['copy-html']).on('change', function () {
        browserSync.reload();
    });
});

gulp.task('copy-css', function () {
    return gulp.src(`${SRC_PATH}/**/*.css`)
        .pipe(gulp.dest(DIST_PATH));
});

gulp.task('copy-assets', function () {
    return gulp.src(`${SRC_PATH}/**/*.jpg`)
        .pipe(gulp.dest(DIST_PATH));
});

gulp.task('copy-html', function () {
    return gulp.src(`${SRC_PATH}/**/*.html`)
        .pipe(gulp.dest(DIST_PATH))
});

gulp.task('clean', function () {
    return del([DIST_PATH])
});

gulp.task('build', function () {
    runSequence(
        'clean',
        'copy-css',
        'copy-html',
        'copy-assets'
    );
});

gulp.task('default', ['build', 'watch']);