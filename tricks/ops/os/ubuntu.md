# Ubuntu

## Tips
https://wiki.ubuntu.com/Releases
http://wiki.ubuntu.org.cn/UbuntuSkills
* 可从阿里云镜像下载系统镜像 http://mirrors.aliyun.com/ubuntu-releases/

```bash
# 生成中文 locale
locale-gen zh_CN.UTF-8


# 使用阿里云镜像
. /etc/lsb-release
echo -e "# Use Aliyun ubuntu mirror \n\
deb http://mirrors.aliyun.com/ubuntu/ $DISTRIB_CODENAME main restricted universe multiverse \n\
deb http://mirrors.aliyun.com/ubuntu/ $DISTRIB_CODENAME-security main restricted universe multiverse \n\
deb http://mirrors.aliyun.com/ubuntu/ $DISTRIB_CODENAME-updates main restricted universe multiverse \n\
deb http://mirrors.aliyun.com/ubuntu/ $DISTRIB_CODENAME-proposed main restricted universe multiverse \n\
deb http://mirrors.aliyun.com/ubuntu/ $DISTRIB_CODENAME-backports main restricted universe multiverse \n\
deb-src http://mirrors.aliyun.com/ubuntu/ $DISTRIB_CODENAME main restricted universe multiverse \n\
deb-src http://mirrors.aliyun.com/ubuntu/ $DISTRIB_CODENAME-security main restricted universe multiverse \n\
deb-src http://mirrors.aliyun.com/ubuntu/ $DISTRIB_CODENAME-updates main restricted universe multiverse \n\
deb-src http://mirrors.aliyun.com/ubuntu/ $DISTRIB_CODENAME-proposed main restricted universe multiverse \n\
deb-src http://mirrors.aliyun.com/ubuntu/ $DISTRIB_CODENAME-backports main restricted universe multiverse \n" \
| cat - /etc/apt/sources.list | sudo tee /etc/apt/sources.list


# 更新
sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade

# 注意: sudo 不会使用当前环境下设置的 http_proxy 等变量
# 1. 使用 root 账号设置环境变量
# 2. visudo, 在 Defaults env_reset 下面添加 Defaults env_keep = "http_proxy ftp_proxy"
#     如果不只是代理 apt-get 而是全部的 X11 等工具,可以使用 Defaults env_keep = "http_proxy https_proxy ftp_proxy DISPLAY XAUTHORITY"
#     参考 http://askubuntu.com/questions/7470

# 清除已下载的内容
sudo apt-get clean
# 卸载不需要的包
sudo apt-get autoremove

################
# Docker
################
# 安装 Docker
curl -sSL http://acs-public-mirror.oss-cn-hangzhou.aliyuncs.com/docker-engine/internet | sh -
sudo usermod -aG docker $USER

# 修改为自己的镜像地址
REGISTRY_MIRROR=https://xxxxxx.mirror.aliyuncs.com

# Ubuntu 15.04 16.04，Docker 1.9 以上
sudo mkdir -p /etc/systemd/system/docker.service.d
sudo tee /etc/systemd/system/docker.service.d/mirror.conf <<EOF
[Service]
ExecStart=
ExecStart=/usr/bin/docker daemon -H fd:// --registry-mirror=$REGISTRY_MIRROR
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker

# Ubuntu 12.04 14.04，Docker 1.9 以上
echo "DOCKER_OPTS=\"\$DOCKER_OPTS --registry-mirror=$REGISTRY_MIRROR\"" | sudo tee -a /etc/default/docker
sudo service docker restart


################
# 重置网卡名
################
# 如果 iface 不是从 eth0 开始的,而是其他的名字,例如 enp0s1
# 使其恢复为 eth0 这样的名字
sudo apt-get remove biosdevname
sudo update-initramfs -u

# 或者修改 grub.conf 中的启动参数
# 一般位于 /etc/grub/grub.conf
# GRUB_CMDLINE_LINUX_DEFAULT="net.ifnames=0 biosdevname=0"
# 修改过后更新 grub
sudo update-grub
# 也需要修改网络的配置,将之前的修改为 eth0, 否则启动会报之前的网卡启动失败,并且新的网卡名不会启动
sudo /etc/network/interfaces

################
# 错误排查
################
# 查看启动时的日志
# /var/log/boot.log
# /var/log/dmesg
# 或
journalctl -b

################
# GUI
################
# 桌面安装
apt-cache show ubuntu-desktop
# http://www.tldp.org/HOWTO/XWindow-User-HOWTO/runningx.html
# 包信息 http://packages.ubuntu.com/trusty/ubuntu-desktop
# 可以不安装推荐内容
sudo apt-get install --no-install-recommends ubuntu-desktop

# 不启动到 GUI
# 修改 grub
# GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
# 为
# GRUB_CMDLINE_LINUX_DEFAULT="text"
# 更新 grub
sudo update-grub

# 如果使用的 systemd 还需要
sudo systemctl enable multi-user.target --force
sudo systemctl set-default multi-user.target

# 如果只想使用 vnc, 可以简单的安装以下内容
sudo apt install xfce4 xfce4-goodies tightvncserver
vncserver
vncserver -kill :1

# 可修改配置以保证启动 xfce
mv ~/.vnc/xstartup ~/.vnc/xstartup.bak
nano ~/.vnc/xstartup
# #!/bin/bash
# xrdb $HOME/.Xresources
# startxfce4 &
chmod +x ~/.vnc/xstartup
vncserver

# 手动启动 X Server
startx

################
# 恢复密码
################
# 重启时按住 Shift, 进入恢复模式,选择 root 启动,进入运维模式
# 此时文件系统为只读
# 重新挂载为读写
mount -rw -o remount /
# 修改指定用户密码
passwd user
# 重启
reboot

################
# 移除启动时的其他内核版本
################
# 查看当前内核版本,不要删除该版本
uname -r
# 查看所有的版本
dpkg --list | grep linux-image
# 移除其他版本
# sudo apt-get purge linux-image-x.x.x.x-generic
# 更新启动项
sudo update-grub2


################
# 网络设置
################
# sudo nano /etc/network/interfaces
# 默认的本地环回
auto lo eth0
iface lo inet loopback
# 静态 IP
iface eth0 inet static
	address 192.168.1.101
	netmask 255.255.255.0
	gateway 192.168.1.1

# nameserver 配置 resolv.conf


# 重启网卡
systemctl restart ifup@eth0

```

fwupd.org Updating Firmware in Linux

## FAQ
### 移除旧版内核
* https://askubuntu.com/a/254585

