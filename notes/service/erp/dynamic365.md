---
title: Dynamics 365
---

# Microsoft Dynamics 365

- 模块
  - Business Central
  - Commerce
  - Customer Insights
  - Customer Service
  - Customer Voice
  - Field Service
  - Finance
  - Fraud Protection
  - Guides
  - Human Resources
  - Intelligent Order Management
  - Marketing
  - Project Operations
  - Remote Assist
  - Sales (Premium, Enterprise, Professional)
  - Supply Chain Management
- [Microsoft Dynamics 365 documentation](https://learn.microsoft.com/en-us/dynamics365/)

| 术语       | 定义                                                                                                                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 客户       | 客户可以是单位或联系人。 在企业到企业 (B2B) 场景下，客户通常是一个单位。 在企业到消费者 (B2C) 场景下，客户通常是一个联系人。 在商机中，客户是指商机适用的潜在客户。                                           |
| 单位       | 单位是指企业或组织。 单位可以设置为商机的潜在客户。                                                                                                                                                           |
| 联系人     | 联系人是指一个个人。 联系人可以设置为商机的潜在客户。                                                                                                                                                         |
| 活动       | 活动是一种提供跟踪和计划选项的表。 商机通常包含多个不同类型的活动，例如，任务、预约和电话联络。                                                                                                               |
| 业务流程流 | 业务流程流 (BPF) 是 Microsoft Power Platform 中的一种自动化功能。 BPF 位于一个表页面，可为用户提供关于数据收集的指导和可预测行动计划。 对于商机，业务流程流可以指导用户完成将商机转化为销售所需的步骤和阶段。 |
| 潜在客户   | 潜在客户用于确定某人是否可能成为潜在的客户。 具备资格的潜在客户会转化为商机。                                                                                                                                 |
| 产品目录   | 产品目录是一个记录集合，旨在协助管理销售交易所涉及的产品、价目表、折扣和产品系列。 产品目录中的产品可以添加为商机的明细项。                                                                                   |
| 报价单     | 报价单是产品或服务的正式报价，为客户列出了具体价格和相关付款期限。 您可以从商机记录创建报价单。                                                                                                               |
| 订单       | 订单是依据指定条款交付货物和服务的已确认请求。 或者，它还可以是客户已接受的报价单。                                                                                                                           |
| 发票       | 发票是已向客户开具帐单的订单或销售记录， 其中包括有关所购买产品或服务的详细信息。                                                                                                                             |

- Ticker Symbol - 股票代码、证券代码
- Entitlements - 服务权限、配额
  - Phone, Email, Web, Facebook, Twitter, IoT

## Entity

- View
- Stats
- Status
- List
- Form
- Summary
- Detail
- Import/Export
- Template

## Access

- Read
- Write
- Create
- Delete
- Append
- Append To
- Assign
- Share

## Customer Service Hub

- My Work
  - Dashboards
  - Activities
- Customers
  - Accounts
  - Contacts
  - Social Profiles
- Service
  - Cases
  - Queues
- Knowledge
  - Articles
  - Search
- Template
  - Email Templates
  - Email Signatures

## Sales Hub

- Sales
  - Sequences
  - Timeline
  - Assistant
  - Stakeholders
  - Competitors
  - Business Process Flows

---

- 活动 可以转换为 商机

| 信息         | 说明                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------ |
| 利益干系人   | Dynamics 365 中对商机有既得利益的联系人。 利益干系人可以包括项目经理、董事会成员、律师和赞助商。 |
| 销售团队     | 将会参与到将商机转化为销售的过程中的内部团队成员。                                               |
| 竞争对手     | 您可能在交易中与之竞争的任何外部竞争对手。                                                       |
| 定价信息     | 将使用的价目表以及用于估算商机价值的计算方法。                                                   |
| 商机明细项目 | 作为解决方案的一部分向客户推荐的特定产品和服务。                                                 |

---

- Viva Sales

---

- My Work
  - Sales Accelerator
  - Activities
  - Dashboards
- Customers
  - Accounts
  - Contacts
- Sales
  - Leads
  - Opportunities
- Collateral - 销售辅助工具/配套材料
  - Quotes
  - Orders
  - Invoices
  - Products
  - Sales Literature
- Marketing
  - Marketing List - 营销名单/邮件列表 - 目标客户群
    - 邮件列表
    - 电话列表
    - 微信列表
    - 邮寄列表
    - 社交媒体列表
- AppSettings
  - Sales Administration
    - Sales Territories
    - Marketing Settings
  - Product Catalog
    - Families and products
    - Discount Lists
    - Price Lists
    - Unit Groups
  - Performance management
    - Goals
    - Goal Metrics
      - No. of Product Units
      - Revenue
      - No. of Cases
    - Rollup Queries

---

- https://dynamics.microsoft.com/zh-cn/sales/overview/
- Dynamics 365 Sales Professional

## State vs Status

- Status
  - 显示为 **Status Reason**
  - 可以修改
  - 绑定 State - 但修改 Status 时会对应修改 State
- State
  - 显示为 **Status**
  - 不可以修改

---

- [Define status reason transitions for a Case entity or custom entity](https://learn.microsoft.com/en-us/dynamics365/customerengagement/on-premises/customize/define-status-reason-transitions)
- https://www.msdynamicsblog.com/dynamics-crm-state-status-codes-for-common-entities/

## One Contact to Multi Account

- Connection
