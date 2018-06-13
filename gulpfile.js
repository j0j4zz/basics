'use strict';

const gulp          = require('gulp');
const minifyCSS     = require('gulp-minify-css');
const concatCSS     = require('gulp-concat-css');
const gutil         = require('gulp-util');
const server        = require('gulp-express');
const browserSync   = require('browser-sync');
const reload	    = browserSync.reload;
const notify        = require('gulp-notify');
const inject        = require('gulp-inject');


// This is the process to css files
gulp.task('build:css', () => {
    return gulp.src('build/css/*.css')
        .pipe(concatCSS('style.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream:true}));
});

// This is the process to 
gulp.task('build:js', () => {
    return  gulp.src('build/js/*.js')
        .pipe(gulp.dest('dist/js'))
        .pipe(reload({stream:true}));
});

// This is the process to 
gulp.task('build:font', () => {
    return  gulp.src(['build/font/*'])
        .pipe(gulp.dest('dist/font'))
        .pipe(reload({stream:true}));
});

// This is the process to 
gulp.task('build:img', () => {
    return  gulp.src(['build/img/*'])
        .pipe(gulp.dest('dist/img'))
        .pipe(reload({stream:true}));
});

// This is the process to 
gulp.task('build:html', () => {
    return  gulp.src(['build/html/*'])
	    .pipe(inject(gulp.src(['dist/**/*.min.css'], {read: false}), {starttag: '<!-- inject:dist:css -->'}))
	    .pipe(inject(gulp.src(['dist/**/*.js'], {read: false}), {starttag: '<!-- inject:dist:js -->'}))
        .pipe(gulp.dest('dist/html'))
        .pipe(reload({stream:true}));
});

// Watch for any file changes
gulp.task('watch:css', () => {
    return watch('build/css/*.css',['build:css']);
})

gulp.task('watch', () => {
    // Watch for the following items
    // HTML
    gulp.watch(['build/html/*.html'], ['build:html'])
    .on('change',(event) => {
        notify('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    // CSS
    gulp.watch('build/css/*.css',['build:css'])
    .on('change',(event) => {
        notify('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    // Javascript
    gulp.watch('build/js/*.js',['build:js'])
    .on('change',(event) => {
        notify('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    // Font
    gulp.watch('build/font/*',['build:font'])
    .on('change',function(event){
        notify('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    // Images
    gulp.watch('build/img/*',['build:img'])
    .on('change',function(event){
        notify('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
})

// Browser Sync
gulp.task('browser-sync', function(){
	browserSync.init({
		proxy : 'localhost:3001'
	});
});

// Default values
gulp.task('default',['watch', 'build:css','build:js','build:html','build:img','build:font','browser-sync'], ()=> {
    // run the server
    server.run(['app.js']);   

});
