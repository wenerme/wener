---
title: Angular Version
---

# Angular Version

- [CHANGELOG](https://github.com/angular/angular/blob/master/CHANGELOG.md)
- [Angular Release Schedule](https://github.com/angular/angular/blob/master/docs/RELEASE_SCHEDULE.md)

## Next

- https://update.angular.io/
- Project Ivy: a faster and smaller renderer
  - 未能在 6.0 发布
  - [Ivy@ng-conf](https://youtu.be/dIxknqPOWms?t=1360)

## 9.0

- 默认开启 Ivy

## 6.0

- Node 8+
- [angular.json](https://github.com/angular/angular-cli/wiki/angular-workspace)
  - Angular CLI workspace file (angular.json) schema
  - 移除了以前的 `.angular-cli.json`
  - 一个项目下包含多个应用
  - generate
    - serviceWorker
    - universal
    - appShell
    - library - 库
- [elements](https://angular.io/guide/elements)
  - [Angular Elements Quick Start](https://youtu.be/4u9_kdkvTsc)
  - `ng add @angular/elements`
  - WebComponent
  - 基于自定义元素
- pwa
  - `ng add @angular/pwa`
- 参考
  - [Version 6 of Angular Now Available](https://blog.angular.io/cc56b0efa7a4)
  - [Angular 6: Upgrading & Summary of New Features](https://alligator.io/angular/angular-6/)

### update

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

## 5.2

- 路由
  - paramsInheritanceStrategy
    - always: it makes child routes unconditionally inherit params from parent routes;
    - emptyOnly: the default, it only inherits parent params for path-less or component-less routes (the former behavior).
- 编译器
  - $any()
    - 类似于 ts 的 as any
    - 在模板中使用, 避免类型检测
    - 主要在开启了 fullTemplateTypeCheck 的特殊时候使用

## 5.0

- 较大的变动
  - https://github.com/angular/angular/blob/master/CHANGELOG.md#500-beta5-2017-08-29
  - https://github.com/angular/angular/blob/master/CHANGELOG.md#500-rc0-2017-09-28
- 动画
  - 支持 `:increment` 和 `:decrement` 转换别名
- 升级
  - 传播 `NgModelController` 的 touched 状态
  - 支持懒加载 Angular 模块到 AngularJS 中
- 编译器
  - add representation of placeholders to xliff & xmb ([b3085e9](https://github.com/angular/angular/commit/b3085e9))
  - fullTemplateTypeCheck
    - 模板强类型检测
  - preserveWhitespaces
    - 移除模板中的空白
- 表单
  - add options arg to abstract controls
    - FormControls, FormGroups, FormArrays 添加第二个可选参数
    - `new FormControl(, {validators: [Validators.required],asyncValidators: [myAsyncValidator]});`
    - `new FormGroup({one: new FormControl()}, [myPasswordValidator, myOtherValidator]);`
  - add default updateOn values for groups and arrays
  - add updateOn blur option to FormControls
  - add updateOn submit option to FormControls
  - add status to `AbstractControlDirective`
  - add updateOn support to ngModelOptions
- 路由
  - add events tracking activation of individual routes
  - add ActivationStart/End events
- 核心
  - Create StaticInjector which does not depend on Reflect polyfill
- 公共
  - mark NgTemplateOutlet API as stable

## 4.4

- compiler 允许多个 `exportAs` 名字
  - `Directive#exportAs`
  - `@Directive({selector: '[multiple-export-as]', exportAs: 'dirX, dirY'})`
- core 添加用于移除模板中空白文字节点的选项
  - `Component#preserveWhitespaces`
  - 可以使用 `&ngsp;` 来强制保留
  - `@Component({selector: 'comp',template: '<span>foo</span> <span>bar</span>',preserveWhitespaces: false,)`

## 4.3

- 增加了 HttpClient [CHANGELOG#430-2017-07-14](https://github.com/angular/angular/blob/master/CHANGELOG.md#430-2017-07-14)
  - 位于新的包 `@angular/common/http`, 旧的代码可逐步迁移
  - 特性
    - Typed, synchronous response body access, including support for JSON body types
    - JSON is an assumed default and no longer needs to be explicitly parsed
    - Interceptors allow middleware logic to be inserted into the pipeline
    - Immutable request/response objects
    - Progress events for both request upload and response download
    - Post-request verification & flush based testing framework
