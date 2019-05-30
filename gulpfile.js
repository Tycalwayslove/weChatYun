const gulp = require("gulp");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
// json
const jsonminify = require("gulp-jsonminify");
const through = require("through2");
// wxss
const combiner = require("stream-combiner2");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const pxtorpx = require("postcss-px2rpx");
const base64 = require("postcss-font-base64");
const cssnano = require("gulp-cssnano");
// js
const jdists = require("gulp-jdists");
const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const filter = require("gulp-filter");
const runSequence = require("run-sequence");

const del = require("del");

const src = "./client";
const dist = "./dist";
const isProd = process.env.NODE_ENV === "production" || false; // 'development'

// 错误信息
const handleError = err => {
  console.log("\n");
  log(colors.red("Error!"));
  log("fileName: " + colors.red(err.fileName));
  log("lineNumber: " + colors.red(err.lineNumber));
  log("message: " + err.message);
  log("plugin: " + colors.yellow(err.plugin));
};

// 开始任务
// gulp.task("default", function() {
//   gulp
//     .src("src/app.js")
//     .pipe(uglify())
//     .pipe(gulp.dest("dist/"));
// });
// 首先先清空dist 目录
// gulp.task("clean", () => {
//   return del(["./dist/**"]);
// });
//wxml的处理
gulp.task("wxml", () => {
  return gulp.src(`${src}/**/*.wxml`).pipe(gulp.dest(dist));
});
//json 的处理
gulp.task("json", () => {
  return gulp
    .src(`${src}/**/*.json`)
    .pipe(isProd ? jsonminify() : through.obj())
    .pipe(gulp.dest(dist));
});
// wxs 的处理
gulp.task("wxs", () => {
  return gulp.src(`${src}/**/*.wxs`).pipe(gulp.dest(dist));
});
// wxss的处理
// 添加 async 解决 Did you forget to signal async completion?的报错
gulp.task("wxss", async () => {
  const combined = combiner.obj([
    await gulp.src(`${src}/**/*.{wxss,scss}`),
    sass().on("error", sass.logError),
    postcss([pxtorpx(), base64()]),
    isProd
      ? cssnano({
          autoprefixer: false,
          discardComments: { removeAll: true }
        })
      : through.obj(),
    rename(path => (path.extname = ".wxss")),
    gulp.dest(dist)
  ]);

  combined.on("error", handleError);
});
// images 的处理
gulp.task("images", () => {
  return gulp.src(`${src}/images/**`).pipe(gulp.dest(`${dist}/images`));
});
// 接下来就是遇到的问题, 关于js 和云函数的构建
gulp.task("js", async () => {
  const f = filter(file => !/(mock)/.test(file.path));
  await gulp
    .src(`${src}/**/*.js`)
    .pipe(isProd ? f : through.obj())
    .pipe(
      isProd
        ? jdists({
            trigger: "prod"
          })
        : jdists({
            trigger: "dev"
          })
    )
    .pipe(isProd ? through.obj() : sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/preset-env"]
      })
    )
    .pipe(
      isProd
        ? uglify({
            compress: true
          })
        : through.obj()
    )
    .pipe(isProd ? through.obj() : sourcemaps.write("./"))
    .pipe(gulp.dest(dist));
});
// 最终运行的gulp
// gulp.task("default", ["wxml"]);
gulp.task("watch", () => {
  ["wxml", "wxss", "js", "json", "wxs"].forEach(v => {
    gulp.watch(`${src}/**/*.${v}`, [v]);
  });
  gulp.watch(`${src}/images/**`, ["images"]);
  gulp.watch(`${src}/**/*.scss`, ["wxss"]);
});
gulp.task("clean", () => {
  return del(["./dist/**"]);
});
// 清理完dist目录再执行 [glup 3 的写法]
// gulp.task("dev", ["clean"], () => {
//   // 按顺序逐个同步地运行 Gulp 任务
//   runSequence("json", "images", "wxml", "wxss", "js", "wxs", "cloud", "watch");
// });

// gulp.task("build", ["clean"], () => {
//   runSequence("json", "images", "wxml", "wxss", "js", "wxs", "cloud");
// });
// 清理完dist目录再执行 [glup 4 的写法]
// 报错:[17:16:16] The following tasks did not complete: dev, <anonymous>
// [17:16:16] Did you forget to signal async completion?
gulp.task(
  "dev",
  gulp.series(
    "clean",
    gulp.parallel("json", "images", "wxml", "wxss", "js", "wxs"),
    // 解决上面报错
    done => {
      done();
    }
  )
);
// 按顺序逐个同步地运行 Gulp 任务
// runSequence();
gulp.task(
  "build",
  gulp.series(
    "clean",
    gulp.parallel("json", "images", "wxml", "wxss", "js", "wxs"),
    // 解决上面报错
    done => {
      done();
    }
  )
);
// gulp.task("build", ["clean"], () => {
//   runSequence("json", "images", "wxml", "wxss", "js", "wxs", "cloud");
// });
