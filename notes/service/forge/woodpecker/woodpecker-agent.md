---
title: Agent
---

# Woodpecker Agent

| flag                 | env                          | default         |
| -------------------- | ---------------------------- | --------------- |
| --server             | WOODPECKER_SERVER            | woodpecker:9000 |
| --grpc-username      | WOODPECKER_USERNAME          | x-oauth-basic   |
| --grpc-password      | WOODPECKER_AGENT_SECRET      |
| --grpc-secure        | WOODPECKER_GRPC_SECURE       | false           |
| --grpc-skip-insecure | WOODPECKER_GRPC_VERIFY       | true            |
| --log-level          | WOODPECKER_LOG_LEVEL         | trace           |
| --pretty             | WOODPECKER_DEBUG_PRETTY      | true            |
| --nocolor            | WOODPECKER_DEBUG_NOCOLOR     | true            |
| --hostname           | WOODPECKER_HOSTNAME          |
| --filter             | WOODPECKER_FILTER_LABELS     |
| --max-procs          | WOODPECKER_MAX_WORKFLOWS     | 10              |
| --healthcheck        | WOODPECKER_HEALTHCHECK       | true            |
| --keepalive-time     | WOODPECKER_KEEPALIVE_TIME    | 0s              |
| --keepalive-timeout  | WOODPECKER_KEEPALIVE_TIMEOUT | 20s             |
| --backend-engine     | WOODPECKER_BACKEND           | auto-detect     |

## Docker

- agent 直接通过 sock 调用 docker 进行操作

```ini
WOODPECKER_BACKEND_DOCKER_NETWORK=
WOODPECKER_BACKEND_DOCKER_ENABLE_IPV6=false
WOODPECKER_BACKEND_DOCKER_VOLUMES=/etc/ssl/certs:/etc/ssl/certs:ro,/etc/timezone:/etc/timezone
WOODPECKER_DOCKER_CONFIG=
# 用于支持 podman
DOCKER_SOCK=
```

- https://woodpecker-ci.org/docs/next/administration/backends/docker
