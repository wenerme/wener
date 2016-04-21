# Raspberry

## 安装
全程未使用显示器,但使用了一个直连网线.

0. 前往[官网](https://www.raspberrypi.org/downloads/raspbian/)下载镜像
  * 使用种子文件下载才是最新版
  * 下载完成后务必确认文件完整 `sha1sum *-raspbian-jessie.zip`
0. 烧录启动盘
```bash
unzup *-raspbian-jessie.zip
# 修改磁盘为相应盘符
dd if=*-raspbian-jessie.img of=/dev/rdisk2 bs=64M
```
2. 挂载烧录的盘符,在 cmdline.txt 末尾添加 `ip=192.168.2.1`, 如果该网段在使用,则修改为其他网段
0. 插入 SDCard 到 Raspberry
0. 连接直连网线, RJ45 电脑直连树莓
0. 打开电源
0. 修改主机直连为手动配置
  地址: `192.168.2.2` 子网掩码:`255.255.255.0`
0. `ssh pi@192.168.2.1` 密码为 `raspberry` 进入系统

## 连接 WIFI
```bash
# 扫描 WIFI
sudo iwlist wlan0 scan

# 添加 WIFI 配置
cat <<CFG  | sudo tee -a /etc/wpa_supplicant/wpa_supplicant.conf > /dev/null
network={
    ssid="名字"
    psk="密码"
}
CFG

sudo ifdown wlan0
sudo ifup wlan0

# 确认链接成功
ifconfig wlan0
```

## rasp-config
`sudo raspi-config` 可用于

* 扩展文件系统
* 修改用户密码
* 修改启动选项
* 启动等待网络链接
* 启动相机
* 添加到 Rastrack
* 配置 Overclock
* 调整高级选项

## 环境
```bash
# 安装 Golang
GOVERSION=1.6
wget https://storage.googleapis.com/golang/go$GOVERSION.linux-armv61.tar.gz
sudo tar -C /usr/local -xzf go$GOVERSION.*.tar.gz
export GOROOT=/usr/local/go
export PATH=$GOROOT/bin:$PATH

# 跨平台编译并且缓存编译后的包
env GOOS=linux GOARCH=arm GOBIN=`pwd`/bin go install main.go
# 压缩程序大小
env GOOS=linux GOARCH=arm GOBIN=`pwd`/bin go install -ldflags '-s -w' main.go
# 可使用 -9 或者 --ultra-brute 来达到更高的压缩效果
upx bin/main

# 挂载远程目录,可操作一些特殊文件
sshfs -o sshfs_sync,sync_readdir,reconnect,follow_symlinks,direct_io pi:/ pi
```

## 常用命令
```bash
# GPU 温度
/opt/vc/bin/vcgencmd measure_temp
# CPU 温度
cat /sys/class/thermal/thermal_zone0/temp
# 监控 CPU 和 GPU 温度
watch -n 1 'sed -re "s/(..)(.).*/CPU Temp: \1.\2°C/" /sys/class/thermal/thermal_zone0/temp;vcgencmd measure_temp | sed -re "s/temp=([[:digit:]]+.[[:digit:]]+).*/GPU Temp: \1°C/"'
```

## 资源
* [相关硬件文档](https://www.raspberrypi.org/documentation/hardware/raspberrypi/)
* [针脚](http://pinout.xyz/)
* [Pi 3 硬件图](https://www.element14.com/community/docs/DOC-73950/l/raspberry-pi-3-model-b-gpio-40-pin-block-pinout)
