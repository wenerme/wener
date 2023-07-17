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

## Account - 客户 {#account}

## Contact - 联系人 {#contact}

- 企业外部人员

## Lead - 线索 {#lead}

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
