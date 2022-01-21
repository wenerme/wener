---
title: Lerna
---

# Lerna

- [#1243](https://github.com/lerna/lerna/issues/1243#issuecomment-401396850)
  - Lerna 的主要目的是帮助 monorepo **发布** 多个包，而不是帮助本地开发本地多模块 - 这是 yarn workspace 的目的
- Lerna 可以配合 yarn workspace 一起使用
- 问题
  - yarn2 workspace protocol support - [#2564](https://github.com/lerna/lerna/issues/2564)
  - 失败无法恢复 - [#455](https://github.com/lerna/lerna/issues/455)
    - 建议 `--no-push`
    - 考虑版本修改和发布分开 `lerna version && lerna publish from-git`
- 参考
  - [Why Lerna and Yarn Workspaces is a Perfect Match for Building Mono-Repos](https://doppelmutzi.github.io/monorepo-lerna-yarn-workspaces/)

```bash
# npx lerna init
yarn dlx lerna init

# 项目间依赖
lerna add @wener/core --scope=@wener/admin

yarn lerna publish 1.0.0 -y --skip-git

# 只修改版本 - 不 push
yarn lerna version prerelease --no-push

# 当前 git 版本
git describe --abbrev=0 --tags
# 发布 git 版本 - 用于发布失败的时候
yarn lerna from-git
```

## lerna.json

- [lerna.json](https://github.com/lerna/lerna#lernajson)

```json
{
  "packages": ["packages/*"],
  "command": {
    "create": {
      "homepage": "https://github.com/lerna/lerna",
      "license": "MIT"
    },
    "version": {
      "allowBranch": "master",
      "conventionalCommits": true,
      "exact": true,
      "gitRemote": "upstream",
      "message": "chore(release): %s"
    }
  },
  "ignoreChanges": ["**/__fixtures__/**", "**/__tests__/**", "**/*.md"],
  "version": "3.20.2"
}
```
