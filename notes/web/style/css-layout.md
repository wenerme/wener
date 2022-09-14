---
title: Layout
---

# CSS Layout

:::tip Layout

Layout is an arrangement or plan, especially the schematic arrangement of parts or areas

:::

- flex
- grid - Chrome 57+, Safari 10.1
  - https://drafts.csswg.org/css-grid-3/
  - [subgrid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Subgrid)
    - FF 71+
- table
- 参考
  - https://css-tricks.com/snippets/css/complete-guide-grid/

## Gird

## 概念

- container
- lines - 切分行列
- tracks - 行、列
- cell - horizontal track & vertical track 的交叉
- area - 逻辑位置 - 可能包含一个或多个 cell
- item - 放在 area 中的内容
  - grid-area - 所属区域
- gap - tracks 之间间隔

## 属性

**Container**

- display: grid
- grid-template-columns
- grid-template-rows
- `grid-template: <rows> / <columns>`
- grid-template-areas - 定义区域名字
- grid-auto-columns - 超出部分的定义
  - implicit grid tracks
- grid-auto-rows
- grid-auto-flow
  - `(row|column) [dense]`
- grid
- gap - row-gap, column-gap
- justify-items - inline axis
  - start,end,center,stretch
  - justify-self
- align-items - block axis
  - align-self
- place-items - align / justify
- justify-content - inline axis
  - start, end, center, stretch, space-around, space-between, space-evenly
  - 整体内容的布局
- align-content
- place-content - align / justify

**Item**

- `grid-(column|row)-(start|end)`
  - `<line> | ([span] (<number> | <name>)) | auto`
- `grid-(column|row)`
  - `<start-line> / <end-line> | <start-line> / span <value>`
- grid-area
  - `<name> | <row-start> / <column-start> / <row-end> / <column-end>`
- `(justify|align|place)-self`

**Size**

- min-content
- max-content
- auto
- fit-content
  - between min and max
- fr
- `minmax()`
  - 设置最大最小
- `min()`
- `max()`
- `repeat(n,size)`
  - n
    - auto-fill - 会构造空白隐性列
    - auto-fit - 自动填充空间
- masonry - 目前只有 ff 实现
  - https://css-tricks.com/piecing-together-approaches-for-a-css-masonry-layout/
  - https://www.smashingmagazine.com/native-css-masonry-layout-css-grid/
  - https://houdini.glitch.me/
  - https://drafts.css-houdini.org/css-layout-api/
- subgrid - ff 71+, safari tp
  - 继承 parent 的 line

---

- grid 因为一开始要定义的内容相对多，当有些地方又需要保持灵活，因此需要灵活使用计算方式
- 例如:
  - `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));`
  - `grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));`
    - 自适应
