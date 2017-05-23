# Angular

## Tips

## Tricks

* 如果想要实现默认的嵌套多级路由,并且希望将路由定义在别的地方,似乎只能使用 loadModule 来实现
* 内容映射可以使用 `ng-content` 实现
  * 例如 `<ng-content select="header"></ng-content>`
* [angular-cli.json](https://github.com/angular/angular-cli/wiki/angular-cli)
* [ngrx/store](https://github.com/ngrx/store)
* [Angular Weekly Meeting Notes](http://g.co/ng/weekly-notes)
* [Angular Universal Design](https://docs.google.com/document/d/1eGEq0N7czS8nWWuCV3n4eMF3GFzk88rsN0bll6yE0bE/edit?usp=sharing)


```js
// 处理 window 的事件
// window 还可以为
// document, window, body
// https://github.com/angular/angular/blob/3412aba46e387b234d72e9194e2308f1d71a62df/modules/angular2/src/platform/server/parse5_adapter.ts#L533
@HostListener('window:resize', ['$event'])
onResize(event) {
  event.target.innerWidth;
}

// 绑定 host 上的 class
@HostBinding('class.someClass') someField: boolean = false;
```

```bash
# 全局安装 ng
yarn global add @angular/cli
# 如果全局路径不在 PATH 中可以添加以下命令输出的路径
yarn global bin
# 或者直接运行
$(yarn global bin)/ng

# 修改现有项目的样式类型
ng set defaults.styleExt scss
# 如果出现无法处理 css 的异常, 则修改 angular-cli.json 中的 "styles":["styles.css"] 为 "styles":["styles.scss"]

# 生成项目时使用 scss
ng new project --style=scss

# 查看压缩情况
source-map-explorer dist/main.bundle.js

```

## SSR
* [Server Side Rendering With Angular4](https://www.softwarearchitekt.at/post/2017/03/07/server-side-rendering-with-angular-4.aspx)

```
```

## FAQ

### 如何在 ios 开发调试
* 建议使用 [safari](https://developer.apple.com/safari/tools/) 进行开发
* Safari 的技术预览版也都可以模拟设备和开启控制台
* ios 上默认为 Safari 浏览器内核, 因此在浏览器中调试和在真机调试没太大区别


### date pipe 在 ios/Safari 下无法正常工作
* https://github.com/angular/angular/issues/7008
* 由于 Safari 对时间格式的要求比较严格, 例如 '2017-1-1' 这样的格式在 Safari 下是无法正常处理的
* 最好的解决办法是基于 [momentjs](https://momentjs.com/) 实现一个自己的 date pipe
* 或者在传入到 date pipe 前确保 date 是正确的格式

### AoT 无法 Watch
https://github.com/angular/angular/issues/12867

只能是在最终发布构建时使用 aot.

### AoT 在遇到 Sass 出现找不到资源的情况
https://github.com/angular/angular/issues/11897

* AoT 不能与 SASS 同时使用
* 不支持 CSS + 字体应用
* 可以考虑在外部引入

### AoT 无法处理 Router 的 loadChildren

需要使用 AppModuleNgFactory, 使用 AoT 编译出来
