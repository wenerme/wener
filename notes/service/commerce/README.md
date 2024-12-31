---
title: 电商
---

# 电商

- [E-Commerce](https://en.wikipedia.org/wiki/E-commerce)
- SKU - Stock Keeping Unit
  - A unique value that represents a distinct salable item (product or service) and all of its attributes.
  - 库存量单位, 区分单品, 单款单色单码
  - 国际条形码中的最小单位
  - 影响价格和库存,销售属性
- SPU - Standard Product Unit
  - 标准化产品单元
- 产品 - 销售 - 订单 - 付款 - 服务 - 评价反馈

## Awesome

- [medusa](./medusa.md)
  - MIT, TS, Postgres, MikroORM, NextJS
- [magento/magento2](https://github.com/magento/magento2)
  - OSL-3.0, PHP, MySQL
  - by Adobe
- [spree/spree](https://github.com/spree/spree)
  - AGPL-3.0, Ruby, Rails, Postgres
  - 4.10 - BSD-3 -> AGPL-3.0
- [reactioncommerce/reaction](https://github.com/reactioncommerce/reaction)
  - GPL-3.0, Node, Meteor, MongoDB, GraphQL
  - API-first, headless commerce platform
- [evershopcommerce/evershop](https://github.com/evershopcommerce/evershop)
  - GPL-3.0, JS, Node.js, express, tailwindcss, React, Postgres
- https://github.com/topics/e-commerce
- [开源的电商 B2C、B2B2C 电商系统有哪些？](https://www.zhihu.com/question/19635311)

## PrestaShop

```
# 在线 demo http://demo.prestashop.com/
# https://hub.docker.com/r/prestashop/prestashop/
docker run -ti -d --name prestashop-mysql -e MYSQL_ROOT_PASSWORD=admin mysql
docker run -ti --name prestashop --link prestashop-mysql -e DB_SERVER=prestashop-mysql -p 8080:80 prestashop/prestashop
```

# 中国电商模板参考

- [中国联通积分商城](http://jf.10010.com)
- [中国移动积分商城](http://jf.10086.cn)
- [中国移动商城](http://shop.10086.cn/)
- [中国电信](http://www.189.cn/)
- [中国电信欢 Go](http://gd.189.cn/)

# FAQ

## E-Commerce vs Commerce

| 特点     | 电商                                     | 传统商务                       |
| -------- | ---------------------------------------- | ------------------------------ |
| 交易媒介 | 通过互联网进行交易                       | 线下实体店、面对面交易         |
| 交易地点 | 无地域限制，随时随地                     | 受限于实体店的地理位置         |
| 客户体验 | 数字化体验（如网站、应用程序）           | 物理化体验（如面对面交流）     |
| 运营成本 | 较低（减少租金、人力成本）               | 较高（包括租金、人员、库存等） |
| 产品展示 | 虚拟展示（图片、视频、AR技术）           | 实物展示                       |
| 覆盖范围 | 全球范围，潜在客户基数大                 | 区域范围，主要是本地客户       |
| 数据使用 | 高度依赖数据分析（如推荐算法、行为追踪） | 数据使用较少，更多依赖经验     |
| 互动方式 | 数字化交互（如聊天机器人、邮件）         | 直接交互（如销售员服务）       |

- 全渠道 - Omnichannel
- 电商主导，融合是趋势
- 新需求
  - 快速交付
  - 沉浸式体验
- 边界越来越模糊
  - 例如 以前电话强调 座机和手机的区别，现在已经不再重要，电话默认指代手机
