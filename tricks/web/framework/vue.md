# Vue

__生命周期__

![](http://vuejs.org/images/lifecycle.png)

## Tips

* http://mint-ui.github.io/

```bash
# 之所以使用 yarn 是因为 yran 更快更方便
# npm i -g yarn # 如果没有 yarn 可先安装 yarn
yarn global add vue@latest
# 创建一个项目目录
mkdir my-project
cd my-project
# 初始化 vue 项目
vue init webpack .
# 注意关掉所有测试 和 lint

# 常用的依赖
yarn add font-awesome ionicons moment vue-router
mkdir -p src/{api,pages}
touch src/{api,pages}/index.js src/{router,base,conf}.js
```

## Server Render
* 服务端渲染框架 https://github.com/nuxt/nuxt.js

## Tips
* Vue 基本元素
  * 指令
  * 属性
  * 计算属性
  * 过滤器
  * 方法
  * 监视 (watch)
  * 组件
* 指令
  * 语法 `指令:参数.修饰符="绑定值"`
  * `v-bind` 数据绑定
    * 语法 `v-bind:属性="属性字段"`
    * 单向
    * 缩写 `:属性`
  * `v-model` 模型绑定
    * 双向绑定
    * 主要用于表单元素
    * 修饰符包括
      * `.lazy`
      * `.number`
      * `.trim`
  * `v-on` 事件绑定
    * 语法 `v-on:事件类型.修饰符="代码 | 方法名 | 方法调用"`
    * 方法调用时可使用 $event 来访问原 event 对象
    * 缩写 `@事件名.修饰符`
    * 修饰符包括
      * `.stop`
      * `.prevent`
      * `.capture`
      * `.self`
    * 在处理按键事件时可使用的修饰符还包括
      * `enter`
      * `tab`
      * `delete`
        * 会同时捕获删除和倒退键(Backspace)
      * `esc`
      * `space`
      * `up`
      * `down`
      * `left`
      * `right`
    * 按键事件可使用语法 `@按键事件.键值`
