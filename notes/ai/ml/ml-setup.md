---
tags:
  - Setup
  - Ubuntu
---

# ML Setup

- Ubuntu 24.04 LTS
- Linode
  - 32 GB + RTX6000 GPU x1 + 8C 32GB
    - $1000/mo, $1.50/hr

```bash
apt update
apt -y upgrade

apt install -y build-essential python3 pipx rclone
pipx ensurepath
#pipx install poetry

curl https://pyenv.run | bash

# Nvdia Driver
# ====================
# https://ubuntu.com/server/docs/nvidia-drivers-installation
# https://www.nvidia.com/download/index.aspx
# https://www.nvidia.com/Download/Find.aspx
apt install -y ubuntu-drivers-common
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

# Docker
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

```bash
mkdir -p /data/ml
cd /data/ml

git clone https://github.com/THU-MIG/yolov10
cd yolov10
python -m venv .
source bin/activate
pip install -r requirements.txt
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
