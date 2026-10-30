---
title: 2026-10 eMudhra 中间 CA 私钥失陷
---

# 2026-10 eMudhra 中间 CA 私钥失陷

- 事件类型：WebPKI / CA 密钥生成与信任分发事件；首次报告 2026-10-17，多方于 2026-10-20 发布公告；首次整理 2026-10-23，CVE 关联与厂商追加声明核对 2026-10-26
- 八组 eMudhra 中间 CA 密钥因生成缺陷而可恢复，攻击者可利用对应签发权限伪造证书；Google、Mozilla 和发现方资料均确认密钥失陷
- 风险不限于已经使用 eMudhra 证书的网站：只要客户端仍接受受损链，攻击者就可能为其不拥有的域名签发被信任的 TLS 证书
- 浏览器可通过 OneCRL、CRLSet 等快速阻断；不消费这些机制、不强制 CT 的客户端依赖各自信任库与验证实现更新
- [mitmproxy 12.3.0 已提供 `--emudhra` 和 `--emudhra-old`](../../service/network/mitmproxy.md#emudhra-受损-ca)，将签发材料内置为显式启用选项；工具可用不等于任何客户端都可被拦截

## 关联漏洞与公告

| 标识                                                                                               | 产品范围与来源口径                                                                                                         |
| -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [CVE-2026-111943](../cve/cve-2026-111943.md) / `GO-2026-6809`                                      | Go CNA 记录针对 `crypto/x509` 验证时拒绝受损中间 CA；同一编号也被 RustSec 和 AWS 用于关联各自处置，详细版本与补丁见 CVE 页 |
| [CVE-2026-113470](https://www.mozilla.org/en-US/security/advisories/mfsa2026-111/#CVE-2026-113470) | Mozilla Firefox / Thunderbird 的阻断列表更新，确保 RemoteSettings 不可用时仍能拒绝受损中间证书                             |
| [RUSTSEC-2026-0382](https://rustsec.org/advisories/RUSTSEC-2026-0382)                              | `rustls-webpki` 的同类拒绝检查，alias 为 CVE-2026-111943                                                                   |
| [2026-150-AWS](https://aws.amazon.com/security/security-bulletins/2026-150-aws/)                   | AWS 以 CVE-2026-111943 为题发布跨服务 trust bundle 处置公告；不等同于所有服务都使用 Go                                     |

- 截至 2026-10-26，在所查 eMudhra 声明、Go / Mozilla CVE 记录、RustSec 与 AWS 公告中，未发现另一个专门覆盖 CA 弱密钥生成根因的 CVE；不能把某个产品编号当作整个事件的统一编号
- CA 弱密钥生成、客户端缺少拒绝检查、根信任移除和下游发布是不同环节；事件时间线继续在这里维护，产品补丁与版本按各自公告核对

## 时间线

| 时间                    | 事件                                                                                     | 来源与口径                                                                          |
| ----------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 2025-04-30              | 受影响中间 CA 在 Key Generation Ceremony 中生成                                          | eMudhra 声明；公开证书 `notBefore` 也位于该日，但有效期起点不能单独证明实际生成时间 |
| 2025-05-14              | 受影响公钥的 AAA 交叉签名证书 `notBefore`                                                | 社区公开证书清单的有效期元数据，不等同实际签发或部署时间                            |
| 2026-10-17 18:05 UTC    | Chrome Root Program 收到研究者报告                                                       | Google 公告                                                                         |
| 2026-10-17 19:45 UTC    | Chrome 完成佐证并提交按 SPKI 阻断的 CRLSet 更新                                          | Google 公告；不依赖常规浏览器版本升级                                               |
| 2026-10-17 20:06 UTC    | Mozilla 收到报告                                                                         | Mozilla 公告                                                                        |
| 2026-10-17 22:59 UTC    | OneCRL 更新分发完成，保护标准配置的 Firefox 用户                                         | Mozilla 公告；不要求重启或升级 Firefox                                              |
| 2026-10-18              | eMudhra 吊销八个受损中间 CA                                                              | 厂商声明；Mozilla Bug 2083449 同日创建                                              |
| 2026-10-19              | Go 1.27.3 / 1.26.10 发布，加入受损中间 CA 的 SPKI denylist                               | Go 发布记录与安全公告；CVE 记录于 10-21 公开                                        |
| 2026-10-19              | 下游 trust store 开始协同响应；Cloudflare 约 17:00 UTC 获知事件                          | 社区披露站、Cloudflare 公告                                                         |
| 2026-10-20              | Google、Mozilla、eMudhra、Cloudflare 集中发布说明；Firefox 安全更新和 NSS 信任库更新推进 | 各自公告，部署范围不同                                                              |
| 2026-10-21 00:52 UTC    | Go CNA 公开 CVE-2026-111943，产品范围为 `crypto/x509`                                    | CVE Record；不等同于 CA 生成缺陷有单独编号                                          |
| 2026-10-21 08:29 UTC    | Firefox for Android 158.0.2 修复部分客户端启动后未立即应用 bundled OneCRL 的问题         | Mozilla 公告追加更新                                                                |
| 2026-10-22              | mitmproxy 12.3.0 发布，集成受损 CA 签发模式，同时更新上游信任库                          | mitmproxy 发布说明与固定 tag                                                        |
| 2026-10-24（PDT）       | AWS 发布 2026-150-AWS，列出多项服务与 trust bundle 处置                                  | AWS 公告；尚未到期的部署目标不能写成已完成                                          |
| 2026-10-26              | eMudhra 公开道歉，承认脚本错误导致弱 CA 密钥，承诺发布完整 RCA 并委托独立审查            | 厂商追加声明；完整 RCA 尚未在所查公告中给出                                         |
| 2026-10-27（PDT，计划） | Chrome Root Store 移除 `emSign ECC Root CA - G3` 向全部相关设备发布                      | Google 截至核对日的计划；不能写成已经全量完成                                       |

## 成因与证据

- Google 将问题归因为私钥生成时随机性不足；发现方说明私钥可由已公开证书材料恢复
- 研究者 Wayne 用各受损私钥签署同一消息，向 root program 提供签名证据；这是对应私钥签名能力的证据，不是已有网络入侵的证明
- **eMudhra 声明：** 使用了 FIPS 140-2 Level 3 HSM，但 KGC 的 wrap/unwrap 步骤产生一组额外的弱密钥，弱公钥最终进入公开证书
  - 10-26 的追加声明明确归因为脚本错误，承诺通过 CCADB 发布完整 RCA 并进行独立审查；此前 wrap/unwrap 解释仍按厂商阶段性说法保留
  - 厂商称问题经过两轮审计、持续约 18 个月未被发现；精确根因仍在调查
  - HSM 认证不能单独证明完整密钥生成、包装、导出与证书发布流程正确
  - AI 辅助分析是厂商叙述，不能据此写成 AI 破解了现代密码算法
- **厂商影响声明：** 七个中间 CA 未投入生产，另一个投入生产但没有签发 end-entity 证书；厂商称根 CA 私钥未失陷、基础设施未被侵入且没有数据泄露
  - 这些是厂商的调查结论，不能用来证明接受这些 CA 的所有第三方客户端均无风险
  - CA 以前没签发过客户证书，不妨碍恢复了私钥的其他人签发新证书

## 受损对象与证书链

社区 `impacted-intermediates.json` 在本次读取中列出 **16 张证书、8 个不同 SPKI**：每个受损公钥均有 eMudhra 与 Sectigo AAA 路径的证书。这里的证书数量、公钥数量与根数量不能互换。

| 名称分组                 | 不同公钥数 | 口径                                                               |
| ------------------------ | ---------: | ------------------------------------------------------------------ |
| `EM DV TLS CA - G3B/G3C` |          2 | TLS 中间 CA                                                        |
| `EM OV TLS CA - G3B/G3C` |          2 | TLS 中间 CA；mitmproxy 的 TLS 选项使用其中一条受损链               |
| `EM EV TLS CA - G3B/G3C` |          2 | TLS 中间 CA                                                        |
| `EM OV CS CA - G3B/G3C`  |          2 | 清单还列出 CS 证书；具体代码签名信任、EKU 与平台可利用性需另行核实 |

- Google 公告中的八个受损 CA 与 CT 段落中的六个 TLS CA应按具体用途区分，不把所有证书都当作同一 TLS 路径
- 相关证书层级包含 `emSign Root TLS CA - G3`、`emSign Root CS CA - G3`，浏览器/根库处置又涉及 `emSign ECC Root CA - G3`；同时存在 Sectigo `AAA Certificate Services` 交叉签名路径
  - 这些名称不是同一个证书的可互换写法；核对时应使用具体证书 SHA-256、SPKI 和实际构建出的链
  - 某一张证书被吊销，不代表同一公钥的所有交叉签名路径都已被客户端阻断；Chrome 按 SPKI 阻断可覆盖共用公钥的变体
  - 去信任某个根是风险处置，不等于根的私钥也泄露；不能扩大为 eMudhra 全部根、全部业务或 Sectigo 全部体系失陷

## 为什么能用于 MITM

```text
客户端仍信任某条 CA 链
  → 攻击者掌握受损中间 CA 私钥
  → 为目标站点签发伪造叶证书
  → 攻击者取得客户端流量路径
  → 客户端未通过吊销、CT、pinning 等策略拒绝伪造链
  → 客户端与攻击者建立 TLS，攻击者另连真实上游
  → 明文可被读取或修改
```

- 攻击仍需要控制代理、路由、接入网络或其他流量入口；只有签发密钥不会自动让流量经过攻击者
- 受损 CA 私钥提供的是证书签名能力，不等于取得真实站点私钥或已录制 TLS 会话的密钥
- CT 要求可限制无日志证书被浏览器接受；它不是吊销或去信任的替代品，也不能从“没见到 CT 记录”推导非 CT 客户端没有遭受攻击
- **利用状态：** eMudhra 称未发现披露前有人恢复或滥用弱密钥；Cloudflare 称未发现其服务存在活跃利用。社区披露站认为非 CT 客户端的历史利用情况未知；本次没有确认到成功在野 MITM 的独立证据

## 响应与修复

| 生态              | 已公布措施                                                                                    | 生效边界                                                                                              |
| ----------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Firefox           | OneCRL；158.0.1、ESR 115.43.1 / 153.5.1 为特殊配置补充分发；Android 后续 158.0.2 修正应用时机 | 标准配置先由 OneCRL 保护，浏览器版本不是唯一判断条件                                                  |
| NSS / 下游根库    | NSS 3.131.1 移除相关根的信任                                                                  | 不接收 OneCRL 的消费者需更新自己的根库与实际进程                                                      |
| Chrome / Android  | CRLSet 按 SPKI 阻断，Android 通过 Play Services 分发；计划进一步移除 ECC 根                   | 确认客户端实际接收；Root Store 全量移除在核对日仍属计划                                               |
| Python certifi    | 2026.10.18 发布 emSign 去信任更新；2026.10.19 恢复未受影响根                                  | 采用当前修复 bundle；不要把所有 emSign 根一概删掉，冻结/内嵌副本单独核对                              |
| Go / Rust         | 按受损中间 CA 的 SPKI 拒绝相关链，见 [CVE-2026-111943](../cve/cve-2026-111943.md) 与 RustSec  | 更新运行时或依赖后重新构建、部署；不会替其他应用更新信任库                                            |
| mitmproxy         | 12.3.0 更新上游验证用 certifi，依赖下限 `2026.10.19`；预编译包包含更新                        | 签发模式与上游验证分别配置，详见 [mitmproxy 笔记](../../service/network/mitmproxy.md#emudhra-受损-ca) |
| Cloudflare        | 更新 CDN/Zero Trust 等服务、WARP/One Client 和 cloudflared；cloudflared 修复版本为 2026.10.2  | 自管 Tunnel、容器及自定义 trust store 仍需用户更新或重部署                                            |
| Microsoft / Apple | 社区响应页记录 10-20 / 10-22 起已部署阻断                                                     | 本次未独立核实各操作系统/build 与特殊策略覆盖，按厂商实际渠道确认                                     |

- 客户端盘点覆盖 OS 根库、浏览器、Python certifi、Java truststore、语言运行时、SDK 自带 bundle、容器镜像及长期进程
  - 浏览器安全不代表同一台机器上的 curl、git、pip、代理或后台服务安全
  - SDK 更新不一定更新底层 TLS verifier；系统 `ca-certificates` 更新也不一定覆盖应用自己的静态 bundle
  - 更新后按实际加载方式 reload、restart 或重部署，验证每条应用路径，不能用单个 curl 结果代表整台主机
- 站点运营者若使用链到被去信任根的真实证书，应按 CA 与 root program 指导迁移到未受影响的证书层级；可能出现证书校验失败
- 禁用校验、`curl -k`、`NODE_TLS_REJECT_UNAUTHORIZED=0` 或 `ssl_insecure=true` 会消除身份认证保护，不能作为兼容性修复
- 使用供应商更新与准确的证书/SPKI 清单，不复制私钥、不盲删整家 CA 的全部根；测试站点的连接结果只说明被测试的客户端/校验路径

## 证据与待验证

- mitmproxy `v12.3.0`：commit `ac4f4cf7eab63effeb4b53b6bc09b5143aa42ae4`；已静态核对 CLI 参数、`tlsconfig.py` 默认值/选链和 `pyproject.toml`，未启动代理
- certifi `2026.10.19`：commit `662df63d7906df66f1f07c0751a3dfe9da14d914`，标题 `Restore unaffected emSign roots`
- 社区资料仓库核对到 commit `ece1ad880e12be8e576e4b8f1f4f2922e2d41c8e`；其修复版本表属于持续更新的社区汇总，不代替各厂商公告
- Go 修复 commit `7f86f957633ee31a1c17a1eb8452ca7a3d9bc141` 的八个 SPKI hash 与 10-26 读取的公开受损证书元数据完全对应；仅做静态集合比对
- 待确认：最终 KGC 根因、各交叉签名链的完整策略覆盖、CS 用途的实际风险，以及无 CT 客户端的历史利用情况
- 本次仅查阅公告、公开证书元数据和源码；未下载私钥材料、运行代理、访问信任检测端点或修改任何证书库

## 参考

- [Mozilla：Firefox 响应与追加更新](https://blog.mozilla.org/security/2026/10/20/protecting-firefox-users-following-the-compromise-of-emudhra-intermediate-certificates/)
- [Google：Chrome / Android 响应](https://blog.google/security/protecting-chrome-and-android-users-from-compromised-emudhra-intermediate-ca-certificates/)
- [eMudhra 厂商声明与更新](https://emudhra.com/en/post/certificate-security-incident/)
- [CVE-2026-111943：Go CNA 记录](https://www.cve.org/CVERecord?id=CVE-2026-111943)、[Go 安全发布](https://groups.google.com/g/golang-announce/c/66pojueaQek)
- [Mozilla MFSA 2026-111：CVE-2026-113470](https://www.mozilla.org/en-US/security/advisories/mfsa2026-111/#CVE-2026-113470)
- [RustSec RUSTSEC-2026-0382](https://rustsec.org/advisories/RUSTSEC-2026-0382)、[AWS 2026-150-AWS](https://aws.amazon.com/security/security-bulletins/2026-150-aws/)
- [Mozilla Bug 2083449：公开事件跟踪](https://bugzilla.mozilla.org/show_bug.cgi?id=2083449)
- [Cloudflare：影响、响应时间线与客户建议](https://blog.cloudflare.com/emudhra-certificate-compromise)
- [Mitmproxy 12.3 发布说明](https://www.mitmproxy.org/posts/releases/mitmproxy-12.3/)
- [certifi GHSA-6q48-6c7w-9gw2](https://github.com/certifi/python-certifi/security/advisories/GHSA-6q48-6c7w-9gw2)
- [certifi 恢复未受影响根的固定提交](https://github.com/certifi/python-certifi/commit/662df63d7906df66f1f07c0751a3dfe9da14d914)
- [社区披露与响应汇总](https://emudhra.we-have-a-problem.com/)、[受损证书与 SPKI 元数据](https://emudhra.we-have-a-problem.com/impacted-intermediates.json)、[根证书元数据](https://emudhra.we-have-a-problem.com/roots.json)
- [galadran/we-have-a-problem.com](https://github.com/galadran/we-have-a-problem.com)
  - 社区响应站源码；[固定快照](https://github.com/galadran/we-have-a-problem.com/tree/ece1ad880e12be8e576e4b8f1f4f2922e2d41c8e)，保留证书、交叉签名与下游修复资料
