var { src, dest, series, parallel } = require('gulp');
var clean = require('gulp-clean');
var htmlmin = require('gulp-htmlmin');
var cleanCss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var revReplace = require("gulp-rev-replace");
var imagemin = require('gulp-imagemin');
var babel = require('gulp-babel');
var useref = require('gulp-useref');


// 清空 dist
function cleanFiles () {
	return src('dist', {read: false, allowEmpty: true})
		.pipe(clean());
}

// 压缩合并 css  生成 sourcemaps 和 hash 
function minifyCss() {
	return src('src/css/*.css')
		.pipe(sourcemaps.init())
		.pipe(autoprefixer())
    .pipe(cleanCss())
    .pipe(sourcemaps.write('.'))
}

// 压缩合并 js  生成 sourcemaps 和 hash 
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
	return src(['src/images/*', 'src/images/**/*'])
		.pipe(imagemin({
			progressive: true
		}))
		.pipe(dest('dist/images'))
}

// 压缩 html 生成 hash 
function minifyHtml () {
  var manifest = src('dist/rev/**/rev-manifest.json');
	return src('src/*.html')
    // .pipe(htmlmin({ 
    // 	collapseWhitespace: true,
    // 	removeEmptyAttributes: true,
    // 	removeScriptTypeAttributes: true,
    // 	removeStyleLinkTypeAttributes: true,
    // 	minifyCSS: true,
    // 	minifyJS: true 
    // }))
    .pipe(useref())
    .pipe(rev())
    .pipe(revReplace({manifest: manifest}))
    .pipe(dest('dist'));
}

// 拷贝字体
function copyFonts () {
  return src('src/fonts/*')
    .pipe(dest('dist/fonts'))
}

// 拷贝图片
function copyImgs () {
  return src(['src/images/*', 'src/images/**/*'])
    .pipe(dest('dist/images'))
}


// 根据 hash 替换 html 中的文件
function revreplace () {
	var manifest = src('dist/rev/**/rev-manifest.json');
	return src('src/*.html')
    .pipe(revReplace({manifest: manifest}))
    // .pipe(rev())
    // .pipe(dest('dist'));
}

exports.build = series(
  cleanFiles, 
  minifyHtml,
  parallel(
    minifyCss,
    minifyJs,
    copyFonts, 
    copyImgs
  )
);

exports.default = minifyHtml;