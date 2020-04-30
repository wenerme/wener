# Lerna
## Tips
* [#1243](https://github.com/lerna/lerna/issues/1243#issuecomment-401396850)
  * Lerna 的主要目的是帮助 monorepo __发布__ 多个包，而不是帮助本地开发本地多模块 - 这是 yarn workspace 的目的
* Lerna 可以配合 yarn workspace 一起使用
* 参考
  * [Why Lerna and Yarn Workspaces is a Perfect Match for Building Mono-Repos](https://doppelmutzi.github.io/monorepo-lerna-yarn-workspaces/)

```bash
npx lerna init

# 项目间依赖
lerna add @wener/core --scope=@wener/admin

yarn lerna publish 1.0.0 -y --skip-git
```

## lerna.json
* [lerna.json](https://github.com/lerna/lerna#lernajson)

```json
{
  "packages": [
    "packages/*"
  ],
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
  "ignoreChanges": [
    "**/__fixtures__/**",
    "**/__tests__/**",
    "**/*.md"
  ],
  "version": "3.20.2"
}
```
