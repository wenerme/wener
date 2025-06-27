---
tags:
  - Engine
---

# LocalAI

- [mudler/LocalAI](https://github.com/mudler/LocalAI)
  - MIT, Go
  - 支持后端 llama.cpp, vLLM, Diffusers, Transformers, whisper.cpp, [stable-diffusion.cpp](https://github.com/leejet/stable-diffusion.cpp)
  - 支持 文、图、音
  - 支持 文生文、文生图、文生音、语音转文本、向量嵌入
  - OpenAI 兼容 API
- 参考
  - https://models.localai.io/
  - 兼容模型 https://localai.io/model-compatibility/index.html

```bash
# CPU: latest
# Nvidia: latest-gpu-nvidia-cuda-12, latest-gpu-nvidia-cuda-11, latest-nvidia-l4t-arm64
# AMD GPU ROCm: latest-gpu-hipblas
# 推荐 AIO/All in One - 例如 latest-aio-cpu, latest-aio-gpu-nvidia-cuda-12
# 健康 http://localhost:8080/readyz
# 参考 https://localai.io/basics/container/
# 会直接下载一些模型 https://github.com/mudler/LocalAI/tree/master/aio/gpu-8g
# qwen2.5-7b, whisper-1, DreamShaper, MiniCPM-V-2_6
# 内置模型名 whisper-1, stablediffusion
# 支持 https_proxy
docker run --rm -ti --gpus all \
  -p 8080:8080 \
  -v $PWD/localai/models:/build/models:cached \
  --name localai localai/localai:latest-aio-gpu-nvidia-cuda-12

docker exec -it localai bash
./local-ai
```

```yaml
version: '3.9'
services:
  api:
    image: localai/localai:localai/localai:latest-aio-gpu-nvidia-cuda-12
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:8080/readyz']
      interval: 1m
      timeout: 20m
      retries: 5
    ports:
      - 8080:8080
    environment:
      - DEBUG=true
    volumes:
      - ./models:/build/models:cached
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
```

| env         | default       | desc                |
| ----------- | ------------- | ------------------- |
| MODELS_PATH | /build/models |
| THREADS     | nproc-1       |
| PORT        | 8080          |
| API_KEY     |
| MODELS      |               | list of models YAML |
| PROFILE     |               | cpu, gpu-8g         |

- 容器镜像
  - quay.io/go-skynet/local-ai
  - docker.m.daocloud.io/localai/localai
- MODELS_PATH
  - 容器 /build/models
  - /usr/share/local-ai/models

## RuntimeError: operator torchvision::nms does not exist


- 确认版本一致
- `torch.__version__` 和 `torchvision.__version__`

```bash
python -c "import torch; print(torch.__version__)"
python -c "import torchvision; print(torchvision.__version__)"
```

