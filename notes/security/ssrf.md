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

## 常见探测目标

| target                                                                               | mean                                                                                                                                                                    |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `http://169.254.169.254/latest/meta-data/`                                           | AWS EC2 Instance Metadata（IMDSv1），无需认证                                                                                                                           |
| `http://169.254.169.254/latest/meta-data/iam/security-credentials/<role>`            | AWS 临时 IAM 凭证（AccessKey/SecretKey/Token）                                                                                                                          |
| `http://169.254.169.254/latest/user-data/`                                           | AWS user-data，常包含启动脚本/配置中的敏感信息                                                                                                                          |
| `http://169.254.170.2/v2/credentials/<UUID>`（AWS ECS Task Metadata）                | ECS Task 级 IAM 凭证，UUID 需先从 `/proc/self/environ` 读取                                                                                                             |
| `http://localhost:9001/2018-06-01/runtime/invocation/next`（AWS Lambda Runtime API） | 读取 Lambda 调用事件，可包含调用方传入的输入数据                                                                                                                        |
| `http://metadata.google.internal/computeMetadata/v1/`                                | GCP Metadata，需 header `Metadata-Flavor: Google`                                                                                                                       |
| `http://169.254.169.254/metadata/v1/`                                                | DigitalOcean Metadata                                                                                                                                                   |
| `http://169.254.169.254/metadata/instance?api-version=2021-02-01`                    | Azure IMDS，需 header `Metadata: true`                                                                                                                                  |
| `http://100.100.100.200/latest/meta-data/`                                           | 阿里云 ECS 专用 Metadata 地址（注意不是 `169.254.169.254`）                                                                                                             |
| `http://localhost` / `http://127.0.0.1`                                              | 本机仅绑定内部管理接口（调试/监控/管理后台）                                                                                                                            |
| `http://127.0.0.1:6379`                                                              | Redis，常默认无鉴权，可通过 gopher:// 构造命令实现 RCE                                                                                                                  |
| `http://127.0.0.1:11211`                                                             | Memcached，常默认无鉴权                                                                                                                                                 |
| `http://127.0.0.1:9200`                                                              | Elasticsearch，可读写数据，老旧版本存在 RCE                                                                                                                             |
| `http://127.0.0.1:2375` / `unix:///var/run/docker.sock`                              | Docker API，可创建容器挂载主机根文件系统实现容器逃逸/RCE                                                                                                                |
| `https://127.0.0.1:10250/pods`（Kubelet API）                                        | 获取/执行 Pod，部分环境无鉴权                                                                                                                                           |
| `https://kubernetes.default.svc/api/v1/namespaces`（kube-apiserver）                 | Pod 内部固定可解析地址；配合 Pod 内 ServiceAccount token（`/var/run/secrets/kubernetes.io/serviceaccount/token`）可访问 K8s API，RBAC 过宽时可枚举/控制其他 Pod、Secret |
| `http://kube-dns.kube-system.svc.cluster.local:9153/metrics`（CoreDNS）              | 泄露 DNS 解析指标，间接泄露集群内服务命名                                                                                                                               |
| `http://<svc>.<namespace>.svc.cluster.local`（K8s 内部 DNS）                         | 按固定命名规则直接拼出全部 Service 地址进行探测/请求，无需扫描 IP 段；配合 `kube-apiserver` 返回的 Service 列表可穷举所有命名空间                                       |
| `http://127.0.0.1:2379`/`2380`（etcd client/peer）                                   | 未启用 TLS 时可读写整个集群状态，包含所有 Secret 明文（若未加密）                                                                                                       |
| `http://169.254.169.254/latest/meta-data/`（节点运行在公有云时）                     | Pod 与宿主机共享 network namespace 或未局限 hostNetwork 时，仍可读到节点级 Cloud Metadata，进一步获取节点 IAM 角色凭证                                                  |
| `http://127.0.0.1:8080`/`9090`/`15672` 等常见开发端口                                | Jenkins、Prometheus、RabbitMQ 管理面板等未鉴权服务                                                                                                                      |
| `file:///etc/passwd`                                                                 | 本地文件读取（需服务支持 `file://`协议）                                                                                                                                |
| `dict://127.0.0.1:11211/stat`                                                        | 通过 dict 协议探测端口/服务并执行简单命令                                                                                                                               |
| 内网 `/24`段按端口打开时间差整体扫描                                                 | 组合不存在/未开放端口的响应差异探测内网拓扑和开放服务                                                                                                                   |
| `http://127.0.0.1:8848/nacos/`                                                       | Nacos 控制台/开放 API，默认无鉴权或弱可用鉴权绕过（`/nacos/v1/auth/users` 等），可读取配置中心所有工程的配置和注册的服务地址                                            |
| `http://127.0.0.1:8070`（Apollo Admin Service）/ `:8080`（Portal）                   | Apollo 配置中心，Admin Service 常默认无鉴权，可读写配置（包含数据库密码、其他服务凭证）                                                                                 |
| `http://127.0.0.1:8761/eureka/apps`                                                  | Spring Cloud Eureka 注册中心，可枚举已注册的服务实例地址                                                                                                                |
| `http://127.0.0.1:8500/v1/catalog/services`                                          | Consul API/UI，可枚举服务、读取 KV 存储中的配置和凭证                                                                                                                   |
| `http://127.0.0.1:2181`（ZooKeeper）                                                 | 通过 4字母命令（`envi`、`wchc` 等）泄露节点信息，连接后可读写 znode，其中常存数据库/中间件配置                                                                          |
| `http://127.0.0.1:8080/actuator/*`（Spring Boot Actuator）                           | `env`、`heapdump`、`mappings` 等未鉴权 endpoint 可泄露配置、凭证；部分版本 `/actuator/gateway` 可滥用达到 RCE                                                           |
| `http://127.0.0.1:9000/graphql`/`admin`（Hasura 等 GraphQL 引擎）                    | introspection 未关闭时泄露完整 schema                                                                                                                                   |
| `http://127.0.0.1:5601`（Kibana）                                                    | 未鉴权时可访问 Elasticsearch 所有数据，部分版本存在 RCE CVE                                                                                                             |
| `http://127.0.0.1:9090/api/v1/query`（Prometheus）                                   | 读取监控指标间接泄露内部服务命名/拓扑信息                                                                                                                               |

- https://swisskyrepo.github.io/PayloadsAllTheThings/Server%20Side%20Request%20Forgery/SSRF-Cloud-Instances/

## 常见目标分类

| 目标                                           | 风险                                                  |
| ---------------------------------------------- | ----------------------------------------------------- |
| Cloud metadata（`169.254.169.254`）            | 读取临时凭据、instance profile、user-data             |
| 内网服务（Redis、Elasticsearch、内部管理后台） | 未授权访问、RCE                                       |
| `localhost` / `127.0.0.1`                      | 探测/访问仅绑定本机的管理端口                         |
| 内网其他主机/端口                              | 端口扫描，探测内网拓扑                                |
| 协议跳转（`file://`、`gopher://`、`dict://`）  | 读本地文件、构造任意协议请求（打 Redis/Memcached 等） |

- Cloud metadata 端点
  - AWS/GCP/Azure/阿里云/腾讯云等均使用 `169.254.169.254`
  - AWS IMDSv1 无需认证即可读取，IMDSv2 需要先获取 session token（`PUT` 请求），但仍可能被 SSRF 绕过，取决于是否限制 hop limit

## 绕过手段

- IP 编码混淆
  - 十进制整数：`http://2130706433/`（= `127.0.0.1`）
  - 八进制/十六进制：`http://0x7f.0.0.1/`、`http://0177.0.0.1/`
  - IPv6 映射：`http://[::ffff:127.0.0.1]/`
  - 省略段：`http://127.1/`
- DNS rebinding：首次校验解析到安全 IP，请求发出时 DNS TTL 到期重新解析到内网 IP
- 跳转绕过：首次请求目标是允许的域名，返回 `3xx` 跳转到内网地址，若服务端跟随跳转且不重新校验就会绕过白名单
- 利用解析宽松的 URL parser 差异（SSRF 配合 URL 解析不一致，例如 `http://allowed.com@attacker.com/`、`http://attacker.com#allowed.com`）
- 利用内部解析服务（DNS、反向代理、CDN）的例外规则

## 防御

- 优先使用出站白名单，而不是黑名单
  - 只允许访问明确需要的域名/IP，拒绝其余所有请求
- 禁止访问内网地址段和 metadata 地址
  - `127.0.0.0/8`、`10.0.0.0/8`、`172.16.0.0/12`、`192.168.0.0/16`、`169.254.0.0/16`、`::1`、`fc00::/7`、`fe80::/10`
- DNS 解析后立即使用解析结果发起请求（避免 TOCTOU/DNS rebinding），不要先校验域名再单独解析
- 禁止跟随跳转，或跳转后重新执行完整校验
- 限制可用协议为 `http`/`https`，拒绝 `file://`、`gopher://`、`dict://`、`ftp://` 等
- 网络层隔离
  - 出站请求经过独立的正向代理/网关，网关侧做访问控制，而不是仅依赖应用层代码
  - 对需要抓取外部资源的服务单独划分网络，不能访问内网其他服务
- Cloud 环境：强制 IMDSv2（AWS）、限制 metadata hop limit、为运行抓取任务的实例移除不必要的 IAM 权限
- 返回内容不原样回显给用户（避免利用 SSRF 做盲注探测时获得更多反馈）

## 排查

```bash
# 请求前校验域名解析结果是否落在内网段
dig +short example.com

# 常见内网/metadata 测试地址（合规环境自测用）
curl -s http://169.254.169.254/latest/meta-data/
curl -s http://[::1]/
```

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

- 优先选择支持 DNS 回调的工具：部分环境封锁了 HTTP 外联但未封 DNS 解析，仅观察到 DNS 查询仍能证明服务端确实发出了请求
- 国内环境测试优先用 `dnslog.cn`/`ceye.io`，因国外服务可能被防火墙封锁导致误判为无回连
- 生产环境测试前确认全权限/合规范围，避免在未授权资产上触发外部回调被误判为数据外流
