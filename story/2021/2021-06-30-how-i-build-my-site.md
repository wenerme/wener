---
title: 我的站点是如何构建的？！
slug: how-i-build-my-site
---

# 我的站点是如何构建的？！

我的站点 [wener.me](https://wener.me) 和国内备案镜像 [wener.tech](https://wener.tech) 构建过程和逻辑。

<!-- more -->

## docusaurus

站点基于 [docusaurus](https://docusaurus.io/) 2.0-alpha 构建，docusaurus 处于 2.0-alpha 已经很长一段时间了，最近进入了 beta 阶段。早期对中文支持有缺陷，提交几个修复后都能正常使用了。

docusaurus 有 blog 和 doc 的概念。
docusaurus 本身是 facebook 为了支持技术文档存在的，因此对 doc 的支持非常好，doc 主要特性

- 多版本
- 多语言
- 集成 algolia 搜索
- 自定义插件
- mdx
- 支持替换内置 组件

doc 默认目录为 /docs，可自定义。

blog 为单篇文章，默认目录为 /blog，支持自定义 slug，默认 slug 为泛化后的文件名。


```bash
# 新项目初始化
npx @docusaurus/init@latest init my-website classic
```

## 构建

归根结底，docusaurus 是一个 npm 库，因此实现自定义需要基于一个 node 项目。
站点的构建项目位于 [site](https://github.com/wenerme/wener/tree/master/site) 目录下，构建过程为

- 同步 /story 到 /site/story
- 同步 /notes 到 /site/notes

:::tip

同步过程会过滤部分 md 文件，docusaurus 默认会处理所有 md 文件，但是 wenerme/wener 中的部分 md 文件是不希望被构建的。
因此我的过滤逻辑是只包含文件开头有 frontmatter 的，也就是文件开头为 `---`。

:::

- 预处理 markdown
  - 例如 引用外部 markdown [story/project/bbvm.md](https://raw.githubusercontent.com/wenerme/wener/master/story/project/bbvm.md)
- 自定义脚本生成 sidebar
  - docusaurus 的 sidebar 需要手动书写，但文档过多且每次新增后都需要添加，因此实现了脚本自动扫描
  - [site/sidebars.js#L48-L65](https://github.com/wenerme/wener/blob/f34b8624b8cc55e539af282d275d4805650aee41/site/sidebars.js#L48-L65)
- 站点构建
  - 构建后会生成到 /build 目录

## 自动化部署

站点基于 github [action](https://github.com/wenerme/wener/blob/master/.github/workflows/build.yaml) 进行构建，每次推送后会进行构建，会将构建的内容推送到 [gh-pages](https://github.com/wenerme/wener/deployments) 分支。
推送的内容同时包含了 CNAME，实现了 wener.me 域名的映射。

完成 wener.me 推送后修改 CNAME 为 wener.tech 推送到 [wenerme/wener.tech](https://github.com/wenerme/wener.tech)，实现 wener.tech 域名的映射。

## 域名配置

.me 域名在国内无法备案，因此直接托管在了 [cloudflare.com](https://cloudflare.com)，添加两个记录

```
A wener.me 185.199.109.153
A wener.me 185.199.108.153
```

至此 wener.me 可以被访问。

因为 cloudflare 在国内访问速度较慢，且 .me 无法备案的原因，因此镜像了 wener.tech。

:::caution

微信会拦截所有没有备案的域名，提示用户是否前往，非常影响体验。

:::

wener.tech 使用阿里云 dcdn/全站加速 实现，添加域名 www.wener.tech ，指向 185.199.108.153 和 185.199.109.153。
添加完成后前往域名解析，将 www.wener.tech CNAME 到 www.wener.tech.w.kunluncan.com 。完成后建议开启 https。

至此 www.wener.tech 可以被访问。

:::caution dcdn 的 坑

- 阿里的 dcdn 实现和 cloudflare 类似的功能，但体验差很多
- dcdn 通过 CNAME 实现，主域名 wener.tech 无法进行 CNAME，因此只能使用 www.wener.tech
- 访问 wener.tech 会发现左侧侧边栏卡顿，应该是 dcdn 的“优化”导致的
  - wener.me 没有这个问题

:::

## 总结

基于 github action + cloudflare 可以很容易实现“免费”的静态站点托管。
如果需要动态能力，可以配合 [next.js](https://github.com/vercel/next.js)+[vercel](https://vercel.com/) 实现。例如 [apis.wener.me](https://apis.wener.me)。

cloudflare 看似没起什么作用，但是却是必须的，因为默认 github pages 和 vercel 在国内都无法访问，或访问都是间歇性能通，使用 cloudflare 虽然速度偏慢，但至少都能访问。
