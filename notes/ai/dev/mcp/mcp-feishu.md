---
title: 飞书 MCP
---

# Lark MCP

- https://github.com/larksuite/lark-openapi-mcp
- Feishu / 飞书 / Lark MCP
- 参考
  - https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mcp_integration/mcp_installation#46d7e401
  - https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/mcp_integration/advanced-configuration

```bash
npm add @larksuiteoapi/lark-mcp -g

lark-mcp -V

npx -y @larksuiteoapi/lark-mcp login -a $APP_ID -s $APP_SECRET

# 指定特定的OAuth权限范围登录
npx -y @larksuiteoapi/lark-mcp login -a cli_xxxx -s your_secret --scope offline_access docx:document
# 使用自定义域名登录（适用于Lark国际版）
npx -y @larksuiteoapi/lark-mcp login -a cli_xxxx -s your_secret -d https://open.larksuite.com
```
