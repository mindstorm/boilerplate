/* global process */

// Include gulp
var gulp = require("gulp");

// Include Plugins
var gutil = require("gulp-util");
var bower = require("bower");
//var concat = require("gulp-concat");
var sass = require("gulp-sass");
var minifyCss = require("gulp-minify-css");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var templateCache = require("gulp-angular-templatecache");
var sh = require("shelljs");

// Source Paths
var srcPaths = {
    styles: ["./_dev/styles/**/*.scss"],
    templates: ["./_dev/templates/**/*.html"]
};

// Distribution Paths
var distPaths = {
    styles: "./www/css/",
    templates: "./www/js/"
};

// Defaut Task
gulp.task("default", ["sass", "templates"]);

// Compile SASS
gulp.task("sass", function (done) {
    "use strict";

    gulp.src("./_dev/styles/ionic.app.scss")
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(gulp.dest(distPaths.styles))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: ".min.css"
        }))
        .pipe(gulp.dest(distPaths.styles))
        .on("end", done);
});

// Compile templates.
gulp.task("templates", function (done) {
    "use strict";

    gulp.src(srcPaths.templates)
        .pipe(templateCache("app.templates.min.js", {
            module: "App",
            base: ""
        }))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest(distPaths.templates))
        .on("end", done);
});

// Watcher Task
gulp.task("watch", function () {
    "use strict";

    gulp.watch(srcPaths.styles, ["sass"]);
    gulp.watch(srcPaths.templates, ["templates"]);
});

gulp.task("install", ["git-check"], function () {
    "use strict";
    
    return bower.commands.install()
        .on("log", function (data) {
            gutil.log("bower", gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task("git-check", function (done) {
    "use strict";
    
    if (!sh.which("git")) {
        console.log(
            "  " + gutil.colors.red("Git is not installed."),
            "\n  Git, the version control system, is required to download Ionic.",
            "\n  Download git here:", gutil.colors.cyan("http://git-scm.com/downloads") + ".",
            "\n  Once git is installed, run '" + gutil.colors.cyan("gulp install") + "' again."
        );
        process.exit(1);
    }
    done();
});