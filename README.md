# gulp-project

## 运行项目

> npm install

> npm run start


## 工作方式

基于 gulp 配置了监听文件自动更新浏览器

样式的修改在 src/scss 目录，保存后会自动编译成 css 并替换 src/css 目录下的 style.css

如需其他配置请修改 gulpfile.js


## 打包构建

> npm run build


* css 添加浏览器前缀，js 使用 babel 将 es6 语法编译成 es5;
* 压缩合并 css、js 并生成 sourcemaps，hash文件名，然后替换html中的资源路径;
* 压缩图片，拷贝字体文件;
