---
tags:
  - FAQ
---

# PyTorch FAQ

## Apple MPS

```py
import torch
if torch.backends.mps.is_available():
    mps_device = torch.device("mps")
    x = torch.ones(1, device=mps_device)
    print (x)
else:
    print ("MPS device not found.")
```

```
tensor([1.], device='mps:0')
```

## torch dynamo

- 自动计算图生成和优化
