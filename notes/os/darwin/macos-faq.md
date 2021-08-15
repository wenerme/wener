---
title: macOS FAQ
---

# macOS 常见问题

## AXIS AX88179 网卡用不了

到官网下载最新驱动 https://asix.com.tw/en/product/USBEthernet/Super-SpeedUSBEthernet/AX88179

## 窗口只能看到边缘没有 Title 如何拖动

- 鼠标放到边缘，变成箭头
- 按住 Cmd 即可拖动

## cannot be opened because the developer cannot be verified

下载的文件无法执行

```bash
# xattr -r -d com.apple.quarantine <文件>
# 例如
xattr -r -d com.apple.quarantine $HOME/Development/graalvm/
```

## 刷新 Finder

- 例如挂载 smb 的时候远程目录发生变化

```bash
osascript -e 'tell application "Finder" to tell front window to update every item'
```

## macOS vs Darwin

- macOS
  - 平台
  - 包含框架和服务
  - 界面
  - 软件程序包
- Darwin
  - 操作系统
  - 基础软件
- XUN
  - 内核
  - 资源管理
- 参考 [What's the difference between Mac OS X, Darwin OS and a popular Linux distribution like Ubuntu? What can be done on Darwin?](https://www.quora.com/Whats-the-difference-between-Mac-OS-X-Darwin-OS-and-a-popular-Linux-distribution-like-Ubuntu-What-can-be-done-on-Darwin)

## 载入更新失败

进入恢复模式关闭 sip - System Integrity Protection

```bash
csrutil disable
```

重启, 进入恢复, 安装完成后重新启用

```bash
csrutil enable
```

## 制作安装盘

当下载好安装器后可直接使用安装器里附带的程序制作安装包

```bash
# 替换 MyVolume 为实际的挂载盘
# Big Sur
sudo /Applications/Install\ macOS\ Big\ Sur.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
# Catalina
sudo /Applications/Install\ macOS\ Catalina.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
# Mojave
sudo /Applications/Install\ macOS\ Mojave.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
# High Sierra
sudo /Applications/Install\ macOS\ High\ Sierra.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume
# Sierra
sudo /Applications/Install\ macOS\ Sierra.app/Contents/Resources/createinstallmedia --applicationpath /Applications/Install\ macOS\ Sierra.app --volume /Volumes/MyVolume
# El Capitan
sudo /Applications/Install\ OS\ X\ El\ Capitan.app/Contents/Resources/createinstallmedia --applicationpath /Applications/Install\ OS\ X\ El\ Capitan.app --volume /Volumes/MyVolume
# Yosemite
sudo /Applications/Install\ OS\ X\ Yosemite.app/Contents/Resources/createinstallmedia --applicationpath /Applications/Install\ OS\ X\ Yosemite.app --volume /Volumes/MyVolume
# Mavericks
sudo /Applications/Install\ OS\ X\ Mavericks.app/Contents/Resources/createinstallmedia --applicationpath /Applications/Install\ OS\ X\ Mavericks.app --volume /Volumes/MyVolume
```

- [Create a bootable installer for OS X](https://support.apple.com/en-us/HT201372)
- [Disk Maker X](http://diskmakerx.com/)
- 操作系统下载
  - App Store [macOS Sierra](https://search.itunes.apple.com/WebObjects/MZContentLink.woa/wa/link?mt=11&path=mac%2fmacossierra)

## Installer can't verified 安装器不能被验证

使用旧的安装应用, 2016.2.14 之前,可能会由于证书过期导致无法使用,通过修改系统时间来规避

```bash
# 在安装前进入终端执行
date 0101010116
```

## 重置混合磁盘/Fusion Drive

```bash
diskutil resetFusion
```

## SIP 影响

- [System Integrity Protection Guide Introduction](https://developer.apple.com/library/archive/documentation/Security/Conceptual/System_Integrity_Protection_Guide/Introduction/Introduction.html)
- 文件系统保护
- 运行时保护
- 内核保护

## 网络存储设备不写 DS_Store 文件

```bash
defaults write com.apple.desktopservices DSDontWriteNetworkStores true
```

## interface 添加地址

```bash
sudo ifconfig en0 alias 128.133.123.83/24 up
# 移除
sudo ifconfig en0 -alias 128.133.123.83/24 up
```

## QuickLookSatellite

用于生成 QuickLook，例如 媒体文件预览图。

异常高 CPU 占用，不停重启。

---

可能是因为 Finder 打开的某个目录，目录下媒体文件有异常。

例如 我 Finder 一个目录下的 AVI 文件异常，导致不停出现 QuickLookSatellite，且 CPU 非常高，关闭 Finder 即可。

---

- 参考
  - https://superuser.com/a/617672/242730
