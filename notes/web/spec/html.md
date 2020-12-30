---
title: HTML
---

# HTML

## Repaints
* 修改可见性样式触发 - 例如 opacity, background-color, visibility, outline

## Reflow
* 修改布局时触发 - 修改样式不触发 - 影响很大，阻塞计算
* 计算位置和尺寸 - 影响上下级和同一级
* [What forces layout / reflow](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)
* `position: absolute;` `position: fixed;` 可减少 reflow 影响
* `display: none;` 不影响

## navigator.permissions
* [navigator.permissions](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/permissions)

## geolocation
* [Using geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)
* https://test.wener.me/geo.html
