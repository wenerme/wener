---
title: CSS Rule
---

# CSS Rule

## @layer

- Chrome 99+, FF97+
- 定义级联层级
- 没有在 层 里的会默认在一个匿名层

```css
/* 1. 命名层 */
@layer layer-name {/*rules*/};
/* 2. 定义层 - 优先级占位 - 第一次出现的位置很重要，和之后再添加规则 */
/* 越后优先级越高 */
@layer theme, layout, utilities;
/* 3. 匿名层 - 命名层之后 - 优先级最高 - 等同于没有定义层 */
@layer {/*rules*/};

/* 4. import 到 层 */
@import 'theme.css' layer(utilities);
@import 'theme.css' layer; /* 匿名层 */

/* 嵌套层 */
@layer framework {
  @layer layout {

  }
}

/* 后续增加规则到嵌套层 */
@layer framework.layout {}
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
