# Angular

## Tips

## Tricks

* 如果想要实现默认的嵌套多级路由,并且希望将路由定义在别的地方,似乎只能使用 loadModule 来实现
* 内容映射可以使用 `ng-content` 实现
  * 例如 `<ng-content select="header"></ng-content>`
* [angular-cli.json](https://github.com/angular/angular-cli/wiki/angular-cli)
* [ngrx/store](https://github.com/ngrx/store)

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

## FAQ

### Mac 打包后非常大
[electron/electron#2003](https://github.com/electron/electron/issues/2003)

```
osx       - 117.3 mb
linux32   -  60.3 mb
linux64   -  55.2 mb
win ia32  -  47.8 mb
win x64   -  66.2 mb
```

### AoT 在遇到 Sass 出现找不到资源的情况
https://github.com/angular/angular/issues/11897

* AoT 不能与 SASS 同时使用
* 不支持 CSS + 字体应用
* 可以考虑在外部引入

### AoT 无法处理 Router 的 loadChildren

需要使用 AppModuleNgFactory, 使用 AoT 编译出来
