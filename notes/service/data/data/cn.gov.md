---
title: 中国政府数据资源
tags:
  - Data
  - China
  - Government
  - Crawler
---

# 中国政府数据资源

## 官方机构与平台

- [国务院](http://www.gov.cn/gjjg/2005-08/01/content_18608.htm)
- [国家企业信用信息公示系统](http://www.gsxt.gov.cn)
- [国家统计局](http://www.stats.gov.cn/tjsj/tjbz/xzqhdm/) (行政区划代码)
- [生态环境部 (MEP)](http://www.mep.gov.cn/)

### 商标与工商 (SAIC)

- [中国商标网 (CTMO)](http://sbj.saic.gov.cn/)
- [商标网上检索系统](http://wsjs.saic.gov.cn/)
  - 包括商标近似、综合、状态、公告、商品/服务项目查询。

### 食品药品 (NMPA/CFDA)

- [国家药品监督管理局 (NMPA)](http://www.nmpa.gov.cn/) (原 CFDA)
- [数据查询](http://app1.sfda.gov.cn/datasearch/face3/dir.html)
  - 涵盖食品、药品、医疗器械、化妆品等。

### 知识产权 (CNIPA/SIPO)

- [国家知识产权局 (CNIPA)](http://www.cnipa.gov.cn/)
- [专利检索 (PatentStar)](http://www.patentstar.com.cn/)

## 商业查询平台

- [天眼查](https://www.tianyancha.com/)
- [北大法宝](http://www.pkulaw.cn/)

## 区域服务

### 上海

- [上海市市场监督管理局: 名称状态](http://www.sgs.gov.cn/shaic/workonline/app_name_list.html?section=3&itemId=1)
- [企业信息查询](http://www.sgs.gov.cn/lz/etpsInfo.do?method=index)
- [上海著名商标](http://www.sgs.gov.cn/shaic/bmcx/brand_list.html)

## 常用分类与标准

- **行业分类**: [GB/T 4754—2017](http://www.stats.gov.cn/tjsj/tjbz/hyflbz/201710/t20171012_1541679.html)
- **上市公司**: [证监会指南 2012](https://biz.sse.com.cn/cs/zhs/xxfw/flgz/html/p0079.pdf)

## 爬虫笔记

### 商标局 (SAIC)

商标公告查询 `curl` 示例:

```bash
curl 'http://sbcx.saic.gov.cn:9080/tmois/wsggcx_getGgaoMainlate.xhtml' \
  -H 'User-Agent: Mozilla/5.0 ...' \
  --data 'gmBean.anNum=1557&gmBean.anType=TMZCZC&gmBean.regNum=&gmBean.pageNum=&pagenum=12&pagesize=15&sum=1281&countpage=86&goNum=11' \
  --compressed
```

### 天眼查 API (非官方)

```bash
# 获取股权比例 (需要 ID)
curl https://www.tianyancha.com/equity/equityratio.json?id=3102674655
```
