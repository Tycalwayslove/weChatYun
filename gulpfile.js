const gulp = require("gulp");
const uglify = require("gulp-uglify");

// 开始任务
gulp.task("default", function() {
  gulp
    .src("src/app.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/"));
});
