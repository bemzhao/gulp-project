const { src, dest, series } = require('gulp');
const clean = require('gulp-clean');
      htmlmin = require('gulp-htmlmin');
      cleanCss = require('gulp-clean-css');
      sourcemaps = require('gulp-sourcemaps');
      autoprefixer = require('gulp-autoprefixer');
      concat = require('gulp-concat');
      uglify = require('gulp-uglify');
      rev = require('gulp-rev');
      revReplace = require("gulp-rev-replace");
      imagemin = require('gulp-imagemin');
      babel = require('gulp-babel');


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
    // .pipe(concat('index.min.css'))
    .pipe(rev())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('dist/css'))
    .pipe(rev.manifest())
		.pipe(dest('dist/rev/css'));
}

// 压缩合并 js  生成 sourcemaps 和 hash 
function minifyJs () {
	return src('src/js/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
		.pipe(sourcemaps.init())
		.pipe(uglify())
		// .pipe(concat('index.min.js'))
		.pipe(rev())
		.pipe(sourcemaps.write('.'))
		.pipe(dest('dist/js'))
		.pipe(rev.manifest())
		.pipe(dest('dist/rev/js'));
}

function minifyImg() {
	return src(['src/images/*', 'src/images/**/*'])
		.pipe(imagemin({
			progressive: true
		}))
		.pipe(dest('dist/images'))
}

// 压缩 html 生成 hash 
function minifyHtml () {
	return src('src/*.html')
    .pipe(htmlmin({ 
    	collapseWhitespace: true,
    	removeEmptyAttributes: true,
    	removeScriptTypeAttributes: true,
    	removeStyleLinkTypeAttributes: true,
    	minifyCSS: true,
    	minifyJS: true 
    }))
    .pipe(rev())
    .pipe(dest('dist'));
}

// 根据 hash 替换 html 中的文件
function revreplace () {
	var manifest = src('dist/rev/**/rev-manifest.json');
	return src('src/*.html')
    .pipe(revReplace({manifest: manifest}))
    .pipe(dest('dist'));
}

exports.build = series(cleanFiles, minifyCss, minifyJs, minifyImg, revreplace);
exports.default = minifyJs;