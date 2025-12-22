---
title: modelscope
---

# modelscope

```bash
# 国内镜像下载 HF Repo
pip install modelscope
uvx modelscope

# 下载 dataset
uvx --from "modelscope[datasets]" modelscope download --dataset modelscope/MMLU-Pro
uvx --with datasets --from modelscope modelscope download --dataset TIGER-Lab/MMLU-Pro
uvx --with datasets --from modelscope modelscope download --dataset AI-ModelScope/gsm8k

ls ~/.cache/modelscope/hub/datasets/modelscope/MMLU-Pro

# 查看本地缓存内容
uvx --with datasets --from modelscope modelscope scan-cache

# 清除本地缓存
uvx --with datasets --from modelscope modelscope clear-cache --model damo/whisper-large-v3
uvx --with datasets --from modelscope modelscope clear-cache --dataset modelscope/MMLU-Pro

# 清理所有
uvx --with datasets --from modelscope modelscope clear-cache

export USE_HF=1
export MODELSCOPE_SDK_DEBUG=huggingface
export USE_MODELSCOPE_HUB=1

export MODELSCOPE_CACHE=~/.cache/modelscope
export MODELSCOPE_DOMAIN=https://modelscope.cn
```

- cache_dir= ~/.cache/modelscope/hub
- allow_patterns
- ignore_patterns
- --include
- --exclude
- 模型缓存目录
  - cache_dir/MODEL_ID/THE_MODEL_FILES
