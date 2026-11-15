---
title: SSRF
tags:
  - Threat
---

# SSRF

- SSRF - Server-Side Request Forgery，服务端请求伪造
- 服务端代替攻击者发起请求，攻击者借此访问本该无法直达的网络（内网、云 metadata、本地回环）
- 常见入口：URL 预览/抓取、Webhook 回调、图片/文件远程下载、PDF 渲染、导入第三方 OAuth/SSO 配置、代理/网关、SSO 回调地址校验、[BYOK](../ai/agent/opendesign.md) 场景下用户提供的 Provider URL
- [OWASP: Server-Side Request Forgery Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html)
- [OWASP Top 10 2021: A10 SSRF](https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/)
- [PayloadsAllTheThings: SSRF](https://swisskyrepo.github.io/PayloadsAllTheThings/Server%20Side%20Request%20Forgery/) - 按云平台/系统分类的 payload 清单，本表大部分条目参考于此

> 以下内容只用于资产所有者授权的隔离环境验证。生产环境优先使用 OOB、健康检查、版本接口等无副作用信号；不要读取云凭据、user-data、Secret、Cookie 或客户数据，也不要执行写请求、协议升级或历史漏洞利用。

## 常见探测目标

| 目标                                                                      | 用途与前提                                                                                                                                                                              |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `http://169.254.169.254/latest/meta-data/`                                | AWS EC2 Instance Metadata（IMDSv1）；通常无需 token，但是否可达由实例的 metadata 配置、网络路径和应用请求能力决定                                                                         |
| `http://169.254.169.254/latest/api/token`                                 | AWS IMDSv2 token endpoint；需要 `PUT` 和 `X-aws-ec2-metadata-token-ttl-seconds`，只用于隔离测试验证客户端是否允许方法和自定义请求头 |
| `http://169.254.169.254/latest/meta-data/iam/security-credentials/<role>` | AWS 临时 IAM 凭证（AccessKey/SecretKey/Token）                                                                                                                                          |
| `http://169.254.169.254/latest/user-data/`                                | AWS user-data，常包含启动脚本/配置中的敏感信息                                                                                                                                          |
| `http://169.254.170.2${AWS_CONTAINER_CREDENTIALS_RELATIVE_URI}`            | AWS ECS/Fargate Task Metadata，凭证 URI 通常通过容器环境变量提供；路径和版本由运行环境决定                                                                                               |
| `http://${AWS_LAMBDA_RUNTIME_API}/2018-06-01/runtime/invocation/next`      | AWS Lambda Runtime API，仅适用于对应 Lambda 运行时；可能返回调用事件，不要在生产环境读取                                                                                                 |
| `http://metadata.google.internal/computeMetadata/v1/`                     | GCP Metadata，需 header `Metadata-Flavor: Google`                                                                                                                                       |
| `http://169.254.169.254/metadata/v1.json`                                | DigitalOcean Metadata；具体字段和是否可达取决于 Droplet 配置                                                                                                                             |
| `http://169.254.169.254/metadata/instance?api-version=2021-02-01`         | Azure IMDS，需 header `Metadata: true`                                                                                                                                                  |
| `http://100.100.100.200/latest/meta-data/`                                | 阿里云 ECS 专用 Metadata 地址（注意不是 `169.254.169.254`）                                                                                                                             |
| `http://metadata.tencentyun.com/latest/meta-data/`                         | 腾讯云 CVM metadata，常见解析地址为 `169.254.0.23`；路径、认证和容器可达性以当前运行环境为准                                                                                              |
| `http://169.254.169.254/opc/v2/instance/`                                 | Oracle Cloud Infrastructure metadata；v2 通常要求 `Authorization: Bearer Oracle`，不要把地址可达等同于可以读取凭据                                                                        |
| `http://[fd00:ec2::254]/latest/meta-data/`                                 | AWS IMDS 的 IPv6 访问形式；只有启用 IPv6、路由和相应实例配置时才适用                                                                                                                        |
| `http://localhost` / `http://127.0.0.1`                                   | 本机仅绑定内部管理接口（调试/监控/管理后台）                                                                                                                                            |
| `http://127.0.0.1:6379`                                                   | Redis，验证是否可达及是否有认证；未授权读写可能导致数据泄露或进一步利用，具体影响取决于配置和版本                                                                                       |
| `http://127.0.0.1:11211`                                                  | Memcached，验证是否可达及是否无认证；可能泄露或篡改缓存，不应直接执行写入                                                                                                                 |
| `http://127.0.0.1:9200`                                                   | Elasticsearch，验证 HTTP API 是否暴露；数据读写和历史 RCE 均取决于认证、版本和具体漏洞                                                                                                   |
| `http://127.0.0.1:2375` / `unix:///var/run/docker.sock`                   | Docker API 或容器运行时 socket；仅在 SSRF 实现支持相应协议且 socket 被挂载时有意义，暴露可能导致高权限容器操作                                                                           |
| `https://127.0.0.1:10250/pods`                                            | `/pods` 主要用于读取 Pod 信息；日志、执行等操作需要其他端点和相应权限，是否可访问取决于 Kubelet authentication/authz 配置和网络命名空间                                      |
| `https://kubernetes.default.svc/api/v1/namespaces`                        | Pod 内部常见的 API 地址；访问需要有效的 ServiceAccount 或其他凭据，能否枚举/控制资源取决于 RBAC，不能把 token 路径本身视为权限                                          |
| `http://kube-dns.kube-system.svc.cluster.local:9153/metrics`              | 若 metrics 端点可达，可能暴露 DNS 请求统计、缓存或失败信息；是否包含可识别的服务名称取决于 CoreDNS 配置和指标内容                                                               |
| `http://<svc>.<namespace>.svc.cluster.local`                              | 已知 Service 名称和 namespace 时可直接访问，不需要先扫描 Pod IP；Service 列表仍需 API 权限，固定 DNS 规则不能枚举所有 Service                                              |
| `http://127.0.0.1:2379`（etcd client API）                                | 仅在目标位于节点网络命名空间且 etcd 监听回环地址时有意义；是否可读写取决于客户端认证、TLS、授权和 Secret 加密，`2380` 是 peer 端口，不应当作普通查询端点          |
| `http://169.254.169.254/latest/meta-data/`                                | 节点运行在公有云时,Pod 与宿主机共享 network namespace 或未局限 hostNetwork 时，仍可读到节点级 Cloud Metadata，进一步获取节点 IAM 角色凭证                                               |
| `http://127.0.0.1:8080`/`9090`/`15672`                                    | 常见开发或管理端口，如 Jenkins、Prometheus、RabbitMQ；端口开放不等于未鉴权，优先使用只读健康检查或版本接口确认                                                                  |
| `http://127.0.0.1:8200/v1/sys/health`                                    | Vault 健康检查和服务状态；读取 Secret 还需要认证和策略权限，验证时不要提交或回显 token                                                                           |
| `http://127.0.0.1:8123/ping`                                              | ClickHouse HTTP 接口的常见端口；先验证 `/ping` 等无副作用接口，数据库查询能力取决于认证和网络策略                                                               |
| `127.0.0.1:3306`/`:5432`/`:27017`/`:9000`                                | MySQL、PostgreSQL、MongoDB、ClickHouse 等原生协议端口；普通 HTTP SSRF 通常不能直接访问，只有客户端支持对应协议时才有意义，验证不要发送登录或写入请求 |
| `http://127.0.0.1:9901/server_info`                                       | Envoy admin 端口的常见示例，可能泄露路由、集群和版本信息；实际端口和访问控制以部署配置为准                                                                     |
| `file:///etc/passwd`                                                       | 本地文件读取，仅在服务明确支持 `file://` 或文件路径时成立；验证应使用无敏感内容的专用文件                                                                         |
| `dict://127.0.0.1:11211/stat`                                             | 仅在客户端支持 `dict://` 时可用于协议探测；不要把协议支持假设为 HTTP SSRF 的默认能力                                                                          |
| 内网 `/24`段按端口打开时间差整体扫描                                      | 组合不存在/未开放端口的响应差异探测内网拓扑和开放服务                                                                                                                                   |
| `http://127.0.0.1:8848/nacos/`                                            | Nacos 控制台或 API；认证、版本和权限配置决定可见范围，先使用健康检查或版本接口，不应直接调用用户管理或配置写入 API                                                              |
| `http://127.0.0.1:8070`（Portal）/`:8080`（ConfigService）/`:8090`（AdminService） | Apollo 默认端口示例；实际端口可能被环境变量或反向代理改变，AdminService 是否可读写取决于部署和认证配置                                                                      |
| `http://127.0.0.1:8761/eureka/apps`                                       | Spring Cloud Eureka 注册中心，可枚举已注册的服务实例地址                                                                                                                                |
| `http://127.0.0.1:8500/v1/catalog/services`                               | Consul API/UI，可枚举服务、读取 KV 存储中的配置和凭证                                                                                                                                   |
| `http://127.0.0.1:2181`                                                   | ZooKeeper, 通过 4字母命令（`envi`、`wchc` 等）泄露节点信息，连接后可读写 znode，其中常存数据库/中间件配置                                                                               |
| `http://127.0.0.1:8080/actuator/health`                                   | 先使用健康检查等低风险 endpoint；`env`、`heapdump`、`mappings` 可能泄露配置或运行时信息，`gateway` 风险取决于版本、路由和认证配置 |
| `http://127.0.0.1:8080/v1/graphql`                                       | Hasura 常见 GraphQL 路径示例；introspection 可能暴露 schema，但数据访问仍受认证和权限规则控制，端口和管理接口以部署配置为准 |
| `http://127.0.0.1:5601`                                                   | 验证 Kibana 管理界面是否暴露；能否访问 Elasticsearch 数据取决于版本、认证和租户权限，历史 RCE 需要具体漏洞条件 |
| `http://127.0.0.1:9090/api/v1/query`                                      | 可能读取监控指标并间接暴露服务命名、拓扑和配置信息；查询权限和网络策略仍然有效 |

- https://swisskyrepo.github.io/PayloadsAllTheThings/Server%20Side%20Request%20Forgery/SSRF-Cloud-Instances/

## 安全验证优先级

1. **先验证回连**：使用每次唯一的 OOB 标识，区分 DNS 解析、TCP 连接和 HTTP/HTTPS 请求。
2. **再验证内部可达性**：优先选择自有 canary、健康检查、版本接口或固定响应的只读接口。
3. **最后验证权限边界**：只在隔离环境、明确授权和可回滚条件下验证认证失败、RBAC 拒绝和网络策略拒绝；不要读取真实凭据或执行写操作。

每个目标至少记录：运行环境、目标地址和协议、是否跟随跳转、解析到的地址、请求方法、响应状态、出口代理、时间戳和日志证据。这样可以把“目标可解析”“端口可连接”“请求被服务接受”“数据可读取”分成不同结论。

## 常见目标分类

| 目标                                           | 风险                                                  |
| ---------------------------------------------- | ----------------------------------------------------- |
| Cloud metadata（各厂商地址不同）              | 可能读取临时凭据、instance profile、user-data；验证时优先确认阻断策略 |
| 内网服务（Redis、Elasticsearch、内部管理后台） | 未授权访问、数据泄露或进一步利用；RCE 取决于具体版本、配置和漏洞条件 |
| `localhost` / `127.0.0.1`                      | 探测/访问仅绑定本机的管理端口                         |
| 内网其他主机/端口                              | 端口扫描，探测内网拓扑                                |
| 协议跳转（`file://`、`gopher://`、`dict://`）  | 读本地文件、构造其他协议请求；是否成立取决于客户端是否支持这些协议 |
| 容器/Kubernetes 控制面                    | ServiceAccount、Kubelet、API Server、节点和运行时 socket 的越权访问；影响取决于网络命名空间、认证和 RBAC |
| 配置中心、服务发现和监控系统                | 泄露服务拓扑、配置和凭据；读写能力取决于认证、授权和部署方式 |

- Cloud metadata 端点
  - 不同云厂商的 metadata 地址、路径、请求头和认证方式并不统一；不要用 `169.254.169.254` 代表所有云平台。以 AWS、GCP、Azure、阿里云等厂商当前文档为准
  - AWS IMDSv1 通常无需 token；IMDSv2 需要先用 `PUT` 获取 session token，再在后续请求带上 token。它增加了 SSRF 的利用条件，hop limit 主要影响容器到节点 metadata 的路径，不是应用层 SSRF 的完整防护
  - 云 metadata 的探测应优先验证阻断结果或使用无敏感内容的测试实例；不要读取 IAM 临时凭据和 user-data

## 绕过手段

- IP 编码混淆
  - 十进制整数：`http://2130706433/`（= `127.0.0.1`）
  - 八进制/十六进制：`http://0x7f.0.0.1/`、`http://0177.0.0.1/`
  - IPv6 映射：`http://[::ffff:127.0.0.1]/`
  - 省略段：`http://127.1/`
- DNS rebinding：首次校验解析到安全 IP，请求发出时 DNS TTL 到期重新解析到内网 IP
- 跳转绕过：首次请求目标是允许的域名，返回 `3xx` 跳转到内网地址，若服务端跟随跳转且不重新校验就会绕过白名单
- 利用解析宽松的 URL parser 差异（SSRF 配合 URL 解析不一致，例如 `http://allowed.com@attacker.com/`、`http://attacker.com#allowed.com`）
- 利用边界地址和规范化差异：`0.0.0.0`、IPv4-mapped IPv6、尾随点、大小写、百分号编码、反斜杠、IDN/punycode；是否生效取决于 URL 解析器、DNS 库和 HTTP 客户端
- 利用内部解析服务（DNS、反向代理、CDN）的例外规则

## 防御

- 优先使用出站白名单，而不是黑名单
  - 只允许访问明确需要的域名/IP，拒绝其余所有请求
- 禁止访问内网地址段和 metadata 地址
  - `0.0.0.0/8`、`127.0.0.0/8`、`10.0.0.0/8`、`100.64.0.0/10`、`169.254.0.0/16`、`172.16.0.0/12`、`192.0.0.0/24`、`192.168.0.0/16`，以及 `::`、`::1`、IPv4-mapped IPv6、`fc00::/7`、`fe80::/10` 等特殊或私有地址
- DNS 解析后立即使用已校验的地址发起请求，避免底层客户端重新解析；同时检查 A、AAAA 和 IPv4-mapped IPv6 结果，防止 TOCTOU/DNS rebinding
- 禁止跟随跳转，或跳转后重新执行完整校验
- 限制可用协议为 `http`/`https`，拒绝 `file://`、`gopher://`、`dict://`、`ftp://` 等
- 限制目标端口、请求方法、请求体、响应体大小、超时、连接数和重定向次数；清理环境代理变量及自动代理发现行为
- 不向外部目标转发内部 `Authorization`、Cookie、云凭据或内部代理头
- 网络层隔离
  - 出站请求经过独立的正向代理/网关，网关侧做访问控制，而不是仅依赖应用层代码
  - 对需要抓取外部资源的服务单独划分网络，不能访问内网其他服务
- Cloud 环境：强制 IMDSv2（AWS）、限制 metadata hop limit、为运行抓取任务的实例移除不必要的 IAM 权限
- 返回内容不原样回显给用户，只能降低反馈和信息泄露，不能替代目标校验与出站网络控制

## 排查

1. 在明确授权的测试环境生成一个每次唯一的 OOB 标识，先确认 DNS、HTTP/HTTPS 回调的预期行为。
2. 通过实际 SSRF 入口提交该标识，结合应用日志、DNS 日志、代理日志和 OOB 事件确认请求链路。
3. 先使用健康检查、版本接口或自有 canary；对 metadata 只验证可达性和阻断结果，不读取凭据、user-data 或 Secret。
4. 保存请求时间、解析结果、跳转次数、出口地址和响应状态，区分“域名被解析”“建立了连接”和“目标返回了 HTTP 响应”。

执行本地辅助检查时，`dig` 或 `curl` 只能说明执行命令的机器是否可达，不能证明某个应用存在 SSRF；避免在生产云主机或 CI runner 上直接请求 metadata 地址。

- Burp Collaborator、[interactsh](https://github.com/projectdiscovery/interactsh) 等 OOB（Out-of-band）平台可用于验证盲 SSRF（无直接响应、仅能通过外部可控域名观察是否被回连）

## 辅助验证（OOB/回调站）

用于让服务端发出可观察的 DNS 解析或 HTTP 请求，验证无直接回显的盲 SSRF（以及 XXE、RCE 命令执行等其他盲注场景）。

| 工具/服务                                                                       | 类型               | 说明                                                                              |
| ------------------------------------------------------------------------------- | ------------------ | --------------------------------------------------------------------------------- |
| [webhook.site](https://webhook.site/)                                           | HTTP 回调          | 生成临时 URL，实时查看所有收到的请求头/体，适合验证 Webhook 回调、URL 预览类 SSRF |
| [requestbin.net](https://requestbin.net/) / [Beeceptor](https://beeceptor.com/) | HTTP 回调          | 类似 webhook.site，可回放/模拟响应                                                |
| [Burp Collaborator](https://portswigger.net/burp/documentation/collaborator)    | DNS/HTTP/SMTP      | Burp Suite 自带，支持 DNS、HTTP、SMTP 三协议回连检测，集成度最高                  |
| [interactsh](https://github.com/projectdiscovery/interactsh)                    | DNS/HTTP/SMTP/LDAP | ProjectDiscovery 开源，可用官方服务或自建 server，nuclei 默认集成                 |
| [dnslog.cn](http://dnslog.cn/)                                                  | 仅 DNS             | 国内常用，免费、无需注册，仅能观察域名解析记录，条数有限                          |
| [ceye.io](http://ceye.io/)                                                      | DNS + HTTP         | 国内常用，需注册 APIKey，支持多页记录和 JNDI 回调                                 |
| [Canarytokens](https://canarytokens.org/)                                       | DNS/HTTP/文件型    | 生成带告警的链接/文件/token，被访问或解析时邮件通知，适合防御方布诱饼             |
| [pingb.in](https://pingb.in/)                                                   | DNS/HTTP           | 类似 interactsh 的轻量回调平台                                                    |

- 优先选择同时支持 DNS 和 HTTP/HTTPS 的工具：DNS 事件只能证明测试链路发生了解析，不能单独证明应用建立了 HTTP/TCP 连接；HTTP 回调也可能来自统一出口代理
- 国内环境测试优先用 `dnslog.cn`/`ceye.io`，因国外服务可能被防火墙封锁导致误判为无回连
- 公共 OOB 服务可能记录请求头、请求体、来源地址和时间；使用一次性、不可预测且不包含凭据或客户数据的标识，并确认数据保留和合规范围
- 生产环境测试前确认全权限/合规范围，避免在未授权资产上触发外部回调被误判为数据外流
