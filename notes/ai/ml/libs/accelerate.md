---
title: accelerate
---

# accelerate

- [huggingface/accelerate](https://github.com/huggingface/accelerate)
  - Apache-2.0, Python
  - pip:accelerate
  - by Hugging Face
  - 简化和加速深度学习模型在不同硬件环境（如 CPU、GPU、TPU）上的分布式训练和推理

```bash
# $HOME/.cache/huggingface/accelerate/default_config.yaml
accelerate config
```

```yaml
debug: false
distributed_type: 'NO'
downcast_bf16: 'no'
enable_cpu_affinity: true
gpu_ids: all
machine_rank: 0
main_training_function: main
mixed_precision: 'no'
num_machines: 1
num_processes: 1
rdzv_backend: static
same_network: true
tpu_env: []
tpu_use_cluster: false
tpu_use_sudo: false
use_cpu: false
```

- mixed_precision: bf16
