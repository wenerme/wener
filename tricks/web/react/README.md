# React

## Tips

* [#16604](https://github.com/facebook/react/issues/16604) - How should we set up apps for HMR now that Fast Refresh replaces react-hot-loader?
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

aeksco/react-typescript-chrome-extension-starter
https://github.com/aeksco/react-typescript-chrome-extension-starter

http://cn.redux.js.org/

https://github.com/streamich/react-use
https://usehooks.com
https://github.com/antonioru/beautiful-react-hooks


https://github.com/oychao/react-router-alive

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

## 中文资源
* https://github.com/ele828/react-native-guide
* https://github.com/vczero/react-native-lesson
* https://github.com/justjavac/free-programming-books-zh_CN


https://github.com/chenglou/react-motion
https://github.com/xgrommx/awesome-redux
https://github.com/jondot/awesome-react-native


facebook/react - View
reactjs/redux - App State
rethinkdb/horizon - Realtime Database Sync
flipace/horizon-react - Connect View + Data
gaearon/react-hot-loader - Hot Reloading of React Components
webpack/webpack - Builds & Dev-Server


https://github.com/mattkrick/meatier

## FAQ
### Rect vs MobX
* https://www.reddit.com/r/reactjs/comments/885bxa/redux_vs_mobx/
* [You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)
  * by Redux Author


## Nextjs

```
npm install --save react react-dom next
mkdir pages
next
```
