const path = require("path");
const gulp = require("gulp");
const less = require("gulp-less");


const DIR = {
    less: path.resolve(__dirname, "./src/components/**/*.less"),
    buildSrc: [
      path.resolve(__dirname, "./src/components/**/*.less"),
      path.resolve(__dirname, "./src/components/**/index.less")
    ],
    lib: path.resolve(__dirname, "./lib"),
    es: path.resolve(__dirname, "./es"),
    dist: path.resolve(__dirname, "./dist")
  };

gulp.task("copyLess", () => {
    return gulp
      .src(DIR.less)
      .pipe(gulp.dest(DIR.lib))
      .pipe(gulp.dest(DIR.es));
  });
  gulp.task("copyCss", () => {
    return gulp
      .src(DIR.buildSrc)
      .pipe(
        less({
          outputStyle: "compressed"
        })
      )
      .pipe(gulp.dest(DIR.lib))
      .pipe(gulp.dest(DIR.es));
  });

gulp.task("default", gulp.series("copyLess","copyCss"));