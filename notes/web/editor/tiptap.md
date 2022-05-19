---
title: tiptap
---

# tiptap

- [ueberdosis/tiptap](https://github.com/ueberdosis/tiptap)
  - MIT, Typescript
  - Headlees，框架无关的编辑器
  - 基于 ProseMirror
  - Pro 提供部分额外 Node
- @tiptap/react
- @tiptap/html
  - JSON -> HTML

## Extensions

- `@tiptap/extension-{name}`
- text-style
  - 实现自定义样式

---

- https://tiptap.dev/experiments/commands
- https://github.com/ueberdosis/tiptap/issues/1036
  - indent
  - https://github.com/Leecason/element-tiptap/tree/master/src/extensions
- https://tiptap.dev/api/extensions
- https://github.com/ueberdosis/tiptap/tree/main/packages

## Schema

- [schema](https://tiptap.dev/api/schema)

```json title="model.json"
{
  "type": "doc",
  "content": [
    {
      "type": "paragraph",
      "content": [
        {
          "type": "text",
          "text": "Wow, this editor instance exports its content as JSON."
        }
      ]
    }
  ]
}
```

## Nodes

- [Nodes](https://tiptap.dev/api/nodes)

# FAQ

## Tiptap v1 vs Tiptap v2

- Tiptap v1
  - Vue
- Tiptap v2
  - 核心 Headless
  - React, Vue, Alpine, Svelte
  - 协作
  - @mentions 补全
