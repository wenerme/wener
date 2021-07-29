---
title: License
---

# License

- [SPDX License List](https://spdx.org/licenses/)
- [choosealicense](https://choosealicense.com/appendix/)
- [CNCF allowed third-party license policy](https://github.com/cncf/foundation/blob/master/allowed-third-party-license-policy.md)
  - BSD, MIT, ISC, Python-2.0, PostgreSQL, X11, Zlib, Golang [PATENTS](https://golang.org/PATENTS)
- [Google thirdparty license policy](https://opensource.google/docs/thirdparty/licenses/)
  - 不允许
    - BCL, CERN Open Hardware License 2 - Strongly Reciprocal Variant, CC BY-SA
    - GPL, LGPL
    - Nethack General Public License
    - NPL, QPL, Sleepycat License, PresubmitR Open Hardware License
    - qmail Terms of Distribution

# AGPL

- 基于 GNU GPL - 增加通过网络提供服务的条款
- 避免 GPL 的 Application Service Provider 场景
- [List of software under the GNU AGPL](https://en.wikipedia.org/wiki/List_of_software_under_the_GNU_AGPL)
  - 值得注意的项目: Minio, Grafana, Nextcloud, OnlyOffice, Wiki.js
- 参考
  - Choose [AGPL 3.0](https://choosealicense.com/licenses/agpl-3.0/)
  - Google [AGPL Policy](https://opensource.google/docs/using/agpl-policy/)
    - 不允许使用

一般来说 DB 类型项目不会可能修改源码，但是服务性质的应用可能会，因此选择要慎重。

## CC - Creative Commons

- 知识共享许可协议
- [License Versions](https://wiki.creativecommons.org/wiki/License_Versions)
- [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- [CC-BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/)
- [choose](https://creativecommons.org/choose/)

| abbr.    | 署名 | 混合 | 商业 | 自由文化作品 | OKI |
| -------- | ---- | ---- | ---- | ------------ | --- |
| CC0      | 🟢   | 🟢   | 🟢   | 🟢           | 🟢  |
| BY       | 🟡   | 🟢   | 🟢   | 🟢           | 🟢  |
| BY-SA    | 🟡   | 🟢   | 🟢   | 🟢           | 🟢  |
| BY-NC    | 🟡   | 🟢   | 🔴   | 🔴           | 🔴  |
| BY-NC-SA | 🟡   | 🔴   | 🔴   | 🔴           | 🔴  |
| BY-ND    | 🟡   | 🔴   | 🟢   | 🔴           | 🔴  |
| BY-NC-ND | 🟡   | 🔴   | 🔴   | 🔴           | 🔴  |

<!--  ✅  🟡🟢🔴🟠⚫️⚪️🟤 -->

- BY - Attribution - 署名
- SA - ShareAlike - 相同方式共享
- NC - Noncommercial - 非商业性使用
- ND - No Derivative Works
