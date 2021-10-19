---
title: go-cloud
---

# go-cloud

- [google/go-cloud](https://github.com/google/go-cloud)
  - Go Cloud Development Kit

## 服务

- blob - 对象存储
  - Google Cloud Storage
  - S3
  - Azure Blob Storage
  - Local Storage
- docstore - 文档存储
  - Google Cloud Firestore
  - Amazon DynamoDB
  - Azure Cosmos DB
  - MongoDB
  - In-Memory
- connect hosted db - MySQL/PostgreSQL
- pubsub
  - Google Cloud Pub/Sub
  - Amazon Simple Notification Service
  - Amazon Simple Queue Service
  - Azure Service Bus
  - RabbitMQ
  - NATS
  - Kafka
  - In-Memory
- runtimevar - Runtime Configuration
  - GCP Runtime Configurator
  - GCP Secret Manager
  - AWS Parameter Store
  - AWS Secrets Manager
  - etcd
  - HTTP
  - Blob
  - Local
- secrets
  - Google Cloud Key Management Service
  - AWS Key Management Service
  - Azure KeyVault
  - HashiCorp Vault
  - Local Secrets
- server - 通用 http server
  - requestlog
  - 带基础 endpoints
    - /healthz/readiness
    - /healthz/liveness

## Notes

- 基于 driver 构建 - url schema 驱动
