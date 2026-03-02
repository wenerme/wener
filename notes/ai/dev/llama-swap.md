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
  - `v1/completions`
  - `v1/chat/completions`
  - `v1/embeddings`
  - `v1/audio/speech`, `v1/audio/transcriptions`
  - `v1/images/generations`, `v1/images/edits` (基于上游引擎能力透传)
- 对于图片生成 (`v1/images/*`)：
  - **原理**: llama-swap 本身不实现也不依赖特定量化引擎处理图片生成，它只负责依据请求中的 model 解析并按需启动/唤醒在 `llama-swap.yaml` 里配置的对应的上游 `cmd` 或 `proxy`。
  - **实现方式**: 可以配置一个外部程序（如 LocalAI、Stable Diffusion WebUI 加 OpenAI proxy、或者是使用 ComfyUI 的 OpenAI API 封装），只要上游端口能响应标准的 `POST /v1/images/generations` 请求即可被成功代理。
- llama-server
  - `v1/rerank`, `v1/reranking`, `/rerank`
  - `/infill` (代码补全)
  - `/completion`
- llama-swap 自身管理接口
  - `/ui`
  - `/upstream/:model_id` (直接访问对应上游实例)
  - `/models/unload`
  - `/running`, `/log`, `/health`, `/api/events`, `/logs/stream`
  - /health
  - /api/events
  - /logs/stream
