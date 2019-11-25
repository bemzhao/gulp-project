const { src, dest, series, parallel } = require('gulp');
const clean = require('gulp-clean');
const htmlmin = require('gulp-htmlmin');
const cleanCss = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rev = require('gulp-rev');
const revReplace = require("gulp-rev-replace");
const imagemin = require('gulp-imagemin');
const babel = require('gulp-babel');
const useref = require('gulp-useref');


// 清空 dist
function cleanFiles () {
	return src('dist', {read: false, allowEmpty: true})
		.pipe(clean());
}

// 压缩合并 css  生成 sourcemaps 和 hash 
function minifyCss() {
	return src('src/css/*.css')
		// .pipe(sourcemaps.init())
		.pipe(autoprefixer())
    .pipe(cleanCss())
    // .pipe(concat('index.min.css'))
    .pipe(rev())
    // .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css'))
    .pipe(rev.manifest())
		.pipe(dest('dist/rev/css'));
}

// 压缩合并 js  生成 sourcemaps 和 hash 
function minifyJs () {
	return src('src/js/*.js')
    .pipe(babel())
		// .pipe(sourcemaps.init())
		.pipe(uglify())
		// .pipe(concat('index.min.js'))
		.pipe(rev())
		// .pipe(sourcemaps.write('.'))
		.pipe(dest('dist/js'))
		.pipe(rev.manifest())
		.pipe(dest('dist/rev/js'));
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

// 拷贝字体
function copyImgs () {
  return src(['src/images/*', 'src/images/**/*'])
    .pipe(dest('dist/images'))
}


// 根据 hash 替换 html 中的文件
function revreplace () {
	var manifest = src('dist/rev/**/rev-manifest.json');
	return src('src/*.html')
    .pipe(revReplace({manifest: manifest}))
    .pipe(rev())
    .pipe(dest('dist'));
}

exports.build = series(
  cleanFiles, 
  parallel(
    minifyCss, 
    minifyJs, 
    copyFonts, 
    copyImgs
  ), 
  minifyHtml
  // revreplace
);

exports.default = minifyHtml;