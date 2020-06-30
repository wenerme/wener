# Webpack

## Tips
* [webpack](https://webpack.js.org/)
  * webpack is a module bundler for modern JavaScript applications
* [#7526](https://github.com/webpack/webpack/issues/7526) - Import a Prebuilt Webpack Bundle at Runtime
* https://webpack.js.org/comparison/
*  243B + 20B per module + 4B per dependency
* https://engineering.velocityapp.com/webpack-vs-browersify-vs-systemjs-for-spas-95b349a41fa0

## Configuration
* [configuration](https://webpack.js.org/configuration/)


## Concepts
* [Concepts](https://webpack.js.org/concepts/)
* Entry
  * 入口
  * 应用的第一个文件
```js
module.exports = {
  entry: './src/main.js'
}
```
* Output
  * 输出
* Loaders
  * 将文件转换为模块作为依赖添加到依赖图中
  * 标识哪些文件应该处理, `test`
  * 将那些文件做转换, `use`
```js
module.exports = {
  module: [ rulles: [ {test: /\.txt$/, use: 'raw-loader'} ] ]
}
```
* Plugins
  * 在编译和分块(chunk)时,实现自定义功能
```js
module.exports = {
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
}
```
