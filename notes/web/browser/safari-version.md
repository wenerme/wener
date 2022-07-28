---
tags:
  - Version
---

# Safari Version

| version | date       |
| ------- | ---------- |
| 14.0    | 2020-09-17 |
| 15.0    | 2021-09-20 |

- 版本跟随 [macOS](../../os/darwin/macos-version.md)
- https://en.wikipedia.org/wiki/Safari_version_history

## 安装 Safari 14

```bash
curl 'http://swcdn.apple.com/content/downloads/28/16/071-89247-A_FL3O60MWEW/t9239srrs8ctufwxntefzkmvjhdqzvllb2/Safari14.1.2MojaveAuto.pkg' --output Safari14.1.2MojaveAuto.pkg
pkgutil --expand-full Safari14.1.2MojaveAuto.pkg ~/Downloads/Safari

open Safari/Payload/Applications/Safari.app
```

- https://swscan.apple.com/content/catalogs/others/index-10.15seed-10.15-10.14-10.13-10.12-10.11-10.10-10.9-mountainlion-lion-snowleopard-leopard.merged-1.sucatalog.gz
- https://gist.github.com/homebysix/5f2470f2ccfcc2d8bb5f882f89e2848b
- https://github.com/zhangyoufu/swscan.apple.com/blob/master/url.txt
