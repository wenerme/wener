---
title: windmill
---

# windmill

- [windmill-labs/windmill](https://github.com/windmill-labs/windmill)
  - AGPLv3, Rust, Svelte
  - Apache-2.0 - client
  - turn scripts into workflows and UIs
  - alternative to
    - Airflow
    - Retool
    - [Temporal](./temporal/README.md)
    - Prefect
- 架构
  - Postgres
  - [google/nsjail](https://github.com/google/nsjail) - Sandboxing
  - js runtime - deno_core -> rusty_v8
  - ts runtime - deno
  - python
  - golang
- 参考
  - Nextcloud [Windmill Workflows](https://docs.nextcloud.com/server/latest/admin_manual/windmill_workflows/index.html)
  - https://raw.githubusercontent.com/windmill-labs/windmill/main/docker-compose.yml
    - db - postgres
    - windmill_server
      - 2525 - SMTP
    - windmill_worker
    - windmill_worker_native - for "native" jobs
    - windmill_worker_reports
    - windmill_indexer - EE, full text search
    - lsp - for language server protocol
    - multiplayer -  EE feature
    - caddy
