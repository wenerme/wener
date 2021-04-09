---
id: react
title: React
---

# React

## Tips

* [Presentational and Container Components](https://medium.com/@dan_abramov/7ca2f9a7c7d0)
  * presentational
    * 关心 “看起来怎么样”
    * 可能包含 Presentational 和 Container 组件
    * 通常包含 DOM/元素/Markup/样式
    * 通常允许 children 属性传递
    * 无外部依赖 - Redux、REST、API
    * 不关心数据加载和修改
    * 通过 props 接受属性和回调
    * 通常没有自己的状态 - 有也只是 UI 状态
    * 通常为函数组件
    * 例如 Page, Sidebar, Story, UserInfo, List
  * container
    * 关心 “逻辑如何运作”
    * 除了封装基本不包含元素，没有自己的样式
    * 为 presentational 或其他 container 提供样式和行为
    * 会与 Redux 交互，为 presentational 提供回调
    * 通常有状态和数据源
    * 通常配合 HOC - React Redux connect(), Relay createContainer(), Flux Utils Container.create()
    * 例如 UserPage, FollowersSidebar, StoryContainer, FollowedUserList.
  * 其他划分点
    * 有状态、无状态
    * 累、函数
    * Pure、Impure
* suspense 通过 throw prmies 实现
  * [vigzmv/react-promise-suspense](https://github.com/vigzmv/react-promise-suspense/blob/master/lib/index.ts)

```bash
# 常用工具
npm i -g react-native-cli code-push-cli

# Redux
npm i --save redux redux-thunk
npm i --save-dev remote-redux-devtools
# Redux Native
npm i --save react-redux redux-persist

# Native
npm i --save react-base react-native-vector-icons
```


## FAQ
### React vs MobX
* https://www.reddit.com/r/reactjs/comments/885bxa/redux_vs_mobx/
* [You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)
  * by Redux Author

## Nextjs

```
npm install --save react react-dom next
mkdir pages
next
```

## 命名
- [React components naming convention](https://medium.com/@wittydeveloper/b50303551505)
- `[Domain]|[Page/Context]|ComponentName|[Type]`
  - Domain
    - 业务域名词 - 划分模块或产品
  - Page/Content
    - 使用的位置上下文 - 最近上下文
    - 例如 Sidebar
  - ComponentName
    - 组件目的，用于做什么的
  - Type
    - View - 视图，只展现数据
    - Button
    - 表单类 - Input、Upload
    - Component - HOC 类组件，原有组件保持原有名字
    - Container - 容器类，提供交互接口数据
