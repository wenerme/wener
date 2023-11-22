---
tags:
  - Glossary
---

# Address Book - 地址簿

- 企业内部人员
- 例如
  - LDAP 里有地址簿的相关结构
  - vCard 交换名片信息
  - CardDav 协议交换地址簿信息
  - Exchange Server 用于存储地址簿在企业内部分享
- 参考
  - [Address Book](https://en.wikipedia.org/wiki/Address_book)
  - [pimutils/vdirsyncer](https://github.com/pimutils/vdirsyncer) - Synchronize calendars and contacts.
  - [scheibler/khard](https://github.com/scheibler/khard) - Console carddav client
  - [3 open source tools to manage your contacts](https://opensource.com/article/20/1/sync-contacts-locally)

## User - 员工/用户 {#user}

## Customer - 客户 {#customer}

- 分为
  - Account - 账户
    - 公司、企业
  - Contact
    - 联系人
- 账户的联系人

## Account - 账户 {#account}

## Contact - 联系人 {#contact}

- 企业外部人员

## Case {#case}

- 客户案例或客户服务案件

## Lead - 线索 {#lead}

- Inbound leads
  - 客户主动
- Outbound leads
  - 客户被动
- State
  - Open
  - 有效
  - 无效
    - 只读
    - 可重新激活
- 产生场景
  - 有人表示对产品感兴趣，想了解更多信息
  - 有人在社交媒体下留下联系信息
  - 有人回应了 RichOut 请求
- lead qualification
- 参考
  - Lead entity reference https://learn.microsoft.com/en-us/dynamics365/customerengagement/on-premises/developer/entities/lead
  - Lead table https://learn.microsoft.com/en-us/dynamics365/sales/developer/lead-entity
  - Lead table/entity reference https://learn.microsoft.com/en-us/dynamics365/sales/developer/entities/lead
  - https://hc.jiandaoyun.com/solution/14583
    - 需求发现 - 产品介绍 - 需求确认 - 方案报价 - 商务谈判 - 赢单｜输单｜无效

---

- https://learn.microsoft.com/en-us/training/modules/manage-leads-dynamics-365-sales/1-leads-overview
  - Lead -> Opportunity -> Quote -> Order -> Invoice
  - Qulify -> Develop -> Propose -> Close -> Fulfill
  - Lead 可以转换为 Opportunity, Case, Lead
- 判断是否使用线索的几点考虑:
  - 是否投入大量时间和资金产生潜在客户名单,如大规模邮件或电话营销?
  - 是否保留符合目标人群但信息有限的名单,如缺少联系方式?
  - 是否有专门团队处理名单,联系分析以识别品质线索?
  - 是否需要区分潜在客户名单和现有客户名录,避免混淆?
- 如果上述情况成立,使用线索管理可以有助于:
  - 有效处理大量未分类客户名单
  - 提高销售联系效率
  - 分析不同渠道线索质量
  - 发现并培育有潜力的客户
  - 与现有客户明确区分

## Invoice

- order
- 产品信息

## 销售漏斗

- sales funnel
- 参考
  - https://www.lucidchart.com/blog/visualizing-the-sales-funnel

## Collateral

- Collateral - 销售辅助工具/配套材料
- 产品手册、宣传页
- 产品规格表、功能表
- 产品演示文稿
- 客户成功案例白皮书
- 数据表、报告
- 常见问题 FAQ
- 价格单、报价单
- 折扣优惠券
- 试用版、产品样品
- 视频演示、产品图片
- Logo、邮件签名

## 销售阶段

> 产出订单

- 销售阶段 应该在 商机 上
- Sales Stage
- 7-step sales process
  - Prospecting - 寻找潜在客户
  - Preparation - 准备工作
  - Approach - 接触客户
  - Presentation - 产品介绍
  - Handling objections - 处理疑虑
  - Closing - 封单
  - Follow-up - 后续跟进
- 需求发现 - 产品介绍 - 需求确认 - 方案报价 - 商务谈判 - 赢单｜输单｜无效
- SaleStage
  - New/Initiate
  - Prospect
  - Develop
  - Qualify
  - Propose
  - Negotiate
  - Close
  - Win
  - Lose
  - Cancel
- 参考
  - https://www.lucidchart.com/blog/what-is-the-7-step-sales-process

---

- Qualify - 验证
  - 这个阶段用于验证和判断潜在客户的需求及购买能力,对销售机会进行初步评估。
- Develop - 开发
  - 根据初步洽谈,进一步开发销售机会,深入了解客户需求。
- Propose - 提议
  - 根据客户需求制定解决方案并进行正式的商业提议。
- Close - 成交
  - 进行最后的谈判并达成销售协议,完成交易的成交。
- Identify - 识别
  - 通过各种渠道识别和发现新的销售机会。
- Research - 调研
  - 对销售机会进行调研分析,评估可行性。
- Resolve - 解决
  - 在销售过程中解决客户的问题、疑虑或反对,争取达成一致。
- Approval - 审批
  - 获取内部决策者对销售方案、折扣等的审批。

## 服务阶段

> 交付服务

- Service Request- 服务请求
  - 客户提出服务需求,创建服务请求。
  - 主要工作
    - 确认客户服务需求
    - 创建服务请求单
    - 指派负责人
    - 沟通服务范围
    - 提供服务估算
    - 签订合同
    - 创建计划
    - 收取定金
- Requirement Analysis - 需求分析
  - 与客户沟通,确认并分析服务需求详情。
- Solution Design - 设计解决方案
  - 根据需求设计解决方案,制定服务交付计划。
- Service Delivery - 服务交付
  - 根据设计方案和计划提供服务,交付项目成果。
  - 例如：服务办理、材料递交
- Customer Acceptance - 客户验收
  - 验证客户对服务成果的接受程度,取得客户签收。
  - 类似表述
    - Customer Sign-off
    - Client Validation
    - User Approval
    - Customer Review and Confirmation
- Evaluation & Feedback - 反馈评估
  - 收集客户对服务的反馈,完善服务质量。
  - 聚焦**当前**项目服务质量的评估
  - 收尾阶段
  - 测量**客户**满意度
- Ticketing - 票证管理 - 工单管理
  - 管理服务过程中的问题票证,跟进处理。
- Billing & Settlement - 计费结算
  - 按合同和工作量进行服务计费和结算。
- Continuous Improvement - 持续改进
  - 持续优化服务流程和质量,提升客户满意度。
  - 着眼**长期**服务流程的优化
  - 长周期活动
  - 提高服务能力

---

- 需求分析、设计、交付、验收

### 需求分析 vs 设计解决方案

- 需求分析
  - 确定问题
  - 收集和理解客户的需求
- 设计解决方案
  - 提供答案
  - 根据需求提供解决方案

## Order - 订单 {#order}

- 电商订单 - Order - 从电商平台生成,具有平台特有信息,自动化程度高
  - 电商平台和消费者
  - 自动化
  - 包含平台交易佣金
- 销售订单 - Sales Order - 销售物品为主,通常有物流运输,订单内容是商品明细
  - 销售方和购买方
  - 侧重执行和物流
  - 包含产品费用及物流费用
- 服务订单 - Service Order - 提供服务为主,通常没有物流运输,订单内容是服务项
  - 提供方和消费方
  - 侧重组织和交付
  - 包含服务费用

---

**电商订单**

- 订单状态
- State - 状态
  - 待付款 - 下单后等待买家付款
  - 已付款 - 买家完成付款
  - 已发货 - 卖家已发出商品
  - 已收货 - 买家收到商品
  - 已完成 - 订单成功结束
  - 已取消 - 订单被取消
  - 申请退款 - 买家申请退款
  - 退款中 - 退款正在处理
  - 已退款 - 退款完成
- Status - 阶段
  - 已下单 - 订单生成
  - 支付确认 - 收到支付消息
  - 出库处理 - 商品开始备货出库
  - 已出库 - 商品出库
  - 运输中 - 商品在途运输
  - 已签收 - 买家签收商品
  - 申请取消 - 取消订单请求
  - 取消确认 - 确认取消订单
  - 退款审核 - 审核退款申请
  - 完成退款 - 完成退款操作

## 商品类型

- 实物商品
- 虚拟商品
  - 服务
  - 数字内容 - 电子书、音乐、视频、图片
  - 软件
  - 在线课程
  - 电子礼品卡
  - 在线服务 - 云服务
  - 会员订阅
  - 游戏内购
  - 知识付费
  - 竞猜
  - 数字资产 - 比特币、NFT

## 企业数字化

- 数字化文档和数据
- 自动化工作流程
- 在线客户服务和互动
- 数字化销售和营销
- 移动优先策略
- 数据分析和智能决策
- 网络安全和数据保护
- 员工培训和文化转变

**数字化文档和数据**

- 文档扫描和转换
- 电子文档管理系统（EDMS）
- 数据采集和存储
- 云存储和访问
- 数据安全和隐私
- 数据分析和可视化
- 集成和自动化

**数字化文档和数据 vs KB**

1. **目的和功能**：
   - **数字化文档和数据管理**：侧重于将文档和数据转换为电子格式，并提供存储、检索和共享这些资料的方法。目的在于提高信息管理的效率，确保信息的安全性和可访问性。
   - **知识库（Knowledge Base）**：是一种用于集中存储和共享专业知识和信息的系统。知识库不仅包括文档和数据，还包括解决方案、经验、技巧和其他形式的专业知识。它的目的在于促进知识共享，提高组织的知识水平和问题解决能力。
2. **内容类型**：
   - 数字化文档管理通常包括各种类型的商业文档，如合同、报告、财务记录等。
   - 知识库包含更广泛的内容，比如常见问题解答（FAQs）、教程、政策指南、最佳实践、案例研究等。
3. **使用方式**：
   - 数字化文档和数据管理系统多用于日常的业务运作，如记录保持、报告生成和信息存储。
   - 知识库更多用于提供参考信息、教育资源和决策支持，帮助员工和客户解决特定问题或提高工作效率。
4. **用户互动**：
   - 数字化文档管理系统的互动性相对较低，主要是存储和检索功能。
   - 知识库则鼓励用户互动，包括添加内容、更新信息、评论和分享知识。

---

- 实现考量
  - 共享底层数据存储
  - 集成搜索
  - 统一的用户界面
  - 内容标签和分类
  - 权限管理
  - 内容互动和更新
  - 数据分析报告

**实施**

> 以终为始

- 明确数字化目标
- 评估当前状态
- 制定数字化路线图
- 技术投资和升级
- 流程重构和优化
- 员工培训和文化变革
- 持续评估和改进

## 文化变革

文化变革指的是在一个组织内部实施的一系列有意识的努力，旨在改变和提升组织的核心价值观、信念、行为方式和工作方式。这通常涉及到改变组织的内部环境，包括工作习惯、沟通方式、决策流程、员工互动和领导方式等。文化变革的目的是为了更好地适应外部环境的变化，提高组织效率，提升员工满意度，增强组织的竞争力。

- Prosci ADKAR模型
- Kotter的8步变革过程
