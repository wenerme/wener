---
tags:
  - Insight
  - Protocol
---

# MCP Insight

```
客户端                      服务端
   |                          |
   |--- GET /sse ------------>| (建立 SSE 流)
   |                          |
   |<--- SSE: endpoint -------| (返回 POST 端点 + sessionId)
   |                          |
   |--- POST /messages ------>| (发送消息，带 ?sessionId=)
   |                          |
   |<--- 202 Accepted --------| (确认接收)
   |                          |
   |<--- SSE: response -------| (通过 SSE 流返回响应)
```

```
客户端                      服务端
   |                          |
   |--- POST /mcp ----------->| (初始化，包含 initialize 请求)
   |                          |
   |<--- SSE Stream --------->| (响应通过 SSE 返回，包含 Mcp-Session-Id header)
   |    (text/event-stream)   |
   |                          |
   |--- POST /mcp ----------->| (后续请求，带 Mcp-Session-Id header)
   |                          |
   |<--- SSE Stream --------->| (每个 POST 都可能开启新的 SSE 流返回响应)
   |                          |
   |--- GET /mcp ------------>| (可选：建立独立 SSE 流接收服务器推送)
   |<--- SSE Stream --------->|
   |                          |
   |--- DELETE /mcp --------->| (终止会话)
```

- StreamableHTTP - 2025-03-26
- outputSchema
  - 适用于 structureContent
- structureContent - 2025-03-26
- 旧版本返回结果为 `Array<{type:''}>`

```json
{
  //  工具提示信息
  "annotations": {
    // 只读提示：工具不会修改环境
    "readOnlyHint": false,
    // 破坏性提示：是否执行破坏性更新
    "destructiveHint": true,
    // 幂等性提示：相同参数多次调用是否产生相同效果
    "idempotentHint": true,
    // 开放世界提示：是否与外部实体交互
    "openWorldHint": false
  }
}
```

- Client Capabilities
  - `roots`：提供文件系统根目录
  - `sampling`：支持大模型采样请求
  - `experimental`：支持实验性功能
- Server Capabilities
  - `prompts`：提供提示模板
  - `resources`：提供可读资源
  - `tools`：提供可调用工具
  - `logging`：结构化日志
  - `experimental`：实验性功能支持
- 版本
  - 2025-06-18
  - 2025-03-26
    - StreamableHTTP, outputSchema, structureContent, Mcp-Session-Id
  - 2024-11-05
    - SSE, seesionId
  - 2024-10-07
    - Tools、Resources、Prompt、content
- Last-Event-ID

---

- https://www.claudemcp.com/specification
