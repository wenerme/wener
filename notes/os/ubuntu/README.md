---
title: Ubuntu Server Guide
tags:
  - Linux
  - Ubuntu
  - Server
  - Installation
---

# Ubuntu Server Guide {#ubuntu-server-guide}

- Downloads: [Ubuntu Server](https://ubuntu.com/download/server)
- [Ubuntu Releases Mirror (Aliyun)](http://mirrors.aliyun.com/ubuntu-releases/)
- Kernel:
  - [HWE Kernel](https://wiki.ubuntu.com/Kernel/LTSEnablementStack)
  - [Ubuntu Kernel Team](https://wiki.ubuntu.com/Kernel)

## Installation & Setup {#installation-setup}

```bash
# Download & Verify
curl -LO https://releases.ubuntu.com/24.04.2/ubuntu-24.04.2-live-server-amd64.iso

# Make Live USB
dd if=./ubuntu-24.04.2-live-server-amd64.iso of=/dev/rdisk6 status=progress bs=4M

# QEMU Test
qemu-system-x86_64 -m 8g -smp 4 -hda /dev/rdisk6 -cdrom ./ubuntu-24.04.2-live-server-amd64.iso \
  -net nic,model=virtio,mac=52:54:00:12:34:56 -net user,hostfwd=tcp::2222-:22 -boot d

# Post-Install Tools
apt install -y btop build-essential curl dialog git htop iotop iputils-ping jq lsof nano pip pipx python3 python3-pip sysstat wget tree

# fastfetch
curl -LO https://github.com/fastfetch-cli/fastfetch/releases/download/2.43.0/fastfetch-linux-amd64.deb
dpkg -i fastfetch-linux-amd64.deb

# Check UEFI SecureBoot
bootctl status | grep SecureBoot

# Check Firewall
sudo ufw status
```

## Nvidia GPU Driver {#nvidia-gpu-driver}

- `nvidia-headless-no-dkms-XXX-server`: For headless servers (no X11/Wayland).

```bash
# Tools
apt install -y nvtop
cat /proc/driver/nvidia/version
nvidia-smi

# Check Hardware
lspci | grep -i nvidia
lspci -v | grep -A 7 NVIDIA

# Recommended Drivers
ubuntu-drivers list
ubuntu-drivers list --gpgpu
ubuntu-drivers install --gpgpu

# Manual Install
apt install nvidia-driver-570-server

# Logs
dmesg | grep -i nvidia
journalctl -b 0 -k | grep -i nvidia
```

### Disable Nouveau

File: `/etc/modprobe.d/blacklist-nouveau.conf`

```modconf
blacklist nouveau
options nouveau modeset=0
```

Apply:

```bash
sudo update-initramfs -u
sudo reboot
```

## Nvidia cuDNN {#nvidia-cudnn}

- [Installation Guide](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/#network-repo-installation-for-ubuntu)

```bash
# Add Repo (Ubuntu 22.04 LTS)
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb
sudo apt update

# Install
apt install libcudnn9-cuda-12

# Verification
nvcc --version
nvidia-smi
apt list --installed | grep -i cuda
```

### Python Check Script

```python title="check_cuda.py"
import torch

print(f"PyTorch Version: {torch.__version__}")
is_cuda_available = torch.cuda.is_available()
print(f"CUDA Available: {is_cuda_available}")

if is_cuda_available:
    print(f"PyTorch CUDA Version: {torch.version.cuda}")
    print(f"GPU Name: {torch.cuda.get_device_name(0)}")
    print(f"GPU Compute Capability: {torch.cuda.get_device_capability(0)}")
else:
    print("CUDA is not available.")
```

## Docker {#docker}

- [Docker CE for Ubuntu](https://download.docker.com/linux/ubuntu/)
- [Mirror (Aliyun)](https://mirrors.aliyun.com/docker-ce/linux/ubuntu/)

```bash
# Install
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://mirrors.aliyun.com/docker-ce/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# User Group
sudo usermod -aG docker $USER
newgrp docker
```

### Custom Data Root

```bash
sudo rsync -aqxP /var/lib/docker/ /data/docker/
```

File: `/etc/docker/daemon.json`

```json
{
  "data-root": "/data/docker"
}
```

## Nvidia Container Toolkit {#nvidia-container-toolkit}

- [nvidia-container-toolkit](https://github.com/NVIDIA/nvidia-container-toolkit)
- Mirrors: [USTC](https://mirrors.ustc.edu.cn/libnvidia-container/)

```bash
# Install (using USTC mirror)
curl -fsSL https://mirrors.ustc.edu.cn/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
  && curl -s -L https://mirrors.ustc.edu.cn/libnvidia-container/stable/deb/nvidia-container-toolkit.list \
  | sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' \
    | sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

apt update
apt install -y nvidia-container-toolkit

# Configure Docker
sudo nvidia-ctk runtime configure --runtime=docker
systemctl restart docker

# Test
docker run --rm -it --gpus all docker.m.daocloud.io/nvidia/cuda:12.9.0-base-ubuntu24.04 nvidia-smi
```

### AI Models (Ollama & vLLM)

```bash
# Ollama
docker run --rm -it --gpus all \
  -v /data/home/.ollama/:/root/.ollama/ \
  -p 11434:11434 \
  -e OLLAMA_CONTEXT_LENGTH=8192 \
  -e OLLAMA_FLASH_ATTENTION=1 \
  -e OLLAMA_KV_CACHE_TYPE=q4_0 \
  --name ollama docker.m.daocloud.io/ollama/ollama:0.7.1

# vLLM
docker run --rm -it --gpus all \
  --runtime nvidia \
  -p 8080:8080 \
  --ipc=host \
  -v /data/home/.cache/huggingface:/root/.cache/huggingface \
  --entrypoint bash \
  --name vllm docker.m.daocloud.io/vllm/vllm-openai:v0.8.5
```
