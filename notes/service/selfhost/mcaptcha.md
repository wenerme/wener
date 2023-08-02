---
title: mCaptcha
---

# mCaptcha

- [mCaptcha/mCaptcha](https://github.com/mCaptcha/mCaptcha)
  - AGPL-3.0, Rust
  - 依赖 postgres, redis
  - 支持多站点

```bash
# https://github.com/mCaptcha/mCaptcha/blob/master/config/default.toml
# -e MCAPTCHA_SERVER_COOKIE_SECRET=
docker run --rm -it \
  -p 7000:7000 \
  -e DATABASE_URL=postgres://mcaptcha:password@postgres:5432/mcaptcha \
  -e MCAPTCHA_REDIS_URL=redis://redis/ \
  -e RUST_LOG=debug \
  -e MCAPTCHA_DEBUG=true \
  -e PORT=7000 \
  --name mcaptcha mcaptcha/mcaptcha
```

## Client

- @mcaptcha/core-glue
- React
  - https://github.com/mCaptcha/glue/blob/master/packages/react/src/index.tsx
- 通过 iframe 嵌入
- 成功后拿到一个 token，通过 form 提交给服务端
