# Lerna
## Tips
* https://github.com/lerna/lerna/issues/1243#issuecomment-401396850
  * Lerna 的主要目的是帮助 monorepo __发布__ 多个包，而不是帮助本地开发本地多模块 - 这是 yarn workspace 的目的
* Lerna 可以配合 yarn workspace 一起使用
* 参考
  * [Why Lerna and Yarn Workspaces is a Perfect Match for Building Mono-Repos](https://doppelmutzi.github.io/monorepo-lerna-yarn-workspaces/)

```bash
npx lerna init

lerna add @wener/core --scope=@wener/admin
```
