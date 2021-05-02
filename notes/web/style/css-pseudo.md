---
title: CSS Pseudo
---

# CSS Pseudo

- 分类
  - 语言 - :dir, :lang
  - 位置 - :any-link, :link, :visited, :local-link, :target, :target-within, :scope
  - 用户操作 - :hover, :active, :focus, :focus-visible, :focus-within
  - 时间维度 - :current, :past, :future
    - 用于 WebVTT - 字幕
  - 资源状态 - :playing, :paused
    - 用于媒体资源
  - 输入组件
  - 树结构 - :root, :empty, `:nth[-last]-child`, `:(first|last|only)-child`,`:nth[-last]-of-type`, `:(first|last|only)-of-type`

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
