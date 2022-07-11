---
title: CSS Selector
---

# CSS Selector

## Pseudo

- 用户操作 - :hover, :active, :focus, :focus-visible, :focus-within
- 位置 - :any-link, :link, :visited, :local-link, :target, :target-within, :scope
- 语言 - :dir, :lang
- 时间维度 - :current, :past, :future
  - 用于 WebVTT - 字幕
- 资源状态 - :playing, :paused
  - 用于媒体资源
- 输入组件 - :blank, :placeholder, :default, :valid, :invalid, :required, :optional, :read-write, :read-only
- 树结构 - :root, :empty, `:nth[-last]-child`, `:(first|last|only)-child`,`:nth[-last]-of-type`, `:(first|last|only)-of-type`
- 选择 - :is, :matches, :any, :has
- ShadowDOM - :host, :host-context
- 内容 - :contains, :empty

| defined        | pseudo               | desc                                         |
| -------------- | -------------------- | -------------------------------------------- |
| CSS 1          |
|                | :link                | 未访问链接                                   |
|                | :visited             | 已访问链接                                   |
|                | :active              |
| CSS 2          |
|                | :lang                |
|                | :first-child         |
|                | :hover               |
|                | :focus               |
| Selectors 3    |
|                | :target              | 当前 url 匹配目标 `#ele-id`                  |
|                | :root                | 一般指 html, 自定义元素时指当前元素          |
|                | :nth-child()         |
|                | :nth-last-of-child() |
|                | :nth-of-type()       |
|                | :nth-last-of-type()  |
|                | :last-child          |
|                | :first-of-type       |
|                | :last-of-type        |
|                | :only-child          |
|                | :only-of-type        |
|                | :empty               | 选择空白节点                                 |
|                | :not()               |
|                | :enabled             |
|                | :disabled            |
|                | :checked             |
|                | :indeterminate       |
| CSS 3 UI       |
|                | :default             |
|                | :valid               |
|                | :invalid             |
|                | :in-range            |
|                | :out-of-range        |
|                | :required            |
|                | :optional            |
|                | :read-only           |
|                | :read-write          |
| Selectors 4    |
|                | :any-link            | :link or :visited ,有 href 元素              |
|                | :blank               |
|                | :local-link          | 如果链接匹配当前页面                         |
|                | :scope               | 目前无法定义 scope, 等同 :root; DOM 有 scope |
|                | :drop                |
|                | :current             |
|                | :past                |
|                | :future              |
|                | :placeholder-shown   |
|                | :user-invalid        |
|                | :nth-col()           |
|                | :nth-last-col()      |
|                | :is()                | 使用最高优先级                               |
|                | :where()             | 与 `:is` 相同，但无优先级，适用于写样式库    |
|                | :focus-visible       | 浏览器根据操作方式决定是否显示 focus         |
|                | :focus-within        |
|                | 增强 :not()          | 参数与 :is 相同                              |
|                | :has                 | 暂未实现 - 类似 parent 选择                  |
|                | :target-within       | 不支持                                       |
| Fullscreen API | :fullscreen          | 全屏时                                       |
| CSS 4 UI       |
|                | :autofill            |

```css
/* 不在 nav 下的 a */
a:not(nav *) {
}
```

- :target - 使用 id 或 name 属性
  - `https://wener.me#reference`
- :is - 早期叫 :matches
  - 类似于缩写展开 `:is(h1,h2) p` -> `h1 p, h2 p`
  - 不能选择伪元素
- :where = :is - 但不增加选择符权重
- :has - Chrome 105
- :scope = :root
  - 限定选择范围 - `querySelector()`, `querySelectorAll()`, `matches()`, `Element.closest()`
  - 目前还无法创建 scope
- [container query](./container-query.md)

```html
<!-- 插入一个专门用于定位的 anchor -->
<!-- 目前 name 属性已废弃 -->
<a name="my-anchor"></a>
<a id="my-anchor"></a>
```

# FAQ

## 选择多个子元素

```css
/* 更现代的做法 */
.article :is(h1, h2, h3) {
}

/* 以前的做法 */
.article h1,
.article h2,
.article h3 {
}
```

## 选择内容匹配

```js
// jQuery
$('td:contains("Yes")')

// js console
$x("//td[text()='Yes']")

// js
document.evaluate("//td[text()='Yes']",document).iterateNext()
```
