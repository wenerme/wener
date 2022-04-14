---
title: Crawler FAQ
tags:
  - FAQ
---

# Crawler FAQ

## Heritrix vs ArchiveBox

- ArchiveBox - MIT,Python
  - Web UI is primary interface
  - Command Line is secondar interface
  - More like the WebArchive
  - Support more extract
  - Support Chrome integration
- Heritrix - Apache-2.0,Java
  - Configuration is primary interface
  - Web UI used for start, stop and monitor job
  - More like the **engine** of WebArchive
  - Support crawl full site

## 获取页面所有 URL

```js
copy(Array.from(new Set($$('a[href]').map((v) => decodeURI(v.href)))).sort());
```
