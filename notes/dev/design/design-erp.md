---
tags:
  - ERP
---

# Design ERP

## Resource

- Resource - 资源
- 通用概念
- 主要实体都是资源 - 非主要实体例如： 中间表，中间实体
- 基本操作
  - 增删改查
  - Owner - 管理者 分配、认领 - 个人 释放、转移
  - 导入导出
- 扩展关联
  - label - 标签 - 预定义
  - tags - 标记 - 自定义 - 任意字符串
  - task - 任务 - 资源可能被关联到任务
  - activity - 活动
  - comment - 评论
- 视图
  - 列表 - List
  - 详情 - View/Detail
    - Resource Overview + 多 Tab 视图
    - Summary
      - 基本信息加活动跟进
    - Detail
    - Activity
    - File
  - 创建表单
  - 编辑表单 - 如果是 inline 编辑可能会不太一样
  - Mention - 提及 - 显示被关联引用
  - Select/Picker - 选择关联引用
  - Popup/Overview/Profile - 弹出层预览

## CRM

- 面向销售
- 核心实体
  - Account - 客户
  - Contact - 联系人
  - Lead - 潜在客户
  - Opportunity - 商机
  - Activity - 活动
- 辅助
  - Order - 销售订单
  - Product - 产品
- 公共
  - Task - 任务
  - Event - 事件
  - Note - 备注
  - Attachment - 附件
  - Comment - 评论

## UI 状态

- Nothing/Before - An empty element
  - https://emptystat.es/
- Loading - A fetch is happening
- None - No items returned
- One - A single item comes back
- Some - A few items comes back
- Too Many - Too many items, need pagination (or similar)
- Incorrect - An error occurred
- Correct - A success happened
- Done - The operation finished
