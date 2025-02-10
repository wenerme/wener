---
tags:
  - DSL
---

# Sheet Formula

- `$A$1` - 绝对引用
  - 复制到其他行时，不会变化
- `A$1` - 行绝对引用
- `$A1` - 列绝对引用
- `A1` - 相对引用

| func                                  | demo                                |
| ------------------------------------- | ----------------------------------- |
| `IF(condition, then, else)`           | `=IF(A1>0, "Positive", "Negative")` |
| `SUMIF(range, criteria, [sum_range])` | `=SUMIF(A1:A10, ">0")`              |
| `DATEDIF(start_date, end_date, unit)` | `=DATEDIF(A1, B1, "d")`             |
