---
title: pip
---

# pip

- [pypa/pip](https://github.com/pypa/pip)
  - MIT, Python
  - package installer for Python
  - pypa -> Python Packaging Authority
- 参考
  - pip-tools
  - https://pip.pypa.io/en/stable/

```bash
# pip install | download | uninstall | freeze | inspect | list | show | check | config | search | cache | index | wheel | hash | debug

eval "$(pip completion --bash)"

pip show torch # 显示信息
pip check      # 检查依赖

# Linux  ~/.cache/pip
# macOS /Users/$USER/Library/Caches/pip
# Windows C:\Users\$USER\AppData\Local\pip\Cache
# PIP_CACHE_DIR
# --cache-dir
pip cache dir

pip install datumaro==1.7.0 # 安装指定版本

# https://pypi.org/simple
pip3 install -h | grep index-url # 默认 index-url
pip config get global.index-url  # 查看配置的 index-url
pip3 config -v list              # 查看搜索的路径

# pip-check pip-review
pip list --outdated # 查看过期的包
```

- /etc/pip.conf
- `%ProgramData%\pip\pip.ini`
- `~/.config/pip/pip.conf`
- `%APPDATA%\pip\pip.ini`
- pip.conf
- pip.ini

## requirements.txt

```
package1==version1
package2>=version2
```

```bash
pip freeze > requirements.txt

pip install -r requirements.txt
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

## WARNING: There was an error checking the latest version of pip

```bash
# 可以禁用
pip install touch --disable-pip-version-check
```

- https://pypi.org/pypi/pip/json
