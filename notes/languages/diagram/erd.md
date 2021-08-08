---
title: ERD
---

# ERD

- [BurntSushi/erd](https://github.com/BurntSushi/erd)
  - 使用 graphviz 生成
- 属性 - label, bgcolor, size, color, font, border, border-color
- 字段修饰
  - `*` 主键，下划线
  - `+` 外键，斜体

```erd
# 实体默认
entity {bgcolor: "#ececfc", size: "20"}
# 标题
title {label: "nfldb Entity-Relationship diagram (condensed)", size: "20"}

# 实体 - 之后为实体属性
# 支持自定义属性
[Person] {bgcolor: "#ececfc", size: "20"}
# 主键
*name
height
# label 可实现类似 类型
weight { label: "int" }
`birth date`
+birth_place_id

# 支持引号
[`Birth Place`]
*id
`birth city`
'birth state'
"birth country"


# 关联关系
#
# Cardinality    Syntax
# 0 or 1         ?
# exactly 1      1
# 0 or more      *
# 1 or more      +
# 支持自定义 label
Person *--1 `Birth Place` {label: "home"}
```
