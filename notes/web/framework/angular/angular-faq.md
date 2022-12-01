---
title: Angular FAQ
---

# Angular FAQ

## Multiple entry points / pages

- [angular/angular-cli#1804](https://github.com/angular/angular-cli/issues/1804) Multiple Entrypoints, Main Files
- [angular/angular-cli#6428](https://github.com/angular/angular-cli/issues/6428) Multiple entry points with ng serve
- [angular/angular#14745](https://github.com/angular/angular/issues/14745) Is there any way to use Angular2 in multi-page app instead SPA?
- ng6 后 .angular-cli.json 被 angular.json 替代

```bash
# ng serve = ng serve --app=0
ng serve --app=1
```

## 浏览器支持

- [Browser support](https://angular.io/guide/browser-support)

## 手动标识发生了变化

- 注入 `ChangeDetectorRef`
- 当发生了变化但 angular 未检测到的时候, 手动调用 `markForCheck`
  - 例如在别的地方做了事件监听影响绑定对象
  - 绑定对象使用的 getter/setter, 而不是属性

## ViewChild 为 null/undefined

- 需要在内容初始化后才不为 undefined
- 如果为 null, 检测是否有 ngIf

## 动画在 Safari 下无效

- 需要 web-animate
- `npm install --save web-animations-js`
- 然后在 `polyfills.ts` 添加 `import 'web-animations-js'`

## 如何在 ios 开发调试

- 建议使用 [safari](https://developer.apple.com/safari/tools/) 进行开发
- Safari 的技术预览版也都可以模拟设备和开启控制台
- ios 上默认为 Safari 浏览器内核, 因此在浏览器中调试和在真机调试没太大区别

## date pipe 在 ios/Safari 下无法正常工作

- https://github.com/angular/angular/issues/7008
- 由于 Safari 对时间格式的要求比较严格, 例如 '2017-1-1' 这样的格式在 Safari 下是无法正常处理的
- 最好的解决办法是基于 [momentjs](https://momentjs.com/) 实现一个自己的 date pipe
- 或者在传入到 date pipe 前确保 date 是正确的格式

## AoT 无法 Watch

- [#12867](https://github.com/angular/angular/issues/12867)
- ~只能是在最终发布构建时使用 aot~
- 现在可以了

## AoT 在遇到 Sass 出现找不到资源的情况

- [#11897](https://github.com/angular/angular/issues/11897)
- AoT 不能与 SASS 同时使用
- 不支持 CSS + 字体应用
- 可以考虑在外部引入

## AoT 无法处理 Router 的 loadChildren

需要使用 AppModuleNgFactory, 使用 AoT 编译出来

## /deep/ 被废弃

- https://www.chromestatus.com/features/4964279606312960
- 在后面版本会不产生任何操作
- 使用 `>>>`
- ng-deep

## scss 全局变量
