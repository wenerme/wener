---
title: mcp-chrome
---

# mcp-chrome

- [hangwin/mcp-chrome](https://github.com/hangwin/mcp-chrome)

:::caution

- 本地开发可能会遇到 extension id 不匹配导致 connect 失败的情况，调整下 register 的 extension id 即可

:::

```bash
git clone https://github.com/hangwin/mcp-chrome
cd mcp-chrome

# 有问题需要先去掉 native-server 的 postinstall
pnpm i

pnpm build:shared && pnpm build:extension
pnpm build:native-server

node ./app/native-server/dist/cli.js register
```
