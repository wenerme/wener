---
title: Wayback Machine
---

# Wayback Machine

- save now 限流 15/分钟 - Block IP 5 分钟
- [Restoring](http://wiki.archiveteam.org/index.php?title=Restoring)

## URL
- https://archive.org/help/wayback_api.php
- http://en.wikipedia.org/wiki/Help:Using_the_Wayback_Machine
  - http://web.archive.org/web/YYYYMMDDhhmmss*/http://domain/page
  - http://web.archive.org/web/YYYYMMDDhhmmssid_/http://domain/page
    - 注意 id_ 后缀
    - 返回原始内容
- 查询通配内容
  - http://web.archive.org/web/*/http://archiveteam.org/*
  - http://web.archive.org/web/*/archiveteam.org/*
- 查询子域名
  - https://web.archive.org/cdx/search/cdx?url=*.com.br/&matchType=domain&limit=1000
  - http://web.archive.org/cdx/search/cdx?url=gov.br/&matchType=domain
  - https://archive-it.org/explore?q=.com.br&page=1&show=Sites
- 参考
  - wget https://gist.github.com/mildred/7a33bb9c263f025b59e6

## cdx

- https://github.com/internetarchive/wayback/tree/master/wayback-cdx-server


## cli

```bash
function ia-save() { curl -s -I "https://web.archive.org/save/$*" | grep Content-Location | awk '{print "https://web.archive.org"$2}' }
ia-save http://twitter.com/atomotic
```
