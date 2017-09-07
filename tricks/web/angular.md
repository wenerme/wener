# Angular

## Tips
* 如果想要实现默认的嵌套多级路由,并且希望将路由定义在别的地方,似乎只能使用 loadModule 来实现
* 内容映射可以使用 `ng-content` 实现
  * 例如 `<ng-content select="header"></ng-content>`
* [angular-cli.json](https://github.com/angular/angular-cli/wiki/angular-cli)
* [ngrx/store](https://github.com/ngrx/store)
* [Angular Weekly Meeting Notes](http://g.co/ng/weekly-notes)
* [Angular Universal Design](https://docs.google.com/document/d/1eGEq0N7czS8nWWuCV3n4eMF3GFzk88rsN0bll6yE0bE/edit?usp=sharing)
* [Augury](https://github.com/rangle/augury)
  * Angular Debugging and Visualization Tools
* 相关资源
  * Angular [resources](https://angular.io/resources/)
* CDK
  * [What is `cdk` in Angular Material 2 components](https://stackoverflow.com/q/42340649/1870054)
  * component dev kit
  * [A first look into the Angular CDK](https://medium.com/@caroso1222/a-first-look-into-the-angular-cdk-67e68807ed9b)
  * [Angular Pro Tip: How to dynamically create components in <body>](https://medium.com/@caroso1222/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6)
  * 提供接口供 `Portal` 和 `PortalHost` 动态实例化
  * `Portal`
    * 注入到其他地方的部分 UI 组件, `Component`, `TemplateRef`
  * `PortalHost`
    * 渲染 `Portal` 的地方
    * `DOMPortalHost`
* NOTES:
  * 目前没有比较好的退出登录 ICON, power_settings_new 算是最接近的了
    * [#71](https://github.com/google/material-design-icons/issues/71)

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
# 或者 npm i -g @angular/cli
yarn global add @angular/cli
# 如果全局路径不在 PATH 中可以添加以下命令输出的路径
yarn global bin
# 或者直接运行
$(yarn global bin)/ng

# 修改现有项目的样式类型
ng set defaults.styleExt scss
# 如果出现无法处理 css 的异常, 则修改 angular-cli.json 中的 "styles":["styles.css"] 为 "styles":["styles.scss"]

# 生成项目时使用 scss
ng new my-roject --style=scss

# 查看压缩情况
source-map-explorer dist/main.bundle.js

```

## SSR
* [Server Side Rendering With Angular4](https://www.softwarearchitekt.at/post/2017/03/07/server-side-rendering-with-angular-4.aspx)

## UI 组件
* [angular/flex-layout](https://github.com/angular/flex-layout/)
  * `yarn add @angular/flex-layout`
  * [API Documentation](https://github.com/angular/flex-layout/wiki/API-Documentation)
* [Onsen UI for Angular 2+](https://onsen.io/angular2/)
  * Create beautiful high-quality hybrid mobile apps the fastest way 
with Angular 2+ or AngularJS 1 and Onsen UI Framework.
* [Teradata/covalent](https://github.com/Teradata/covalent)
  * Covalent: UI Platform based on Angular-Material
* [PrimeNG](https://www.primefaces.org/primeng)
  * The Most Complete User Interface Suite for Angular
  * [primefaces/primeng](https://github.com/primefaces/primeng)
* [vmware/clarity](https://github.com/vmware/clarity/)
  * UX guidelines, HTML/CSS framework, and Angular components working together to craft exceptional experiences
  * [clarity.design](http://clarity.design)
* [swimlane](https://github.com/swimlane)
  * ngx-charts
  * ngx-datatable
  * ngx-dad

### Material
* Angular [Material](https://material.angular.io)
* 注意官方的字体是使用的谷歌在线字体, 建议下载下来本地托管
  * `<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`
  * 下载 https://github.com/google/material-design-icons/tree/master/iconfont
  * 设计规范 http://google.github.io/material-design-icons/
  * 在线搜索 https://material.io/icons/
  * 也可以安装 `material-design-icons` 来使用
    * 该模块非常大 (~60M), 因为会下载整个仓库
  * `<i class="material-icons">face</i>`
* 当分模块时, 可能每个模块都要导不同的 md 组件, 官方建议用一个自己的 Md 模块, 导入需要的, 然后导入该模块即可

* 不支持 Native
  * [#3386](https://github.com/angular/material2/issues/3386)
* Data Table
  * [#581 md-data-table](https://github.com/angular/material2/issues/581)
  * [#5885 sticky headers](https://github.com/angular/material2/issues/5885)

```bash
yarn add @angular/material @angular/cdk
yarn add @angular/animations
yarn add hammerjs
```

### Covalent
* [Teradata/covalent](https://github.com/Teradata/covalent)
  * Covalent: UI Platform based on Angular-Material
* 基于 Angular/Material


```bash
yarn add @covalent/core
## (optional) Additional Covalent Modules installs
yarn add @covalent/http @covalent/highlight @covalent/markdown @covalent/dynamic-forms 
```

## 开发规范
* [Style Guide](https://angular.io/guide/styleguide)
  * 官方规范手册
* [Architecture Overview](https://angular.io/guide/architecture)
  * 架构概览


* 标准目录结构
  * `/e2e`
    * 测试相关
  * `/src`
    * `/app`
      * 应用代码主目录
      * `/shared`
        * 全局公共组件
      * `/pages`
        * 全局公共页面
      * `/<模块>`
        * 自定义模块
        * `/shared`
          * 自定义模块下的共享组件
        * `/<组件>`
          * 自定义模块下的组件
    * `/assets`
      * 资源
        * 例如图片
    * `/environments`
      * 环境配置
      * 生产,开发,测试
    * `main.ts`
      * 入口
    * `polyfills.ts`
      * 添加 Polyfills 的地方
    * `styles.scss`
      * 全局样式, 添加主题的地方


* 组件命名
  * 页面建议使用 `page-` 的前缀

## NOTES

* 主要注解
  * `@ContentChild`
  * `@ContentChildren`
  * `@HostBinding`
  * `@HostListener`
  * `@Input`
  * `@Output`
  * `@ViewChild`
  * `@ViewChildren`
  * `@Component`
  * `@Directive`
  * `@Pipe`
* `Component`, `Directive` 和 `Pipe` 注解不支持继承
* AOT 后, 组件的元数据是不存在的

### 代码分析

### 组件通讯
* [Component Interaction](https://angular.io/guide/component-interaction)

1. `@Input` 属性绑定
2. `@Output` 对外事件触发, 多为 EventEmitter
3. `@Input` + `@Output` 可以组成双向绑定
4. `@ViewChild` 可以将引用到的组件直接注入, 可以直接操作组件方法
5. 基于 Service 进行通讯

### 路由

* 路由的内容会在 `<router-outlet>` 标签中显示
* 路由可以做多级


## CHANGELOG
* [CHANGELOG](https://github.com/angular/angular/blob/master/CHANGELOG.md)

### 5.0.x
* switch angular to use StaticInjector instead of ReflectiveInjector

### 4.3.x
* 增加了 HttpClient [](https://github.com/angular/angular/blob/master/CHANGELOG.md#430-2017-07-14)
  * 位于新的包 `@angular/common/http`, 旧的代码可逐步迁移
  * 特性
    * Typed, synchronous response body access, including support for JSON body types
    * JSON is an assumed default and no longer needs to be explicitly parsed
    * Interceptors allow middleware logic to be inserted into the pipeline
    * Immutable request/response objects
    * Progress events for both request upload and response download
    * Post-request verification & flush based testing framework


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

### /deep/ 被废弃
* https://www.chromestatus.com/features/4964279606312960
* 在后面版本会不产生任何操作
* 使用 `>>>`

### scss 全局变量
