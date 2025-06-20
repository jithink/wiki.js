var gulp = require('gulp');
var sass = require('gulp-sass');
var pkg = require('./package.json');
var header = require('gulp-header');
var size = require('gulp-size');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-clean-css');
var del = require('del');
var banner = ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @author <%= pkg.author %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */\n\n'
].join('\n');
gulp.task('styles', function () {
    gulp.src('sass/**/*.scss')
        .pipe(size({
            gzip: true,
            showFiles: true
        }))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/'))
        .pipe(minifyCSS('*'))
        .pipe(size({
            gzip: true,
            showFiles: true
        }))
        .pipe(header(banner, {
            pkg: pkg
        }))
        .pipe(rename('twemoji-awesome.min.css'))
        .pipe(gulp.dest('./dist/'));
});

// Delete
gulp.task('delete', function () {
    return del([
        'dist/**/*'
    ]);
});

// Default
gulp.task('default', ['delete', 'styles']);