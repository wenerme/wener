---
slug: alpinelinux-setup-xfce
title: AlpineLinux 安装 Xfce 桌面
tags:
  - Alpine
  - Desktop
  - Xfce
---

# AlpineLinux 安装 Xfce 桌面

> 假设已经有一个基础可用的 AlpineLinux, 如果没有可前往 [wenerme/alpine-image](https://github.com/wenerme/alpine-image) 下载或自行制作

<!-- more -->

## setup xorg

安装 X server 和基础硬件驱动

```bash
# xfce + xorg
setup-xorg-base xfce4 xfce4-terminal dbus-x11 sudo pm-utils

service dbus start
rc-update add dbus

# xorg 输入设备
# apk add xf86-input-mouse xf86-input-keyboard kbd
# 默认包含 libinput
# 其他 synaptics vmmouse wacom mtrack
apk add xf86-input-libinput xf86-input-evdev kbd

# Intel 芯片集成显卡
apk add xf86-video-intel
# AMD 显卡
apk add xf86-video-amdgpu
# QEMU
# apk add xf86-video-qxl
# 如果以上都不支持则考虑使用 framebuffer
# https://pkgs.alpinelinux.org/packages?name=xf86-video-*
# apk add xf86-video-fbdev
```

此时已经可以进入 xfce 桌面, 没有登陆界面, 进入界面后可右上角退出登陆或者 `Ctrl+Alt+F1` 来切换回命令行会话。

```bash
# 通过 xorg 提供的 startx 启动
startx
# 或者指定启动 xfce4
startxfce4
```

## setup lightdm

安装 lightdm 后可以可以通过账号密码登陆, 也可以远程 VNC 进入 xfce 会话。

```bash
apk add lightdm-gtk-greeter

# 添加非 root 用户 admin 密码 admin - 不少应用需要非 root 用户
adduser -D admin
echo 'admin:admin' | chpasswd
echo 'admin ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers

# 开机进入登陆界面
rc-update add lightdm
# 立即启动 lightdm 进行登陆
service lightdm start
```

## setup xfce

安装常用的包

```bash
# 默认无法显示中文字符
apk add font-noto-cjk

# 允许非 root 通过 fuse 访问设备
apk add gvfs-fuse gvfs-smb
service fuse start
rc-update add fuse

# 自动挂载 外部设备
apk add thunar-volman udisks2
# 部分设备需要额外的包
# gvfs-mtp - MTP - 媒体播放器和移动设备
# gvfs-gphoto2 - PTP - 相机和移动设备
# gvfs-afc - 苹果移动设备

# 文件管理器支持压缩和解压
apk add thunar-archive-plugin
apk add file-roller # thunar-archive-plugin 支持的管理器
```

安装了相关插件后最好退出会话重新登陆确保生效。

## 应用

```bash
# 屏保, 任务管理器
apk add xfce4-screensaver xfce4-taskmanager

# 谷歌浏览器 - 也可以通过 flatpak 安装
apk add chromium
# 火狐浏览器
# apk add firefox-esr
```

### flatpak

Linux 因为发布版太大了，应用分发比较混乱，且不少应用并不直接支持 musl，使用 flatpak 打包的应用可避免这些问题。

```bash
apk add flatpak xdg-user-dirs
# https://flathub.org/setup/Alpine
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo

# 安装
flatpak install flathub com.visualstudio.code
# 启动
flatpak run com.visualstudio.code

flatpak install flathub org.chromium.Chromium
```

**常用应用**

| id                             | name        | 用途     |
| ------------------------------ | ----------- | -------- |
| com.visualstudio.code          | VSC         | 编辑器   |
| om.vscodium.codium             | Codium      | 编辑器   |
| org.chromium.Chromium          | Chromium    | 浏览器   |
| org.mozilla.firefox            | Firefox     | 浏览器   |
| org.telegram.desktop           | Telegram    | 即时聊天 |
| com.valvesoftware.Steam        | Steam       | 游戏     |
| org.mozilla.Thunderbird        | Thunderbird | 邮件     |
| org.filezillaproject.Filezilla | Filezilla   | 文件     |

### AppImage

不通过 flatpak 需要安装，AppImage 是封装好的一体化应用，类似容器，类似 macOS 应用。
但目前由于 glibc 兼容问题 Alpine 无法运行 AppImage 参见 [AppImage/AppImageKit#1015](https://github.com/AppImage/AppImageKit/issues/1015)。

**已知提供 AppImage 的应用**

- Jetbrain Toolbox
- Lens - Kubernetes IDE

## 其他服务

- xrdp - RDP 服务端 - 支持 Windows 直接远程登陆
- gvncviewer - VNC 客户端

# FAQ

## xfce 支持高分辨率

```bash
# 两倍缩放
# Settings Manager > Appearance > Settings > Window Scaling
xfconf-query -c xsettings -p /Gdk/WindowScalingFactor -s 2
# 调整主题为 默认 xhdpi
# Settings Manager > Window Manager > Style
xfconf-query -c xfwm4 -p /general/theme -s Default-xhdpi
```

## DISPLAY 信息

```bash
apk add xrandr
DISPLAY=:0 xrandr
```

## 查看当前显卡和声卡信息

```bash
apk add inxi
inxi -AG
```

## kernel: i915 0000:00:02.0: [drm] _ERROR_ CPU pipe A FIFO underrun

如果该错误导致闪烁可添加启动参数避免 `i915.enable_psr=0`

> [Intel graphics#Screen flickering](https://wiki.archlinux.org/index.php/Intel_graphics#Screen_flickering)
>
> 可能由于 Intel 集成显卡的节能功能导致

## VNC 远程桌面

```bash
apk add x11vnc

# 启动服务端访问已打开会话
x11vnc -display :0 -auth /var/run/lightdm/root/\:0
# 然后访问 vnc://<IP>:5900 即可

# 不退出
x11vnc -display :0 -auth /var/run/lightdm/root/\:0 --loop

# 访问时创建新的会话
# 确保 init 能启动
echo "exec startxfce4" >> ~/.xinitrc
apk add xvfb
x11vnc -ncache_cr -display :1 -auth /var/run/lightdm/root/\:1 --create

# 不警告没有设置密码
echo nopw >> ~/.x11vncrc

# 可设置为开机启动
# x11vnc -create -xkb -noxrecord -noxfixes -noxdamage -display :0 -auth /var/run/lightdm/root/:0 -rfbauth /etc/x11vnc.pass -rfbport 5900

# 登陆之前开启 VNC
# x11vnc -auth guess -display :0
```

> 如果服务常开，建议设置密码

## KMS: DRM_IOCTL_MODE_CREATE_DUMB failed: Permission denied

- DRM - Direct Rendering Manager

## xrandr auto

```bash
xrandr --auto
```

```
xrandr: Output DP1 is not disconnected but has no modes
xrandr: Output HDMI2 is not disconnected but has no modes
```

```bash
export DISPLAY=:0
xrandr --query
```

## kiskos

```bash title="~/.initrc"
xset -dpms     # Disable DPMS (Energy Star) features
xset s off     # Disable screen saver
xset s noblank # Don't blank the video device
exec chromium-browser --kiosk --no-first-run --no-sandbox 'https://wener.me'
```

# 参考

- AlpineLinux [Xfce Setup](https://wiki.alpinelinux.org/wiki/Xfce_Setup)
- [HiDPI#Xfce](https://wiki.archlinux.org/index.php/HiDPI#Xfce)
- flatpak [应用列表](https://flathub.org/apps)
- archlinux [x11vnc](https://wiki.archlinux.org/index.php/x11vnc)
