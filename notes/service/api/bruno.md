---
title: Bruno
---

# Bruno

- [usebruno/bruno](https://github.com/usebruno/bruno)
  - MIT, JavaScript/TypeScript, Electron, React, TailwindCSS
  - 开源 API 测试客户端 (Open-source IDE For Exploring and Testing API)。基于本地文件系统存储 API 请求（`.bru` 纯文本标记语言），天生适合 Git 版本控制和团队协作。轻量、离线友好、注重隐私的 Postman/Insomnia 替代品。
- 参考
  - [Bruno 官网](https://www.usebruno.com/)
  - [usebruno/bruno-docs](https://github.com/usebruno/bruno-docs)

```bash
# 安装
brew install bruno

# CLI 测试工具
npm install -g @usebruno/cli
```

# FAQ

## 目录结构与数据格式

Bruno 的核心理念是将 API 集合（Collection）作为普通目录保存在文件系统中，不依赖任何云端数据库同步，非常适合使用 Git 进行团队协作和版本控制。

### 工作区与集合配置 (`bruno.json`)

每个 Bruno Collection 都是一个包含 `bruno.json` 文件的普通文件夹。该文件定义了集合的基础信息。

```json
{
  "version": "1",
  "name": "my-collection",
  "type": "collection",
  "scripts": {
    "moduleWhitelist": ["crypto", "buffer"]
  }
}
```

- **Environments**: 环境变量通常存储在集合目录的 `environments/` 文件夹下。
- **Secrets**: 敏感的密钥配置可以通过 UI 存储在本地，不会被持久化在 `bruno.json` 或 `.bru` 文件中被 Git 提交，保证安全。

### 请求文件 (`.bru` 格式)

Bruno 摒弃了将所有请求打包进一个巨大 JSON 文件的做法，而是首创了 `.bru` 纯文本标记语言。每一个 API 请求对应一个 `.bru` 文件。

**优点：**
1. **对人类友好**：阅读非常清晰。
2. **对 Git 友好**：合并代码、查看 diff 非常直观，极大地减少了团队协作时的冲突。
3. **无需嵌套转义**：Request Body（如 JSON、GraphQL）可以直接粘贴，无需处理恼人的双引号转义。

**典型结构示例：**

```bru
meta {
  name: Get User Info
  type: http
  seq: 1
}

get {
  url: https://api.example.com/users/:id
  body: json
  auth: bearer
}

params:path {
  id: 123
}

headers {
  content-type: application/json
  ~disabled-header: value  # 使用 ~ 前缀可快速禁用当前行
}

body:json {
  {
    "query": "hello world"
  }
}
```

### 生命周期与执行块

在处理单个请求时，Bruno 支持请求前置与后置脚本及变量提取，可以方便地串联多个请求或进行接口自动化测试。

| 块 | 执行时机 | 干什么 |
| --- | --- | --- |
| `vars:pre-request` | 请求前 | 覆盖变量 |
| `script:pre-request` | 请求前 | 动态计算值 |
| `assert` / `tests` | 响应后 | 校验响应 |
| `script:post-response`| 响应后 | 提取/处理数据 |
| `vars:post-response` | 响应后 | 存储链式变量 |
| `docs` | 不执行 | 人类文档 |
