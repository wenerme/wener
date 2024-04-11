---
tags:
  - ERP
---

# Design ERP

## 服务分层 {#service-layer}

- DB - Entity - EntityService - RemoteService - Controller/GraphQL/RESTful - UI
- 接口实现的上一层可以是 RemoteService 也可以 EntityService
  - EntityService
    - 能够支持类似 dataloader 这样的加载方式
    - 能够按需查询
  - RemoteService
    - 相对来说功能没那么强大
  - 接口其实大多时候等价于 RemoteService
- DB - 数据库层面
  - 设计以 schema 优先
- Entity - 实体映射
- EntityService - 实体服务层面
  - 基础接口
  - 业务逻辑
- RemoteService - 远程服务 - 服务界限
  - 暴露 EntityService 为远程服务
  - 客户端通过远程服务访问
- Controller/GraphQL/RESTful - 控制器
  - 自定义后实现的接口

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

```ts
interface GeneralResource {
  /// 主键  - <TYPETAG>_<ULID>
  id: string;
  /// UUID
  uid: string;
  /// 租户
  tid: string;
  /// 外部 ID - 例如 对接已有系统
  eid?: string;
  /// CID+RID - 平台+平台ID - 组成 vendor 相关的外部资源
  cid?: string;
  rid?: string;

  // 常见的名字字段 - 避免使用 name
  fullName?: string;
  displayName?: string;
  title?: string;
  description?: string;

  // 常见的客户联系信息
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactAddress?: string;

  // 状态 - 粗粒度系统定义
  state: string;
  // 阶段 - 细粒度业务定义
  status: string;

  /// 标记
  tags?: string[];

  // 可归属资源
  ownerId?: string;
  ownerType?: string | 'User' | 'Team';

  // 具体归属 ID 基于 type 生成
  owningUserId?: string;
  owningTeamId?: string;

  // 通用对象关联 Entity
  entityId?: string;
  entityType?: string;

  // 客户所属资源
  customerId?: string;
  customerType?: string | 'Account' | 'Contact';
  accountId?: string;
  contactId?: string;

  // audit 相关
  createdById?: string;
  updatedById?: string;
  deletedById?: string;

  /// 创建时间
  createdAt: Date;
  /// 更新时间
  updatedAt: Date;
  /// 删除时间
  deletedAt?: Date;

  // 面向客户端+服务端
  attributes?: Record<string, any>;
  // 面向服务端 - 客户端可见
  properties?: Record<string, any>;
  // 面向客户端 - 客户端不可见
  extensions?: Record<string, any>;

  // 关联
  account?: Account;
  contact?: Contact;

  owningUser?: User;
  owningTeam?: Team;

  labels?: Label[];

  createdBy?: User;
  updatedBy?: User;
  deletedBy?: User;
}
```

## Activity

- Activity - 活动
- 已经发生的事情或者将要发生的事情
- 常见活动
  - Comment - 评论

## Event

- Event - 事件
- 系统内部层面的事件
- 不直接面向用户

## Record

- Record - 记录
- 是已经发生的事情
- 常见记录
  - PhoneCallRecord - 电话记录
  - EmailRecord - 邮件记录
  - ShortMessageRecord - 短信记录

## CRM

- 面向销售
- Customer - 客户
  - 注意 Customer 可能是 Account 也可能是 Contact
- 核心实体
  - Account - 客户 - 可以考虑翻译为公司或者企业客户
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

## UI Context

- React 视角
- 基础重复独立组建应该有 Context
  - DialogContext
  - PopoverContext
- 全局状态
  - UserContext
  - ThemeContext
  - LocaleContext
  - AuthContext
- 数据 Context
  - Query
    - 异步数据
    - 额外操作和状态 refresh/loading
    - query + suspense 也等同于 同步数据
  - Data/Store
    - 同步数据
- List Context
  - 用户 状态
    - 用户偏好 - 选择的视图
  - 布局 状态
    - 选择 视图
    - 选择 列
    - 列顺序
  - 查询 状态 - 部分可能需要持久化
    - 排序
    - 过滤
    - 分页
    - 搜索
  - 查询 - 查询参数 -> Query -> Result
    - data
    - loading
    - error
  - 数据 状态
    - total
    - items/data
    - hasMore
    - hasBefore
    - hasAfter
- Detail Context
- Form Context

## Resource View

- List
  - 筛选、排序、列选择、搜索、分页
  - 自定义视图
- View/Detail - 详情
  - 展示单个资源的详细信息，常以多Tab形式组织不同维度的数据。
  - Resource Overview + 多 Tab 视图
  - Tabs
    - Summary
      - 基本信息加活动跟进
    - Detail
      - 更多额外详细信息
    - Activity
      - 活动
    - File
      - 附件
- Create
  - 提供表单或界面以创建新的资源
- QuickCreate - 快速创建
  - 更简化的表单快速创建资源
  - 通常出现在 侧边栏/Drawer 或者 弹出层
- Edit
  - 允许修改资源的详情
  - 可能支持行内编辑(Inline Edit)
  - 用户可以直接在列表视图或者详情视图中修改资源
- Mention
  - 提及
  - 在文档或评论中提及资源，允许快速访问或引用
- Select/Picker/Search
  - 选择或搜索特定资源以建立关联关系
- Popup/Overview/Profile
  - 弹出层预览
  - 快速查看资源的关键信息而不离开当前界面
- Report - 生成报告视图，支持数据分析和决策
- Assign - 分配资源
- Import - 批量导入
- Export - 批量导出
- Dashboard - 仪表盘
  - 提供资源的汇总视图和关键指标，帮助用户快速获取概览
- Review/Approve
- Activity
  - 记录并显示资源相关的所有活动和交互历史。
- File/Attachment
  - 管理和查看资源相关的文件和附件
- Notification
  - 提醒用户关于资源的更新、截止日期、审批需求
- History/Log
  - 记录资源变更的历史或日志，提供完整的审计跟踪
- TODO
  - Gitlab TODO
    - https://docs.gitlab.com/ee/user/todos.html
    - https://docs.gitlab.com/ee/api/todos.html
    - https://docs.gitlab.com/ee/api/issues.html#create-a-to-do-item

## Note vs Comment

- Note
  - 通常是对资源的描述或者备注
  - used to explain, annotate, or add context to data
- Comment
  - 通常是对资源的交互或者讨论
  - 有 `Reply` 功能
  - 强调交互

---

比如 excel 有 comment 也有 note，note 通常是对单元格的描述，comment 通常是对单元格的多人交互评论。

---

**参考**

- Dynamic365
  - https://learn.microsoft.com/en-us/dynamics365/customerengagement/on-premises/developer/entities/annotation?view=op-9-1#BKMK_DocumentBody
  - Note/Annotation
- Gitlab Notes
  - 等同于 Comments
  - 支持
    - Commits
    - Epics
    - Issues
    - Merge requests
    - Snippets
  - https://docs.gitlab.com/ee/api/notes.html
- Github
  - https://docs.github.com/en/rest/issues/comments?apiVersion=2022-11-28

## Reminder vs To-do

- Reminder - 提醒
  - 触发通知
  - 日期和时间敏感的事件
  - 周期性任务
  - 与日历事件或特定时间点关联，重点是在适当的时候提醒用户采取行动或记住某件事。
- To-do - 待办
  - 需要被完成但不一定与特定的截止日期或时间绑定
  - 核心是 任务的管理和完成
  - 跟踪需要完成的工作或个人任务

## File vs Media vs Attachment vs Document

- Attachment - 附件
  - 上下文相关的文件
  - 补充或支持主体信息
- Media - 媒体
  - 内容可感知
  - 强调呈现
  - 图片、视频、音频、文本
- Document - 文档
  - 强调内容
  - 文档、文件
  - 通常都可以提取为文本
- File - 文件
  - 通用文件
  - 内容可能不透明 - 不需要感知内容

## zIndex

- 50
  - dialog
- 40
  - window host - isolate

## State & Status
