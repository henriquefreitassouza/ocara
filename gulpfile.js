let gulp = require('gulp');
let sass = require('gulp-sass')(require('sass'));
let uglify = require('gulp-uglify');
let nanocss = require('gulp-cssnano');
let concat = require('gulp-concat');
let rename = require('gulp-rename');
let purgecss = require('gulp-purgecss');
let webpack = require('webpack-stream');

const directories = {
  sass: 'node_modules/bootstrap/scss/',
  src: 'src/',
  dist: 'dist/',
  node_modules: 'node_modules/'
};

function build_skeleton(cb) {
  gulp.src([
    directories.src + '**/*',
    "!" + directories.src + '**/scss/**',
    "!" + directories.src + '**/*.js'
  ])
  .pipe(gulp.dest(directories.dist));
  cb();
}

function compile_vendor_css(cb) {
  gulp.src([
    directories.node_modules + 'bootstrap-icons/font/fonts/*',
    directories.src + 'assets/scss/fonts/*'
  ])
  .pipe(gulp.dest(directories.dist + 'assets/css/fonts'));
  cb();
}

function compile_scss(cb) {
  gulp.src([
    directories.src + 'assets/scss/**/*.scss'
  ])
  .pipe(sass())
  // .pipe(purgecss({
  //   content: [directories.src + '**/*.html']
  // }))
  .pipe(nanocss())
  .pipe(gulp.dest(directories.dist + 'assets/css'));
  cb();
}

function compile_vendor_js(cb) {
  gulp.src([
    directories.node_modules + '@popperjs/core/dist/umd/popper.js',
    directories.node_modules + 'bootstrap/js/dist/base-component.js',
    directories.node_modules + 'bootstrap/js/dist/collapse.js',
    directories.node_modules + 'bootstrap/js/dist/tab.js',
    directories.node_modules + 'bootstrap/js/dist/dropdown.js'
  ])
  .pipe(webpack({mode:'production'}))
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest(directories.dist + 'assets/js'));

  cb();
}

function compile_js(cb) {
  gulp.src([
    directories.src + 'assets/js/**/*.js'
  ])
  .pipe(uglify())
  // .pipe(concat('app.js'))
  .pipe(gulp.dest(directories.dist + 'assets/js'));
  cb();
}

exports.compile_js = gulp.series(compile_vendor_js, compile_js);
exports.compile_css = gulp.series(compile_vendor_css, compile_scss);
exports.build_skeleton = gulp.series(build_skeleton);
exports.default = function(cb) {
  gulp.series(build_skeleton, compile_vendor_css, compile_scss, compile_vendor_js, compile_js);
  gulp.watch([directories.src + '**/*'], gulp.series(build_skeleton, compile_scss, compile_vendor_js, compile_js));
  cb();
}
