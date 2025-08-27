---
title: Text Generation Inference
---

# Text Generation Inference

- [huggingface/text-generation-inference](https://github.com/huggingface/text-generation-inference)
- 支持硬件
  - Nvidia
  - AMD (-rocm)
  - Inferentia
  - Intel GPU
  - Gaudi
  - Google TPU

```bash
docker run --rm -it --gpus all --shm-size 64g \
  -p 8080:80 \
  -v $volume:/data \
  --name tgi ghcr.io/huggingface/text-generation-inference:3.3.4 \
  --model-id $model
```
