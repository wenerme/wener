---
tags:
  - Cookbook
---

# Pytorch Cookbook

## Auto Set Device

```py
import torch

print(f"Default device: {torch.get_default_device()}")

if torch.backends.mps.is_available():
    device = torch.device("mps")
    x = torch.ones(1, device=device)
    print(f"Using MPS device: {x}")
elif torch.backends.cuda.is_built():
    device = torch.device("cuda")
    x = torch.ones(1, device=device)
    print(f"Using CUDA device: {x}")
else:
    device = torch.device("cpu")
    x = torch.ones(1, device=device)
    print(f"Using CPU device: {x}")
```

```py
device = torch.device((
    "cuda"
    if torch.cuda.is_available()
    else "mps"
    if torch.backends.mps.is_available()
    else "cpu"
))
print(f"Using {device} device")
```

```py
# 不推荐
torch.set_default_device(device)
```
