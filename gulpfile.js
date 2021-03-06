'use strict';
/* global require, __dirname, process, console */

// #############################################################################
// IMPORTS
var gulp = require('gulp');
var gutil = require('gulp-util');
var protractor = require('gulp-protractor').protractor;
var eslint = require('gulp-eslint');
var SauceTunnel = require('sauce-tunnel');
var tunnel;
var isTunnelCreated;

// #############################################################################
// SETTINGS
var PROJECT_ROOT = __dirname;
var PROJECT_PATH = {
    js: PROJECT_ROOT + '/static/js',
    tests: PROJECT_ROOT + '/tests'
};

var PROJECT_PATTERNS = {
    lint: [
        PROJECT_PATH.js + '/addons/*.js',
        PROJECT_PATH.tests + '/**/*.js',
        '!' + PROJECT_PATH.tests + '/coverage/**/*.js',
        PROJECT_ROOT + '/gulpfile.js'
    ]
};

var PORT = parseInt(process.env.PORT, 10) || 8000;

// #############################################################################
// LINTING
gulp.task('lint', function () {
    return gulp.src(PROJECT_PATTERNS.lint)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// #############################################################################
// TESTS
gulp.task('tests', ['lint', 'tests:integration']);

gulp.task('tests:sauce:start', function (done) {
    if (!process.env.CI) {
        done();
        return;
    }
    tunnel = new SauceTunnel(
        process.env.SAUCE_USERNAME,
        process.env.SAUCE_ACCESS_KEY,
        process.env.TRAVIS_JOB_NUMBER
    );

    tunnel.start(function (isCreated) {
        isTunnelCreated = isCreated;
        if (!isCreated) {
            console.log('Failed to create Sauce tunnel, returning error code');
            // force the process to exit with error code if couldn't create the tunnel
            process.exit(1);
            return false;
        }
        console.log('Connected to Sauce Labs.');
        done();
    });
});

gulp.task('tests:sauce:end', function (done) {
    if (!process.env.CI) {
        done();
        return;
    }
    tunnel.stop(function () {
        console.log('Stopping the server.');
        done();
    });
});

gulp.task('tests:integration', ['tests:sauce:start'], function () {
    if (process.env.CI && !isTunnelCreated) {
        // force the process to exit with error code if couldn't create the tunnel
        process.exit(1);
        return false;
    }
    return gulp.src([PROJECT_PATH.tests + '/integration/specs/*.js'])
        .pipe(protractor({
            configFile: PROJECT_PATH.tests + '/protractor.conf.js',
            args: ['--baseUrl', 'http://127.0.0.1:' + PORT]
        }))
        .on('error', function (error) {
            gutil.log(gutil.colors.red(
                'Error (' + error.plugin + '): ' + error.message
            ));
            // force the process to exit with error code
            process.exit(1);
        })
        .on('end', function () {
            gulp.run('tests:sauce:end');
        });
});

// #############################################################################
// COMMANDS
gulp.task('default', ['lint']);
