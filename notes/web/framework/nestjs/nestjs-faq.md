---
tags:
  - FAQ
---

# NestJS FAQ

## Can't resolve 'class-transformer/storage'

1. lazyImports

- https://github.com/hjf/mapped-types-bug/blob/dfcde21c04599db8d76a7593ea2fc3485b40ea81/webpack.config.js#L2

2. downgrade

```bash
npm install --save class-transformer@0.3.1
```

- https://github.com/typestack/class-transformer/issues/563
