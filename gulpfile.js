const { src, dest, series, parallel, watch } = require("gulp");

//////////////////////html///////////////////////
const htmlmin = require("gulp-htmlmin");
function htmltask() {
  return src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest("build"));
}
// exports.html = htmltask;

/////////////////////image/////////////////////
const imagemin = require("gulp-imagemin");
function imageMinTask() {
  return src("src/images/*").pipe(imagemin()).pipe(dest("build/images"));
}
// exports.imageMinify = imageMinTask;

////////////////////css///////////////////////
const cssmin = require("gulp-clean-css");
const concat = require("gulp-concat");
function cssMinTask() {
  // ** get all files and folders in css folder
  return src("src/css/**/*.css")
    .pipe(concat("style.min.css"))
    .pipe(cssmin())
    .pipe(dest("build/css"));
}
// exports.cssMinify = cssMinTask;

function watchTask() {
  watch(
    ["src/sass/*.scss", "src/*.html", "src/Js/*.js", "src/css/**/*.css"],
    { interval: 1000 },
    sassStyleTask,
    htmltask,
    jsMinTask,
    cssMinTask
  );
}

////////////////////////////////////js///////////////////////
const jsmin = require("gulp-terser");
function jsMinTask() {
  return src("src/Js/*.js")
    .pipe(concat("script.min.js"))
    .pipe(jsmin())
    .pipe(dest("build/Js"));
}

///////////////////////////sass//////////////////////////////////////
const sass = require("gulp-sass")(require("sass"));

function sassStyleTask() {
  return src("./src/sass/*.scss")
    .pipe(concat("style.min.css"))
    .pipe(sass())
    .pipe(dest("build/css"));
}

// exports.sassStyle = sassStyleTask;
// exports.watch = function () {
//   gulp.watch('./src/sass/**/*.scss', ['sass']);
// };

exports.default = series(
  parallel(cssMinTask, imageMinTask, htmltask, jsMinTask, sassStyleTask),
  watchTask
);
