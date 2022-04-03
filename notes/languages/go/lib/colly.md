---
title: colly
---

# colly

- [gocolly/colly](https://github.com/gocolly/colly)
  - Apache-2.0
  - 简单轻量的爬虫

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
