var gulp = require("gulp"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    cssnano = require("gulp-cssnano"),
    concat = require("gulp-concat"),
    notify = require("gulp-notify"),
    shell = require("gulp-shell"),
    plumber = require("gulp-plumber"),
    postcss = require("gulp-postcss"),
    tailwindcss = require('tailwindcss'),
    browserSync = require("browser-sync");

gulp.task("styles", function() {
    return gulp.src("css/main.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(plumber())
        .pipe(postcss([
            tailwindcss('./tailwind.js')
        ]))
        .pipe(autoprefixer({ browsers: ['last 3 versions'] }))
        .pipe(cssnano())
        .pipe(gulp.dest("css/"))
        .pipe(notify({ message: "Styles task complete" }));
});

gulp.task("scripts", function() {
    return gulp.src([
        "js/main.js"
    ])
        .pipe(plumber())
        .pipe(concat("main.min.js"))
        .pipe(gulp.dest("js/"))
        .pipe(notify({ message: "Scripts task complete" }));
});

gulp.task("browser-sync", function() {
    browserSync.init([ "_site/css/*.css", "_site/js/*.js", "_site/**/*.html" ], {
        proxy: "127.0.0.1:4000"
    });
});

gulp.task("build", shell.task([ "jekyll serve" ]));

gulp.task("watch", [ "browser-sync" ], function() {
    gulp.watch("css/*.scss", [ "styles" ]);
    gulp.watch("js/*.js", [ "scripts" ]);
    gulp.watch("./**/*.html");
});

gulp.task("default", [ "build", "watch" ]);
