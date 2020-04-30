# NodeGUI
## Tips
* 不依赖 Chromium
* 基于 QT - 相当于是 QT 组件封装
* 支持 [React](https://github.com/nodegui/react-nodegui)
* 支持 CSS
  * 样式基于 QT stylesheet
  * 支持 Flex 布局
* 架构借鉴 [Electron](https://electronjs.org/blog/electron-internals-node-integration), 能做到空闲 0 CPU 使用。NodeJS 和 QT 运行在同一个线程，避免了很多事件桥接和通信问题，相对更加稳定
