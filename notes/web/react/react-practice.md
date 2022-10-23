---
tags:
- Practice
---

# React Practice

## 状态划分

- 作用域
  - 全局状态
    - out-of-tree 状态
    - 也可以是顶部 Context 提供状态
    - 只有一份
  - 上下文状态
    - 通过 Context 提供
    - 也可以通过 Context 提供 key 然后从全局取部分 状态
    - 可能有平行的 上下文状态
  - 本地状态
    - 单个组件内部
    - useState
- 目的
  - 数据状态
    - 服务端返回数据
    - 一般不会 proxy
    - 可能根据 id 订阅变化
    - 基于查询条件变化状态
    - useQuery
  - 控制状态
    - 影响数据状态
      - 例如 pageSize, pageNumber, filter, search
    - 影响展示
      - 例如 显示列
  - 视图状态
    - 主要样式显示相关
    - 可能配合用户的个人偏好
    - 例如 theme
  - 组件结构状态
    - useTable
    - 大型组件跨越多个组件的状态信息
