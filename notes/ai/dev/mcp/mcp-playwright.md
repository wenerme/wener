---
title: playwright-mcp
---

# playwright-mcp

- [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp)
- 参考
  - Playwright MCP Bridge https://github.com/microsoft/playwright-mcp/releases

```bash
# http://localhost:8931/mcp
# http://localhost:8931/sse
npx @playwright/mcp@latest --port 8931

# by Remote SSE
claude mcp add playwright -s project -t sse http://localhost:8931/sse
```

**直接启动**

> 相对可靠稳定

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--isolated"]
    }
  }
}
```

- .playwright-mcp/traces

远程、Bridge 可复用但不稳定

```json
{
  "mcpServers": {
    "playwright": {
      "type": "sse",
      "url": "http://localhost:8931/sse"
    }
  }
}
```

**flags**

| flag                          | for                                                                            |
| ----------------------------- | ------------------------------------------------------------------------------ |
| `--allowed-origins <origins>` | 分号分隔允许的来源列表；默认允许所有请求                                       |
| `--blocked-origins <origins>` | 分号分隔阻止的来源；优先于允许列表；若未设置允许列表，则未匹配阻止规则的仍放行 |
| `--block-service-workers`     | 阻止 Service Worker 注册与使用                                                 |
| `--browser <browser>`         | 使用的浏览器或渠道：`chrome` `firefox` `webkit` `msedge`                       |
| `--caps <caps>`               | 额外能力(逗号分隔)：`vision`，`pdf`                                            |
| `--cdp-endpoint <endpoint>`   | 连接的 CDP 端点 URL                                                            |
| `--cdp-header <headers...>`   | 追加的 CDP 请求 Header，可多次指定                                             |
| `--config <path>`             | 配置文件路径                                                                   |
| `--device <device>`           | 模拟设备名称，如 `"iPhone 15"`                                                 |
| `--executable-path <path>`    | 浏览器可执行文件路径                                                           |
| `--extension`                 | 连接到已运行的 Edge/Chrome 实例；需安装 Playwright MCP Bridge 扩展             |
| `--headless`                  | 无头模式运行（默认有界面）                                                     |
| `--host <host>`               | 监听主机，默认 `localhost`；`0.0.0.0` 表示全部接口                             |
| `--ignore-https-errors`       | 忽略 HTTPS 证书错误                                                            |
| `--isolated`                  | 浏览器配置仅驻留内存，不写磁盘                                                 |
| `--image-responses <mode>`    | 是否发送图片响应：`allow` / `omit`，默认 `allow`                               |
| `--no-sandbox`                | 禁用所有进程的沙箱                                                             |
| `--output-dir <path>`         | 输出文件目录                                                                   |
| `--port <port>`               | SSE 传输监听端口                                                               |
| `--proxy-bypass <bypass>`     | 逗号分隔无需代理域名，如 `.com,chromium.org,.domain.com`                       |
| `--proxy-server <proxy>`      | 代理地址，如 `http://myproxy:3128` 或 `socks5://myproxy:8080`                  |
| `--save-session`              | 保存当前 MCP 会话到输出目录                                                    |
| `--save-trace`                | 保存会话的 Playwright Trace                                                    |
| `--secrets <path>`            | dotenv 格式的机密变量文件路径                                                  |
| `--storage-state <path>`      | isolated 会话使用的 storage state 文件                                         |
| `--timeout-action <ms>`       | 单个动作超时，默认 `5000`                                                      |
| `--timeout-navigation <ms>`   | 页面导航超时，默认 `60000`                                                     |
| `--user-agent <ua>`           | 自定义 User-Agent 字符串                                                       |
| `--user-data-dir <path>`      | 用户数据目录；未指定则创建临时目录                                             |
| `--viewport-size <size>`      | 视口大小 `"宽,高"`，如 `"1280,720"`                                            |
