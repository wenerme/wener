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
- 扩展关联/信息
  - label - 标签 - 预定义
  - tags - 标记 - 自定义 - 任意字符串
  - notes - 备注
  - task - 任务 - 资源可能被关联到任务
  - todo
  - reminder
  - nofitication
  - activity - 活动
    - comment - 评论
  - state - 系统状态
  - status - 状态阶段、原因
  - cid+rid 外部系统关联
  - eid 内部系统关联
- 视图
  - 列表 - List
    - 支持 Table 显示
      - 定制 列 显示
      - 搜索、过滤
    - 支持 Kanban 显示 - 基于 status
    - 可定制 条件+列显示
    - Overview - 概览
      - 重要信息
    - Extended Overview - 扩展概览
      - 活动信息、关联信息
    - Quick Stats - 快速统计
  - 详情 - View/Detail
    - Resource Overview + 多 Tab 视图
    - Summary
      - 基本信息加活动跟进
    - Detail
    - Activity
    - File
  - 创建表单
  - 编辑表单 - 如果是 inline 编辑可能会不太一样
  - Mention - 提及 - 显示被关联引用 - ResourceChip
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
  /// 顺序ID - 对用户友好
  sid: number;
  /// 外部 ID - 例如 对接已有系统
  eid?: string;
  /// CID+RID - 平台+平台ID - 组成 vendor 相关的外部资源
  cid?: string;
  rid?: string;

  // 常见的名字字段 - 避免使用 name
  fullName?: string; // 全名
  displayName?: string; // 用于显示 - 优先显示
  title?: string;
  description?: string;
  topic?: string;

  // User
  loginName?: string;

  // 常见的客户联系信息
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactAddress?: string;

  // 状态 - 粗粒度系统定义
  state: string;
  // 阶段 - 细粒度业务定义
  status: string;

  // 排序用
  sort: number;
  displayOrder: number;

  tags?: string[]; // 标记体系 - 自定义
  labels?: Label[]; // 标签体系 - 系统定义

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

- Dynamic
  - https://learn.microsoft.com/en-us/dynamics/customerengagement/on-premises/developer/entities/annotation?view=op--#BKMK_DocumentBody
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
  - https://docs.github.com/en/rest/issues/comments?apiVersion=--

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

- 50 - dialog
- 40 - window host - isolate

## Entity

- User != 员工
  - 员工是 HRM 的概念

## State & Status

- State - 状态 - 系统定义 - 大状态 - 高级状态
- Status - 状态原因、阶段 - 业务定义 - 小状态 - 低级状态

| Entity  | State    | Status   | notes |
| ------- | -------- | -------- | ----- |
| Account | Active   | Active   |
| ^       | Inactive | Inactive |

| state        | label  | notes       |
| ------------ | ------ | ----------- |
| Active       | 激活   |
| Inactive     | 未激活 |
| Pending      | 待处理 |
| Open         | 开放   |
| Closed       | 关闭   |
| Completed    | 完成   |
| Canceled     | 取消   |
| Resolved     | 已解决 |
| Expired      | 已过期 |
| OnHold       | 暂停   |
| Qualified    | 合格   | Lead        |
| Disqualified | 不合格 | Lead        |
| Won          | 赢得   | Opportunity |
| Lost         | 失去   | Opportunity |
| Submitted    | 已提交 |
| Fullfilled   | 已完成 |
| Draft        | 草稿   |
| Published    | 已发布 |

| status | label | notes |
| ------ | ----- | ----- |
| New    | 新建  |

- status+state 不是完整的状态机
  - 因为状态流转不必然
  - 但设计好 state 和 status 可支持实现 事件驱动、工作流、状态机
- status 可能和 state 完全相等
  - 但 status 可以自定义
  - status 必然对应 **一个** state
- User
  - Active
    - Pending Approval (待审批)：用户已注册，但账户正在等待管理员审批。
    - Verified (已验证)：用户已通过电子邮件或手机验证过程。
    - Suspended (暂停使用)：因违反条款或其他原因，用户账户暂时被禁止使用。
  - Inactive
    - Deactivated by User (用户停用)：用户自己选择停用账户。
    - Deactivated by Admin (管理员停用)：由于某些原因，管理员停用了用户账户。
    - Expired (已过期)：用户账户因长时间未使用或其他原因自动过期。
- Contract - Draft, Invoiced, Active, OnHold, Canceled, Expired

---

- 一个堂食订单，主状态为 已下单 - 制作中 - 请取餐 - 已完成
  - Status -> Ordered -> Making -> Ready -> Completed
- 一个外卖订单，主状态为 已下单 - 配送中 - 已送达 - 已完成
  - Status -> Ordered -> Delivering -> Delivered -> Completed

---

- MS Dynamics356
  - statecode - State - Status - 状态
  - statuscode - Status - Status Reason - 状态原因、阶段

| Entity            | State        | Status                  | notes |
| ----------------- | ------------ | ----------------------- | ----- |
| Account           | Active       | Active                  |
| ^                 | Inactive     | Inactive                |
| Activity          | Open         | Open                    |
| ^                 | Completed    | Completed               |
| ^                 | Canceled     | Canceled                |
| ^                 | Scheduled    | Scheduled               |
| Appointment       | Open         | Free                    |
| ^                 | ^            | Tentative               |
| ^                 | Completed    | Completed               |
| ^                 | Canceled     | Canceled                |
| ^                 | Scheduled    | Busy                    |
| ^                 | ^            | Out of Office           |
| Article           | Draft        | Draft                   |
| ^                 | Unapproved   | Unapproved              |
| ^                 | Published    | Published               |
| Campaign          | Active       | Proposed                |
| ^                 | ^            | Ready To Launch         |
| ^                 | ^            | Launched                |
| ^                 | ^            | Completed               |
| ^                 | ^            | Canceled                |
| ^                 | ^            | Suspended               |
| Campaign Activity | Open         | InProgress              |
| ^                 | ^            | Proposed                |
| ^                 | ^            | Pending                 |
| ^                 | ^            | System Aborted          |
| ^                 | ^            | Completed               |
| ^                 | Closed       | Closed                  |
| ^                 | Canceled     | Canceled                |
| Campaign Response | Open         | Open                    |
| ^                 | Closed       | Closed                  |
| ^                 | Canceled     | Canceled                |
| Case              | Active       | InProgress              |
| ^                 | ^            | OnHold                  |
| ^                 | ^            | Waiting for Details     |
| ^                 | ^            | Researching             |
| ^                 | Resolved     | Problem Solved          |
| ^                 | Canceled     | Canceled                |
| Case Resolution   | Open         | Open                    |
| ^                 | Completed    | Closed                  |
| ^                 | Canceled     | Canceled                |
| Contact           | Active       | Active                  |
| ^                 | Inactive     | Inactive                |
| Contract          | Draft        | Draft                   |
| ^                 | Invoiced     | Invoiced                |
| ^                 | Active       | Active                  |
| ^                 | OnHold       | OnHold                  |
| ^                 | Canceled     | Canceled                |
| ^                 | Expired      | Expired                 |
| Contract Line     | Existing     | New                     |
| ^                 | Renewed      | Renewed                 |
| ^                 | Canceled     | Canceled                |
| ^                 | Expired      | Expired                 |
| Currency          | Active       | Active                  |
| ^                 | Inactive     | Inactive                |
| Discount          | Active       | Active                  |
| ^                 | Inactive     | Inactive                |
| E-mail            | Open         | Draft                   |
| ^                 | ^            | Failed                  |
| ^                 | Completed    | Completed               |
| ^                 | ^            | Sent                    |
| ^                 | ^            | Received                |
| ^                 | ^            | PendingSend             |
| ^                 | ^            | Sending                 |
| ^                 | Canceled     | Canceled                |
| Fax               | Open         | Open                    |
| ^                 | Completed    | Completed               |
| ^                 | ^            | Sent                    |
| ^                 | ^            | Received                |
| ^                 | Canceled     | Canceled                |
| Invoice           | Active       | New                     |
| ^                 | ^            | Partially Shipped       |
| ^                 | ^            | Billed                  |
| ^                 | ^            | Booked                  |
| ^                 | ^            | Installed               |
| ^                 | ~~ Closed~~  | ~~ Canceled~~           |
| ^                 | ^            | ~~ Paid in Full~~       |
| ^                 | Paid         | Complete                |
| ^                 | ^            | Parial                  |
| ^                 | Canceled     | Canceled                |
| Lead              | Open         | New                     |
| ^                 | ^            | Contacted               |
| ^                 | Qualified    | Qualified               |
| ^                 | Disqualified | Lost                    |
| ^                 | ^            | Cannot Contact          |
| ^                 | ^            | No Longer Interested    |
| ^                 | ^            | Canceled                |
| Letter            | Open         | Open                    |
| ^                 | ^            | Draft                   |
| ^                 | Completed    | Received                |
| ^                 | ^            | Sent                    |
| ^                 | Canceled     | Canceled                |
| Marketing List    | Active       | Active                  |
| ^                 | Inactive     | Inactive                |
| Opportunity       | Open         | InProgress              |
| ^                 | ^            | OnHold                  |
| ^                 | Won          | Won                     |
| ^                 | Lost         | Canceled                |
| ^                 | ^            | Out-Sold                |
| Order             | Active       | New                     |
| ^                 | ^            | Pending                 |
| ^                 | Submitted    | InProgress              |
| ^                 | Canceled     | No Money                |
| ^                 | Fulfilled    | Complete                |
| ^                 | ^            | Partial                 |
| ^                 | Invoiced     | Invoiced                |
| Phone Call        | Open         | Open                    |
| ^                 | Completed    | Made                    |
| ^                 | ^            | Received                |
| ^                 | Canceled     | Canceled                |
| Price List        | Active       | Active                  |
| ^                 | Inactive     | Inactive                |
| Product           | Active       | Active                  |
| ^                 | Inactive     | Inactive                |
| Quote             | Draft        | InProgress              |
| ^                 | Active       | InProgress              |
| ^                 | ^            | Open                    |
| ^                 | Won          | Won                     |
| ^                 | ^            | Out-Sold                |
| ^                 | Closed       | Lost                    |
| ^                 | ^            | Canceled                |
| ^                 | ^            | Revised                 |
| Service Activity  | Open         | Requested               |
| ^                 | ^            | Tentative               |
| ^                 | Closed       | Completed               |
| ^                 | Canceled     | Canceled                |
| ^                 | ^            | No Show                 |
| ^                 | Scheduled    | Pending                 |
| ^                 | ^            | Reserved                |
| ^                 | ^            | InProgress              |
| ^                 | ^            | Arrived                 |
| Task              | Open         | Not Started             |
| ^                 | ^            | InProgress              |
| ^                 | ^            | Waiting on someone else |
| ^                 | ^            | Deferred                |
| ^                 | Completed    | Completed               |
| ^                 | Canceled     | Canceled                |

## 银行卡 vs 银行账户

- 银行账户
  - 金融存款账户
  - 类型有 储蓄账户、支票账户、商业账户、投资账户 等
  - 属性不同 - 如 利息率、交易限额、费用结构 等
  - 记录所有交易 - 如 存款、取款、转账 等
  - 用于存款、管理资金和其他财务活动 - 如收入管理、账单支付、定期存款等
- 银行卡
  - 一种物理或数字的支付工具
  - 允许访问和使用账户中的资金
  - 主要分为 借记卡 和 信用卡
  - 银行卡主要用于消费和支付

## Enum

### Sex

|     enum | label |
| -------: | ----- |
|   Unknow | 未知  |
|     Male | 男性  |
|   Female | 女性  |
| Intersex | 间性  |

### PaymentMethod

|           enum | label      |
| -------------: | ---------- |
|           Cash | 现金支付   |
|     CreditCard | 信用卡支付 |
|      DebitCard | 借记卡支付 |
|   BankTransfer | 银行转账   |
|  OnlinePayment | 在线支付   |
|          Check | 支票支付   |
|  MobilePayment | 移动支付   |
|    DirectDebit | 直接扣款   |
|   WireTransfer | 电汇支付   |
| Cryptocurrency | 加密货币   |

### OnlinePaymentPlatform

|      enum | label      |
| --------: | ---------- |
|    PayPal | PayPal     |
|    Alipay | 支付宝支付 |
| WeChatPay | 微信支付   |
|    Stripe | Stripe     |
|    Square | Square     |
|  ApplePay | Apple Pay  |
| GooglePay | Google Pay |

### BankAccountType

|          enum | label        |
| ------------: | ------------ |
|       Savings | 储蓄账户     |
|      Checking | 支票账户     |
|      Business | 商业账户     |
|  JointSavings | 联名储蓄账户 |
| JointChecking | 联名支票账户 |
|    Investment | 投资账户     |
|            CD | 定期存款账户 |
|   MoneyMarket | 货币市场账户 |
|     Brokerage | 证券账户     |
|    CreditCard | 信用卡账户   |
|          Loan | 贷款账户     |
|      Mortgage | 抵押贷款账户 |
|  LineOfCredit | 信用额度账户 |
|         Other | 其他账户     |

## Payment

- recipient_bank_account
- beneficiary_account_number
- payee_account_number
- receiving_account

---

- payer_bank_account
- sender_account
- sending_account
