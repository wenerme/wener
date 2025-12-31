---
title: Logto
tags:
  - Auth
  - Service
  - OIDC
---

# Logto

- [logto-io/logto](https://github.com/logto-io/logto)
  - MPLv2, TS, PostgreSQL
  - Open-source alternative to Auth0
  - RBAC, MFA, SSO

## Installation

```yaml
version: '3.9'
services:
  app:
    depends_on:
      postgres:
        condition: service_healthy
    image: svhd/logto:${TAG-latest}
    entrypoint: ['sh', '-c', 'npm run cli db seed -- --swe && npm start']
    ports:
      - 3001:3001
      - 3002:3002
    environment:
      - TRUST_PROXY_HEADER=1
      - DB_URL=postgres://postgres:p0stgr3s@postgres:5432/logto
      # Mandatory for GitPod to map host env to the container, thus GitPod can dynamically configure the public URL of Logto;
      # Or, you can leverage it for local testing.
      - ENDPOINT
      - ADMIN_ENDPOINT
  postgres:
    image: postgres:17-alpine
    user: postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: p0stgr3s
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready']
      interval: 10s
      timeout: 5s
      retries: 5
```

- [Official docker-compose.yml](https://raw.githubusercontent.com/logto-io/logto/HEAD/docker-compose.yml)

## Resources

- [GlobalValues.ts](https://github.com/logto-io/logto/blob/master/packages/shared/src/node/env/GlobalValues.ts)
