'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var browserify = require('browserify');
var babelify = require('babelify');
var glob = require('glob');
var es = require('event-stream');
var path = require('path');
var source = require('vinyl-source-stream');


gulp.task('sass', function () {
  return gulp.src('./public/styles/main.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('public/'));
});

gulp.task('babel', function(done) {
    glob('./public/script/*.jsx', function(err, files) {
        if(err) done(err);

        var tasks = files.map(function(entry) {
            var fileName = path.basename(entry.substring(0, entry.length - 3) + 'js');
            return browserify({ entries: [entry], extensions: ['.jsx'] })
                .transform("babelify", {presets: ["es2015", "react"], plugins: ["transform-object-rest-spread"]})
                .bundle()
                .pipe(source(fileName))
                .pipe(gulp.dest('public'));
        });
        es.merge(tasks).on('end', done);
    })
});


gulp.task('watch', function () {
    gulp.watch(
        ['./public/script/main.jsx',
            './public/styles/main.scss',
            './public/script/*/*.jsx'],
        ['sass', 'babel']);
});

gulp.task('default', ['watch']);



