---
tags:
  - HTML
---

# popover

- HTML attributes
  - popover - auto|manual - 表示该元素为 popover - 在 顶层显示
    - HTMLElement.popover
  - popovertarget
    - {HTMLButtonElement,HTMLInputElemen}.popoverTargetElement
  - popovertargetaction - hide|show|toggle
    - {HTMLButtonElement.popoverTargetAction,HTMLInputElement}.popoverTargetAction
- CSS
  - `::backdrop`
  - `:popover-open`
- ToggleEvent
  - beforetoggle
  - toggle
- HTMLElement.hidePopover()
  - `display: none`
- HTMLElement.showPopover()
- HTMLElement.togglePopover()

```html
<button popovertarget="mypopover">Toggle the popover</button>
<div id="mypopover" popover>Popover content</div>
```
