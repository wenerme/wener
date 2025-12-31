---
title: 国内商业数据源
tags:
  - Data
  - China
  - Business
  - Crawler
---

# 国内商业数据源 (Chinese Business Data Sources)

## 官方与信用平台

- [深圳企业信用信息](https://qr.szcredit.org.cn/GJQYCredit/GSZJGSPTS/QYGS.aspx)
- [百度爱企查](https://aiqicha.baidu.com/)
- [国家标准全文公开系统 (SAMR)](http://std.samr.gov.cn/gb/search/gbQueryPage?searchText=&ics=&state=&ISSUE_DATE=&sortOrder=asc&pageSize=50&pageNumber=4)
- [隐私保护](https://privacy.aiuys.com/)

## B2B & 黄页 (商业数据源)

> **来源类型**: 年报, 官网, B2B 网站, 招聘网站, 外卖平台, 地图服务 (百度地图).

- 1024商务网
- 1688 (阿里巴巴)
- 51搜了么 / 51souleme
- 58同城
- 912688.com
- 一比多 (Yibiduo)
- 中华企业录
- 中国交易网
- 中国网库
- 九正建材网
- 企领网
- 会搜网
- 全天候贸易网
- 八方资源网
- 列表网 / 利库搜黄页
- 华丰商务
- 慧聪网
- 找找去
- 百姓网
- 百度爱采购
- 第1抢
- 网商汇
- 金安发
- 阿土伯
- 顺企网
- 食品商务网
- 马可波罗网
- 黄页88
- 企业梦工厂

## 爬虫场景及笔记

### 归档资源

- [QY6 (Archive)](http://web.archive.org/web/*/http://www.qy6.com/)
- [NewJobs 实习 (归档参考)](http://intern.newjobs.com.cn/NewJob.EnPro/trainee/NewsDetailsH?commpanyId=2236)

### 反爬虫与验证

- [IP 信息 (AS7941)](https://ipinfo.io/AS7941)
- [Distil Networks Bot Directory](https://www.distilnetworks.com/bot-directory/bot/archive-org_bot/)

### 代码片段 (Code Snippets)

```js
// 提取 data-index 元素的链接
copy(
  $$('[data-index] a')
    .map((v) => v.href)
    .join('\n'),
);
```

```bash
# 循环分页 (示例)
for i in $(seq 137); do echo "http://intern.newjobs.com.cn/NewJob.EnPro/trainee/PositionListF?name=&p=$i"; done
```
