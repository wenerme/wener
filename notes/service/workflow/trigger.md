---
title: Trigger
---

# Trigger

- [triggerdotdev/trigger.dev](https://github.com/triggerdotdev/trigger.dev)
  - Apache-2.0, TS
  - 技术栈 postgres, prisma, react, codemirror, headlessui, heroicons, radix-ui, lucide-react, prismjs, framer, remix
    - [graphile/worker](https://github.com/graphile/worker)
    - 监控 [highlight](https://github.com/highlight/highlight)
      - Apache-2.0+EE, TS, Go
    - logger morgan
    - ohash
    - posthog
    - recharts
    - simple-oauth2
    - sonner Toast
    - tailwindcss-animate
    - zod
    - swc
  - background jobs framework for TypeScript
  - API integrations, webhooks, scheduling, delays
- https://github.com/triggerdotdev/docker
  - https://github.com/triggerdotdev/docker/blob/main/docker-compose.yml
- Cloud [限制](https://trigger.dev/docs/documentation/concepts/limits)
- 参考
  - https://trigger.dev/pricing

## Notes

- webapp
  - postgres, redis, electric, clickhouse, registry, minio
  - TRIGGER_TELEMETRY_DISABLED=1
- worker
  - supervisor, docker-proxy
- https://github.com/triggerdotdev/trigger.dev/tree/main/hosting/docker

# Version

## trigger.dev v4

- Warm starts
- Waitpoints
- Run priority
- Queues and pausing
- Middleware and lifecycle hooks

## trigger.dev v3

- Durable long-running tasks
- [Durable Serverless functions. No timeouts.](https://trigger.dev/blog/v3-announcement)
