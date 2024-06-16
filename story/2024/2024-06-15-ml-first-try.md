---
slug: ml-first-try
title: 第一次尝试机器学习
tags:
  - Setup
  - Ubuntu
  - Debian
---

# ML First Try

第一次开始正式接触机器学习领域，记录和整理一些中间过程。

<!-- more -->

- Linode
  - 32 GB + RTX6000 GPU x1 + 8C 32GB
    - $1000/mo, $1.50/hr
  - 只有 eu-center 地区，太慢太慢了
- GCP
  - NVIDIA Tesla L4 + 4 vCPU + 16 GB
    - US$598.46/mo, US$0.82/hr
  - 有亚太地区 - 台湾

## GCP Deep Learning VM

- 存储至少 100 GB+
  - 3854 张图片，缓存为 .npy
- 基于 Debian 11 和 Ubuntu 22.04
- SSH 进入的时候会提示安装 driver
- 默认环境
  - conda
  - numpy
  - scipy
  - matplotlib
  - pandas
  - nltk
  - pillow
  - scikit-image
  - opencv-python
  - scikit-learn
  - CUDA, CuNN, NCCL
- https://cloud.google.com/deep-learning-vm/docs/introduction

```bash
apt install -y neofetch ffmpeg libc-bin

# python 默认来自于 /opt/conda/bin/python
pip install --upgrade pip

# 确定环境驱动正常
cat /proc/driver/nvidia/version
nvidia-smi
sudo docker run --gpus all nvidia/cuda:12.5.0-base-ubuntu22.04 nvidia-smi

#
apt install -y make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev libffi-dev liblzma-dev git
#pip install nvidia-cublas-cu11 nvidia-cudnn-cu11

# ultralytics ->
# py-cpuinfo, mpmath, triton, sympy, opencv-python, nvidia-nvtx-cu12, nvidia-nvjitlink-cu12, nvidia-nccl-cu12, nvidia-curand-cu12, nvidia-cufft-cu12, nvidia-cuda-runtime-cu12, nvidia-cuda-nvrtc-cu12, nvidia-cuda-cupti-cu12, nvidia-cublas-cu12, nvidia-cusparse-cu12, nvidia-cudnn-cu12, nvidia-cusolver-cu12, torch, ultralytics-thop, torchvision, ultralytics
```

### Could not load library libcudnn_cnn_train.so.8

- /opt/conda/lib/python3.10/site-packages/nvidia/cudnn/lib/libcudnn_cnn_train.so.8
- /opt/conda/lib/python3.10/site-packages/torch/lib
- /usr/local/cuda/lib64

```
Could not load library libcudnn_cnn_train.so.8. Error: /usr/local/cuda/lib64/libcudnn_cnn_train.so.8: undefined symbol: _ZN5cudnn3cnn5infer22queryClusterPropertiesERPhS3_, version libcudnn_cnn_infer.so.8
```

```bash
ldd /opt/conda/lib/python3.10/site-packages/nvidia/cudnn/lib/libcudnn_cnn_train.so.8
ldd /usr/local/cuda/lib64/libcudnn_cnn_train.so.8

# 修改后就可以了
LD_LIBRARY_PATH=/opt/conda/lib/python3.10/site-packages/nvidia/cudnn/lib/:$LD_LIBRARY_PATH yolo

#LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/opt/conda/lib/python3.10/site-packages/torch/lib
```

- https://github.com/pytorch/pytorch/issues/104591

## Debian

```bash
apt update
apt -y upgrade

apt install -y build-essential python3 python3-pip pipx htop curl wget git jq neofetch

# Components 增加 contrib non-free non-free-firmware
nano /etc/apt/sources.list.d/debian.sources
apt install -y firmware-misc-nonfree

#
apt install -y nvidia-detect nvidia-driver

# nvidia-cuda-toolkit - 非常大

nvidia-detect

# Docker Debian
# ====================
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

## Ubuntu

- Ubuntu 22.04 LTS

```bash
apt update
apt -y upgrade

apt install -y build-essential python3 python3-pip pipx htop curl wget git jq neofetch
pipx ensurepath
#pipx install poetry
#curl https://pyenv.run | bash

# Nvdia Driver
# ====================
lspci -nn | grep -E -i "3d|display|vga"

# https://ubuntu.com/server/docs/nvidia-drivers-installation
# https://www.nvidia.com/download/index.aspx
# https://www.nvidia.com/Download/Find.aspx
# apt install -y ubuntu-drivers-common
# ubuntu-drivers list --gpgpu # 所有支持的 GPU
# ubuntu-drivers install # 自动检测安装所有驱动
# ubuntu-drivers install --gpgpu
# ubuntu-drivers install --gpgpu nvidia:535-server
# apt install nvidia-utils-535-server

# nvidia-utils-535-server
apt install -y nvidia-driver-535

# reboot # 重启后才能生效

nvidia-smi
cat /proc/driver/nvidia/version

#sudo add-apt-repository ppa:graphics-drivers/ppa
#sudo apt-get update

# Docker Ubuntu
# ====================
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

sudo apt-get -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Nvidia Container Toolkit
# ====================
# https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
  && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list \
  | sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' \
    | sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
sed -i -e '/experimental/ s/^#//g' /etc/apt/sources.list.d/nvidia-container-toolkit.list

sudo apt-get update
sudo apt-get install -y nvidia-container-toolkit nvidia-docker2

sudo systemctl restart docker

# 测试
# https://hub.docker.com/r/nvidia/cuda
sudo docker run --gpus all nvidia/cuda:12.5.0-base-ubuntu22.04 nvidia-smi
```

## ENV

```bash
# rclone for dataset sync
# ====================
curl -Lo /tmp/rclone.deb https://github.com/rclone/rclone/releases/download/v1.67.0/rclone-v1.67.0-linux-amd64.deb
sudo dpkg -i /tmp/rclone.deb
rclone --version

# Python
# ====================
python3 --version # 建议 3.9-3.11

sudo mkdir -p /data/ml
sudo chown -R $USER:$USER /data/ml
cd /data/ml

# YoloV10
# ====================
git clone https://github.com/THU-MIG/yolov10 /data/ml/yolov10
cd /data/ml/yolov10
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt

# Yolo
# ====================
mkdir -p /data/ml/yolo
cd /data/ml/yolo
python3 -m venv venv
source venv/bin/activate
pip3 install openvino==2023.2 'datumaro[default]'
pip3 install ultralytics torch torchvision

# rclone for sync
# ====================
# 接受 FTP 上传 - 修改账号密码
rclone serve ftp --addr 0.0.0.0:18080 /data/ --user USER --pass PASS
# 同步 修改 IP、账号密码
# rclone sync /data/ds/ :ftp,host=127.0.0.1,port=18080,user=USER,pass=$(rclone obscure PASS):ds -P --stats-one-line --transfers 10 -M
```

- Nvdia Driver
  - [NVIDIA RTX / Quadro Enterprise Driver Branch History for Windows](https://www.nvidia.com/en-us/drivers/rtx-enterprise-and-quadro-driver-branch-history/)

```bash
# for pyenv
apt install -y make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev libffi-dev liblzma-dev git

pyenv install 3.9
cd /data/ml/yolov10
pyenv local 3.9

cat << 'EOF' >> ~/.bashrc
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init --path)"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
EOF
source ~/.bashrc

# 手动
export PYENV_ROOT="$HOME/.pyenv"
[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"

# 自动
# ~/.bashrc
eval "$(pyenv virtualenv-init -)"
```

## nvtop

```bash
curl -LO https://github.com/Syllo/nvtop/releases/download/3.1.0/nvtop-x86_64.AppImage
chmod +x nvtop-x86_64.AppImage
./nvtop-x86_64.AppImage
```

**from source**

```bash
git clone https://github.com/Syllo/nvtop.git /data/gits/nvtop
cd /data/gits/nvtop
mkdir build
cd build
cmake ..
make
sudo make install
```

- https://github.com/Syllo/nvtop

# FAQ

## Non-monotonic DTS; previous: 22695088, current: 22695088; changing to 22695089. This may result in incorrect timestamps in the output file.

```bash
ffmpeg -fflags +genpts -i input.flv -c copy -vsync 1 output.mp4
```

- flv -> mp4 出现
  - 实时视频流抖动导致
- DTS - Decoding Time Stamp

## cache

```bash
# clip gdown huggingface matplotlib pip torch
du -sh ~/.cache
```
