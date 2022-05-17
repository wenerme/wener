---
title: svgo
---

# svgo

- [svg/svgo](https://github.com/svg/svgo)
  - Node.js tool for optimizing SVG file

```bash
npx -y svgo -f public/icons/svg/ --config svgo.config.json --pretty
```

```json
{
  "plugins": [
    {
      "name": "removeAttrs",
      "attrs": ["data-.*"]
    },
    {
      "name": "sortAttrs"
    }
  ]
}
```
