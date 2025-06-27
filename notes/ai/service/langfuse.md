---
title: langfuse
---

# langfuse

- [langfuse/langfuse](https://github.com/langfuse/langfuse)
  - MIT+EE, TS, React
  - Postgres, Clickhouse, S3, Redis
  - LLM Observability, Prompt Management, LLM Evaluations, Datasets, LLM Metrics, Prompt Playground
- 参考
  - CE vs EE
    - https://langfuse.com/self-hosting/license-key
  - 集成
    - https://langfuse.com/docs/integrations/overview

```bash
# https://github.com/langfuse/langfuse/blob/main/docker-compose.yml
ENCRYPTION_KEY=$(openssl rand -hex 32)
docker run --name langfuse-web \
  -e DATABASE_URL=postgresql://hello \
  -e NEXTAUTH_URL=http://localhost:3000 \
  -e NEXTAUTH_SECRET=mysecret \
  -e SALT=mysalt \
  -e ENCRYPTION_KEY=$(ENCRYPTION_KEY) \
  -e CLICKHOUSE_URL=http://clickhouse:8123 \
  -e CLICKHOUSE_USER=clickhouse \
  -e CLICKHOUSE_PASSWORD=clickhouse \
  -e CLICKHOUSE_MIGRATION_URL=clickhouse://clickhouse:9000 \
  -e REDIS_HOST=localhost \
  -e REDIS_PORT=6379 \
  -e REDIS_AUTH=redis \
  -e LANGFUSE_S3_EVENT_UPLOAD_BUCKET=my-bucket \
  -e LANGFUSE_S3_EVENT_UPLOAD_REGION=us-east-1 \
  -e LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE \
  -e LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY=bPxRfiCYEXAMPLEKEY \
  -p 3000:3000 \
  -a STDOUT \
  langfuse/langfuse:3
```
