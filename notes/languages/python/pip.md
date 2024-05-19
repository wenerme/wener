---
title: pip
---

# pip

- [pypa/pip](https://github.com/pypa/pip)
  - MIT, Python
  - package installer for Python
  - pypa -> Python Packaging Authority
- 参考
  - https://pip.pypa.io/en/stable/

```bash
# pip install | download | uninstall | freeze | inspect | list | show | check | config | search | cache | index | wheel | hash | debug

eval "$(pip completion --bash)"
```

## Torch

```bash
# Torch
# ======
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

# libgomp-a34b3233.so.1: pthread_attr_setaffinity_np: symbol not found
# 可替换
apk add libgomp
cp /usr/lib/python3.10/site-packages/torch/lib/libgomp-a34b3233.so.1 backup/
cp /usr/lib/libgomp.so.1 /usr/lib/python3.10/site-packages/torch/lib/libgomp-a34b3233.so.1

# libtorch_python.so: __register_atfork
# 无法替换只能重新编译
```

```py
import torch
print(torch.__version__)

print(torch.version.cuda)
print(torch.backends.cudnn.version())

torch.cuda.is_available() # CUDA 是否可用
torch.cuda.device_count() # GPU 数量
torch.cuda.get_device_name(0) # 返回 GPU 名称
torch.cuda.current_device() # 返回当前 GPU 索引
```

- cudnn 不会支持 musl

## Mirror

```ini title="~/.pip/pip.conf"
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
[install]
trusted-host = https://pypi.tuna.tsinghua.edu.cn
```

- https://pypi.tuna.tsinghua.edu.cn/simple
- https://pypi.mirrors.ustc.edu.cn/simple
- http://pypi.douban.com/simple
- http://mirrors.aliyun.com/pypi/simple

---

- https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/

## conf

```ini
[global]
proxy = http://user:password@proxy_name:port
```

- https://pip.pypa.io/en/stable/topics/configuration/
- https://pip.pypa.io/en/stable/user_guide/#config-file

# FAQ

## Running pip as the 'root' user can result in broken permissions

```
--root-user-action=ignore
```

- PIP_ROOT_USER_ACTION=ignore
