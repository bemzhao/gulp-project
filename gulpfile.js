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
    .pipe(htmlmin({ 
    	collapseWhitespace: true,
    	removeEmptyAttributes: true,
    	removeScriptTypeAttributes: true,
    	removeStyleLinkTypeAttributes: true,
    	minifyCSS: true,
    	minifyJS: true 
    }))
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

// 运行Web服务器
function server () {
  connect.server({
    root: 'src',
    port: 8080,
    livereload: true
  });
}

// 监听文件
function watchFiles () {
  watch('src/scss/**/*.scss', watchScss);
  watch('src/css/**/*.css', watchCss);
  watch('src/js/*.js', watchJs);
  watch('src/*.html', watchHtml);
}

function watchScss () {
  return src('src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) 
    .pipe(dest('src/css'))
    .pipe(connect.reload());
}

function watchCss () {
  return src('src/css/**/*.css')
    .pipe(connect.reload());
}

function watchJs () {
  return src('src/js/*.js')
    .pipe(connect.reload());
}
function watchHtml () {
  return src('src/*.html')
    .pipe(connect.reload());
}


exports.start = parallel(server, watchFiles);

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