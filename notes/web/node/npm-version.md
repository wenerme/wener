---
title: NPM Version
tags:
  - Version
---

# NPM Version

## NPM v8

- Node.js 16 默认
- Node.js 12+
- 不支持 Node.js 10

## NPM v7

- 问题
  - [npm/cli#2800](https://github.com/npm/cli/issues/2800)
    - npm outdated 不支持 `tailwindcss@npm:@tailwindcss/postcss7-compat`
- workspace
- 自动安装 peer 依赖
  - 解析版本会有冲突 - 之前不安装无影响
- package-lock v2 - 支持 yarn.lock
- `npx -y` 自动安装 - 不询问
- npx 基于 `npm exec`

```bash
# 只显示顶级依赖
npm ls
# 之前行为
npm ls --all

# why -> explain
npm why node_modules/react/

# 进入到 workspace 环境 - shell
npm exec -w @wener/reaction
# -w 指定空间 -c 运行 shell
# -w 可多次指定
npm exec -w @wener/reaction -c 'pwd'
# -ws 所有空间运行
npm exec -ws -c 'pwd'

# 运行 foo bar --package=@npmcli/foo
npx foo@latest bar --package=@npmcli/foo
# 运行 foo@latest bar
npm exec foo@latest bar --package=@npmcli/foo
# 建议使用 -- 分割命令
npm exec -- foo@latest bar --package=@npmcli/foo
```
