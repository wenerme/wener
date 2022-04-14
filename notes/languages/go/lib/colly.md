---
title: colly
---

# colly

- [gocolly/colly](https://github.com/gocolly/colly)
  - Apache-2.0, Golang
  - 简单轻量的爬虫

:::caution

- 不支持 cache 插件，建议直接使用 httpcache
- 不要使用 dircache
  - 文件多了过后 fs 访问会很慢 - 建议 sqlite - 适合小文件很多的场景
  - 缓存的数据包含的信息好 - 不好分析删除
  - 作为参考 - 20w 文件，zfs，读取一个文件平均 ~20ms - 波动很大

:::

## Notes

- Cache
  - 路径 hex(sha1(url))
  - 内容 gob.NewDecoder(file).Decode(resp)
  - 使用 Rename 确保原子写入
- 回调 - 6种
  - OnRequest
  - OnError
  - OnResponse
  - OnHTML
    - OnError
  - OnXML
    - OnError
  - OnScraped
