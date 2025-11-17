---
title: llama-swap
---

# llama-swap

- [mostlygeek/llama-swap](https://github.com/mostlygeek/llama-swap)
  - MIT, Golang
  - 提供反向代理
  - 按需启动 进程
  - 可以使用 proxy 指向上游服务，cmd 可以是 docker 启动

```bash
docker pull ghcr.io/mostlygeek/llama-swap:cuda
```

```yaml
llama:
  image: ghcr.io/mostlygeek/llama-swap:v172-cuda-b7062
  container_name: llama
  command:
    - -watch-config
    - -config
    - /llama/llama-swap.yaml
  volumes:
    - ./models:/models
    - ./models:/root/.cache/llama.cpp
    # the user is app, home is /app, uid=10001
    - ./models:/app/.cache/llama.cpp
    - ./llama:/llama
  ports:
    - 11435:8080
  environment:
    HF_ENDPOINT: https://modelscope.cn
  sysctls:
    net.ipv6.conf.all.disable_ipv6: 1
  deploy:
    resources:
      reservations:
        devices:
          - driver: nvidia
            count: all
            capabilities: [gpu]
```

## API

- OpenAI API
  - v1/completions
  - v1/chat/completions
  - v1/embeddings
  - v1/audio/speech
  - v1/audio/transcriptions
- llama-server
  - v1/rerank, v1/reranking, /rerank
  - /infill
  - /completion
- llama-swap
  - /ui
  - /upstream/:model_id
    - 直接访问上游
  - /models/unload
  - /running
  - /log
  - /health
  - /api/events
  - /logs/stream
