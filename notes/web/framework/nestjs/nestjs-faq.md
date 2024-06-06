---
tags:
  - FAQ
---

# NestJS FAQ

- Hono/Deno/fetch
  - [nestjs/nest#13013](https://github.com/nestjs/nest/issues/13013)
  - [jiawei397/deno-oak-nest](https://github.com/jiawei397/deno-oak-nest)
  - Add NestJS Hono Adapter [honojs/hono#2817](https://github.com/honojs/hono/issues/2817)

## 没有 Logger.info

- 导致部分不兼容的场景
- https://github.com/nestjs/nest/issues/5281

## Can't resolve 'class-transformer/storage'

1. lazyImports

- https://github.com/hjf/mapped-types-bug/blob/dfcde21c04599db8d76a7593ea2fc3485b40ea81/webpack.config.js#L2

2. downgrade

```bash
npm install --save class-transformer@0.3.1
```

- https://github.com/typestack/class-transformer/issues/563

## metatype is not a constructor

- https://github.com/nestjs/nest/issues/5685
