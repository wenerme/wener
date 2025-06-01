---
title: Ubuntu
---

# Ubuntu

- Server
  - 下载 https://ubuntu.com/download/server
- docker image adoption
  - nvidia/cuda
  - vllm
  - PyTorch
  - Ollama
- HWE Kernel
  - [HWE Kernel](https://wiki.ubuntu.com/Kernel/LTSEnablementStack)
  - [Kernel](https://wiki.ubuntu.com/Kernel)
- 参考
  - http://mirrors.aliyun.com/ubuntu-releases/

```bash
# 下载, dd 到启动盘, 然后启动, 安装
curl -LO https://releases.ubuntu.com/24.04.2/ubuntu-24.04.2-live-server-amd64.iso
# 制作 Live USB
dd if=./ubuntu-24.04.2-live-server-amd64.iso of=/dev/rdisk6 status=progress bs=4M

# 直接安装到 USB
qemu-system-x86_64 -m 8g -smp 4 -hda /dev/rdisk6 -cdrom ./ubuntu-24.04.2-live-server-amd64.iso -net nic,model=virtio,mac=52:54:00:12:34:56 -net user,hostfwd=tcp::2222-:22 -boot d

apt install -y btop build-essential curl dialog git htop iotop iputils-ping jq lsof nano pip pipx python3 python3-pip sysstat wget tree

curl -LO https://github.com/fastfetch-cli/fastfetch/releases/download/2.43.0/fastfetch-linux-amd64.deb
dpkg -i fastfetch-linux-amd64.deb

# UEFI
bootctl status | grep SecureBoot
```

## Nvidia GPU Driver

- nvidia-headless-no-dkms-XXX-server
  - 如果不需要 X11 或 Wayland

```bash
# for NVIDIA GPU
apt install -y nvtop
cat /proc/driver/nvidia/version

lspci | grep -i nvidia
lspci -v | grep -A 7 NVIDIA

ubuntu-drivers list
ubuntu-drivers list --gpgpu

ubuntu-drivers install --gpgpu

apt install nvidia-driver-570-server

nvidia-smi

systemctl status systemd-modules-load

dmesg | grep -i nvidia
journalctl -b 0 -k | grep -i nvidia
journalctl -b 0 -u systemd-modules-load
```

**禁用 Nouveau**

- /etc/modprobe.d/blacklist-nouveau.conf

```
blacklist nouveau
options nouveau modeset=0
```

```bash
sudo update-initramfs -u
sudo reboot
```

## Nvidia cuDNN

- https://docs.nvidia.com/cuda/cuda-installation-guide-linux/#network-repo-installation-for-ubuntu

```bash
# ubuntu2204/x86_64
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb

sudo apt update
# cuda-toolkit
# nvidia-gds
# cuda-compat

apt install libcudnn9-cuda-12

# 版本
nvcc --version
nvidia-smi

apt list --installed | grep -i cuda

# 升级版本
sudo apt remove nvidia-cuda-toolkit nvidia-cuda-dev
sudo apt install cuda-toolkit-12-8
```

```py title="cuda.py"
import torch

# 检查 PyTorch 版本
print(f"PyTorch Version: {torch.__version__}")

# 检查 CUDA 是否可用
is_cuda_available = torch.cuda.is_available()
print(f"CUDA Available: {is_cuda_available}")

if is_cuda_available:
    # 检查 PyTorch 编译时使用的 CUDA 版本
    print(f"PyTorch CUDA Version: {torch.version.cuda}")
    # 获取当前 GPU 的名称
    print(f"GPU Name: {torch.cuda.get_device_name(0)}")
    # 获取当前 GPU 的 CUDA 计算能力
    print(f"GPU Compute Capability: {torch.cuda.get_device_capability(0)}")
else:
    print("CUDA is not available to PyTorch. Please check your installation and drivers.")
```

## Docker

- 原始站点
  - https://download.docker.com/linux/ubuntu/
- 镜像站点
  - https://mirrors.aliyun.com/docker-ce/linux/ubuntu/

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

#
sudo usermod -aG docker $USER
newgrp docker
```

**使用 /data/docker 作为 Docker 的数据目录**

```bash
sudo rsync -aqxP /var/lib/docker/ /data/docker/

sudo nano /etc/docker/daemon.json
```

```json
{
  "data-root": "/data/docker"
}
```

## Nvidia Docker

- [NVIDIA/nvidia-container-toolkit](https://github.com/NVIDIA/nvidia-container-toolkit)
- 原始站点
  - https://nvidia.github.io/nvidia-docker/
- 镜像站点
  - https://mirrors.ustc.edu.cn/libnvidia-container/
    - https://mirrors.ustc.edu.cn/help/libnvidia-container.html
- 官方文档
  - https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html
  - [支持平台](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/supported-platforms.html)

```bash
# 没有 ubuntu24.04 目录
distribution=$(
  . /etc/os-release
  echo $ID$VERSION_ID
) \
  && curl -fsSL https://mirrors.ustc.edu.cn/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
  && curl -s -L https://mirrors.ustc.edu.cn/libnvidia-container/$distribution/nvidia-container-toolkit.list \
  | sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' \
    | sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

# 可以使用 stable 目录
curl -fsSL https://mirrors.ustc.edu.cn/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
  && curl -s -L https://mirrors.ustc.edu.cn/libnvidia-container/stable/deb/nvidia-container-toolkit.list \
  | sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' \
    | sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

# 修改 nvidia-container-toolkit.list 里的地址
nano /etc/apt/sources.list.d/nvidia-container-toolkit.list

apt update
apt install -y nvidia-container-toolkit

# 配置 /etc/docker/daemon.json 添加 runtime
sudo nvidia-ctk runtime configure --runtime=docker

systemctl restart docker

# ensure nvidia-container-runtime is installed
docker run --rm -it --gpus all docker.m.daocloud.io/nvidia/cuda:12.9.0-base-ubuntu24.04 nvidia-smi

# try ollama
docker run --rm -it --gpus all \
  -v /data/home/.ollama/:/root/.ollama/ \
  -p 11434:11434 \
  -e OLLAMA_CONTEXT_LENGTH=8192 \
  -e OLLAMA_FLASH_ATTENTION=1 \
  -e OLLAMA_KV_CACHE_TYPE=q4_0 \
  --name ollama docker.m.daocloud.io/ollama/ollama:0.7.1

# try vllm
docker pull docker.m.daocloud.io/vllm/vllm-openai:v0.8.5
docker run --rm -it --gpus all \
  --runtime nvidia --gpus all \
  -p 8080:8080 \
  --ipc=host \
  -v /data/home/.cache/huggingface:/root/.cache/huggingface \
  --entrypoint bash \
  --name vllm docker.m.daocloud.io/vllm/vllm-openai:v0.8.5
```

