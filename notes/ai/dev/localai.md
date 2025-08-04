---
tags:
  - Engine
---

# LocalAI

- [mudler/LocalAI](https://github.com/mudler/LocalAI)
  - MIT, Go
  - 支持后端 llama.cpp, vLLM, Diffusers, Transformers, whisper.cpp, [stable-diffusion.cpp](https://github.com/leejet/stable-diffusion.cpp)
  - 支持 文、图、音
  - 支持 文生文、文生图、文生音、语音转文本、向量嵌入、Rerank
  - 支持 P2P - 分布式
  - OpenAI 兼容 API
  - 使用 YAML 配置 Backend, Model
- 参考
  - https://localai.io/gallery.html
    - https://github.com/mudler/LocalAI/blob/master/gallery/index.yaml
    - https://github.com/mudler/LocalAI/tree/master/gallery
  - https://github.com/mudler/LocalAI/blob/master/backend/index.yaml
  - 兼容模型 https://localai.io/model-compatibility/

```bash
#  http://localhost:8080
# CPU: latest
# Nvidia: latest-gpu-nvidia-cuda-12, latest-gpu-nvidia-cuda-11, latest-nvidia-l4t-arm64
# AIO: latest-aio-gpu-nvidia-cuda-12
# AMD GPU ROCm: latest-gpu-hipblas
# 健康 http://localhost:8080/readyz
# 参考 https://localai.io/basics/container/
# 会直接下载一些模型 https://github.com/mudler/LocalAI/tree/master/aio/gpu-8g
# 内置模型名 whisper-1, stablediffusion
# 支持 https_proxy
docker run --rm -ti --gpus all \
  -p 8080:8080 \
  -v $PWD/localai/models:/models:cached \
  -v $PWD/localai/backends:/backends:cached \
  --name localai docker.m.daocloud.io/localai/localai:latest-gpu-nvidia-cuda-12

docker run --rm -ti --gpus all -p 8080:8080 -v $PWD/localai/models:/build/models:cached --name localai docker.m.daocloud.io/localai/localai:latest-gpu-nvidia-cuda-12

docker exec -it localai bash
./local-ai
./local-ai models list
./local-ai models install flux.1-krea-dev-ggml

# a cute baby sea otter|malformed
# POSITIVE: a cute baby sea otter
# NEGATIVE: malformed
# 1024x1024 ~3min
curl http://localhost:8080/v1/images/generations --json '{
  "prompt": "floating hair, portrait, ((loli)), ((one girl)), cute face, hidden hands, asymmetrical bangs, beautiful detailed eyes, eye shadow, hair ornament, ribbons, bowties, buttons, pleated skirt, (((masterpiece))), ((best quality)), colorful|((part of the head)), ((((mutated hands and fingers)))), deformed, blurry, bad anatomy, disfigured, poorly drawn face, mutation, mutated, extra limb, ugly, poorly drawn hands, missing limb, blurry, floating limbs, disconnected limbs, malformed hands, blur, out of focus, long neck, long body, Octane renderer, lowres, bad anatomy, bad hands, text",
  "model": "flux.1-krea-dev-ggml",
  "size": "1024x1024"
}'
```

- AIO/All in One
  - 例如 latest-aio-cpu, latest-aio-gpu-nvidia-cuda-12
  - 镜像多 35G
  - 预下载模型 qwen2.5-7b, whisper-1, DreamShaper, MiniCPM-V-2_6
- Backend
  - https://quay.io/organization/go-skynet

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
