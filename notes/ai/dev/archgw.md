---
tags:
  - Gateway
---

# archgw

- [katanemo/archgw](https://github.com/katanemo/archgw)
  - Apache-2.0, Rust, Python
  - AI gateway for agents

```bash
# https://hub.docker.com/r/katanemo/archgw/tags
```

```yaml
# docker-compose.yml
services:
  archgw:
    image: katanemo/archgw:0.3.22
    container_name: archgw
    ports:
      - '10000:10000' # ingress (client -> arch)
      - '12000:12000' # egress (arch -> upstream/llm proxy)
    volumes:
      - ./arch_config.yaml:/app/arch_config.yaml:ro
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY:?error}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY:?error}
```

```yaml
listeners:
  egress_traffic:
    address: 0.0.0.0
    port: 12000
    message_format: openai
    timeout: 30s

llm_providers:
  - model: openai/gpt-4o-mini
    access_key: $OPENAI_API_KEY
    default: true

  - model: openai/gpt-4o
    access_key: $OPENAI_API_KEY

  - model: anthropic/claude-3-5-sonnet-20241022
    access_key: $ANTHROPIC_API_KEY
```
