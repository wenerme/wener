---
id: docusaurus
title: Docusaurus
hide_title: true
---

# Docusaurus

* /
  * blog
  * docs
  * src
    * css
      * custom.css
    * pages
      * styles.module.css
      * index.js
  * static/
    * img/
  * docusaurus.config.js
  * package.json
  * sidebars.js


```bash
# [name] [template]
# @docusaurus/preset-classic
# @docusaurus/preset-bootstrap
npx @docusaurus/init@next init my-website classic
```

## Docs
* https://v2.docusaurus.io/docs/markdown-features

```yaml
# 默认为文件名
id: doc-markdown
# 也支持 slug 控制 - 但一般不用
# slug: part1.html
# 默认为 id
title: Markdown Features
# hide_title 是否隐藏顶部标题 - 如果 markdown 本身包含了 title 可以考虑隐藏
hide_title: false
# 隐藏目录
hide_table_of_contents: false
# 默认为 title - 显示在左侧 sidebar 和上下文章位置
sidebar_label: Markdown :)
# 编辑地址 - 默认 editUrl 传递给 docusaurus-plugin-content-docs 插件
custom_edit_url: https://github.com/facebook/docusaurus/edit/master/docs/api-doc-markdown.md
# 描述信息 - <meta name="description" content="..."/> <meta property="og:description" content="..."/>
# 默认为内容第一行
description: How do I find you when I cannot solve this problem
keywords:
  - docs
  - docusaurus
# thumbnail
image: https://i.imgur.com/mErPwqL.png
```

### 支持提示信息
:::note
The content and title *can* include markdown.
:::

:::tip You can specify an optional title
Heads up! Here's a pro-tip.
:::

:::info
Useful information.
:::

:::caution
Warning! You better pay attention!
:::

:::danger
Danger danger, mayday!
:::

### 支持引用文件

  ```jsx title="/src/components/HelloCodeTitle.js"
  function HelloCodeTitle(props) {
    return <h1>Hello, {props.name}</h1>;
  }
  ```
