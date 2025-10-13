---
title: Github FAQ
tags:
  - FAQ
---

# Github FAQ

- .nojekyll 文件提示 不启用 jekyll
- 不支持对别人的 repo 加 webhook
  - 可以考虑 gitea mirror 别人参考然后加 webhook
  - 或者拉 releases/tags 判断

```bash
# 提交的行数量统计
git log --pretty=format:"%h %an %ad %s" --shortstat

git log --pretty=format:"%h %an %ad %s" --shortstat -- :^graphql.schema.json :^pnpm-lock.yaml

# --numstat COMMIT 来 debug
git log --pretty=format:"%h %an %ad %s" --shortstat -- :^*/{graphql.schema.json,graphql.ts,manifest.json,manifest.md} :^pnpm-lock.yaml


# .netrc
# -n, --netrc
curl -n https://api.github.com/user
```

## Github Pages CNAME

- 一个仓库只支持一个 CNAME

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

## SPA Pages

- 默认返回 404.html
  - 在这里添加跳转
  - 在 index 检测跳转携带的参数
  - 然后 window.history.replaceState
- [rafgraph/spa-github-pages](https://github.com/rafgraph/spa-github-pages)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Single Page Apps for GitHub Pages</title>
    <script type="text/javascript">
      // 非自定义域名设置为 1
      // https://username.github.io/repo-name
      // 自定义域名设置为 0
      var pathSegmentsToKeep = 1;

      var l = window.location;
      l.replace(
        l.protocol +
          '//' +
          l.hostname +
          (l.port ? ':' + l.port : '') +
          l.pathname
            .split('/')
            .slice(0, 1 + pathSegmentsToKeep)
            .join('/') +
          '/?/' +
          l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
          (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
          l.hash,
      );
    </script>
  </head>
  <body></body>
</html>
```
