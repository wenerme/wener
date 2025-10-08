---
title: UI Components
---

# UI Components

## Chip

- 用于快速引用资源
- 方便在任何上下文中引用资源
- 显示资源的关键信息
- 支持点击 Popup 预览
  - ResourcePreview
    - 多 tab
    - 默认为 ResourcePreviewSummary
- 支持提及功能

```
Icon | Title/DisplayName | [X]
```

## Token Based Inpit

- Filter Search
- Search Token
- Deconstruct
  - 键 (Key) / 分面 (Facet)
    - 字段、属性
  - 操作符 (Operator)
  - 值 (Value)
- 一组
  - 筛选条件 (Filter Condition)
  - 查询子句 (Query Clause)
  - 断言 / 谓词 (Predicate)
- Filter Condition 表现为 Token
- 令牌 / 纸片 (Token / Chip)

```
[Author] [=] [john] [Label] [!=] [bug] [____input____]
 ↑      ↑    ↑      ↑     ↑    ↑        ↑
 click  select click  click select click   main input
```

---

- 参考
  - https://gitlab.com/gitlab-org/gitlab-ui/-/blob/main/src/components/base/filtered_search/filtered_search.vue
