---
title: MarkDoc
---

# MarkDoc

- [markdoc/markdoc](https://github.com/markdoc/markdoc)
  - by Stripe
  - CommonMark 超集 - 取消缩进代码块语法、取消 setext heading
- 后缀 mdoc
- 参考
  - parser [markdown-it/markdown-it](https://github.com/markdown-it/markdown-it)
  - https://markdoc.io/sandbox

```bash
npm add @markdoc/markdoc
```

- 内置 nodes - https://markdoc.io/docs/nodes#built-in-nodes
- 内置 tags - if, else, table, partial
- 内置函数 - equals, and, or, not, default, debug

```ts
import Markdoc from '@markdoc/markdoc';

const source = `
---
title: Doc title
---

# {% $markdoc.frontmatter.title %} {% #overview %}

{% callout type="check" %}
  More content
{% /callout %}
`;

const ast = Markdoc.parse(source);
const content = Markdoc.transform(ast, {
  nodes: {
    heading: {
      render: 'Heading',
      attributes: {
        id: { type: String },
        level: { type: Number },
      },
    },
  },
  tags: {
    callout: {
      render: 'Callout',
      attributes: {
        title: {
          type: String,
          description: 'The title displayed at the top of the callout',
        },
      },
    },
  },
  variables: {
    author: {
      name: 'Wener',
    },
  },
  functions: {
    includes: {
      transform(parameters, config) {
        const [array, value] = Object.values(parameters);

        return Array.isArray(array) ? array.includes(value) : false;
      },
    },
  },
  partials: {
    'header.md': Markdoc.parse(`# My header`),
  },
});

// toHTML
const html = Markdoc.renderers.html(content);
// React
const children = Markdoc.renderers.react(content, React, { components });
```

## 语法

```markdoc
<!-- Tag+属性 -->
{% callout type="check" %}
  More content
{% /callout %}

{% image src="" /%}

<!-- Annotation -->
# Header {% #custom-id %}
# Heading {% .custom-class-name-here %}

<!-- 变量 -->
{% $variable %}
{% $markdoc.frontmatter.title %}

<!-- 函数 -->
# {% titleCase($markdoc.frontmatter.title) %}

{% if equals(1, 2) %}
Show the password
{% /if %}

{% tag title=uppercase($key) /%}
```

# FAQ

## Why not MDX

- MDX
  - 允许任意 JS - docs as code
  - 允许任意代码导致最终会过度复杂
  - 要求语法严格正确 - 错误无法编译 - 例如: 不允许单独存在 `<` - 会导致解析错误
- Markdoc
  - 限定允许的 tag - docs as data
  - declarative
  - 针对文档书写
  - 允许一定的错误语法
