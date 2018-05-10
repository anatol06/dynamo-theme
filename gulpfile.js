var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify');

// Configure BrowserSync
gulp.task('browser-sync', function () {
    var files = ['*.html', '*.php']; 

    // Initialize Browsersync in local folder
    browserSync.init(files, {
        notify: false,
        injectChanges: true,
        server: {
            baseDir: "./"
        }
    });
});

// Return the error in console
var onError = function (err) {
    notify.onError(
        {title: "Gulp", subtitle: "Failure!", message: "Error: <%= error.message %>", sound: "Beep"}
    )(err);

    this.emit('end');
};

// Configure Sass task to run when the specified .scss files change Browsersync
// will also reload browsers

gulp.task('sass', function () {
    return gulp
        .src('sass/*.scss')
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass({'outputStyle': 'extended'}))
        .pipe(prefix('last 2 version'))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream());
});

// Create default task
gulp.task('default', [
    'sass', 'browser-sync'
], function () {
    gulp.watch('sass/**/*.scss', ['sass']);
});
