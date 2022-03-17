---
title: Github FAQ
---

# Github FAQ

- .nojekyll 文件提示 不启用 jekyll

## Github Copilot IDEA Shortcut

|                                              key | for            |
| -----------------------------------------------: | -------------- |
|                                   <kbd>Tab</kbd> | 接受建议       |
|                                   <kbd>Esc</kbd> | 取消建议       |
|         <kbd>Alt + ]</kbd>,<kbd>Option + ]</kbd> | 下一个建议     |
|         <kbd>Alt + [</kbd>,<kbd>Option + [</kbd> | 上一个建议     |
|         <kbd>Alt + \</kbd>,<kbd>Option + \</kbd> | 触发建议       |
| <kbd>Alt + Enter</kbd>,<kbd>Option + Enter</kbd> | 显示建议侧边栏 |

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
