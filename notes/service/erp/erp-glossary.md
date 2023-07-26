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
  - 数字内容
  - 软件
  - 在线课程
  - 电子礼品卡
  - 在线服务 - 云服务
  - 会员订阅
  - 游戏内购
  - 知识付费
  - 竞猜
  - 数字资产
