---
title: WebStorage
---

# WebStorage

- https://web.dev/storage-for-the-web/
- chromium [storage/browser/quota/quota_settings.cc](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/storage/browser/quota/quota_settings.cc)
- [Test of localStorage limits/quota](https://arty.name/localstorage.html)
- mdn
  - [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API)
  - [StorageManager](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager)
    - 估算使用量

**存储限制**

| name           | limit       |
| -------------- | ----------- |
| sessionStorage | 5 MB        |
| localStorage   | 5 MB        |
| Cookie         | 4 KB        |
| Cookie kv      | 1 KB        |
| IndexedDB      | 10 MB - 2GB |

:::info

- 不同浏览器限制不同，这里列举 安全/常见值

:::
