---
id: angular
title: Angular
---

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

# 在当前目录,生成路由,添加 ServiceWorker
ng new --routing -sw --style scss -dir . proj

ng add @angular/pwa
ng add @angular/material
ng add @angular/elements

ng generate @angular/material:material-nav --name=my-nav
ng generate @angular/material:material-dashboard --name=my-dashboard
ng generate @angular/material:material-table --name=my-table


# 查看压缩情况
source-map-explorer dist/main.bundle.js
```

## Notes
* ng-container
  * [ngTemplateOutlet](https://angular.io/api/common/NgTemplateOutlet)
    * `*ngTemplateOutlet="customTemplate ? customTemplate: defaultTemplate"`
  * 模板容器
* ng-template
  * 模板定义
  * 可以被引用
  * 默认不会显示, 可以由结构指令控制
  * 代码引用
```ts
@ViewChild('defaultTabButtons')
defaultTabButtonsTpl: TemplateRef<any>;
```

* [Angular ng-template, ng-container and ngTemplateOutlet - The Complete Guide To Angular Templates](https://blog.angular-university.io/angular-ng-template-ng-container-ngtemplateoutlet/)

```
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
* https://github.com/valor-software/ng2-tree
* https://github.com/akserg/ng2-dnd
  * 更好用

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
* 已知问题
  * 不支持滚动事件
    * [#13048](https://github.com/angular/angular/issues/13048)
  * 不支持 Native
    * [#3386](https://github.com/angular/material2/issues/3386)
  * Data Table
    * [#581 md-data-table](https://github.com/angular/material2/issues/581)
    * [#5885 sticky headers](https://github.com/angular/material2/issues/5885)
* _elevation
  * [_elevation.scss](https://github.com/angular/material2/blob/5.1.x/src/lib/core/style/_elevation.scss)
  * [Adding Box Shadow (md-elevation/z-depth) to Angular Material 2 Components](https://medium.com/@ladyleet/adding-box-shadow-z-depth-to-angular-material-2-components-6bd0de303dcb)


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

## GraphQL

* [Setup and options](https://www.apollographql.com/docs/angular/basics/setup.html)

```bash
yarn add apollo-angular

yarn add apollo-angular apollo-angular-link-http apollo-client apollo-cache-inmemory graphql-tag graphql
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
* [Angular Release Schedule](https://github.com/angular/angular/blob/master/docs/RELEASE_SCHEDULE.md)

### Next
* https://update.angular.io/
* Project Ivy: a faster and smaller renderer
  * 未能在 6.0 发布
  * [Ivy@ng-conf](https://youtu.be/dIxknqPOWms?t=1360)

### 6.0
* Node 8+
* [angular.json](https://github.com/angular/angular-cli/wiki/angular-workspace)
  * Angular CLI workspace file (angular.json) schema
  * 移除了以前的 `.angular-cli.json`
  * 一个项目下包含多个应用
  * generate
    * serviceWorker
    * universal
    * appShell
    * library - 库
* [elements](https://angular.io/guide/elements)
  * [Angular Elements Quick Start](https://youtu.be/4u9_kdkvTsc)
  * `ng add @angular/elements`
  * WebComponent
  * 基于自定义元素
* pwa
  * `ng add @angular/pwa`
* 参考
  * [Version 6 of Angular Now Available](https://blog.angular.io/cc56b0efa7a4)
  * [Angular 6: Upgrading & Summary of New Features](https://alligator.io/angular/angular-6/)

#### update

```bash
yarn global add @angular/cli
yarn add @angular/cli

# 依赖升级
# 如果出现升级失败的, 可以考虑手动更改
ng update @angular/cli


ng update @angular/core --force
ng update @angular/material --force

# 升级其他依赖
ng update @angular/flex-layout

# 如果出现 rxjs 兼容问题
yarn add rxjs-compat
yarn global add rxjs-tslint
rxjs-5-to-6-migrate -p src/tsconfig.app.json
```

### 5.2
* 路由
  * paramsInheritanceStrategy
    * always: it makes child routes unconditionally inherit params from parent routes;
    * emptyOnly: the default, it only inherits parent params for path-less or component-less routes (the former behavior).
* 编译器
  * $any()
    * 类似于 ts 的 as any
    * 在模板中使用, 避免类型检测
    * 主要在开启了 fullTemplateTypeCheck 的特殊时候使用

### 5.0
* 较大的变动
  * https://github.com/angular/angular/blob/master/CHANGELOG.md#500-beta5-2017-08-29
  * https://github.com/angular/angular/blob/master/CHANGELOG.md#500-rc0-2017-09-28
* 动画
  * 支持 `:increment` 和 `:decrement` 转换别名
* 升级
  * 传播 `NgModelController` 的 touched 状态
  * 支持懒加载 Angular 模块到 AngularJS 中
* 编译器
  * add representation of placeholders to xliff & xmb ([b3085e9](https://github.com/angular/angular/commit/b3085e9))
  * fullTemplateTypeCheck
    * 模板强类型检测
  * preserveWhitespaces
    * 移除模板中的空白
* 表单
  * add options arg to abstract controls
    * FormControls, FormGroups, FormArrays 添加第二个可选参数
    * `new FormControl(, {validators: [Validators.required],asyncValidators: [myAsyncValidator]});`
    * `new FormGroup({one: new FormControl()}, [myPasswordValidator, myOtherValidator]);`
  * add default updateOn values for groups and arrays
  * add updateOn blur option to FormControls
  * add updateOn submit option to FormControls
  * add status to `AbstractControlDirective`
  * add updateOn support to ngModelOptions
* 路由
  * add events tracking activation of individual routes
  * add ActivationStart/End events
* 核心
  * Create StaticInjector which does not depend on Reflect polyfill
* 公共
  * mark NgTemplateOutlet API as stable

### 4.4
* compiler 允许多个 `exportAs` 名字
  * `Directive#exportAs`
  * `@Directive({selector: '[multiple-export-as]', exportAs: 'dirX, dirY'})`
* core 添加用于移除模板中空白文字节点的选项
  * `Component#preserveWhitespaces`
  * 可以使用 `&ngsp;` 来强制保留
  * `@Component({selector: 'comp',template: '<span>foo</span>  <span>bar</span>',preserveWhitespaces: false,)`



### 4.3
* 增加了 HttpClient [CHANGELOG#430-2017-07-14](https://github.com/angular/angular/blob/master/CHANGELOG.md#430-2017-07-14)
  * 位于新的包 `@angular/common/http`, 旧的代码可逐步迁移
  * 特性
    * Typed, synchronous response body access, including support for JSON body types
    * JSON is an assumed default and no longer needs to be explicitly parsed
    * Interceptors allow middleware logic to be inserted into the pipeline
    * Immutable request/response objects
    * Progress events for both request upload and response download
    * Post-request verification & flush based testing framework


## FAQ

### Multiple entry points / pages

* [angular/angular-cli#1804](https://github.com/angular/angular-cli/issues/1804) Multiple Entrypoints, Main Files
* [angular/angular-cli#6428](https://github.com/angular/angular-cli/issues/6428) Multiple entry points with ng serve
* [angular/angular#14745](https://github.com/angular/angular/issues/14745) Is there any way to use Angular2 in multi-page app instead SPA?
* ng6 后 .angular-cli.json 被 angular.json 替代

```bash
# ng serve = ng serve --app=0
ng serve --app=1
```

### 浏览器支持
* [Browser support](https://angular.io/guide/browser-support)

### 手动标识发生了变化
* 注入 `ChangeDetectorRef`
* 当发生了变化但 angular 未检测到的时候, 手动调用 `markForCheck`
  * 例如在别的地方做了事件监听影响绑定对象
  * 绑定对象使用的 getter/setter, 而不是属性

### ViewChild 为 null/undefined
* 需要在内容初始化后才不为 undefined
* 如果为 null, 检测是否有 ngIf

### 动画在 Safari 下无效
* 需要 web-animate
* `npm install --save web-animations-js`
* 然后在 `polyfills.ts` 添加 `import 'web-animations-js'`


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
* [#12867](https://github.com/angular/angular/issues/12867)
* ~只能是在最终发布构建时使用 aot~
* 现在可以了

### AoT 在遇到 Sass 出现找不到资源的情况
* [#11897](https://github.com/angular/angular/issues/11897)
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


### ng --help
```
ng build <options...>
  Builds your app and places it into the output path (dist/ by default).
  aliases: b
  --target (String) (Default: development) Defines the build target.
    aliases: -t <value>, -dev (--target=development), -prod (--target=production), --target <value>
  --environment (String) Defines the build environment.
    aliases: -e <value>, --environment <value>
  --output-path (Path) Path where output will be placed.
    aliases: -op <value>, --outputPath <value>
  --aot (Boolean) Build using Ahead of Time compilation.
    aliases: -aot
  --sourcemaps (Boolean) Output sourcemaps.
    aliases: -sm, --sourcemap, --sourcemaps
  --vendor-chunk (Boolean) Use a separate bundle containing only vendor libraries.
    aliases: -vc, --vendorChunk
  --common-chunk (Boolean) (Default: true) Use a separate bundle containing code used across multiple bundles.
    aliases: -cc, --commonChunk
  --base-href (String) Base url for the application being built.
    aliases: -bh <value>, --baseHref <value>
  --deploy-url (String) URL where files will be deployed.
    aliases: -d <value>, --deployUrl <value>
  --verbose (Boolean) (Default: false) Adds more details to output logging.
    aliases: -v, --verbose
  --progress (Boolean) (Default: false) Log progress to the console while building.
    aliases: -pr, --progress
  --i18n-file (String) Localization file to use for i18n.
    aliases: --i18nFile <value>
  --i18n-format (String) Format of the localization file specified with --i18n-file.
    aliases: --i18nFormat <value>
  --locale (String) Locale to use for i18n.
    aliases: --locale <value>
  --missing-translation (String) How to handle missing translations for i18n.
    aliases: --missingTranslation <value>
  --extract-css (Boolean) Extract css from global styles onto css files instead of js ones.
    aliases: -ec, --extractCss
  --watch (Boolean) (Default: false) Run build when files change.
    aliases: -w, --watch
  --output-hashing=none|all|media|bundles (String) Define the output filename cache-busting hashing mode.
    aliases: -oh <value>, --outputHashing <value>
  --poll (Number) Enable and define the file watching poll time period (milliseconds).
    aliases: -poll <value>
  --app (String) Specifies app name or index to use.
    aliases: -a <value>, -app <value>
  --delete-output-path (Boolean) (Default: true) Delete output path before build.
    aliases: -dop, --deleteOutputPath
  --preserve-symlinks (Boolean) (Default: false) Do not use the real path when resolving modules.
    aliases: --preserveSymlinks
  --extract-licenses (Boolean) (Default: true) Extract all licenses in a separate file, in the case of production builds only.
    aliases: --extractLicenses
  --show-circular-dependencies (Boolean) (Default: true) Show circular dependency warnings on builds.
    aliases: -scd, --showCircularDependencies
  --build-optimizer (Boolean) Enables @angular-devkit/build-optimizer optimizations when using `--aot`.
    aliases: --buildOptimizer
  --named-chunks (Boolean) Use file name for lazy loaded chunks.
    aliases: -nc, --namedChunks
  --subresource-integrity (Boolean) (Default: false) Enables the use of subresource integrity validation.
    aliases: -sri, --subresourceIntegrity
  --bundle-dependencies (none, all) (Default: none) Available on server platform only. Which external dependencies to bundle into the module. By default, all of node_modules will be kept as requires.
    aliases: --bundleDependencies <value>
  --service-worker (Boolean) (Default: true) Generates a service worker config for production builds, if the app has service worker enabled.
    aliases: -sw, --serviceWorker
  --skip-app-shell (Boolean) (Default: false) Flag to prevent building an app shell
    aliases: --skipAppShell
  --stats-json (Boolean) (Default: false) Generates a `stats.json` file which can be analyzed using tools such as: `webpack-bundle-analyzer` or https://webpack.github.io/analyse.
    aliases: --statsJson

ng completion <options...>
  Adds autocomplete functionality to `ng` commands and subcommands.
  --all (Boolean) (Default: true) Generate a completion script compatible with both bash and zsh.
    aliases: -a, -all
  --bash (Boolean) (Default: false) Generate a completion script for bash.
    aliases: -b, -bash
  --zsh (Boolean) (Default: false) Generate a completion script for zsh.
    aliases: -z, -zsh

ng doc <keyword> <options...>
  Opens the official Angular API documentation for a given keyword.
  --search (Boolean) (Default: false) Search whole angular.io instead of just api.
    aliases: -s, --search

ng e2e <options...>
  Run e2e tests in existing project.
  aliases: e
  --target (String) (Default: development) Defines the build target.
    aliases: -t <value>, -dev (--target=development), -prod (--target=production), --target <value>
  --environment (String) Defines the build environment.
    aliases: -e <value>, --environment <value>
  --output-path (Path) Path where output will be placed.
    aliases: -op <value>, --outputPath <value>
  --aot (Boolean) Build using Ahead of Time compilation.
    aliases: -aot
  --sourcemaps (Boolean) Output sourcemaps.
    aliases: -sm, --sourcemap, --sourcemaps
  --vendor-chunk (Boolean) Use a separate bundle containing only vendor libraries.
    aliases: -vc, --vendorChunk
  --common-chunk (Boolean) (Default: true) Use a separate bundle containing code used across multiple bundles.
    aliases: -cc, --commonChunk
  --base-href (String) Base url for the application being built.
    aliases: -bh <value>, --baseHref <value>
  --deploy-url (String) URL where files will be deployed.
    aliases: -d <value>, --deployUrl <value>
  --verbose (Boolean) (Default: false) Adds more details to output logging.
    aliases: -v, --verbose
  --progress (Boolean) (Default: false) Log progress to the console while building.
    aliases: -pr, --progress
  --i18n-file (String) Localization file to use for i18n.
    aliases: --i18nFile <value>
  --i18n-format (String) Format of the localization file specified with --i18n-file.
    aliases: --i18nFormat <value>
  --locale (String) Locale to use for i18n.
    aliases: --locale <value>
  --missing-translation (String) How to handle missing translations for i18n.
    aliases: --missingTranslation <value>
  --extract-css (Boolean) Extract css from global styles onto css files instead of js ones.
    aliases: -ec, --extractCss
  --watch (Boolean) (Default: false) Run build when files change.
    aliases: -w, --watch
  --output-hashing=none|all|media|bundles (String) Define the output filename cache-busting hashing mode.
    aliases: -oh <value>, --outputHashing <value>
  --poll (Number) Enable and define the file watching poll time period (milliseconds).
    aliases: -poll <value>
  --app (String) Specifies app name or index to use.
    aliases: -a <value>, -app <value>
  --delete-output-path (Boolean) (Default: true) Delete output path before build.
    aliases: -dop, --deleteOutputPath
  --preserve-symlinks (Boolean) (Default: false) Do not use the real path when resolving modules.
    aliases: --preserveSymlinks
  --extract-licenses (Boolean) (Default: true) Extract all licenses in a separate file, in the case of production builds only.
    aliases: --extractLicenses
  --show-circular-dependencies (Boolean) (Default: true) Show circular dependency warnings on builds.
    aliases: -scd, --showCircularDependencies
  --build-optimizer (Boolean) Enables @angular-devkit/build-optimizer optimizations when using `--aot`.
    aliases: --buildOptimizer
  --named-chunks (Boolean) Use file name for lazy loaded chunks.
    aliases: -nc, --namedChunks
  --subresource-integrity (Boolean) (Default: false) Enables the use of subresource integrity validation.
    aliases: -sri, --subresourceIntegrity
  --bundle-dependencies (none, all) (Default: none) Available on server platform only. Which external dependencies to bundle into the module. By default, all of node_modules will be kept as requires.
    aliases: --bundleDependencies <value>
  --service-worker (Boolean) (Default: true) Generates a service worker config for production builds, if the app has service worker enabled.
    aliases: -sw, --serviceWorker
  --skip-app-shell (Boolean) (Default: false) Flag to prevent building an app shell
    aliases: --skipAppShell
  --port (Number) (Default: 0) The port to use to serve the application.
    aliases: -p <value>, -port <value>
  --host (String) (Default: localhost) Listens only on localhost by default.
    aliases: -H <value>, -host <value>
  --proxy-config (Path) Proxy configuration file.
    aliases: -pc <value>, --proxyConfig <value>
  --ssl (Boolean) (Default: false) Serve using HTTPS.
    aliases: -ssl
  --ssl-key (String) (Default: ssl/server.key) SSL key to use for serving HTTPS.
    aliases: --sslKey <value>
  --ssl-cert (String) (Default: ssl/server.crt) SSL certificate to use for serving HTTPS.
    aliases: --sslCert <value>
  --open (Boolean) (Default: false) Opens the url in default browser.
    aliases: -o, -open
  --live-reload (Boolean) (Default: true) Whether to reload the page on change, using live-reload.
    aliases: -lr, --liveReload
  --public-host (String) Specify the URL that the browser client will use.
    aliases: --live-reload-client <value>, --publicHost <value>
  --disable-host-check (Boolean) (Default: false) Don't verify connected clients are part of allowed hosts.
    aliases: --disableHostCheck
  --serve-path (String) The pathname where the app will be served.
    aliases: --servePath <value>
  --hmr (Boolean) (Default: false) Enable hot module replacement.
    aliases: -hmr
  --config (String) Use a specific config file. Defaults to the protractor config file in angular-cli.json.
    aliases: -c <value>, --config <value>
  --specs (Array) (Default: ) Override specs in the protractor config. Can send in multiple specs by repeating flag (ng e2e --specs=spec1.ts --specs=spec2.ts).
    aliases: -sp <value>, --specs <value>
  --element-explorer (Boolean) (Default: false) Start Protractor's Element Explorer for debugging.
    aliases: -ee, --elementExplorer
  --webdriver-update (Boolean) (Default: true) Try to update webdriver.
    aliases: -wu, --webdriverUpdate
  --serve (Boolean) (Default: true) Compile and Serve the app. All non-reload related serve options are also available (e.g. --port=4400).
    aliases: -s, --serve

ng eject <options...>
  Ejects your app and output the proper webpack configuration and scripts.
  --target (String) (Default: development) Defines the build target.
    aliases: -t <value>, -dev (--target=development), -prod (--target=production), --target <value>
  --environment (String) Defines the build environment.
    aliases: -e <value>, --environment <value>
  --output-path (Path) Path where output will be placed.
    aliases: -op <value>, --outputPath <value>
  --aot (Boolean) Build using Ahead of Time compilation.
    aliases: -aot
  --sourcemaps (Boolean) Output sourcemaps.
    aliases: -sm, --sourcemap, --sourcemaps
  --vendor-chunk (Boolean) Use a separate bundle containing only vendor libraries.
    aliases: -vc, --vendorChunk
  --common-chunk (Boolean) (Default: true) Use a separate bundle containing code used across multiple bundles.
    aliases: -cc, --commonChunk
  --base-href (String) Base url for the application being built.
    aliases: -bh <value>, --baseHref <value>
  --deploy-url (String) URL where files will be deployed.
    aliases: -d <value>, --deployUrl <value>
  --verbose (Boolean) (Default: false) Adds more details to output logging.
    aliases: -v, --verbose
  --progress (Boolean) (Default: false) Log progress to the console while building.
    aliases: -pr, --progress
  --i18n-file (String) Localization file to use for i18n.
    aliases: --i18nFile <value>
  --i18n-format (String) Format of the localization file specified with --i18n-file.
    aliases: --i18nFormat <value>
  --locale (String) Locale to use for i18n.
    aliases: --locale <value>
  --missing-translation (String) How to handle missing translations for i18n.
    aliases: --missingTranslation <value>
  --extract-css (Boolean) Extract css from global styles onto css files instead of js ones.
    aliases: -ec, --extractCss
  --watch (Boolean) (Default: false) Run build when files change.
    aliases: -w, --watch
  --output-hashing=none|all|media|bundles (String) Define the output filename cache-busting hashing mode.
    aliases: -oh <value>, --outputHashing <value>
  --poll (Number) Enable and define the file watching poll time period (milliseconds).
    aliases: -poll <value>
  --delete-output-path (Boolean) (Default: true) Delete output path before build.
    aliases: -dop, --deleteOutputPath
  --preserve-symlinks (Boolean) (Default: false) Do not use the real path when resolving modules.
    aliases: --preserveSymlinks
  --extract-licenses (Boolean) (Default: true) Extract all licenses in a separate file, in the case of production builds only.
    aliases: --extractLicenses
  --show-circular-dependencies (Boolean) (Default: true) Show circular dependency warnings on builds.
    aliases: -scd, --showCircularDependencies
  --build-optimizer (Boolean) Enables @angular-devkit/build-optimizer optimizations when using `--aot`.
    aliases: --buildOptimizer
  --named-chunks (Boolean) Use file name for lazy loaded chunks.
    aliases: -nc, --namedChunks
  --subresource-integrity (Boolean) (Default: false) Enables the use of subresource integrity validation.
    aliases: -sri, --subresourceIntegrity
  --bundle-dependencies (none, all) (Default: none) Available on server platform only. Which external dependencies to bundle into the module. By default, all of node_modules will be kept as requires.
    aliases: --bundleDependencies <value>
  --service-worker (Boolean) (Default: true) Generates a service worker config for production builds, if the app has service worker enabled.
    aliases: -sw, --serviceWorker
  --skip-app-shell (Boolean) (Default: false) Flag to prevent building an app shell
    aliases: --skipAppShell
  --force (Boolean) Overwrite any webpack.config.js and npm scripts already existing.
    aliases: --force
  --app (String) Specifies app name to use.
    aliases: -a <value>, -app <value>

ng generate <schematic> <options...>
  Generates and/or modifies files based on a schematic.
  aliases: g
  --dry-run (Boolean) (Default: false) Run through without making any changes.
    aliases: -d, --dryRun
  --force (Boolean) (Default: false) Forces overwriting of files.
    aliases: -f, --force
  --app (String) Specifies app name to use.
    aliases: -a <value>, -app <value>
  --collection (String) Schematics collection to use.
    aliases: -c <value>, --collection <value>
  --lint-fix (Boolean) Use lint to fix files after generation.
    aliases: -lf, --lintFix

ng get <options...>
  Get a value from the configuration. Example: ng get [key]
  --global (Boolean) (Default: false) Get the value in the global configuration (in your home directory).
    aliases: --global

ng help <command-name (Default: all)> <options...>
  Shows help for the CLI.
  --short (Boolean) (Default: false) Display command name and description only.
    aliases: -s, --short

ng lint <options...>
  Lints code in existing project.
  aliases: l
  --fix (Boolean) (Default: false) Fixes linting errors (may overwrite linted files).
    aliases: -fix
  --type-check (Boolean) (Default: false) Controls the type check for linting.
    aliases: --typeCheck
  --force (Boolean) (Default: false) Succeeds even if there was linting errors.
    aliases: --force
  --format (String) (Default: prose) Output format (prose, json, stylish, verbose, pmd, msbuild, checkstyle, vso, fileslist).
    aliases: -t <value>, --format <value>

ng new <options...>
  Creates a new directory and a new Angular app eg. "ng new [name]".
  aliases: n
  --dry-run (Boolean) (Default: false) Run through without making any changes. Will list all files that would have been created when running "ng new".
    aliases: -d, --dryRun
  --verbose (Boolean) (Default: false) Adds more details to output logging.
    aliases: -v, --verbose
  --skip-install (Boolean) (Default: false) Skip installing packages.
    aliases: -si, --skipInstall
  --skip-commit (Boolean) (Default: false) Skip committing the first commit to git.
    aliases: -sc, --skipCommit
  --collection (String) Schematics collection to use.
    aliases: -c <value>, --collection <value>

ng serve <options...>
  Builds and serves your app, rebuilding on file changes.
  aliases: server, s
  --target (String) (Default: development) Defines the build target.
    aliases: -t <value>, -dev (--target=development), -prod (--target=production), --target <value>
  --environment (String) Defines the build environment.
    aliases: -e <value>, --environment <value>
  --output-path (Path) Path where output will be placed.
    aliases: -op <value>, --outputPath <value>
  --aot (Boolean) Build using Ahead of Time compilation.
    aliases: -aot
  --sourcemaps (Boolean) Output sourcemaps.
    aliases: -sm, --sourcemap, --sourcemaps
  --vendor-chunk (Boolean) Use a separate bundle containing only vendor libraries.
    aliases: -vc, --vendorChunk
  --common-chunk (Boolean) (Default: true) Use a separate bundle containing code used across multiple bundles.
    aliases: -cc, --commonChunk
  --base-href (String) Base url for the application being built.
    aliases: -bh <value>, --baseHref <value>
  --deploy-url (String) URL where files will be deployed.
    aliases: -d <value>, --deployUrl <value>
  --verbose (Boolean) (Default: false) Adds more details to output logging.
    aliases: -v, --verbose
  --progress (Boolean) (Default: false) Log progress to the console while building.
    aliases: -pr, --progress
  --i18n-file (String) Localization file to use for i18n.
    aliases: --i18nFile <value>
  --i18n-format (String) Format of the localization file specified with --i18n-file.
    aliases: --i18nFormat <value>
  --locale (String) Locale to use for i18n.
    aliases: --locale <value>
  --missing-translation (String) How to handle missing translations for i18n.
    aliases: --missingTranslation <value>
  --extract-css (Boolean) Extract css from global styles onto css files instead of js ones.
    aliases: -ec, --extractCss
  --watch (Boolean) (Default: true) Rebuild on change.
    aliases: -w, --watch
  --output-hashing=none|all|media|bundles (String) Define the output filename cache-busting hashing mode.
    aliases: -oh <value>, --outputHashing <value>
  --poll (Number) Enable and define the file watching poll time period (milliseconds).
    aliases: -poll <value>
  --app (String) Specifies app name or index to use.
    aliases: -a <value>, -app <value>
  --delete-output-path (Boolean) (Default: true) Delete output path before build.
    aliases: -dop, --deleteOutputPath
  --preserve-symlinks (Boolean) (Default: false) Do not use the real path when resolving modules.
    aliases: --preserveSymlinks
  --extract-licenses (Boolean) (Default: true) Extract all licenses in a separate file, in the case of production builds only.
    aliases: --extractLicenses
  --show-circular-dependencies (Boolean) (Default: true) Show circular dependency warnings on builds.
    aliases: -scd, --showCircularDependencies
  --build-optimizer (Boolean) Enables @angular-devkit/build-optimizer optimizations when using `--aot`.
    aliases: --buildOptimizer
  --named-chunks (Boolean) Use file name for lazy loaded chunks.
    aliases: -nc, --namedChunks
  --subresource-integrity (Boolean) (Default: false) Enables the use of subresource integrity validation.
    aliases: -sri, --subresourceIntegrity
  --bundle-dependencies (none, all) (Default: none) Available on server platform only. Which external dependencies to bundle into the module. By default, all of node_modules will be kept as requires.
    aliases: --bundleDependencies <value>
  --service-worker (Boolean) (Default: true) Generates a service worker config for production builds, if the app has service worker enabled.
    aliases: -sw, --serviceWorker
  --skip-app-shell (Boolean) (Default: false) Flag to prevent building an app shell
    aliases: --skipAppShell
  --port (Number) (Default: 4200) Port to listen to for serving.
    aliases: -p <value>, -port <value>
  --host (String) (Default: localhost) Listens only on localhost by default.
    aliases: -H <value>, -host <value>
  --proxy-config (Path) Proxy configuration file.
    aliases: -pc <value>, --proxyConfig <value>
  --ssl (Boolean) (Default: false) Serve using HTTPS.
    aliases: -ssl
  --ssl-key (String) (Default: ssl/server.key) SSL key to use for serving HTTPS.
    aliases: --sslKey <value>
  --ssl-cert (String) (Default: ssl/server.crt) SSL certificate to use for serving HTTPS.
    aliases: --sslCert <value>
  --open (Boolean) (Default: false) Opens the url in default browser.
    aliases: -o, -open
  --live-reload (Boolean) (Default: true) Whether to reload the page on change, using live-reload.
    aliases: -lr, --liveReload
  --public-host (String) Specify the URL that the browser client will use.
    aliases: --live-reload-client <value>, --publicHost <value>
  --disable-host-check (Boolean) (Default: false) Don't verify connected clients are part of allowed hosts.
    aliases: --disableHostCheck
  --serve-path (String) The pathname where the app will be served.
    aliases: --servePath <value>
  --hmr (Boolean) (Default: false) Enable hot module replacement.
    aliases: -hmr

ng set <options...>
  Set a value in the configuration.
  --global (Boolean) (Default: false) Set the value in the global configuration rather than in your project's.
    aliases: -g, --global

ng test <options...>
  Run unit tests in existing project.
  aliases: t
  --watch (Boolean) Run build when files change.
    aliases: -w, --watch
  --code-coverage (Boolean) (Default: false) Coverage report will be in the coverage/ directory.
    aliases: -cc, --codeCoverage
  --config (String) Use a specific config file. Defaults to the karma config file in .angular-cli.json.
    aliases: -c <value>, --config <value>
  --single-run (Boolean) Run tests a single time.
    aliases: -sr, --singleRun
  --progress (Boolean) (Default: false) Log progress to the console while in progress.
    aliases: --progress
  --browsers (String) Override which browsers tests are run against.
    aliases: --browsers <value>
  --colors (Boolean) Enable or disable colors in the output (reporters and logs).
    aliases: --colors
  --log-level (String) Level of logging.
    aliases: --logLevel <value>
  --port (Number) Port where the web server will be listening.
    aliases: -port <value>
  --reporters (String) List of reporters to use.
    aliases: --reporters <value>
  --sourcemaps (Boolean) (Default: true) Output sourcemaps.
    aliases: -sm, --sourcemap, --sourcemaps
  --poll (Number) Enable and define the file watching poll time period (milliseconds).
    aliases: -poll <value>
  --environment (String) Defines the build environment.
    aliases: -e <value>, --environment <value>
  --preserve-symlinks (Boolean) (Default: false) Do not use the real path when resolving modules.
    aliases: --preserveSymlinks
  --app (String) Specifies app name to use.
    aliases: -a <value>, -app <value>

ng version
  Outputs Angular CLI version.
  aliases: v, --version, -v

ng xi18n <options...>
  Extracts i18n messages from source code.
  --i18n-format (String) (Default: xlf) Output format for the generated file.
    aliases: -f <value>, -xmb (--i18n-format=xmb), -xlf (--i18n-format=xlf), --xliff (--i18n-format=xlf), --i18nFormat <value>
  --output-path (Path) (Default: null) Path where output will be placed.
    aliases: -op <value>, --outputPath <value>
  --verbose (Boolean) (Default: false) Adds more details to output logging.
    aliases: --verbose
  --progress (Boolean) (Default: false) Log progress to the console while running.
    aliases: --progress
  --app (String) Specifies app name to use.
    aliases: -a <value>, -app <value>
  --locale (String) Specifies the source language of the application.
    aliases: -l <value>, --locale <value>
  --out-file (String) Name of the file to output.
    aliases: -of <value>, --outFile <value>
```

