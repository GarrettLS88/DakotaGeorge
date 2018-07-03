(function () {
    "use strict";

    var gulp = require("gulp"),
        concat = require("gulp-concat"),
        uglify = require("gulp-uglify"),
        cleanCSS = require("gulp-clean-css"),
        sass = require("gulp-sass"),
        autoprefixer = require("gulp-autoprefixer"),
        del = require("del"),
        runSequence = require('run-sequence'),
        maps = require("gulp-sourcemaps"),
        syncy = require("syncy"),
        browserify = require("browserify"),
        source = require('vinyl-source-stream'),
        tsify = require("tsify"),
        buffer = require('vinyl-buffer');

    // ============================================================================================================
    // JS: transpile, concat modules, minify, write maps
    // ============================================================================================================

    gulp.task("compileTSHome", function () {
        return browserify({
            basedir: '.',
            debug: true,
            entries: ['Scripts/ts/app.ts'],
            cache: {},
            packageCache: {}
        })
            .plugin(tsify, {
                "noImplicitAny": false,
                "removeComments": true,
                "target": "es5",
                "lib": [
                    "es2016",
                    "dom"
                ]
            })
            .bundle()
            .pipe(source('app.js'))
            .pipe(buffer())
            .pipe(maps.init({ loadMaps: true }))
            .pipe(uglify())
            .pipe(maps.write('../maps'))
            .pipe(gulp.dest("./wwwroot/js"));
    });

    // Deleted all map and js left over from ts compile
    gulp.task("cleanTS", function () {
        del([
            "Scripts/ts/**/*.js",
            "Scripts/ts/**/*.map"
        ]);
    });

    // ============================================================================================================
    // CSS: Compile, prefix, minify, write maps
    // ============================================================================================================
    gulp.task("compileSass", function () {
        return gulp.src([
            "Styles/scss/styles.scss"
        ])
            .pipe(maps.init())
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(cleanCSS({ compatibility: "ie9" }))
            .pipe(maps.write("../maps"))
            .pipe(gulp.dest("./wwwroot/css"));
    });

    // ============================================================================================================
    // Watch Files
    // ============================================================================================================
    gulp.task("serve", ["watchFiles"]);

    // SCSS: Run css functions and then deploy only the includes/css
    // JS: Run js functions and then deploy only the includes/js
    // vs-deploy deals with .asp files being pushed.
    // vs-deploy button to deploy only css/js files after minify
    gulp.task("watchFiles", function () {
        gulp.watch("Styles/scss/**/*.scss", ["compileSass"]);
        gulp.watch("Scripts/ts/**/*.ts", ["compileTSHome", "compileTSAccount"]);
    });

    // ============================================================================================================
    // Builds
    // ============================================================================================================

    // Default function for gulp
    gulp.task("default", function (done) {
        runSequence("build", function () {
            done();
        });
    });

    // Runs clean, then js and css functions with minify and maps
    gulp.task("build", function (done) {
        runSequence('clean', 'compileSass', 'compileTSHome', function () {
            done();
        });
    });

    // Deleted all files in the css and js folders
    gulp.task("clean", function () {
        del([
            "wwwroot/css/*.css",
            "wwwroot/js/*.js",
            "wwwroot/maps/*.map"
        ]);
    });
})();
