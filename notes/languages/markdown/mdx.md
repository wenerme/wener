---
title: MDX
---

# MDX

- [mdx-js/mdx](https://github.com/mdx-js/mdx)
  - Markdown+JSX
  - remark, rehype, recma
- 参考
  - [shuding/nextra](https://github.com/shuding/nextra)
    - Next.js Static Site Generator
    - 不支持 nextjs 13 [shuding/nextra#935](https://github.com/shuding/nextra/issues/935)
    - 依赖 webpack 不支持 turbopack
    - markdown 由 [nextra/loader](https://github.com/shuding/nextra/blob/core/packages/nextra/src/loader.ts) 处理
  - https://mdxjs.com/playground/
  - [sjwall/mdx-mermaid](https://github.com/sjwall/mdx-mermaid)
    - mdxast 插件，添加 mermaid 支持
    - 可以支持直接渲染 svg - 需要 puppeteer
    - `{type:mermaidCodeBlock, data:{hName, hProperties:{config:{}, chart:""}}}`
  - [hashicorp/next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)

```mdx title="input.mdx"
export const Thing = () => <>World</>;

# Hello <Thing />
```

```jsx title="output-outline.jsx"
/* @jsxRuntime automatic @jsxImportSource react */

export const Thing = () => <>World</>;

export default function MDXContent() {
  return (
    <h1>
      Hello <Thing />
    </h1>
  );
}
```

- 默认 export MDXContent
  - props
    - `components: Record<string,ComponentType> | ()=>Record<string,ComponentType>`
      - 组件映射
      - `wrapper:({components,...props})=>` - 包装内容
      - 组件列表 https://mdxjs.com/table-of-components/
- `export default function Layout` - 同 components.wrapper
- `<MDXProvider components={components}></MDXProvider>`
  - 上下文配置好组件

## Notes

- extensions https://github.com/sindresorhus/markdown-extensions/blob/v2.0.0/markdown-extensions.json
  - mdx, md, markdown, mdown, mkdn, mkd, mkdown, ron
- createProcessor
  - unified 的 Processor
- https://github.com/DefinitelyTyped/DefinitelyTyped/blob/HEAD/types/mdx/types.d.ts

# Version

## MDX v3

- 支持 await
- 支持 ES2024 语法 - 更新 Acorn
- Adjacent block JSX and expressions in MDX

```mdx
<style>{`

  h1 {
    color: blue;
  }

`}</style>
```

- https://mdxjs.com/blog/v3/

## MDX v2

- 更好处理 HTML 嵌套 MD
- 支持 JavaScript expressions，例如 `{2 * Math.PI}`
- 抽取出了 [micromark/micromark](https://github.com/micromark/micromark)
  - markdown parser
- https://mdxjs.com/blog/v2/
