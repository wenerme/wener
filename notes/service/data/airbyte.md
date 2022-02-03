---
title: airbyte
---

# airbyte

- [airbytehq/airbyte](https://github.com/airbytehq/airbyte)
  - MIT+ELv2, Java+Python+TypeScript
  - ETL
  - 实现用到 temporal 进行调度
  - Source
    - APIs - Github, Gitlab, Notion
    - Database - PostgreSQL, MySQL, ClickHouse, CockroachDB, MongoDB
    - Files
      - Format - CSV, JSON, jsonl, excel, parquet, feather
      - Provider - HTTP, S3, SFTP, SSH SCP
    - Queue - Kafka
    - RESTful
  - Destination
    - Kafka, MQTT, RabbitMQ, Pulsar, Redis
    - S3, CSV, JSON, SFTP
    - MySQL, PostgreSQL, Cassandra, ElasticSearch, MongoDB, MeiliSearch
- CDC
  - PostgreSQL - wal2json, pgoutput
  - MySQL
  - MSSQL
- 参考
  - [demo.airbyte.io](https://demo.airbyte.io/)
  - [ELv2 不能做的事](https://docs.airbyte.com/project-overview/licenses/examples)
  - [API](https://airbyte-public-api-docs.s3.us-east-2.amazonaws.com/rapidoc-api-docs.html#auth)
    - [airbyte-api/src/main/openapi/config.yaml](https://github.com/airbytehq/airbyte/blob/master/airbyte-api/src/main/openapi/config.yaml)
    - [mrin9/RapiDoc](https://github.com/mrin9/RapiDoc)

:::caution

- 开源版本 API 目前无认证

:::

## Docker

- [docker-compose.yaml](https://github.com/airbytehq/airbyte/blob/master/docker-compose.yaml)
  - airbyte/scheduler
  - airbyte/webapp
  - airbyte/server
  - [airbyte/temporal](airbyte-temporal)
    - 基于 temporal 官方脚本
    - 重新构建添加 M1 支持
    - [temporal/dynamicconfig/development.yaml](https://github.com/airbytehq/airbyte/blob/master/temporal/dynamicconfig/development.yaml)
      - limit.blobSize.warn=10MB - 默认 512KB
      - limit.blobSize.error=15MB - 默认 2MB
  - airbyte/worker
  - airbyte/db - PostgreSQL
  - airbyte/bootloader
  - airbyte/init
- [docker-compose.debug.yaml](https://github.com/airbytehq/airbyte/blob/master/docker-compose.debug.yaml)
  - temporalio/web

[airbyte-temporal]: https://github.com/airbytehq/airbyte/tree/master/airbyte-temporal

## Kubernetes

- [Known Issues](https://docs.airbyte.com/deploying-airbyte/on-kubernetes#known-issues)
- Helm [charts/airbyte](https://github.com/airbytehq/airbyte/tree/master/charts/airbyte)
  - charts
    - bitnami-common
    - postgresql
    - minio
  - temporal - 内置
- Kustomization [resources](https://github.com/airbytehq/airbyte/tree/master/kube)

## Notes

- Scheduler
  - API -> Temporal
- 参考
  - [Specification](https://docs.airbyte.com/understanding-airbyte/airbyte-specification)
  - [High-level View](https://docs.airbyte.com/understanding-airbyte/high-level-view)
  - [changelog](https://docs.airbyte.com/project-overview/changelog)

| field                            | desc                  |
| -------------------------------- | --------------------- |
| `_airbyte_ab_id`                 | uuid                  |
| `_airbyte_emitted_at`            | timestamp-millis      |
| `_airbyte_additional_properties` | map of string         |
| `_airbyte_data`                  | 实际数据              |
| `_airbyte_normalized_at`         |
| `_ab_cdc_updated_at`             |
| `_ab_cdc_deleted_at`             |
| `_ab_cdc_lsn`                    | PostgreSQL, MSSQL CDC |
| `_ab_cdc_log_file`               | MySQL CDC             |
| `_ab_cdc_log_pos`                | MySQL CDC             |

## Integrations

- [Source](https://docs.airbyte.com/integrations/sources)

# FAQ

## When to use CDC

- 希望获取到删除信息
- 数据量大
- 表里没有增量同步信息 - 例如: updated_at
