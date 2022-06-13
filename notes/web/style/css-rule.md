---
title: CSS Rule
---

# CSS Rule

## width

- min-content - 固有的最小宽度
- max-content - 固有的最大宽度
- fit-content = min(max-content, max(min-content, fill-available))
- stretch
- `fit-content(<length-percentage>)` -> `min(max-content, max(min-content, <length-percentage>))`
  - 目前浏览器还没有支持
- https://developer.mozilla.org/en-US/docs/Web/CSS/width

## theme

- prefers-color-scheme light,dark

```html
<!-- 告诉浏览器支持配色 - 且优先选择 dark -->
<meta name="color-scheme" content="dark light" />
```

```css
:root {
  /* 表示支持配置方案 */
  color-scheme: dark light;
}

/* 根据用户配置选择 */
body {
  background-color: gainsboro;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: darkslategray;
  }
}
```

## color

- 命名颜色
- 特殊颜色
  - transparent
  - currentcolor
- 系统颜色
  - Canvas 应用或文档背景色
  - CanvasText 应用或文档文本前景色
  - LinkText - non-active, non-visited - 蓝色
  - VisitedText - visited - 紫色
  - ActiveText - active - 红色
  - ButtonFace - 按钮背景颜色
  - ButtonText
  - ButtonBorder
  - Field - input 背景色
  - FieldText
  - Highlight - 选中文本背景颜色 ::selection
  - HighlightText - 选中文本颜色
  - SelectedItem - 选中元素背景色 - 例如 checkbox
  - SelectedItemText
  - Mark - mark 标签
  - MarkText
  - GrayText - disabled 的颜色
- [CSS Color Module Level 4](https://www.w3.org/TR/css-color/)

## @layer

- Chrome 99+, FF97+
- 定义级联层级
- 没有在 层 里的会默认在一个匿名层

```css
/* 1. 命名层 */
@layer layer-name {
  /*rules*/
}
/* 2. 定义层 - 优先级占位 - 第一次出现的位置很重要，和之后再添加规则 */
/* 越后优先级越高 */
@layer theme, layout, utilities;
/* 3. 匿名层 - 命名层之后 - 优先级最高 - 等同于没有定义层 */
@layer {
  /*rules*/
}

/* 4. import 到 层 */
@import 'theme.css' layer(utilities);
@import 'theme.css' layer; /* 匿名层 */

/* 嵌套层 */
@layer framework {
  @layer layout {
  }
}

/* 后续增加规则到嵌套层 */
@layer framework.layout {
}
```

```html
<link rel="stylesheet" href="zxx-lib.css" layer="lib" />
<link rel="stylesheet" href="zxx-lib.css" layer />
<link rel="stylesheet" href="zxx-lib.css" layer media="supports(at-rule(@layer))" />
```

- [@layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)

## 对齐和排列

- {align,justify}-{items,self,content}
- align & justify
  - align - Block Axis
  - justify - Inline Axis
- align-self 默认 stretch
- flex - flex-direction
  - justify - 主轴
  - align - 副轴
- alignment
  - 位置
    - center
    - start - 受 书写模式影响
    - end
    - self-start
    - self-end
    - flex-start
    - flex-end
    - left
    - right
  - 基线
    - baseline
    - first baseline
    - last baseline
  - 分布
    - stretch
    - space-between
    - space-around
    - space-evenly
- safe & unsafe
  - safe - 溢出时使用 start

---

- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Alignment
