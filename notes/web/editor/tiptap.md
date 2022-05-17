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

---

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
