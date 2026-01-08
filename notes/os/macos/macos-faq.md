---
title: macOS FAQ
tags:
  - FAQ
---

# macOS 常见问题

- Commands
  - https://gist.github.com/sergiitk/a87207a8af11d6e6d807

```bash
# ProductName:	macOS
# ProductVersion:	12.7.6
# BuildVersion:	21H1320
sw_vers

# 系统版本号
# 14.3.1
sw_vers -productVersion

system_profiler SPSoftwareDataType # 软件信息
system_profiler SPHardwareDataType # 硬件信息
system_profiler SPDisplaysDataType # GPU 信息

cat /System/Library/CoreServices/SystemVersion.plist

system_profiler SPDisplaysDataType -json | jq -r '.SPDisplaysDataType[0].sppci_cores'
system_profiler

# 获取 WiFi 密码
security find-generic-password -ga "Home" | grep "password:"

# 获取 Dock 右下角角
# 14 Notes
defaults read com.apple.dock wvous-br-corner
defaults write com.apple.dock wvous-br-corner -int 1
killall Dock # restart dock
```

| val | for              | en                   | desc                           |
| --- | ---------------- | -------------------- | ------------------------------ |
| 1   | 禁用             | Disabled             | 无任何操作                     |
| 2   | 调度中心         | Mission Control      | 显示所有窗口和桌面             |
| 3   | 应用程序窗口     | Application Windows  | 显示当前应用的所有窗口         |
| 4   | 桌面             | Desktop              | 显示桌面，隐藏所有窗口         |
| 5   | 启动屏幕保护程序 | Start Screen Saver   | 立即启动屏保                   |
| 6   | 禁用屏幕保护程序 | Disable Screen Saver | 防止屏保启动                   |
| 7   | 仪表盘           | Dashboard            | 显示小组件（新版本已废弃）     |
| 10  | 显示器睡眠       | Put Display to Sleep | 关闭显示器                     |
| 11  | 启动台           | Launchpad            | 显示应用程序启动器             |
| 12  | 通知中心         | Notification Center  | 打开通知中心                   |
| 13  | 锁定屏幕         | Lock Screen          | 立即锁定 Mac                   |
| 14  | 快速备忘录       | Quick Note           | 打开备忘录应用（你当前的设置） |

| suffix | position | full            |
| ------ | -------- | --------------- |
| tl     | 左上角   | wvous-tl-corner |
| tr     | 右上角   | wvous-tr-corner |
| bl     | 左下角   | wvous-bl-corner |
| br     | 右下角   | wvous-br-corner |

- coreduetd
  - Handoff

## path_helper

- /etc/paths
- /etc/paths.d/
- /etc/manpaths
- /etc/manpaths.d

```bash
cat /etc/paths.d/* /etc/paths

/usr/libexec/path_helper
```

- https://opensource.apple.com/source/shell_cmds/shell_cmds-162/path_helper/path_helper.c.auto.html
- https://github.com/yb66/path_helper

## APFS vs HFS+

- APFS - 新的
- HFS+ - 旧的

## Inside

- https://gist.github.com/kconner/cff08fe3e0bb857ea33b47d965b3e19f

## Memory

- Memory - 虚拟内存 - 代码+数据+动态库+堆栈 等
- Real Memory - 实际内存
- Real Private Memory - 堆栈+字体缓存+OpenGL 等 - 独立占用
- VM Compressed - 压缩不常用虚拟内存
  - 可关闭 `sudo nvram boot-args="vm_compressor=1"`
- Real Shared Memory - 共享内存

## AXIS AX88179 网卡用不了

到官网下载最新驱动 https://asix.com.tw/en/product/USBEthernet/Super-SpeedUSBEthernet/AX88179

## staff & wheel

- staff - 一般用户
- wheel - 更高权限用户
  - root 在该分组
  - 可以 su
- everyone
- localaccounts
- admin
- 其他 \_appserverusr \_appserveradm \_lpadmin com.apple.sharepoint.group.1 \_appstore \_lpoperator \_developer \_analyticsusers com.apple.access_ftp com.apple.access_screensharing com.apple.access_ssh com.apple.access_remote_ae
- staff 和 wheel 起源于 BSD
  - https://superuser.com/a/191969/242730
  - [big wheel](https://www.dictionary.com/browse/big-wheel)
    - an influential or important person
    - 重要人物

## 未进入休眠

- 在 Console.app 中搜索 `PreventUserIdleSystemSleep`
- `pmset -g` 确认当前的配置信息
  - 时间
  - sleep 是否有 prevent 信息
    - 常见阻碍线程
      - sharingd
      - backupd
      - AddressBookSourceSync

```bash
# 当前系统状态
# 主要是 PreventUserIdleSystemSleep
pmset -g assertions

# 查看状态变更日志
# InternalPreventSleep 和 PreventUserIdleSystemSleep
pmset -g assertionslog

# 查看唤起原因
log show --style syslog --start "$(date +%Y-%m-%d) 00:00:00" | grep "Wake reason"
```

- PreventUserIdleSystemSleep
  - BTLEAdvertisement
- MaintenanceWake - mDNSResponder:maintenance

```

Shutdown the computer, wait 30 seconds, restart the computer.

Disconnect all third-party peripherals.
Resetting your Mac’s PRAM and NVRAM
Reset the System Management Controller (SMC)
Reset your Startup Disk and Sound preferences.
Start the computer in Safe Mode. Test in safe mode to see if the problem persists, then restart normally.
Use Apple Hardware Test to see if there is any hardware malfunction.

Repair the disk by booting from the Recovery HD. Immediately after the chime hold down the Command and R keys until the Utility Menu appears. Choose Disk Utility and click on the Continue button. Select the indented (usually, Macintosh HD) volume entry from the side list. Click on the First Aid button in the toolbar. Wait for the Done button to appear. Quit Disk Utility and return to the Utility Menu. Restart the computer from the Apple Menu.

Repair permissions on the Home folder: Resolve issues caused by changing the permissions of items in your home folder.

reset NVRAM
https://support.apple.com/en-us/HT204063

Option, Command, P, and R. You can release the keys after about 20 seconds, during which your Mac might appear to restart.

On Mac computers that play a startup sound, you can release the keys after the second startup sound.
On Mac computers that have the Apple T2 Security Chip, you can release the keys after the Apple logo appears and disappears for the second time.

https://support.apple.com/zh-cn/HT201295

有 T2 芯片的 Mac 笔记本电脑
先尝试以下操作：

选取苹果菜单 >“关机”。
在 Mac 关机后，按住电源按钮 10 秒钟。
松开电源按钮，然后等待几秒钟。
再次按下电源按钮以开启 Mac。
如果上述操作无法解决问题，请按照以下步骤操作：

选取苹果菜单 >“关机”。
在 Mac 关机后，按住右 Shift 键、左 Option 键和左 Control 键 7 秒钟。然后，在按住电源按钮的同时继续按住这些按键 7 秒钟。
松开所有三个按键和电源按钮，然后等待几秒钟。
再次按下电源按钮以开启 Mac。
```

## tuntap

- macOS 支持 utun - 等同于 tun
  - 但不支持 tap
- tuntap 扩展 11.5 macOS BigSur 后内核扩展不可用
- 参考
  - [Deprecated Kernel Extensions and System Extension Alternatives](https://developer.apple.com/support/kernel-extensions/)
  - https://tunnelblick.net/cTunTapConnections.html
- https://github.com/ntop/n2n/issues/773#issuecomment-1143051664

## 窗口只能看到边缘没有 Title 如何拖动？

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

## 制作安装盘 {#create-macos-bootable-usb}

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

- `--applicationpath`
  - macOS Sierra or earlier
- https://support.apple.com/downloads/macOS
- https://mrmacintosh.com/how-to-download-macos-catalina-mojave-or-high-sierra-full-installers/
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

## 重置混合磁盘/Fusion Drive {#reset-fusion-drive}

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

## syncpolicyd

- introduced in macOS 10.7.3 with the Gatekeeper feature.
- act as the centralized daemon for answering Gatekeeper questions.
- In addition to assessing applications before running, the daemon also handles authorizing the loading of KEXTs as well as tracking legacy applications that the user has run. In Mojave syspolicyd has expanded again and is responsible for handling software notarization checks as well. We’ll start with a very high level look at the daemon startup process and then dive deeper into each of syspolicyd’s subsystems.

## rtcreportingd

- connect to pancake.apple.com
- phone home to verify that your device is authorised for home sharing

## qlgenerator - QuickLook Generator

- macOS Catalina+ /Library/QuickLook/
- ~/Library/QuickLook/

## Install qlgenerator

```bash
sudo mv ~/Downloads/AVIFQuickLook.qlgenerator /Library/QuickLook/
xattr -d -r com.apple.quarantine /Library/QuickLook/AVIFQuickLook.qlgenerator
qlmanage -r

qlmanage -p input.avif    # preview
qlmanage -t input.avif -x # generate thumnail

# if using ~/Library/QuickLook/
mkdir -p ~/Library/QuickLook/
xattr -d -r com.apple.quarantine ~/Library/QuickLook/AVIFQuickLook.qlgenerator
```

## sysmond

- macOS 的 Activity Monitor/活动监控 进程
- 如果选择 Memory tab 且显示了 shared memory 和 private memory 会导致高 CPU 占用

## Why ZSH

- Bash 4 为 GPLv3
- 苹果拒绝使用 GPLv3
- 10 年后迁移为使用 ZSH - MIT

## GPLv3

- 苹果拒绝使用 GPLv3
  - GPLv2 和 GPLv3 彼此不兼容
  - 禁止 Tivoization
- 影响
  - Bash v3 -> ZSH
  - rsync 2.x -> openrsync
    - macOS 15.4 Sequoia
  - macOS Catalina 移除 Emacs
  - 替换/移除 Samba、GCC

## installd

- PackageKit framework
- Software Update
- /System/Library/PrivateFrameworks/PackageKit.framework/Resources/installd
- CPU 高是因为 compile the current list of software installed on your computer, and compare with the current version list received from Apple's servers
- 参考
  - [What is the `installd` process, and why is it eating my CPU?](https://apple.stackexchange.com/a/91963/103557)

## Mach-O universal binary

- 自 Big Sur 开始
  - 可以作为 x86 或 arm 启动
- x86_64
- arm64e

## com.apple.MobileSoftwareUpdate.UpdateBrainService

## otool

- macOS 下的 ldd 对等工具

```bash
otool -L a.out
```

## coreaudiod

**修复高 CPU 占用问题**

```bash
mkdir ~/Library/Preferences/Audio
sudo chown _coreaudiod:admin ~/Library/Preferences/Audio

stat ~/Library/Preferences/Audio
```

- https://forums.macrumors.com/threads/fix-sustained-12-15-coreaudiod-cpu-usage-on-m1-possibly-intel-too.2331498/

## bindfs

- fuse

```bash
brew install gromgit/fuse/bindfs-mac

bindfs a b
```

## 输入法卡顿

```bash
kill -9 $(pgrep SCIM)
```

## Powerup Hours

```bash
brew install smartmontools
smartctl -a disk0 # Power On Hours
ac                # connect time accounting /var/run/utmpx
```

## invalid active developer path

```bash
sudo xcode-select --reset
```

- https://apple.stackexchange.com/a/254381/103557

## com.apple.MobileSoftwareUpdate.UpdateBrainService

系统更新

## VNC Server

- 远程屏幕共享

```bash
/System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart -configure -allowAccessFor -allUsers -privs -all

# 1. by kickstart
/System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart -activate -configure -access -off -restart -agent -privs -all -allowAccessFor -allUsers

# 2. by launchctl
defaults write /var/db/launchd.db/com.apple.launchd/overrides.plist com.apple.screensharing -dict Disabled -bool false
launchctl load -w /System/Library/LaunchDaemons/com.apple.screensharing.plist

# 3. 指定用户
/System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart -configure -allowAccessFor -specifiedUsers
/System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart -activate -configure -users $USER -access -on -agent -privs -all -restart -agent

sudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart -deactivate

open vnc://192.168.1.1
```

- https://gist.github.com/nateware/3915757
- https://support.apple.com/zh-cn/guide/remote-desktop/apd8b1c65bd/mac

```
Screen Sharing is not permitted on “10.10.1.1”. Disable and re-enable Screen Sharing or Remote Management in System Settings before trying again
```

## cryptex

- cryptographically-sealed archive
- /Volumes/Preboot/Cryptexes

## dmg

```bash
7z x googlechrome.dmg -o/tmp/googlechrome
VER=$(cat /tmp/googlechrome/Google\ Chrome/Google\ Chrome.app/Contents/Info.plist | grep -A1 CFBundleShortVersionString | tail -1 | sed -r 's/.*>(.*?)<.*/\1/' | tr -d '[[:space:]]')
```

## 5000 & 7000 ports

macOS 的 AirPlay Receiver 服务会占用 5000 和 7000 端口

- System Settings > General > AirDrop & Handoff > AirPlay Receiver

---

AirPlay Receiver 是 macOS 的一个服务，用于接收来自 iOS 设备的音频和视频流。

## utun 无法 ping 本地IP

```txt title=/etc/pf.conf
rdr on utun0 inet proto tcp from any to 192.168.100.2 -> 127.0.0.1
```

```bash
sudo pfctl -f /etc/pf.conf
```

- rdr from pfctl
- 旧版本有 rdr 命令 `rdr on utun0 from any to 192.168.100.2 -> lo0`

```bash
sudo ifconfig lo0 alias 192.168.100.2
```

**如果需要每次**

```xml title="/Library/LaunchDaemons/com.example.addlo0alias.plist"
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.example.addlo0alias</string>
    <key>ProgramArguments</key>
    <array>
        <string>/sbin/ifconfig</string>
        <string>lo0</string>
        <string>alias</string>
        <string>192.168.100.2</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <false/>
</dict>
</plist>
```

```bash
sudo chown root:wheel /Library/LaunchDaemons/com.example.addlo0alias.plist
sudo chmod 644 /Library/LaunchDaemons/com.example.addlo0alias.plist
sudo launchctl load /Library/LaunchDaemons/com.example.addlo0alias.plist
```

## sudo touch id

```bash
sudo nano /etc/pam.d/sudo
```

```
auth sufficient pam_tid.so
```

## 外部显示器鼠标卡顿 {#mouse-lag-on-external-display}

- https://discussions.apple.com/thread/254666579

## 避免休眠

```bash
# -i 避免 Idle
# -s 避免 System Sleep
# 依然会被 display closed 中断
caffeinate -i -s
# 可以结合命令使用
caffeinate -i make build
```
