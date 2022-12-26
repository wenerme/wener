---
tags:
  - FAQ
---

# GB FAQ

## 营业执照编码

- 13 位编码
- 18 位编码 - [GB 32100-2015](./gb-32100.md) 《法人和其他组织统一社会信用代码编码规则》
  - 2016 年 7 月 1 日后，“三证合一、一照一码”，将营业执照正副本照面加载的 15 位注册号调整为 18 位的法人和其他组织统一社会信用代码（个体工商户营业执照除外）。
  - 数字+大写英文字母 - 排除 I、O、Z、S、V
- 15 位 营业执照 编码 [](./gs-15.md)

**18 位编码**

> 统一社会信用代码 [GB 32100](./gb-32100.md)

| len | range | mean                                                     |
| --- | ----- | -------------------------------------------------------- |
| 1   | 1     | 登记管理部门代码                                         |
| 1   | 2     | 机构类别代码                                             |
| 6   | 3-8   | 登记管理机关行政区划码                                   |
| 9   | 9-17  | 主体标识码/组织机构代码 - [GB 11714-1997](./gb-11714.md) |
| 1   | 18    | 校验码                                                   |

## 行政区划代码

- 非常多 ID 里都会用到 6 位行政区划
- 2021年10月31日 http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2021/index.html
- 2020 http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2020/index.html
- 2019 http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2019/index.html
- [modood/Administrative-divisions-of-China](https://github.com/modood/Administrative-divisions-of-China)
