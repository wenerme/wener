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
