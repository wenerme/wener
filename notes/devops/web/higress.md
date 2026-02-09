---
tags:
  - WASM
---

# higress

- [alibaba/higress](https://github.com/alibaba/higress)
  - Apache-2.0, Go, C++
  - 基于 Envoy WASM V8
  - WasmPlugin

## 插件

AI 相关（18 个）

- ai-proxy - AI 代理核心插件，35+ 厂商协议转换、模型映射、Failover、重试
- ai-agent - AI Agent 插件，支持工具调用和函数递归调用
- ai-cache - 对接文本嵌入和向量存储，实现 LLM 响应语义缓存
- ai-history - 对话历史管理，支持 Redis 存储读写会话历史
- ai-image-reader - 图像内容处理，转换为文本供 AI 模型理解
- ai-intent - 意图识别，根据用户请求意图路由到相应服务
- ai-json-resp - 处理和转换 AI 模型的 JSON 格式响应
- ai-load-balancer - 基于集群指标、端点指标和最少请求算法的智能负载均衡
- ai-prompt-decorator - Prompt 增强和装饰处理
- ai-prompt-template - 模板化 Prompt 定义和渲染
- ai-quota - AI API 调用的令牌配额限制和管理
- ai-rag - 检索增强生成（RAG），对接阿里云向量检索服务
- ai-search - 集成搜索功能辅助 AI 模型获取外部信息
- ai-security-guard - 文本审核和多模态内容审核
- ai-statistics - AI 可观测性，提供 metrics/logs/traces
- ai-token-ratelimit - 基于令牌消耗的速率限制
- ai-transformer - 对 AI 请求和响应进行灵活转换
- chatgpt-proxy - ChatGPT API 简单代理

模型路由（2 个）

- model-mapper - 模型名称和参数的映射转换
- model-router - 按条件智能路由到不同 AI 模型

认证与授权（7 个）

- basic-auth - HTTP Basic Auth 认证
- jwt-auth - JWT Token 验证和签名检查
- simple-jwt-auth - 简化版 JWT 认证
- key-auth - API Key 身份验证
- ext-auth - 对接外部认证服务
- oidc - OpenID Connect / OAuth2 认证
- hmac-auth-apisix - HMAC 签名认证（APISIX 兼容）

安全与防护（5 个）

- waf - Web 应用防火墙，基于 Coraza 引擎
- bot-detect - 机器人流量识别和拦截
- ip-restriction - IP 白名单/黑名单
- replay-protection - 请求重放攻击防护
- opa - Open Policy Agent 策略引擎

流量控制（4 个）

- cluster-key-rate-limit - 分布式集群级速率限制
- request-block - 按 URL/请求头特征屏蔽请求
- traffic-tag - 为流量添加标签用于后续处理
- traffic-editor - 流量编辑和修改

请求/响应处理（7 个）

- transformer - 请求/响应头、查询参数、Body 转换
- custom-response - 返回自定义 HTTP 响应
- request-validation - HTTP 请求格式和内容验证
- cache-control - HTTP 缓存策略管理
- response-cache - HTTP 响应内容缓存
- log-request-response - 请求响应详细日志记录
- gw-error-format - 统一网关错误响应格式

协议转换（2 个）

- de-graphql - GraphQL 请求转换为 REST 格式
- jsonrpc-converter - JSON-RPC 协议转换

网络与路由（3 个）

- cors - 跨域资源共享处理
- geo-ip - 基于 IP 识别用户地理位置
- sni-misdirect - SSL/TLS SNI 相关处理

工作流与集成（3 个）

- api-workflow - 可编排 API 工作流，根据配置生成 DAG 并执行
- http-call - 请求处理中发起 HTTP 外部调用
- frontend-gray - 前端版本灰度发布

测试与示例（3 个）

- hello-world - WASM 插件开发示例
- streaming-body-example - 流式响应处理示例
- gc-test - WASM 运行时 GC 测试
