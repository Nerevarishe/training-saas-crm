const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const plumber = require("gulp-plumber");
const autoprefixer = require("gulp-autoprefixer");

function compileSass(done) {
  gulp
    .src("./src/assets/scss/styles.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 20 versions'],
      cascade: true
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./src/assets/css"))
    .pipe(browserSync.stream());
  done();
}

function watch(done) {
  browserSync.init({
    server: {
      baseDir: "./src",
    },
  });
  gulp.watch("./src/assets/scss/**/*.scss", compileSass);
  gulp.watch("./src/*.html").on("change", browserSync.reload);
  gulp.watch("./src/assets/js/**/*.js").on("change", browserSync.reload);
  done();
}

exports.sass = compileSass;
exports.default = watch;
