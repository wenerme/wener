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
- [OpenMinis/iCTRL](https://github.com/OpenMinis/iCTRL)
  - Apache-2.0，基于 XCUITest 的 iOS 自动化服务，面向 AI Agent
  - HTTP JSON-RPC 2.0，默认端口 8200；通过 `/skill` 和 `/schema` 自描述操作方法
  - 支持点击、滑动、输入、读取 UI 树、截图、设备端 OCR、启动应用
  - 需要开启 Developer Mode、签名安装 IPA、挂载 Developer Disk Image 并运行 Runner；重启后需重新挂载 DDI
  - 默认仅本机访问；局域网控制需开启 Remote Access，并在手机上批准客户端配对
- [onehumanbeing/esp32-iphone-agent](https://github.com/onehumanbeing/esp32-iphone-agent)
  - 通过 ESP32-S3 USB HID 输入和 AirPlay 屏幕反馈连接视觉模型与真实 iPhone。
  - 不依赖越狱；不同版本的 Agent 运行位置、固件及连接要求不同，部署时按对应版本文档核对。
  - 仅用于自有或获授权设备测试，操作期间保留人工监督与停止手段。
- [zhongerxin/iPhone-use](https://github.com/zhongerxin/iPhone-use)
  - MIT，使用 WebDriverAgent、本地 MCP 服务和屏幕预览，让助手通过 USB 操作真实 iPhone。
  - 支持读取页面、点击、滚动、输入；控件定位失败时可查看截图。
  - 依赖 macOS、完整 Xcode、Python、Node.js，以及已信任并开启开发者模式的 iPhone。
  - 首次使用需以自己的 Apple 开发团队签名并运行 WDA Runner；无需越狱或独立 Appium Server。
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
