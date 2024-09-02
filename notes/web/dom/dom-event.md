---
tags:
  - Event
---

# DOM Event

- Phase - eventPhase
  - Event.CAPTURING_PHASE - 1 - 捕获
  - Event.AT_TARGET - 2 - 目标
  - Event.BUBBLING_PHASE - 3 - 冒泡
- 不冒泡事件
  - mouseeneter
  - mouseleave
  - focus
  - blur
  - load, unload
  - scroll, resize, contextmenu, error
- 冒泡事件
  - focusin
  - focusout
- Mouse 的坐标
  - x,y -> clientX, clientY
  - clientX, clientY
    - 相对于 viewport
  - pageX, pageY
    - 相对于 document
  - offsetX, offsetY
    - 相对于上一次事件 clientX,clientY 的坐标
  - screenX, screenY
    - 相对于屏幕
    - 多个屏幕的时候会叠加 - 主屏幕的 top,left 为 0,0
  - movementX, movementY
    - 相对于上一次事件 screenX,screenY 的坐标
  - layerX, layerY
    - 包含 scroll 的坐标
- window.event
  - 当前事件
- react 的 focus & blur 会 bubble
  - 因此实际应该类似 onFocus -> onFocusIn, onBlur -> onFocusOut
  - [facebook/react#6410](https://github.com/facebook/react/issues/6410#issuecomment-207064994)

```ts
// if (e.pageX || pageY) -> MouseEvent
// if (e.locale || location) -> KeyboardEvent

interface UIEvent {
  /**
   * 当前点击数
   * click,dbclick - n
   * mousedown, mouseup - detail+1
   */
  readonly detail: number;
  /**
   * =document.defaultView
   */
  readonly view: Window | null;
  /**
   * keyCode 的 charCode
   *
   * @deprecated
   */
  readonly which: number;

  /**
   * 设备操作能力
   */
  sourceCapabilities: InputDeviceCapabilities | null;
}

// Mouse 和 Keyboard 都有的属性
interface CommonEvent extends UIEvent {
  /**
   * Windows alt, macOS option
   */
  readonly altKey: boolean;
  readonly ctrlKey: boolean;
  /**
   * Wdinwos ⊞ Win, macOS ⌘ Command
   */
  readonly metaKey: boolean;
  readonly shiftKey: boolean;
}

interface KeyboardEvent extends CommonEvent {
  /**
   * 判断按键输入位置 - 标准、左、右、数字键盘、移动设备、摇杆
   */
  readonly location: number;
  readonly repeat: boolean;
  readonly code: string;
  /**
   * 在 compositionstart 和 compositionend 之间 - 输入法正在输入的过程
   */
  readonly isComposing: boolean;
  readonly key: string;
  /**
   * @deprecated
   */
  readonly charCode: number;
  /**
   * @deprecated
   */
  readonly keyCode: number;
}
interface MouseEvent extends CommonEvent {
  /**
   * 0 - main,left, 1 - auxiliary,middle, 2 - secondary,right
   * 3 - back, 4 - forward
   */
  readonly button: number;
  /**
   * button 组合，使用 bit mask
   */
  readonly buttons: number;

  readonly clientX: number;
  readonly clientY: number;
  /**
   * 非标准属性，但所有浏览器都支持
   * 值会考虑 scrolling
   */
  readonly layerX: number;
  readonly layerY: number;

  readonly movementX: number;
  readonly movementY: number;
  readonly offsetX: number;
  readonly offsetY: number;
  readonly pageX: number;
  readonly pageY: number;
  readonly screenX: number;
  readonly screenY: number;
  readonly x: number;
  readonly y: number;

  // secondary target
  // 用于 MouseEvent - 与 target 对应
  // 事件: mouseenter, mouseleave, mouseout, mouseover, dragenter, dragleave
  // mouseenter - 进入 target 退出 relatedTarget
  // mouseleave - 退出 target 进入 relatedTarget
  relatedTarget: EventTarget | null;
}
```

---

## onClick vs onFocus

- onClick
  - 用户点击
- onFocus
  - 可通过 .focus, `Tab`, click 等方式触发
  - 可配合 tabIndex

---

- 先触发 onFocus 再触发 onClick

# onDoubleClick

- 会导致 click delay
  - 80 - 100ms

## focus

- onFocus
- onBlur
- onFocusIn
- onFocusOut
