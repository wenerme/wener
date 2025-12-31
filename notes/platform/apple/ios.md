---
title: iOS
tags:
  - Platform
  - Apple
  - iOS
---

# iOS

## Tips

- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
  - Get in-depth information and UI resources for designing great apps that integrate seamlessly with Apple platforms.
- [Resources](https://developer.apple.com/design/resources)
- [Fonts](https://developer.apple.com/fonts/)
- [Typography](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/typography/)
- [libimobiledevice](https://github.com/libimobiledevice)
- [ifuse](https://github.com/libimobiledevice/ifuse)
- [iOS Device Display Summary](https://developer.apple.com/library/content/documentation/DeviceInformation/Reference/iOSDeviceCompatibility/Displays/Displays.html)
- [Compare iPhone Models](https://www.apple.com/iphone/compare/)

```bash
# 查看所有连接的设备
instruments -s devices

# Manage apps of iOS devices
brew install ideviceinstaller
idevice_id -l
```

```bash
xcrun instruments -s devices
# /Applications/Xcode.app/Contents/Developer/usr/bin/

brew install libimobiledevice

# libimobiledevice 中并不包含 ipa 的安装命令，所以还需要安装
brew install ideviceinstaller

# 命令安装一个 ipa 文件到手机上，如果是企业签名的，非越狱机器也可以直接安装了。
ideviceinstaller -i xxx.ipa

# 命令卸载应用，需要知道此应用的 bundleID
ideviceinstaller -U [bundleID]

# 查看系统日志
idevicesyslog

# 查看当前已连接的设备的 UUID
idevice_id --list

# 截图
idevicescreenshot

# 查看设备信息
ideviceinfo

# 获取设备时间
idevicedate

# 设置代理（也好像是端口转发的工具）
iproxy

# 挂载 DeveloperDiskImage，用于调试
ideviceimagemounter

# 获取设备名称
idevicename

# 调试程序（需要预先挂载 DeveloperImage）
idevicedebug

# 查看和操作设备的描述文件
ideviceprovision list
```

## Could not connect to lockdownd

- [libimobiledevice/ideviceinstaller#48](https://github.com/libimobiledevice/ideviceinstaller/issues/48)

```bash
brew uninstall ideviceinstaller
brew uninstall libimobiledevice
brew install --HEAD libimobiledevice
brew link --overwrite libimobiledevice
brew install --HEAD ideviceinstaller
brew link --overwrite ideviceinstaller
sudo chmod -R 777 /var/db/lockdown/
```

## Packet Analysis

- [Go Deep on iOS Packet Analysis](https://medium.com/@MikeFurtak/go-deep-on-ios-packet-analysis-6a7542eeffb3)
- [Wireshark 抓包](http://mrpeak.cn/blog/wireshark/)
- RVI (Remote Virtual Interface)
- 或者用 mitimproxy

```bash
# 查看当前是否有 rvi 网卡
ifconfig -l
# 启动 riv
rvictl -s $(idevice_id -l)
# 然后就可以在 wireshark 中对 rvi0 进行分析

# 停止
rvictl -x $(idevice_id -l)
# 查看当前的设备列表
rvictl -l
```

## Simulator Gestures

- [Help](https://stackoverflow.com/a/10075020/1870054)

1. Place the pointer where you want the pinch to occur.
2. Hold down the Option key.
3. Move the circles that represent finger touches to the start position.
4. Move the center of the pinch target by holding down the Shift key, moving the circles to the desired center position, and releasing the Shift key.
5. Hold down the mouse button, move the circles to the end position, and release the Option key.

## [App] if we're in the real pre-commit handler we can't actually add any new fences due to CA restriction

- [StackOverflow](https://stackoverflow.com/a/40160779/1870054)

Environment Variable: `OS_ACTIVITY_MODE = disable`

## iPhone is busy: Preparing debugger support for iPhone

- [StackOverflow](https://stackoverflow.com/a/47448911/1870054)

## Failed to find a suitable device for the type xxx

```bash
sudo killall -9 com.apple.CoreSimulator.CoreSimulatorService
```
