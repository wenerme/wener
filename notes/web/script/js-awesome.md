---
title: JavaScript Awesome
tags:
  - Awesome
---

# JavaScript Awesome

- [List of ECMAScript engines](https://en.wikipedia.org/wiki/List_of_ECMAScript_engines)
- [novnc/noVNC](https://github.com/novnc/noVNC)
- [felixrieseberg/macintosh.js](https://github.com/felixrieseberg/macintosh.js)
- [RobinCsl/awesome-js-tooling-not-in-js](https://github.com/RobinCsl/awesome-js-tooling-not-in-js)

## Framework

- [preactjs/wmr](https://github.com/preactjs/wmr)

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
  - [lukeed/dequal](https://github.com/lukeed/dequal)
- Date & Time
  - date-fns
  - dayjs
    - Fast 2kB alternative to Moment.js
    - Immutable
    - plugins
      - duration
  - moment
  - d3-time-format
  - chrono-node
- number format
  - [numbro](https://github.com/BenjaminVanRyseghem/numbro)
    - 基于 numeral
  - [numeral](https://github.com/adamwdraper/Numeral-js)
    - 不再维护
- money
  - [dinero.js](https://github.com/dinerojs/dinero.js)
    - create, calculate, format money
  - [currency.js](https://github.com/scurker/currency.js)
  - [accounting.js](https://github.com/openexchangerates/accounting.js)
- flip effect
  - [react-flip-numbers](https://github.com/bluebill1049/react-flip-numbers)
  - [react-flipcard](https://github.com/mzabriskie/react-flipcard)
  - [number-flip] (https://github.com/gaoryrt/flip)
  - [objectivehtml/FlipClock](https://github.com/objectivehtml/FlipClock)
    - 不再维护
- animation
  - [framer/motion](https://github.com/framer/motion)
  - react-spring
  - react-motion
  - react-move
  - [danro/easing-js](https://github.com/danro/easing-js)
  - [mojs/mojs](https://github.com/mojs/mojs)
- functional
  - [ramda](https://github.com/ramda/ramda)
  - [fp-ts](https://github.com/gcanti/fp-ts)
  - io-ts
- reactive
  - rxjs
- core
  - core-js
  - lodash
  - underscore
- clone
  - structuredClone - Chrome 98
- json
  - [fast-json-patch](https://github.com/Starcounter-Jack/JSON-Patch)
- diff
  - [microdiff](https://github.com/AsyncBanana/microdiff)
- 2d rendering
  - [fabricjs/fabric.js](https://github.com/fabricjs/fabric.js)
    - SVG <-> Canvas
  - [jonobr1/two.js](https://github.com/jonobr1/two.js)
  - [signature_pad](https://github.com/szimek/signature_pad)
- color
  - [Qix-/color](https://github.com/Qix-/color)
- store
  - [rxdb](https://github.com/pubkey/rxdb)
    - rxjs
    - adapters: pouchdb, lokijs
    - replication: couchdb, graphql
  - [lokijs](https://github.com/techfort/LokiJS)
  - [dexie](https://github.com/dfahlander/Dexie.js)
  - [share/sharedb](https://github.com/share/sharedb)
    - Realtime database backend based on Operational Transformation (OT)
- compiler
  - [wooorm/xdm](https://github.com/wooorm/xdm)
    - MDX compiler - No runtime. With esbuild, Rollup, and webpack plugins
- reactive
  - rxjs
- utils
  - [he](https://github.com/mathiasbynens/he) HTML entities
- office
  - [dolanmiu/docx](https://github.com/dolanmiu/docx)
    - generate .docx files
  - [ZEISS/react-view-pdf](https://github.com/ZEISS/react-view-pdf)
    - react, pdf.js
  - [SheetJS/sheetjs](https://github.com/SheetJS/sheetjs)
    - Apache-2.0
  - [mengshukeji/Luckysheet](https://github.com/mengshukeji/Luckysheet)
- crdt
  - [yousefed/SyncedStore](https://github.com/yousefed/SyncedStore)
  - [yjs/yjs](https://github.com/yjs/yjs)
    - 实现协作编辑
    - vs automerge [#145](https://github.com/yjs/yjs/issues/145)
  - [automerge/automerge](https://github.com/automerge/automerge)
    - 通用状态，自定义 CRDT
  - [dmonad/crdt-benchmarks](https://github.com/dmonad/crdt-benchmarks)
  - Where is the CRDT for syntax trees [HN](https://news.ycombinator.com/item?id=29433896)
- editor
  - [ueberdosis/tiptap](https://github.com/ueberdosis/tiptap)
    - headless, framework-agnostic and extendable rich text editor, based on ProseMirror
- ui
  - [floating-ui/floating-ui](https://github.com/floating-ui/floating-ui)
    - popover -> floating-ui
    - react https://floating-ui.com/docs/react-dom
- ml
  - [matiasvlevi/Dann](https://github.com/matiasvlevi/Dann)
  - [ml5js/ml5-library](https://github.com/ml5js/ml5-library)
- invariant
  - [tiny-invariant](https://github.com/alexreardon/tiny-invariant)
  - [tiny-warning](https://github.com/alexreardon/tiny-warning)
    - 不 throw
  - [ts-invariant](https://github.com/apollographql/invariant-packages)
  - condition build
    - [babel-plugin-dev-expression](https://www.npmjs.com/package/babel-plugin-dev-expression)
    - [tsdx](https://github.com/jaredpalmer/tsdx)
- image
  - [nhn/tui.image-editor](https://github.com/nhn/tui.image-editor)
  - [fengyuanchen/compressorjs](https://github.com/fengyuanchen/compressorjs)
    - image compressor
- interactive
  - [transloadit/uppy](https://github.com/transloadit/uppy)
  - [anvaka/panzoom](https://github.com/anvaka/panzoom)
  - dnd
    - [Shopify/draggable](https://github.com/Shopify/draggable)
- core
  - core-js
  - jquery
  - [fabiospampinato/cash](https://github.com/fabiospampinato/cash)
- validate
  - [colinhacks/zod](https://github.com/colinhacks/zod)
  - [quicktype/quicktype](https://github.com/quicktype/quicktype)
- math
  - [josdejong/mathjs](https://github.com/josdejong/mathjs)
  - [MikeMcl/bignumber.js](https://github.com/MikeMcl/bignumber.js)
  - [imaphatduc/cubecubed](https://github.com/imaphatduc/cubecubed)
  - [3b1b/manim](https://github.com/3b1b/manim)
- markdown
  - [markdown-it/markdown-it](https://github.com/markdown-it/markdown-it)
  - [mdx-js/mdx](https://github.com/mdx-js/mdx)
    - [mdx-js/specification](https://github.com/mdx-js/specification)
    - [remark-mdx](https://github.com/mdx-js/mdx/tree/main/packages/remark-mdx)
  - [wooorm/xdm](https://github.com/wooorm/xdm)
    - MDX compiler
  - [micromark/micromark](https://github.com/micromark/micromark)
  - [markedjs/marked](https://github.com/markedjs/marked)
- Syntax Highlighter
  - [shikijs/shiki](https://github.com/shikijs/shiki)
- dev
  - [nolanlawson/fuite](https://github.com/nolanlawson/fuite)
    - finding memory leaks in web apps
  - [sverweij/dependency-cruiser](https://github.com/sverweij/dependency-cruiser)
- transpile
  - babel
  - ts
  - esbuild
  - swc
  - [alangpierce/sucrase](https://github.com/alangpierce/sucrase)
- bundle
  - webpack
  - rollup
  - [developit/microbundle](https://github.com/developit/microbundle)
- i18n
  - [lingui/js-lingui](https://github.com/lingui/js-lingui)
- benchmark
  - [js-framework-benchmark](https://krausest.github.io/js-framework-benchmark/current.html)

---

- npmtrends [dexie vs localforage vs lokijs vs pouchdb vs rxdb](https://www.npmtrends.com/dexie-vs-localforage-vs-pouchdb-vs-rxdb-vs-lokijs)

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
- [lokesh/color-thief](https://github.com/lokesh/color-thief)
  - 提取 image 颜色
- [travist/jsencrypt](https://github.com/travist/jsencrypt)
  - RSA

## UX

- [usablica/intro.js](https://github.com/usablica/intro.js)

## 工具

- [CryogenicPlanet/depp](https://github.com/CryogenicPlanet/depp)

```bash
go install github.com/cryogenicplanet/depp@latest
# .depp/config.json
depp init
depp
```

## Engine


- [saghul/txiki.js](https://github.com/saghul/txiki.js)
  - QuickJS + libuv
- [just-js/just](https://github.com/just-js/just)
  - small v8 for linux only
  - ~15 MB
- [GoogleChromeLabs/jsvu](https://github.com/GoogleChromeLabs/jsvu)
  - JavaScript engine Version Updater
  - 支持 charkra, gralljs, hermes, JavaScriptCore, quickjs, SpiderMonkey, v8, v8 debug, xs
- [facebook/hermes](https://github.com/facebook/hermes)
  - JavaScript engine optimized for React Native
- IoT
  - [jerryscript-project/jerryscript](https://github.com/jerryscript-project/jerryscript)
