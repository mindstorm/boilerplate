// Include gulp
var gulp = require("gulp");

// Include Plugins
var gutil = require("gulp-util");
var bower = require("bower");
var concat = require("gulp-concat");
var sass = require("gulp-sass");
var minifyCss = require("gulp-minify-css");
var rename = require("gulp-rename");
var sh = require("shelljs");

// Source Paths
var srcPaths = {
    styles: ["./_dev/styles/**/*.scss"]
};

// Distribution Paths
var distPaths = {
    styles: "./www/css/"
};

// Defaut Task
gulp.task("default", ["sass"]);

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

// Watcher Task
gulp.task("watch", function () {
    "use strict";

    gulp.watch(srcPaths.styles, ["sass"]);
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