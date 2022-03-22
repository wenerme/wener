---
id: e-commerce
title: E-Commerce
---

# E-Commerce

- [E-Commerce](https://en.wikipedia.org/wiki/E-commerce)
- [开源的电商 B2C、B2B2C 电商系统有哪些？](https://www.zhihu.com/question/19635311)
- SKU - Stock Keeping Unit
  - A unique value that represents a distinct salable item (product or service) and all of its attributes.
  - 库存量单位, 区分单品, 单款单色单码
  - 国际条形码中的最小单位
  - 影响价格和库存,销售属性
- SPU - Standard Product Unit
  - 标准化产品单元

## magento

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
