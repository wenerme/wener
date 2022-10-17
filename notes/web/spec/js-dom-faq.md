---
tags:
  - FAQ
---

# JS DOM FAQ

## open vs visible

接口选择 open 还是 visible 属性？

- open - 推荐
  - open/close
  - onClose
  - 一般很少见 onOpenChange, 可能直接 onChange
- visible
  - onVisbleChange 常见，直观
  - 但 visible 一般意味着 dom 存在、占用位置

---

- dialog
  - 使用 open 属性
  - show(), showModal()
- HTMLPopupElement
  - 使用 open 属性
  - show(), hide()
- CSS
  - visible 占用位置
  - display:none 不占用位置
- headlessui
  - 统一使用 open 属性
  - 传递 close 方法

## query sibling

```js
function siblings(node, query) {
  var parent = node.parentElement;
  var index = [].slice.call(parent.children).indexOf(node) + 1;
  // nth-child 会匹配到下级
  return parent.querySelectorAll(`:nth-child(${index}) ~ ${query}`);
}
```

## DOM 事件

- [window](https://developer.mozilla.org/en-US/docs/Web/API/Window#event_handlers)
  - appinstalled
  - devicemotion, deviceorientation
  - [WindowEventHandlers](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers)
    - hash, storage, online, offline, load, unload
- [document](https://developer.mozilla.org/en-US/docs/Web/API/Document#event_handlers)
  - afterscriptexecute, beforescriptexecute, fullscreenchange, fullscreenerror, selectionchange, visibilitychange
  - 大多事件在 window 也能监听到
- [GlobalEventHandlers](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers)
  - HTMLElement, Document, Window 都支持的事件
- 其他
  - navigator.clipboard - cut, copy, paste
  - [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) 的子类

## document vs body

- document - HTML
  - document.documentElement -> `<html>`
- body
  - `<body>` or `<frameset>` or null

## target vs currentTarget vs relatedTarget

- target - 触发事件的元素
- currentTarget - 事件监听的元素
- [relatedTarget](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget)
  - 鼠标事件相关元素
  - 进入、离开

## KeyboardEvent.key

- Chrom 51+
- [Key Values](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)

## KeyboardEvent.code

:::caution 尽量使用 KeyboardEvent.key

- KeyboardEvent.code
  - 忽略用户键盘布局
  - 更适用于游戏等非输入场景

:::

- Chrom 48+
- [Code Values](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values)

## Refused to set unsafe header "Content-Length"

- W3C XMLHttpRequest Level 1 4.6.2 定义的不允许修改的头
  - Accept-Charset
  - Accept-Encoding
  - Access-Control-Request-Headers
  - Access-Control-Request-Method
  - Connection
  - Content-Length
  - Cookie
  - Cookie2
  - Date
  - DNT
  - Expect
  - Host
  - Keep-Alive
  - Origin
  - Referer
  - TE
  - Trailer
  - Transfer-Encoding
  - Upgrade
  - User-Agent
  - Via
