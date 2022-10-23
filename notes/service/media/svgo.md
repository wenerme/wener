---
title: svgo
---

# svgo

- [svg/svgo](https://github.com/svg/svgo)
  - Node.js tool for optimizing SVG file
  - 开发不太活跃
- 参考
  - [jakearchibald/svgomg](https://github.com/jakearchibald/svgomg)
    - Web GUI for SVGO
    - https://jakearchibald.github.io/svgomg/

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
