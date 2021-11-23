---
title: JavaScript Awesome
tags:
  - Awesome
---

# JavaScript Awesome

- [List of ECMAScript engines](https://en.wikipedia.org/wiki/List_of_ECMAScript_engines)
- [novnc/noVNC](https://github.com/novnc/noVNC)
- [felixrieseberg/macintosh.js](https://github.com/felixrieseberg/macintosh.js)

## Framework

## Library

- Event
  - DOM EventTarget - Bus
  - DOM MessageChannel - 1-1、WebWorker
  - DOM BroadcastChannel - origin 纬度 - 多窗口
  - DOM Window.postMessage - 跨 origin、多窗口、iframe
  - [primus/eventemitter3](https://github.com/primus/eventemitter3)
  - [developit/mitt](https://github.com/developit/mitt)
    - ts, 200byte
    - 建议直接拷到项目使用
  - [pubkey/broadcast-channel](https://github.com/pubkey/broadcast-channel)
- IoC
  - [inversify/InversifyJS](https://github.com/inversify/InversifyJS)
- deep compare
  - [epoberezkin/fast-deep-equal](https://github.com/epoberezkin/fast-deep-equal)
  - [FormidableLabs/react-fast-compare](https://github.com/FormidableLabs/react-fast-compare)
    - 基于 fast-deep-equal
    - 支持 react 元素
  - [lukeed/dequal](github.com/lukeed/dequal)
- Date & Time
  - date-fns
  - dayjs
    - Fast 2kB alternative to Moment.js
    - Immutable
    - plugins
      - duration
  - moment

## JSX

- [ryansolid/solid](https://github.com/ryansolid/solid)
  - 快、小、类 React
  - jsx 直接预先生成 dom 模板，属性变化动态插入到 dom 里 - 没有 react 的 vdom 比较合并
- preact
- [jorgebucaran/hyperapp](https://github.com/jorgebucaran/hyperapp)

## Game

- [KilledByAPixel/LittleJS](https://github.com/KilledByAPixel/LittleJS)
  - Tiny, 2D, WebGL

## Template

- [linkedin/dustjs](https://github.com/linkedin/dustjs)

## 有趣

- [enkimute/ganja.js](https://github.com/enkimute/ganja.js) - 几何代数
