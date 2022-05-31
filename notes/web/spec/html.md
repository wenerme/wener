---
title: HTML
---

# HTML

:::caution

- html 不支持 self close tag - `<br/>` 是不合法的
- html 允许 tag 不 close
- button 默认 type 为 submit - 根据使用情况需要修改为 button，否则会触发不必要的 submit

:::

## Repaints

- 修改可见性样式触发 - 例如 opacity, background-color, visibility, outline

## Reflow

- 修改布局时触发 - 修改样式不触发 - 影响很大，阻塞计算
- 计算位置和尺寸 - 影响上下级和同一级
- `position: absolute;` `position: fixed;` 可减少 reflow 影响
- `display: none;` 不影响
- 参考
  - [What forces layout / reflow](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)
  - [Recommended way of making React component/div draggable](https://stackoverflow.com/questions/20926551)

## navigator.permissions

- [navigator.permissions](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/permissions)

## geolocation

- [Using geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)
- https://test.wener.me/geo.html

## video

```html
<!-- 单 source -->
<video src="/media/flower.mp4" controls width="250"></video>

<!-- 多 source -->
<video controls width="250">
  <source type="video/webm" src="/media/flower.webm" />
  <source type="video/mp4" src="/media/flower.mp4" />
  <!-- 字幕 -->
  <track label="English" kind="subtitles" srclang="en" src="captions/vtt/sintel-en.vtt" default />

  Sorry, your browser doesn't support embedded videos.
</video>
```

- [video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)

## Semantic Tags

- header
- nav
- section
- article
- p
- blockquote
- cite
- code
- aside
- footer
- figure
- figcaption
- mark
- time
- address
- abbr
- dl
- dt
- dfn
- output
- q - quote - 会添加前后引号，cite 熟悉指定来源

**Functional tags**

- dialog
  - $dialog.showModal
  - `<form method="dialog">` 在 submit 时会关闭 dialog
  - close 事件包含 returnValue - 是 button 的 value
  - `::backdrop` 可用于设置 backdrop 层的样式
- button
- details
  - summary

**Table**

- table
  - caption
  - colgroup - 列分组
    - col - .span
  - thead
    - tr
      - th
        - .scope - row,col,rowgroup,colgroup
        - .abbr
        - .colspan
        - .rowspan
        - .headers
  - tbody
    - tr
      - td
        - .colspan
        - .rowspan
        - .headers - 空格分隔，th 的 id
  - tr
    - td
    - th
  - tfoot
    - tr
      - th
      - td

---

- https://www.w3schools.com/tags/default.asp
