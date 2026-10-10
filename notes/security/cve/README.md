---
title: CVE
---

# CVE

| abbr.  | stand for                                            | cn                                     |
| ------ | ---------------------------------------------------- | -------------------------------------- |
| CVE    | Common Vulnerabilities and Exposures                 | 通用漏洞和暴露                         |
| CWE    | Common Weakness Enumeration                          | 通用弱点枚举                           |
| CVSS   | Common Vulnerability Scoring System                  | 通用漏洞评分系统                       |
| EPSS   | Exploit Prediction Scoring System                    | 漏洞利用预测评分系统                   |
| KEV    | Known Exploited Vulnerabilities                      | 已知被利用的漏洞                       |
| SSVC   | Stakeholder-Specific Vulnerability Categorization    | 面向利益相关方的漏洞分类与处置决策     |
| CNA    | CVE Numbering Authority                              | CVE 编号授权机构                       |
| NVD    | National Vulnerability Database                      | 美国国家漏洞数据库                     |
| CPE    | Common Platform Enumeration                          | 通用平台枚举，用于标识产品与版本       |
| CAPEC  | Common Attack Pattern Enumeration and Classification | 通用攻击模式枚举与分类                 |
| CISA   | Cybersecurity and Infrastructure Security Agency     | 美国网络安全和基础设施安全局           |
| NIST   | National Institute of Standards and Technology       | 美国国家标准与技术研究院               |
| FIRST  | Forum of Incident Response and Security Teams        | 事件响应与安全团队论坛                 |
| CSAF   | Common Security Advisory Framework                   | 通用安全公告框架                       |
| SBOM   | Software Bill of Materials                           | 软件物料清单                           |
| VEX    | Vulnerability Exploitability eXchange                | 漏洞可利用性信息交换                   |
| PoC    | Proof of Concept                                     | 概念验证，用于证明漏洞或利用机制       |
| RCE    | Remote Code Execution                                | 远程代码执行                           |
| LPE    | Local Privilege Escalation                           | 本地权限提升                           |
| EoP    | Elevation of Privilege                               | 权限提升，常见于微软安全公告           |
| DoS    | Denial of Service                                    | 拒绝服务                               |
| DDoS   | Distributed Denial of Service                        | 分布式拒绝服务                         |
| UAF    | Use After Free                                       | 释放后使用                             |
| OOB    | Out-of-Bounds                                        | 越界访问                               |
| TOCTOU | Time-of-check Time-of-use                            | 检查与使用之间的竞态                   |
| SQLi   | SQL Injection                                        | SQL 注入                               |
| XSS    | Cross-site Scripting                                 | 跨站脚本                               |
| CSRF   | Cross-Site Request Forgery                           | 跨站请求伪造                           |
| SSRF   | Server-Side Request Forgery                          | 服务端请求伪造                         |
| XXE    | XML External Entities                                | XML 外部实体                           |
| IDOR   | Insecure Direct Object Reference                     | 不安全的直接对象引用，常涉及对象级越权 |

## 分级

CVSS 用 0.0–10.0 表达漏洞的技术严重性。CVSS 3.x 与 4.0 使用相同的等级区间：

| 等级     | 中文 |    score |
| -------- | ---- | -------: |
| Critical | 严重 | 9.0–10.0 |
| High     | 高危 |  7.0–8.9 |
| Medium   | 中危 |  4.0–6.9 |
| Low      | 低危 |  0.1–3.9 |
| None     | 无   |      0.0 |

- `—` / `N/A` 通常表示未评分或数据缺失，与 0.0 分不同。
- CVSS 2.0 的区间不同，没有单独的 Critical 等级；引用评分时要保留版本。
- CNA 负责在授权范围内分配 CVE 编号、发布记录；NVD 在 CVE 信息上补充评分、弱点和产品匹配等信息。两者可能基于不同证据或攻击假设给出不同评分，需同时看来源与评分向量。

### CVSS 评分向量

评分向量记录每个指标的取值，便于解释分数。例如下面的 CVSS 3.1 基础评分为 **9.8**：

```text
CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H
```

| 指标 | 全称                | 含义与 CVSS 3.1 取值                                                                        |
| ---- | ------------------- | ------------------------------------------------------------------------------------------- |
| AV   | Attack Vector       | 攻击途径：N 网络、A 相邻网络、L 本地、P 物理接触；本地利用也可由已通过 SSH 登录的攻击者发起 |
| AC   | Attack Complexity   | 攻击复杂度：L 低、H 高；关注攻击者不能完全控制的利用条件，如需要赢得竞态                    |
| PR   | Privileges Required | 利用前所需权限：N 无、L 低、H 高                                                            |
| UI   | User Interaction    | 是否需要攻击者之外的用户配合：N 不需要、R 需要，如打开恶意文件                              |
| S    | Scope               | 影响是否跨安全授权边界：U 不变、C 改变；普通提权不自动意味着 S:C                            |
| C    | Confidentiality     | 机密性影响，如敏感信息泄露；N 无、L 低、H 高                                                |
| I    | Integrity           | 完整性影响，如未授权修改数据；N 无、L 低、H 高                                              |
| A    | Availability        | 可用性影响，如服务中断或资源耗尽；N 无、L 低、H 高                                          |

这个例子表示：可经网络利用，复杂度低，无需预先取得权限或等待用户操作；在同一安全授权边界内，对机密性、完整性、可用性都有高影响。`AV:N` 描述利用途径，具体部署是否暴露到公网还要单独判断。

- CVSS 3.1：Base（基础）、Temporal（时间）、Environmental（环境）三组指标；公告中常见的是基础评分。
- CVSS 4.0：Base（基础）、Threat（威胁）、Environmental（环境）、Supplemental（补充）四组指标；补充指标不改变分数。字段和算法有变化，上面的向量读法限于 3.1。

### 严重性与修复优先级

| 信息                    | 回答的问题                                        | 使用边界                                                                             |
| ----------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------ |
| CVSS                    | 在给定攻击条件下，技术后果有多严重？              | 基础评分不包含具体资产的业务价值、当前部署暴露面等信息                               |
| EPSS                    | 该 CVE 未来 30 天在真实攻击中被利用的概率有多大？ | 输出 0–1 的概率；percentile 是相对排名，不能当作概率；也不等于某台主机会被攻破的概率 |
| CISA KEV                | 是否已有被真实攻击利用的证据并被 CISA 收录？      | 属于已知事实；未收录不能证明没有利用活动                                             |
| PoC（Proof of Concept） | 是否已有代码或步骤证明漏洞机制可触发？            | PoC 可能只演示崩溃或部分能力；公开 PoC 的存在不直接证明已有在野攻击                  |

实际排期还要结合资产是否受影响、攻击入口是否可达、利用所需权限、补丁或缓解措施，以及业务影响。例如，公网暴露且已被利用的漏洞，可能比隔离环境中尚不可达的高分漏洞更需先处理。

## 分类

CVE 标识具体漏洞记录，CWE 描述可能导致漏洞的弱点类型。多个 CVE 可以归入同一个 CWE，一个 CVE 也可能涉及多个 CWE。分类可以同时描述成因、攻击途径和利用后果，各维度会重叠。

### 按弱点成因

| 类型                                                | 常见 CWE                | 含义                                                                        |
| --------------------------------------------------- | ----------------------- | --------------------------------------------------------------------------- |
| 注入                                                | CWE-89、CWE-78、CWE-917 | 外部输入改变 SQL、操作系统命令或表达式的语义，执行了预期之外的操作          |
| 跨站脚本（XSS，Cross-site Scripting）               | CWE-79                  | 不可信内容进入网页，可能在访问者浏览器中执行攻击者脚本                      |
| 服务端请求伪造（SSRF，Server-Side Request Forgery） | CWE-918                 | 攻击者影响服务端请求的目的地，可能访问内网或云元数据服务                    |
| 路径遍历                                            | CWE-22                  | 文件路径越出预期目录，可能导致未授权文件读取或写入                          |
| 认证、授权缺失                                      | CWE-306、CWE-862        | 认证确认“你是谁”，授权判断“你能做什么”；已登录用户也可能利用越权漏洞        |
| 内存安全错误                                        | CWE-416、CWE-787        | 释放后使用（UAF，Use After Free）或越界写，可能破坏内存、泄露数据或执行代码 |
| 竞态条件                                            | CWE-362                 | 并发访问共享资源时同步不足，特定执行顺序破坏原有检查或状态约束              |
| 恶意代码植入                                        | CWE-506                 | 产品中包含故意植入的恶意逻辑；构建流程或发布包污染是可能的引入途径          |

表中的 CWE 用于理解典型成因；具体漏洞的正式映射仍以公告和漏洞记录为准。比如竞态可能进一步触发 UAF，UAF 又可能导致提权。

### 按利用后果

| 常见说法                          | 含义                           | 示例与边界                                                                             |
| --------------------------------- | ------------------------------ | -------------------------------------------------------------------------------------- |
| RCE（Remote Code Execution）      | 远程代码执行                   | 如 [CVE-2022-22947]；执行权限通常取决于受影响进程，取得代码执行能力不自动等于取得 root |
| LPE（Local Privilege Escalation） | 本地权限提升                   | 如 Dirty COW [CVE-2016-5195]；攻击者通常已有本地执行条件，再越过原有权限限制           |
| DoS（Denial of Service）          | 拒绝服务                       | 使服务崩溃、阻塞或资源耗尽；与取得代码执行能力是不同的后果                             |
| 信息泄露 / 任意文件读取           | 获取原本无权访问的数据         | 如 [CVE-2026-59774] 的文件读取；实际范围受进程权限、路径和漏洞能力限制                 |
| 容器 / 沙箱逃逸                   | 跨越原有隔离边界，访问外部资源 | 如 runc [CVE-2024-21626]；能否进一步控制宿主机取决于利用链与运行权限                   |

“远程 / 本地”描述利用途径，“未认证 / 需登录”描述利用前提，“RCE / 提权 / DoS”描述可能后果。读漏洞标题时需要把这些条件一起看。

## 漏洞索引

| cve              | score | affect                                                   | info                                         |
| ---------------- | ----: | -------------------------------------------------------- | -------------------------------------------- |
| [CVE-2026-59774] |   9.8 | Gitea `>=1.22.1, <1.27.1`                                | Gitea Org-mode 任意文件读取                  |
| [CVE-2026-46300] |   7.8 | Linux `>=3.9, <7.1`；skb / ESP-in-TCP                    | Fragnesia，skb 合并与 ESP-in-TCP 页缓存写入  |
| [CVE-2026-43500] |   7.8 | Linux `>=5.3, <7.1`；RxRPC                               | Dirty Frag，RxRPC 页缓存写入                 |
| [CVE-2026-43284] |   8.8 | Linux `>=4.11, <7.1`；XFRM ESP                           | Dirty Frag，xfrm-ESP 页缓存写入              |
| [CVE-2026-43121] |   4.7 | Linux `>=6.15, <7.0`；io_uring ZCRX                      | io_uring ZCRX 引用计数竞态与 freelist 越界写 |
| [CVE-2026-31431] |   7.8 | Linux `>=4.14, <7.0`；AF_ALG AEAD                        | Copy Fail，AF_ALG 页缓存写入                 |
| [CVE-2024-3094]  |  10.0 | XZ Utils `5.6.0`、`5.6.1` 发布 tarball                   | XZ Utils 5.6.0 / 5.6.1 发布包后门            |
| [CVE-2024-21626] |   8.6 | runc `>=1.0.0-rc93, <=1.1.11`                            | runc / containerd                            |
| [CVE-2022-2602]  |   7.0 | Linux `5.4.y`、`5.15.y` 等未修复分支；io_uring / Unix GC | io_uring 与 Unix socket 垃圾回收 UAF         |
| [CVE-2022-0847]  |   7.8 | Linux `5.8` 起的未修复 pipe 实现                         | Dirty Pipe，管道缓冲区标志导致页缓存写入     |
| [CVE-2022-22947] |  10.0 | Spring Cloud Gateway `3.1.0`、`<=3.0.6`                  | Spring Cloud Gateway                         |
| [CVE-2016-5195]  |   7.0 | Linux `2.x–4.x` 未修复内核；4.8 分支 `<4.8.3`            | Dirty COW，写时复制竞态提权                  |

- `score` 为 CVSS 3.1，评分来源见各详情页；CVE-2022-2602 此处采用 NVD 的 7.0。
- Linux 的连续版本区间概括根因引入至主线修复的范围，已修复的稳定分支及发行版回补版本除外；完整分支修复表和利用条件见详情页。

## 参考

### 漏洞榜单与利用情报

关注“现在影响大的 CVE”时，先看已有利用证据和近期攻击活动，再结合利用概率与自己使用的产品。下面的入口分别提供不同维度的信息：

| 入口                       | 主要看什么                                                         | 口径与访问说明                                                                 |
| -------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| [CISA KEV]                 | 已确认被真实攻击利用的 CVE，可关注最近加入的条目和勒索软件使用标记 | 公开目录；加入日期是收录时间，不能当作攻击开始时间或利用频率排名               |
| [FIRST EPSS Top 100]       | 按未来 30 天利用概率降序排列的前 100 个 CVE                        | 官方 JSON 接口，每日数据；用 `date` 确认评分日期，概率不代表攻击次数或业务损失 |
| [VulnCheck KEV]            | 已知利用证据、来源引用与公开利用信息                               | 使用独立于 CISA 的收录口径；完整社区数据需要账户                               |
| [VulnCheck 2026 Dashboard] | 2026 年新增 KEV、厂商与产品分布                                    | 公开年度看板；统计的是收录条目，产品条目多不直接表示遭受的攻击最多             |
| [GreyNoise 漏洞情报]       | 传感器观测到的扫描、利用活动，以及 1 / 10 / 30 天相关 IP 数        | 公开产品介绍与指标说明；观测范围受其传感器覆盖影响                             |
| [CISA 2023 高频利用漏洞]   | 多国机构在 2023 年观察到的 15 个高频利用漏洞                       | 2024-11 发布的年度回顾，适合了解典型高影响漏洞；不代表当前实时排序             |

EPSS 的 Top 100 最接近按单一指标排序的 leaderboard；了解已经发生的利用，优先看 KEV 和活动观测。CVSS 高分、公开 PoC 数量、新闻热度分别反映不同信息，不能直接替代实际影响。

### PoC 仓库与复现资源

这些集合覆盖面较广，但不能保证每个 CVE 都有公开、可运行的 PoC。自动聚合链接的项目也不代表已经验证过每个 PoC，需要核对具体版本、前提和复现结果。

- [trickest/cve]
  - MIT, HTML, Python
  - PoC 索引；按年份和 CVE 生成 Markdown，聚合漏洞公告引用与 GitHub 搜索结果，适合按编号或产品查找公开 PoC。
- [nomi-sec/PoC-in-GitHub]
  - PoC 索引；自动收集 GitHub 仓库，按年份和 CVE 保存 JSON 元数据，适合为同一漏洞查找多个候选实现。
- [exploit-database/exploitdb]
  - GPL-2.0, Shell, SearchSploit
  - 代码归档；官方仓库位于 GitLab，收录实际 exploit、PoC 和 shellcode，配套 [SearchSploit] 支持按 CVE 离线查询。
- [rapid7/metasploit-framework]
  - BSD-3-Clause, Ruby
  - 利用框架；包含利用、辅助检测等模块，可查找相关 CVE 的模块实现；运行依赖框架与模块配置，部分组件另有许可证。
- [vulhub/vulhub]
  - MIT, Dockerfile, Docker Compose
  - 复现环境；提供漏洞环境、README 和复现步骤，适合学习机制和搭建配套实验环境。
- [projectdiscovery/nuclei-templates]
  - MIT, JavaScript, YAML
  - 检测模板；通过请求与匹配条件识别漏洞、版本或暴露特征，需区分具体模板是行为验证还是特征检测，不等同于完整利用链。

### 标准与术语

- [CVE Program]
- [CVE Records] - CVE 编号、记录与 CNA 的职责
- [NVD] - 漏洞数据库与 CVE 信息补充
- [NIST]、[FIRST] - 相关机构与组织
- [NVD CVSS] - 严重性等级与评分版本
- [FIRST CVSS 3.1]、[FIRST CVSS 4.0] - 官方评分规范
- [FIRST EPSS]、[FIRST EPSS API] - 利用概率预测与数据查询
- [CISA SSVC] - 根据利用状态、技术影响和业务情况决定处置动作
- [MITRE CAPEC] - 攻击模式目录
- [OASIS CSAF] - 结构化安全公告格式
- [CISA SBOM]、[CISA VEX] - 软件组件清单与产品是否受漏洞影响的声明
- [OWASP IDOR] - 对象引用与授权检查
- [MITRE CWE] - 弱点分类
  - 注入：[CWE-89]、[CWE-78]、[CWE-917]
  - Web 与路径：[CWE-79]、[CWE-918]、[CWE-22]、[CWE-352]、[CWE-611]
  - 认证与授权：[CWE-306]、[CWE-862]
  - 内存与并发：[CWE-416]、[CWE-787]、[CWE-362]、[CWE-367]
  - 恶意代码：[CWE-506]

[CVE-2026-59774]: ./cve-2026-59774.md
[CVE-2026-46300]: ./cve-2026-46300.md
[CVE-2026-43500]: ./cve-2026-43500.md
[CVE-2026-43284]: ./cve-2026-43284.md
[CVE-2026-43121]: ./cve-2026-43121.md
[CVE-2026-31431]: ./cve-2026-31431.md
[CVE-2024-3094]: ./cve-2024-3094.md
[CVE-2024-21626]: ./cve-2024-21626.md
[CVE-2022-2602]: ./cve-2022-2602.md
[CVE-2022-0847]: ./cve-2022-0847.md
[CVE-2022-22947]: ./cve-2022-22947.md
[CVE-2016-5195]: ./cve-2016-5195.md
[CVE Program]: https://www.cve.org/
[CVE Records]: https://www.cve.org/Resources/Media/Archives/OldWebsite/cve/identifiers/index.html
[NVD]: https://nvd.nist.gov/general
[NIST]: https://www.nist.gov/about-nist
[FIRST]: https://www.first.org/about/
[NVD CVSS]: https://nvd.nist.gov/vuln-metrics/cvss
[FIRST CVSS 3.1]: https://www.first.org/cvss/v3.1/specification-document
[FIRST CVSS 4.0]: https://www.first.org/cvss/v4.0/specification-document
[FIRST EPSS]: https://www.first.org/epss/
[FIRST EPSS API]: https://www.first.org/epss/api
[FIRST EPSS Top 100]: https://api.first.org/data/v1/epss?order=!epss&limit=100&pretty=true
[CISA KEV]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog
[VulnCheck KEV]: https://www.vulncheck.com/kev
[VulnCheck 2026 Dashboard]: https://research.vulncheck.com/2026-dashboard/
[GreyNoise 漏洞情报]: https://www.greynoise.io/products/vulnerability-prioritization
[CISA 2023 高频利用漏洞]: https://www.cisa.gov/news-events/cybersecurity-advisories/aa24-317a
[trickest/cve]: https://github.com/trickest/cve
[nomi-sec/PoC-in-GitHub]: https://github.com/nomi-sec/PoC-in-GitHub
[exploit-database/exploitdb]: https://gitlab.com/exploit-database/exploitdb
[SearchSploit]: https://www.exploit-db.com/searchsploit
[rapid7/metasploit-framework]: https://github.com/rapid7/metasploit-framework
[vulhub/vulhub]: https://github.com/vulhub/vulhub
[projectdiscovery/nuclei-templates]: https://github.com/projectdiscovery/nuclei-templates
[CISA SSVC]: https://www.cisa.gov/stakeholder-specific-vulnerability-categorization-ssvc
[MITRE CAPEC]: https://capec.mitre.org/about/index.html
[OASIS CSAF]: https://docs.oasis-open.org/csaf/csaf/v2.0/csaf-v2.0.html
[CISA SBOM]: https://www.cisa.gov/sbom
[CISA VEX]: https://www.cisa.gov/resources-tools/resources/minimum-requirements-vulnerability-exploitability-exchange-vex
[OWASP IDOR]: https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html
[MITRE CWE]: https://cwe.mitre.org/about/index.html
[CWE-89]: https://cwe.mitre.org/data/definitions/89.html
[CWE-78]: https://cwe.mitre.org/data/definitions/78.html
[CWE-917]: https://cwe.mitre.org/data/definitions/917.html
[CWE-79]: https://cwe.mitre.org/data/definitions/79.html
[CWE-918]: https://cwe.mitre.org/data/definitions/918.html
[CWE-22]: https://cwe.mitre.org/data/definitions/22.html
[CWE-306]: https://cwe.mitre.org/data/definitions/306.html
[CWE-862]: https://cwe.mitre.org/data/definitions/862.html
[CWE-416]: https://cwe.mitre.org/data/definitions/416.html
[CWE-787]: https://cwe.mitre.org/data/definitions/787.html
[CWE-362]: https://cwe.mitre.org/data/definitions/362.html
[CWE-506]: https://cwe.mitre.org/data/definitions/506.html
[CWE-352]: https://cwe.mitre.org/data/definitions/352.html
[CWE-611]: https://cwe.mitre.org/data/definitions/611.html
[CWE-367]: https://cwe.mitre.org/data/definitions/367.html
