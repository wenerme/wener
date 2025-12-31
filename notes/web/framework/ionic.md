---
title: Ionic
---

# Ionic

- Codepen [Ionic](http://codepen.io/ionic/pens/public/)
- Plugins
  - [cordova-plugin-wechat](https://github.com/xu-li/cordova-plugin-wechat)
- [Yarn Issue #648](https://github.com/yarnpkg/yarn/issues/648)

```bash
# 安装
yarn global add ionic
# 确保 ionic 在路径下
export PATH="$(yarn global bin):$PATH"

# 创建一个基于 web 的 tab 切换 app
# -s 使用 SCSS
ionic start app-demo tabs
cd app-demo
ionic serve

# 查看可用的启动模板
ionic start -l

# 创建一个 cordova 应用
# --skip-link 不链接 ionic cloud 账号
# --skip-deps 不自动下载依赖
ionic start --cordova --skip-link --skip-deps -n '我的应用' myapp tabs

# 可以考虑将 ionic 作为开发依赖, 以避免和全局的版本冲突
# 这样也可以直接使用 yarn 执行 ionic 来生成内容
# 例如 yarn run -- ionic g page MyHome
yarn add --dev ionic
```

## FAQ

### ISSUES

- [Tabs 页面黑屏](https://github.com/driftyco/ionic/issues/8508)
- [Uncaught (in promise): nav controller was destroyed](https://github.com/driftyco/ionic/issues/11454)
- [Ionic v3 - Runtime Error Uncaught (in promise): removeView was not found](https://github.com/driftyco/ionic/issues/11443)
- [Deferred long-running timer task(s)](https://github.com/angular/material/issues/8236)
  - `.md-scroll-mask { position: initial;}`

### 添加自定义图标

`ion-icon` 可以使用自定义的图标名字, 只需要添加响应的 css 即可.

```css
/* 添加自定义图标 */
.ion-ios-MYICON,
.ion-ios-MYICON-outline,
.ion-md-MYICON {
  content: url(../../images/MYICON.png); /* 可以用图标, svg 或者 webfont */
  width: 24px;
  height: 32px;
  padding: 6px 4px 2px;
  margin: 5px;
  opacity: 0.9;
}
```

### No provider for NavController

- [#5543](https://github.com/ionic-team/ionic/issues/5543)
- [#9581](https://github.com/ionic-team/ionic/issues/9581)
- 无法在 Service 中注入 NavController
- 解决方法
  1. 通过 `Events` 进行中转
  2. 注入 `App`, 然后

```js
get navCtrl(){
  return this.app.getRootNav()
}
```

### 添加页面

```bash
# 生成一个页面
# v2.2.3
# 会生成一个 User 页面, 如果想要使用 UserPage 这样的名字, 需要手动进行重构
# 除了会生成一个页面, 也会生成一个模块 user.module, 应该在 app.module 中导入该模块
yarn run -- i g page activity-detail
```

修改 app.module.ts, 在 import 那里添加生成页面的 Module, 例如 ActivityDetailModule

默认生成的页面名字没有 Page 后缀, 例如上面的生成结果为 ActivityDetail, 如果要添加 Page 后缀, 可以在 activity-detail.ts, 选中类名然后进行重命名重构.

### 设置标题

在进行 Web 端开发但不需要 NavBar 时, 网页的 Header 不会发生改变, 此时需要手动控制

```
class MyPage{
  constructor(private app: App) {
  }
  ionViewDidEnter() {
    // 当进入该页面时修改 title
    this.app.setTitle('我的页面');
  }
}
```

### 路由

Ionic 使用的内置状态来控制路由, 而不是使用的基于 URL 的路由, 在 Ionic 中,使用 URL 来控制路由的叫做 DeepLinker, 但是由于 Web 的优先级对于开发团队来说相对较低, 因此支持上面有所欠缺.

- Tab 页面路由会有些问题
  - [DeepLinker generated URL names with tabbed pages causes double /](https://github.com/driftyco/ionic/issues/9012)
  - [DeepLinker doesn't work smooth with tabbed pages yet](https://github.com/driftyco/ionic/issues/9183)
- 参考
  - [Ionic2 系列——使用 DeepLinker 实现指定页面 URL](http://www.cnblogs.com/yanxiaodi/p/6086007.html)

```
IonicModule.forRoot(MyApp, null,{/* DeepLinkConfig */});
```

每个页面都可以对应一个路径上的名字, 其元数据可以使用 `@IonicPage` 来配置, 也可以再 `DeepLinkConfig` 进行统一配置. 建议在 `DeepLinkConfig` 配置以便于统一管理.

路由的跳转可以在 html 中添加 [NavPush](https://ionicframework.com/docs/api/components/nav/NavPush/) 或者 [NavPop](https://ionicframework.com/docs/api/components/nav/NavPop/) 指令控制, 或者通过直接注入 [NavController](https://ionicframework.com/docs/api/navigation/NavController/) 来控制.
