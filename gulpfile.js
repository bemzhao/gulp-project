var { src, dest, series, parallel } = require('gulp');
var clean = require('gulp-clean');
var htmlmin = require('gulp-htmlmin');
var cleanCss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var revReplace = require("gulp-rev-replace");
var imagemin = require('gulp-imagemin');
var babel = require('gulp-babel');
var useref = require('gulp-useref');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');

// 清空 dist
function cleanFiles () {
	return src('dist', {read: false, allowEmpty: true})
		.pipe(clean());
}

// 处理生成的 css
function minifyCss() {
	return src('dist/css/*.css')
		.pipe(sourcemaps.init())
		.pipe(autoprefixer())
    .pipe(cleanCss())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css'))
}

// 处理生成的 js
function minifyJs () {
	return src('dist/js/*.js')
    .pipe(babel())
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write("."))
		.pipe(dest('dist/js'))
}

// 压缩图片
function minifyImg() {
	return src('src/images/**')
		.pipe(imagemin({
			progressive: true
		}))
		.pipe(dest('dist/images'))
}

// 压缩 html
function minifyHtml () {
  return src('dist/*.html')
    .pipe(htmlmin({ 
      collapseWhitespace: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyCSS: true,
      minifyJS: true 
    }))
    .pipe(dest('dist'))
}

// 处理 html 中的资源
function replaceSrc () {
  var manifest = src('dist/rev/**/rev-manifest.json');
	return src('src/*.html')
    .pipe(useref())
    .pipe(rev())
    .pipe(revReplace({manifest: manifest}))
    .pipe(dest('dist'))
}

// 拷贝字体
function copyFonts () {
  return src('src/fonts/**')
    .pipe(dest('dist/fonts'))
}

// 运行 Web 服务器
function server () {
  connect.server({
    root: 'src',
    port: 8080,
    livereload: true
  })
}

// 监听文件
function watchFiles () {
  watch('src/scss/**/*.scss', watchScss);
  watch('src/css/**/*.css', watchCss);
  watch('src/js/**/*.js', watchJs);
  watch('src/images/**', watchImg);
  watch('src/*.html', watchHtml);
}

function watchScss () {
  return src('src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) 
    .pipe(dest('src/css'))
    .pipe(connect.reload())
}

function watchCss () {
  return src('src/css/**/*.css')
    .pipe(connect.reload())
}

function watchJs () {
  return src('src/js/**/*.js')
    .pipe(connect.reload())
}

function watchImg () {
  return src('src/images/**')
    .pipe(connect.reload())
}

function watchHtml () {
  return src('src/*.html')
    .pipe(connect.reload())
}


exports.start = parallel(
  server,
  watchFiles
);

exports.build = series(
  cleanFiles,
  replaceSrc,
  parallel(
    minifyCss,
    minifyJs,
    minifyHtml,
    copyFonts, 
    minifyImg
  )
);