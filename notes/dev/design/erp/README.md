---
tags:
  - ERP
---

# Design ERP

:::tip Seealso

- [Design API](../api/README.md)
- [Design Auth](../design-auth.md)
- [Design Schema](../design-schema.md)
- [Design CRM](../design-crm.md)
- [Design Service](../design-service.md)

:::

- 分层 - 关注点分离 - 避免 阻抗失配
- 线性销售漏斗
  - 潜在客户
  - 机会
  - 成交
  - AIDA模型
  - 线索到现金（Lead-to-Cash）模型
- 现代B2B购买 - 非线性漏斗
  - 六个并行的“购买任务”（Buying Jobs）
    - 问题识别（Problem Identification）：“我们需要做些什么。”
    - 方案探索（Solution Exploration）：“有哪些方案可以解决我们的问题？”
    - 需求构建（Requirements Building）：“我们具体需要采购什么？”
    - 供应商选择（Supplier Selection）：“这个方案能满足我们的需求吗？”
    - 方案验证（Validation）：“我们认为这是正确的答案，但需要确认。”
    - 达成共识（Consensus Creation）：“我们需要让所有人都同意。”
  - 参考
    - https://growthmethod.com/gartner-b2b-buying-journey/
    - https://www.forrester.com/b2b-marketing/b2b-marketing-strategy/

| abbr. | stand for                               | meaning                |
| ----- | --------------------------------------- | ---------------------- |
| CRM   | Customer Relationship Management        | 客户关系管理           |
| AIDA  | Attention, Interest, Desire, Action     | 注意、兴趣、欲望、行动 |
| ICP   | Ideal Customer Profile                  | 理想客户画像           |
| ABM   | Account-Based Marketing                 | 基于账户的营销         |
| SDR   | Sales Development Representative        | 销售开发代表           |
| MQL   | Marketing Qualified Lead                | 营销合格线索           |
| SQL   | Sales Qualified Lead                    | 销售合格线索           |
| MAP   | Marketing Automation Platform           | 营销自动化平台         |
| IVR   | Inbound Voice Response                  | 入站语音响应           |
| OCIC  | Omnichannel Customer Interaction Center | 全渠道客户互动中心     |
| ACW   | After Call Work                         | 通话后工作             |

| en                     | cn            | notes                            |
| ---------------------- | ------------- | -------------------------------- |
| Outbound               | 出站,外呼     | 主动联系潜在客户                 |
| Inbound                | 入站,内呼     | 被动等待客户联系                 |
| Grading                | 评级,线索评级 | 用于评估“匹配度”                 |
| Scoring                | 评分,线索评分 | 用于衡量“兴趣度”                 |
| Data Enrichment        | 数据增强      | 增强线索信息，提升质量           |
| Single Source of Truth | 单一真相来源  | 确保数据一致性和准确性           |
| Data Warehouse         | 数据仓库      | 商业智能、历史报表、分析         |
| Data Lake              | 数据湖        | 大数据存储、数据科学、探索性分析 |
| Data Hub               | 数据中心      | 数据共享、集成、治理、运营中介   |

- 目标客群宇宙（Target Universe）
  - 一个庞大的、符合ICP的、待激活的数据库
- Lead/线索
  - 一个已经与企业产生联系、进入生命周期管理的个体
  - 线索评级 (Fit)：基于明确的人口统计和公司统计数据（如职位、公司规模、行业、地理位置），衡量一个线索与理想客户画像（ICP）的匹配程度。这通常用字母等级（A-D）表示 。
  - 线索评分 (Interest)：基于隐性的行为数据（如网站访问、邮件打开、内容下载、定价页面浏览），衡量线索的兴趣水平。积极行为会加分，而长时间不活跃则可能导致分数衰减（Decay）。
- Data Enrichment
  - 统计数据（如行业、员工数、年收入）
  - 人口统计数据（如职位、级别）
  - 开放数据
  - 经过扩充的数据可以将线索评分的准确性提高多达50%
- 参考
  - HubSpot
  - Salesforce
  - Data Enrichment
    - Clearbit、ZoomInfo

## 服务分层 {#service-layer}

- DB - Entity - EntityService - RemoteService/Controller/GraphQL/RESTful - UI
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
- EntityRepository - 实体仓库 - 数据库操作
- EntityService - 实体服务层面
  - 基础接口
  - 业务逻辑
- RemoteService - 远程服务 - 服务界限
  - gRPC/ConnectRPC
  - 暴露 Service 为远程服务
  - 客户端通过远程服务访问
- Resolver - 解析器
  - GraphQL
- Controller - 控制器
  - Restful

## 模型分层 {#model-layer}

- 模型分层
  - ContactEntity for mikro-orm
  - ContactObject for type-graphql
  - ContactCreateInput for create input
  - ContactUpdateInput for update input
  - ContactPatchInput
- 分离好处
  - 关注点分离 (Separation of Concerns)
  - API 契约
  - 安全
  - 验证
  - 解耦
- 不分离 出现的问题
  - 会出现 Impedance Mismatch/阻抗失配
- 分离 出现的问题
  - 会出现 Boilerplate/样板代码
  - 同步维护
- 管理
  - 代码生成
  - 复用
  - 清晰命名约定

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
export interface AnyResource {
  id: string; // 主键  - <TYPETAG>_<ULID>
  uid?: string; // UUID
  tid?: string; // 租户
  sid?: number; // 顺序ID - 对用户友好 - 租户+实体类型维度递增
  eid?: string; // 外部 ID - 例如 对接已有系统
  cid?: string; // 平台 ID - CID+RID - 平台+平台ID - 组成 vendor 相关的外部资源
  rid?: string; // 平台关联 ID

  // 常见的名字字段 - 避免使用 name
  loginName?: string; // 可登录对象
  displayName?: string; // 用于显示 - 优先显示
  fullName?: string; // 全名
  title?: string; // 标题
  description?: string; // 描述
  topic?: string; // 主题

  code?: string; // 大多数情况下 tid+code 是唯一的

  // 基础 profile 信息
  phoneNumber?: string;
  phoneNumberVerifiedAt?: Date | string;

  // 常见的客户联系信息
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactAddress?: string;

  // 冗余联系信息
  alternativeName?: string;
  alternativePhone?: string;
  alternativeEmail?: string;
  alternativeAddress?: string;

  // 行政区划信息
  divisionCode?: string;
  province?: string;
  city?: string;

  notes?: string; // 面向业务员 -  后台备注
  remark?: string; // 面向用户 - 前台备注 - 一般少用

  state?: string; // 状态 - 粗粒度系统定义
  status?: string; // 阶段 - 细粒度业务定义
  statusReason?: string; // 状态原因
  stateLabel?: string; // 自动 resolve 出来的显示内容
  statusLabel?: string;

  tags?: string[]; // 标记体系 - 自定义
  metadata?: Record<string, any>; // 元数据

  userId?: string; // 可关联用户
  user?: AnyResource;

  labels?: AnyResource[]; // 标签体系 - 系统定义

  // 排序用
  sort?: number;
  displayOrder?: number;

  // 可归属资源
  ownerId?: string;
  ownerType?: string | 'User' | 'Team';

  // 具体归属 ID 基于 type 生成
  owningUserId?: string;
  owningTeamId?: string;
  owningUser?: AnyResource;
  owningTeam?: AnyResource;

  // 通用对象关联 Entity
  entityId?: string;
  entityType?: string;
  entity?: AnyResource; // 通常 GQL 层能够解析

  // 客户所属资源
  customerId?: string;
  customerType?: string | 'Account' | 'Contact';
  accountId?: string;
  contactId?: string;
  account?: AnyResource;
  contact?: AnyResource;

  // audit 相关
  createdById?: string;
  updatedById?: string;
  deletedById?: string;
  createdBy?: AnyResource;
  updatedBy?: AnyResource;
  deletedBy?: AnyResource;

  updatedAt?: Date | string; // 创建时间
  createdAt?: Date | string; // 更新时间
  deletedAt?: Date | string; // 删除时间

  attributes?: Record<string, any>; // 面向客户端+服务端 - 客户端读写
  properties?: Record<string, any>; // 面向服务端 - 客户端只读
  extensions?: Record<string, any>; // 面向服务端内部或集成方 - 客户端不可见

  // 常见级联关系
  parentId?: string;
  children?: AnyResource[];
  parent?: AnyResource;

  [key: string]: any;
}
```

## React

```ts
export type UseSimpleQuery<T, V extends object = Record<string, any>> = (options?: {
  pause?: boolean;
  suspense?: boolean;
  variables?: V;
}) => {
  data: T | undefined;
  loading: boolean;
  error?: any;
  refetch: () => void;
};
export type UseSimpleListQuery<T> = UseSimpleQuery<{ total: number; data: T[] }, ListQueryInput>;

//region 复杂组件状态模式

export type ViewComponentState = {
  open?: boolean;
  filters?: string[];
  search?: string;
  where?: Record<string, any>;
  mounted?: boolean;
  state?: Record<string, any>;
  [key: string]: any;
};

type GeneralStoreState = {
  error?: any;
  loading: boolean;

  events: Emittery<{}>; // 事件系统

  // 所有的操作
  actions: {
    refresh: () => void;
  };

  components: Record<string, ViewComponentState>; // 扩展组件
  states: Record<string, {}>; // 持久化状态
  metadata: Record<string, any>;

  // 数据
  data?: any; // 单个或数组

  // 数据列表

  selected: string[];
  active?: AnyResource;

  search: string;
  pageIndex: number;
  pageSize: number;
  sort: SortRule[];
  filters: string[];

  viewMode: ViewMode;
};

//endregion
```

- https://commerce.nearform.com/open-source/urql/docs/api/urql/
  - useQuery
  - useMutation
- https://tanstack.com/query/latest/docs/framework/react/reference/useQuery

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

### Customer

| 阶段                               | 定义                                                                           | 进入标准（触发器）                                     | 退出标准（晋升）                           | 关键数据点                                                       | 负责团队      |
| ---------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------ | ---------------------------------------------------------------- | ------------- |
| 目标客群宇宙 (Target Universe)     | 一个经过筛选的、符合 ICP 的个人/客户列表，通过研究识别但尚未互动。             | 手动导入、列表购买、数据库扩充。                       | 首次有意义的互动（如邮件回复、表单提交）。 | 企业信息（规模、行业）、人口统计信息（职位、级别）、技术栈信息。 | 市场/SDR      |
| 线索 (Lead)                        | 通过低意向行为或出站活动，与企业产生初次联系的个体。                           | 网站访问、订阅新闻通讯、下载内容、启动出站序列。       | 满足 MQL 标准（评分/评级阈值）。           | lead_source、first_touch_timestamp、初始行为数据。               | 市场          |
| 市场认可线索 (MQL)                 | 市场部基于"匹配度"（评级）和"兴趣度"（评分）判断已准备好移交给销售团队的线索。 | 达到预设的线索分数阈值（如 100 分）、请求演示或报价。  | 销售团队接受该线索进行跟进。               | mql_timestamp、线索分数、线索评级、关键互动行为。                | 市场          |
| 销售认可线索 (SQL)                 | 销售团队已接受并验证其具有真实、近期需求的 MQL。                               | SDR/AE 与线索建立联系并确认 BANT/MEDDPICC 等资格标准。 | 创建正式的销售流程（商机）。               | sql_timestamp、资格认证笔记、已识别的痛点。                      | 销售 (SDR/AE) |
| 商机 (Opportunity)                 | 一个已确认资格的潜在客户（SQL），并已进入积极的销售流程以完成交易。            | 在 CRM 中创建交易/商机记录，并关联金额和预计关闭日期。 | 交易赢单或输单。                           | deal_amount、close_date、管道阶段、竞争对手信息。                | 销售 (AE)     |
| 客户 (Customer)                    | 至少有一个赢单（Closed-Won）商机的个人或组织。                                 | opportunity_status = 'Closed-Won'。                    | 成为品牌倡导者或流失。                     | 合同价值、产品使用数据、支持工单。                               | 客户成功      |
| 布道者 (Evangelist)                | 积极为品牌进行宣传和推荐的客户。                                               | 高 NPS 分数、提供推荐语、参与案例研究。                | N/A                                        | 推荐活动、评价提交。                                             | 市场/客户成功 |
| 不合格/培育 (Disqualified/Nurture) | 在任何阶段被认为暂时不合适，但未来可能成为客户的联系人。                       | 不符合 ICP、时机不当、失联。                           | 重新通过高意向行为进行互动。               | disqualification_reason、nurture_until_date。                    | 市场/销售     |

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

- ResourceList
  - 资源列表视图
  - 希望尽量所有操作都在列表页能完成 - 避免进入到单独的 详情页，来回切换页面效率低
  - 筛选、排序、列选择、搜索、分页
  - Header + View + Footer
  - Header
    - 搜索, tags filter, status filter, sort
    - actions
  - Footer
    - PageNav, PageInfo, QueryStatus - 错误、loading、refresh
    - 视图操作 Placeholder
      - 例如 选择 Table 列
  - components / 自定义
    - 高级筛选
    - 自定义筛选逻辑
  - 视图
    - Table
    - List
      - ListViewItem
        - 选择、标题、描述、meta、备注、主要关联对象信息
    - Kanban
    - Calendar
    - Map
  - Sidebar
    - 左侧 - 树形侧边栏
  - Summary / 当前选中Active资源信息
    - 基本信息 + 多 tabs
    - Summary - 基本表单
      - Header
      - Content - 例如 Form
      - Footer - 例如 删除、状态流转
    - 关联记录
    - FileExplorer - 关联文件
    - MetaPanel - 元数据
      - ID 之类的

```
| Header  | Title Search Filter                                  Add Action
|--------------------------------------------------------------------------
| Sidebar | View                                            | Summary Panel
|         |----------------------------------------------------------------
|         | Footer  | PageInfo PageNav Refresh        ViewActionPlaceholder
```

---

- ResourceSummaryList
  - 用于侧边栏
- CompactList
- DenseList
- Select List / Picker
- Dropdown List
- Preview List
- MicroList
- Thumbnail List
- IconList

```
Title                           Actions
---------------------------------------
Item DisplayName
---------------------------------------
Page Info Nav Refresh
```

---

- ResourceChip
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

---

- PopupLayout
  - 用于所有需要 Popup 的场景
  - 内容可能需要 Scroll
  - 用于快速预览资源的关键信息
  - 用于 复杂选择场景
  - 显示资源的详细信息
  - 支持操作按钮
  - 支持关闭

```
Icon | Title                     [Error/Loading] Refresh Toolbar Action/Simple
-------------------------------------------------------------------------------
Content
-------------------------------------------------------------------------------
Menu                                                              Cancel Submit
```

---

- FileExplorer
  - 用于文件和附件的管理
  - 显示文件列表
  - 支持上传、下载、删除等操作
  - 支持文件预览
  - 支持文件夹结构

```
| Nav < > Path Segments Selected Action           Refresh ViewSwitch Action
|--------------------------------------------------------------------------
| Sidebar | View                                            | Summary Panel
| Tree    |----------------------------------------------------------------
|         | Footer Stats
```

---

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
- User 可以是 用户、客户、服务商 - 所有能接触、访问到系统的对象

## Case

- 客户投诉、售后服务、内部问题
- 紧急程度、优先级、客户满意度、处理时长、责任人
- -> 一个或多个任务、事件、活动、备注、附件
- 考核指标
  - 处理时长
  - 客户满意度
  - 问题解决率
  - 任务完成度
  - 任务绩效 - 每个任务的完成质量、速度等

---

- CaseType
  - Question
  - Problem
  - Request
- CaseOrigin
  - Phone
  - Email
  - Web
  - Facebook
  - Twitter
- ServiceStage
  - Identify
  - Research
  - Resolve
- State
  - Active
    - In Progress
    - On Hold
    - Waiting for Details
    - Researching
  - Resolved
    - Problem Solved
    - Information Provided
  - Canceled
    - Canceled
    - Merged
- [Incident (case) entities](https://learn.microsoft.com/en-us/dynamics365/customerengagement/on-premises/developer/incident-case-entities)

## Task

代表需要**完成**的工作的通用活动。

- State
  - Open
    - Not Started
    - In Progress
    - Waiting on someone else
    - Deferred
  - Completed
  - Canceled
- 事务性 - 开始、进行中、结束
  - 前置审批
  - 后置确认验收
- 计划型 - 计划 开始、结束日期/时间、提醒日期
- 审批类型 - 请求者发起，需要一个或多个审批者决策（批准/拒绝）。
- 确认类型 - 一方执行或记录了某个事实，需要另一方进行核实和确认。这与“审批”相似，但语义上更偏向于“验证已发生/已记录的事项的准确性”，而不是“批准一个未来的行动”。
- 任务类型定义
  - needsPreApproval
  - needsProcessing
  - needsPostConfirmation
- [Task entity reference](https://learn.microsoft.com/en-us/dynamics365/customerengagement/on-premises/developer/entities/task)

---

- To-do
  - Backlog - 待办
  - Pending - 待处理
  - Waiting Triage - 待分类
  - In Progress - 进行中
  - Done - 已完成
  - Canceled - 已取消

## Work

- 事务性工作 - Transactional Work
- 项目性工作 - Project based Work
- 关系型/人际互动型工作 - Relational / Interpersonal Work
- 发展性/学习型工作 - Developmental / Learning Work
- 战略性工作 - Strategic Work
- 分析性/解决问题型工作 - Analytical / Problem Solving Work
- 创造性/创新性工作 - Creative / Innovative Work
- 计划性工作 - Planning Work
- 设计性工作 - Design Work
- 组织性工作 - Organizational Work
- 评估性工作 - Evaluative Work
- 监督性工作 - Supervisory Work
- 领导性工作 - Leadership Work
- 研究性工作 - Research Work
- 评审性工作 - Review Work
- 反馈性工作 - Feedback Work

## State & Status

<!--
我正在设计一个 ERP/CRM 系统，以下是 state 和 status 的定义

- State - 状态 - 系统定义 - 大状态 - 高级状态
- Status - 状态原因、阶段 - 业务定义 - 小状态 - 低级状态

设计参考

- status+state 不是完整的状态机
  - 因为状态流转不必然
  - 但设计好 state 和 status 可支持实现 事件驱动、工作流、状态机
- status 可能和 state 完全相等
  - 但 status 可以自定义
  - status 必然对应 **一个** state

系统架构 NodeJS, MikroORM, TypeGraphQL, PostgreSQL, React, TailwindCSS

之后我会和你沟通更多关于设计的内容。
-->


**Contract**

| State        | Label  | Desc                                           |
| :----------- | :----- | :--------------------------------------------- |
| `Draft`      | 草稿   | 合同正在起草或修订中。                         |
| `Pending`    | 待处理 | 合同已提交，正在等待内部或外部的审批。         |
| `Active`     | 生效中 | 合同已签署并生效，是其生命周期的主要活动阶段。 |
| `OnHold`     | 暂停中 | 合同因故被暂停执行，但并未终止。               |
| `Terminated` | 已终止 | 合同已结束，这是一个**最终状态**的集合。       |

- Contract - 合同
  - Draft - 草稿
    - Update -> Draft
    - Submit/SubmitForReview -> Pending
  - Pending - 待处理
    - Approve -> Active
    - ReturnForRevision -> Draft
    - Cancel -> Canceled
  - Active - 活动
    - NotStarted
    - InProgress
    - NearingExpiry
  - OnHold - 暂停
  - Terminated - 终止
    - Completed
    - Expired
    - Canceled
- TaskCase - 任务案例
  - Draft - 草稿
    - Update -> Draft
    - Submit -> Pending
  - Pending - 待处理
    - ReturnForRevision -> Draft
    - Approve -> Approved
    - Reject -> Rejected
  - Approved - 已批准
  - Rejected - 已拒绝
  - Canceled - 已取消
- TaskCase 其他情况
  - 前置审批
  - 中间过程
  - 后置确认验收

```
Draft ─Submit→ Pending ─Approve→ Approved
  ↑              ↓
  └────Revise────Reject─→ Rejected
  │                          ↑
  └────────Cancel───────────┘
```

<!--
- Entity
  - State
    - Action -> State/Status
-->

**Invoice**

| State               | Label    | Desc                             |
| :------------------ | :------- | :------------------------------- |
| `NotYetInvoiced`    | 未开票   | 合同尚未生成任何发票。           |
| `PartiallyInvoiced` | 部分开票 | 已为合同的一个或多个里程碑开票。 |
| `FullyInvoiced`     | 全部开票 | 合同的所有款项均已开具发票。     |
| `Overdue`           | 逾期未付 | 存在已开票但超过付款期限的款项。 |

---

- 一个堂食订单，主状态为 已下单 - 制作中 - 请取餐 - 已完成
  - Status -> Ordered -> Making -> Ready -> Completed
- 一个外卖订单，主状态为 已下单 - 配送中 - 已送达 - 已完成
  - Status -> Ordered -> Delivering -> Delivered -> Completed

**Rental Management**

- House - 房屋
  - Active
    - Available (可租用)：房屋处于可供租赁状态。
    - UnderMaintenance (维修中)：房屋正在进行维护或修理。
    - Reserved (已预订)：房屋已被预订，但尚未签署
    - Rented (已租用)：房屋已被租赁，处于使用状态。
  - Inactive
    - Delisted
    - Unavailable (不可用)：房屋因某种原因暂时无法出租。
    - Sold (已售出)：房屋已被出售，不再作为租赁对象
    - Demolished (已拆除)：房屋已被拆除，不再存在
  - Archived

### MS Dynamics356

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
| ^                 | Inactive     | Inactive                |
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

- Invoice
  - https://www.zoho.com/au/billing/kb/invoices/

### LeadStatus

**LeadState**

| State        | Desc                       |
| ------------ | -------------------------- |
| Open         | 订单已创建，尚未开始处理   |
| Qualified    | 线索已经过资质审查         |
| Disqualified | 线索不再跟进，已被取消资格 |

**LeadStatus**

| State        | Status             | Label      | Desc                     | Condition/Trigger      |
| ------------ | ------------------ | ---------- | ------------------------ | ---------------------- |
| Open         | New                | 新建       | 订单已创建，尚未开始处理 | 订单创建               |
| ^            | Contacted          | 已联系     | 已经联系线索内的联系信息 | 联系成功               |
| Qualified    | Qualified          | 已资质审查 | 线索已经过审查           | 审查通过               |
| ^            | AwaitingOrder      | 等待下单   | 线索有效，等待下单       | 待客户确认订单         |
| Disqualified | Lost               | 已流失     | 线索流失                 | 超过联系次数未响应     |
| ^            | Rejected           | 拒绝       | 无法提供服务             | 确认无法提供服务       |
| ^            | CannotContact      | 无法联系   | 无法联系线索内的联系信息 | 联系多次无响应         |
| ^            | NoLongerInterested | 不再感兴趣 | 客户对产品不再感兴趣     | 客户明确表示不感兴趣   |
| ^            | Canceled           | 已取消     | 客户资格已被取消         | 客户取消或系统取消资格 |

- Unqualified - 客观，可能不具备，未达标
- Disqualified - 主观判断，不符合，被排除

### ServiceOrderStatus

| State     | Status               | Label      | Desc                                         |
| --------- | -------------------- | ---------- | -------------------------------------------- |
| Active    | New                  | 新建       | 订单已创建，尚未开始处理                     |
| ^         | Pending              | 待处理     | 订单正在等待进一步处理或等待客户信息         |
| ^         | AdditionalInfoNeeded | 需补充信息 | 需要客户提交更多文件或信息以继续处理订单     |
| Submitted | Processing           | 处理中     | 订单已提交至服务部门，正在进行中             |
| ^         | AwaitingReview       | 待审核     | 服务已执行完毕，订单正在内部审核过程中       |
| Canceled  | InsufficientFunds    | 资金不足   | 因客户资金不足，订单被取消                   |
| ^         | ClientCanceled       | 客户取消   | 客户主动请求取消订单                         |
| ^         | ServiceUnavailable   | 服务不可用 | 由于服务限制或不可用，订单无法执行           |
| Fulfilled | Completed            | 已完成     | 所有服务已根据订单要求成功提供               |
| ^         | PartiallyCompleted   | 部分完成   | 部分服务已提供，其余部分由于特定原因暂未完成 |
| Invoiced  | Invoiced             | 已开发票   | 服务已提供完毕，相应的发票已生成并发送给客户 |
| ^         | AwaitingPayment      | 待支付     | 发票已发出，订单正在等待客户支付             |

### SalesInvoiceStatus

| Status    | Label  | Desc                                                                                |
| --------- | ------ | ----------------------------------------------------------------------------------- |
| Sent      | 已发送 | 发票已发送给客户                                                                    |
| Paid      | 已支付 | 客户已支付发票                                                                      |
| Overdue   | 逾期   | 发票已超过付款日期且客户尚未支付                                                    |
| Void      | 作废   | 如果发票开具错误，你可以将其作废。客户无法支付已作废的发票。                        |
| Write Off | 核销   | 只有当你确信客户欠款无法收回时，你才可以对发票进行坏账核销。                        |
| Draft     | 草稿   | 你已创建一张未完成的发票，并且它尚未发送给客户。Zoho Billing 无法生成任何草稿发票。 |

### AccountingInvoiceStatus

| State     | Status          | Label  | Desc                                                                           |
| --------- | --------------- | ------ | ------------------------------------------------------------------------------ |
| Active    | Draft           | 草稿   | 发票已创建但尚未最终审核或发送。用于初步录入和编辑发票信息。                   |
| ^         | PendingApproval | 待审批 | 发票已提交审批流程，等待相关管理者或会计审核。此步骤是确保发票准确无误的关键。 |
| ^         | Approved        | 已审批 | 发票已经过审批，等待进一步处理，如记账或支付。                                 |
| ^         | Paid            | 已支付 | 发票已结清款项，表示客户已完成支付，会计处理完毕。                             |
| Completed | Posted          | 已过账 | 发票的财务数据已被记入总账，此状态表示发票已在会计记录中正式体现其经济效果。   |
| Cancelled | Cancelled       | 已取消 | 发票在完成所有必要流程前被取消，不再适用或有效，不需进一步操作。               |
| ^         | Written-Off     | 已核销 | 发票因确认无法收回款项而被标记为已支付，处理为坏账。                           |
| ^         | Void            | 作废   | 发票因错误或其他原因被取消，使用作废状态来确保其不会影响财务记录。             |

### TaxDeclarationStatus

| State     | Status             | Label      | Desc                                                       |
| --------- | ------------------ | ---------- | ---------------------------------------------------------- |
| Draft     | New                | 未填写     |
| ^         | Draft              | 草稿       | 填写中                                                     |
| Submitted | Pending            | 待审核     | 申报已提交，正在等待税务机关的初步审核。                   |
| ^         | Query              | 待补充资料 | 税务机关对申报有疑问，需要纳税人提供更多信息或解释。       |
| ^         | PendingPayment     | 未缴款     |
| Completed | Processed          | 已处理     | 申报已经完全处理完成，包括所有必要的审核、调整和确认。     |
| ^         | Amended            | 已修正     | 纳税人已根据税务机关的要求修正申报，并重新提交审核。       |
| ^         | PartiallyProcessed | 部分处理   | 申报的部分内容已处理，其余部分可能因特定原因暂未完成处理。 |
| ^         | PaymentConfirmed   | 已缴款     |
| Closed    | Withdrawn          | 已撤销     | 申报被纳税人撤回或税务机关关闭，无需进一步处理。           |
| ^         | Archived           | 已存档     | 申报处理完成后被正式存档，作为税务记录保留。               |

### EmployeeStatus

| State      | Status                   | Label       | Desc                                             |
| ---------- | ------------------------ | ----------- | ------------------------------------------------ |
| Active     | Probation                | 试用期      | 员工在试用期内，正接受评估是否适合长期职位。     |
| ^          | Regular                  | 正式员工    | 员工已完成试用期，成为正式员工。                 |
| ^          | PartTime                 | 兼职        | 员工以兼职形式在组织工作。                       |
| ^          | Temporary                | 临时工      | 员工被临时雇佣，通常为完成特定项目或季节性工作。 |
| Leave      | SickLeave                | 病假        | 员工因病缺勤。                                   |
| ^          | Maternity/PaternityLeave | 产假/陪产假 | 员工因生育或陪伴配偶生育休假。                   |
| ^          | AnnualLeave              | 年假        | 员工正在使用法定年假。                           |
| ^          | UnpaidLeave              | 无薪假      | 员工处于批准的无薪假状态。                       |
| Suspended  | Disciplinary             | 纪律暂停    | 员工因纪律问题被暂停工作。                       |
| ^          | Investigation            | 调查中      | 员工因涉及调查被暂停工作，等待结果。             |
| Terminated | Resigned                 | 自愿离职    | 员工自主决定结束与公司的雇佣关系。               |
| ^          | Retired                  | 退休        | 员工正式退休，结束职业生涯。                     |
| ^          | LaidOff                  | 裁员        | 因公司重组或缩减人员，员工被解雇。               |
| ^          | Fired                    | 解雇        | 因员工表现或行为问题，被公司解雇。               |

### ClientStatus

- Client 是 Service 的接受者
  - 不一定直接产生交易关系
  - 不一定直接产生沟通
  - 是服务关系

| State       | Status             | Label        | Desc                                                     |
| ----------- | ------------------ | ------------ | -------------------------------------------------------- |
| Pending     | New                | 新建         | 客户服务刚刚创建，尚未开始任何实质性操作。               |
| ^           | Onboarding         | 准备阶段     | 客户在此阶段完成必要的准备工作，如资料提交和初步设置。   |
| Active      | InService          | 服务中       | 客户正在接受服务，正常的服务交付期间。                   |
| ^           | ReviewPending      | 待复核       | 服务已提供，正在等待内部复核或客户最终确认。             |
| ^           | ComplianceCheck    | 合规性检查   | 进行定期的合规性检查，确保服务符合所有相关法规和标准。   |
| Suspended   | NonPayment         | 因欠款暂停   | 由于未支付服务费用，客户服务暂停。                       |
| ^           | ComplianceIssues   | 合规问题     | 由于合规性或法律问题，客户服务被暂停。                   |
| Terminated  | ClientCanceled     | 客户取消     | 客户决定终止服务关系。                                   |
| ^           | ServiceCompleted   | 服务结束     | 服务合约期满或所有服务项目均已完成，客户状态更新为终止。 |
| ^           | Defaulted          | 违约         | 客户由于违反服务条款被终止服务。                         |
| ~~Resumed~~ | PaymentResolved    | 欠款解决     | 客户已解决支付问题，服务恢复。                           |
| ^           | ComplianceResolved | 合规问题解决 | 客户已解决之前的合规问题，服务恢复。                     |

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

### EmploymentType

|      enum | label  |
| --------: | ------ |
|  FullTime | 全职   |
|  PartTime | 兼职   |
|  Contract | 合同工 |
| Temporary | 临时工 |

## Payment

- recipient_bank_account
- beneficiary_account_number
- payee_account_number
- receiving_account

---

- payer_bank_account
- sender_account
- sending_account

## Data

| 标准     | 数据中心 (Data Hub)              | 数据仓库 (Data Warehouse)                        | 数据湖 (Data Lake)                              |
| -------- | -------------------------------- | ------------------------------------------------ | ----------------------------------------------- |
| 主要目的 | 数据共享、集成、治理、运营中介   | 商业智能、历史报表、分析                         | 大数据存储、数据科学、探索性分析                |
| 数据形态 | 半结构化、已协调、一致性模型     | 结构化、写入时定义模式 (Schema-on-Write)、关系型 | 原始、非结构化、读取时定义模式 (Schema-on-Read) |
| 核心功能 | 扮演数据交换的"中转站"           | 扮演存储已整理数据的"图书馆"                     | 扮演存储所有原始数据的"水库"                    |
| 延迟     | 实时、近实时、事件驱动           | 批处理、历史快照                                 | 批处理或流式，但数据是原始的                    |
| 数据治理 | 主动式，在数据流动过程中强制执行 | 被动式，在 ETL/ELT 过程中应用                    | 需额外构建治理框架，否则易形成"数据沼泽"        |

## Party 模型 {#party-model}

- 参考
  - https://developer.salesforce.com/docs/platform/data-models/guide/party.html
  - https://help.salesforce.com/s/articleView?id=sf.c360_a_party_data_model.htm&language=en_US&type=5

## 销售 {#sales}

- 初次接触的销售型通话（Discovery Call）
  - 低于2分钟（无效或低效区）
  - 3-8分钟（黄金区间）
    - 1分钟: 破冰，建立初步信任。
    - 2-3分钟: 提出高质量问题，挖掘客户的核心需求或痛点。
    - 2-3分钟: 针对性地介绍产品或解决方案的核心价值。
    - 1分钟: 确认客户意向，并成功约定下一步（如发送资料、预约演示、建立微信联系等）。
  - 超过10分钟（潜力和风险并存区）
- “黄金时间窗口”

# FAQ

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

## 服务订单 vs 商品订单

- 服务订单
  - 无形的服务
  - 服务的时间、地点、持续时长、特定的服务详情
  - 处理流程
    - 服务的预约、人员的安排、服务的执行、后续的服务评价
    - 可能涉及多次与客户的互动，以及服务过程中的调整和确认
  - 客户互动
    - 频繁且持续
  - 物流和库存
    - 不涉及实物库存管理，但需要管理服务资源，如人员和时间
    - 需要考虑服务地点的逻辑安排
  - 定价和收费
    - 定价可能基于时间（如按小时计费）、项目（固定费用）或成果（基于结果的定价）。
    - 收费时点可能在服务前（预付款）、服务中（分期付款）或服务后（后付款）。
- 商品订单
  - 有形的产品或商品
  - 商品的类型、数量、规格、物理特性
  - 处理流程
    - 订单的接收、商品的拣选、包装、发货以及物流跟踪
  - 客户互动
    - 相对较少
    - 主要是售前、售后
    - 一旦发货，除非出现问题，否则一般不需进一步交互
  - 物流和库存
    - 详尽的库存管理，包括库存水平的监控、仓库管理和库存补充
    - 物流管理是关键部分，包括运输方式的选择、发货时间的控制和货物跟踪。
  - 商品订单
    - 价格通常基于单个或批量商品的固定价格
    - 支付通常在购买时一次性完成，除非涉及分期支付的特殊情况

## 事务性工作 {#transactional-work}

- 事务性工作 - Transactional Work
- 特点
  - 高频性 - 经常发生
  - 重复性 - 流程步骤相对固定
  - 规则驱动 - 有明确的业务规则和操作指南
  - 可衡量 - 工作结果和效率容易量化
  - 关注效率和准确性 - 主要目标是快速、准确地完成任务

## Entity vs Resource vs Object

> 相同点: 有唯一标识符，有属性和行为

- Entity
  - 实体
  - 通常是业务领域中的一个对象或概念
  - 通常是数据库中的表
  - 通常用于 ORM、数据模型、数据存储
  - Entity -> Property & Relationship & Collection
- Resource
  - 资源
  - 通常是网络或分布式系统中的一个对象或概念
  - 通常是 RESTful API 中的一个端点
  - 通常面向 Client/Web/前端
  - Resource -> URI & Method & Representation & Endpoint & View
  - urn -> Uniform Resource Name
- Object
  - 对象
  - 通常是一个实例
  - Object -> Field & Method
  - GraphQL Object 可以有自定义 field resolver

## displayOrder vs sort vs rank

希望能够在列表中按照一定的顺序展示数据。
一般使用浮点数或者 fraction。

---

- displayOrder
  - 显示顺序
  - 名字最为直观
- sort
  - 简短
- rank - 排名
  - 一般为整数

## Connection vs Association vs Link vs Join vs Relation

- Connection
  - 通用的多对多关系
- Association
  - 强调关联关系
- Link
  - 任何类型的多对多关系
- Join
  - 用于数据库设计和ORM框架
- Relation
  - 强调关系

---

- 字段
  - related
  - target
  - linked
  - associated
- 通用 Connection Entity
  - https://learn.microsoft.com/en-us/dynamics365/customerengagement/on-premises/developer/entities/connection?view=op-9-1
