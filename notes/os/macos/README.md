---
title: macOS
---

# macOs

- [Identify your Mac mini](https://support.apple.com/en-us/HT201894)
- [Identify your MacBook Pro](https://support.apple.com/en-us/HT201300)
- [Identify your iPad model](https://support.apple.com/en-us/HT201471)
- [Where does Mac OS X come from?](https://unix.stackexchange.com/q/695/47774)
- 好看的屏保 https://github.com/JohnCoates/Aerial
  - `brew cask install aerial`
- [iousbhiddriver](https://github.com/thefloweringash/iousbhiddriver-descriptor-override)
  - 支持 Noppoo Choc 的驱动
- 参考
  - [OS X 技巧](http://apple.stackexchange.com/questions/400)
  - [Assign a shortcut to running a script in OS X](http://superuser.com/a/264943/242730)
- [Clean-Me](https://github.com/Kevin-De-Koninck/Clean-Me)

```bash
# 查看可用的分辨率
system_profiler SPDisplaysDataType | grep Resolution
xrandr

# 统计 Chrome 用的内存
ps aux | grep -i chrome | awk '{sum += $4} END {print 4*1024 * (sum/100)}'

# 类似于 lsusb
ioreg -p IOUSB -l -w 0
# lsusb
brew update && brew tap jlhonora/lsusb && brew install lsusb

# 更新软件
softwareupdate -i -w

# 查看 OS X 系统版本信息
sw_vers

# 打开屏保
open -a ScreenSaverEngine

# 锁屏
/System/Library/CoreServices/"Menu Extras"/User.menu/Contents/Resources/CGSession -suspend

# 阅读邮件
mail
# 删除所有邮件
# delete *
# q

# 查看硬件网络端口
networksetup -listallhardwareports

# 查看隐藏文件，需要重启 finder
defaults write com.apple.finder AppleShowAllFiles YES
# 关闭 finder
killall Finder /System/Library/CoreServices/Finder.app
# 关闭
defaults write com.apple.finder AppleShowAllFiles NO
```

| 快捷键                   | 功能                               |
| ------------------------ | ---------------------------------- |
| `Command + C`            | 拷贝                               |
| `Command + V`            | 粘贴                               |
| `Command + X`            | 剪切                               |
| `Command + Z`            | 撤销                               |
| `Command + Shift + Z`    | 重做                               |
| `Command + A`            | 全选                               |
| `Command + F`            | 查找                               |
| `Command + S`            | 保存                               |
| `Command + P`            | 打印                               |
| `Command + Q`            | 退出应用                           |
| `Command + W`            | 关闭当前窗口                       |
| `Command + M`            | 最小化当前窗口                     |
| `Option + Command + D`   | 显示或隐藏 Dock                    |
| `Command + Tab`          | 在打开的应用之间切换               |
| `Command + Space`        | 显示或隐藏 Spotlight 搜索栏        |
| `Command + Shift + 3`    | 截取整个屏幕                       |
| `Command + Shift + 4`    | 截取屏幕的一部分                   |
| `Command + Shift + 5`    | 截屏和录屏选项 (Mojave 及更高版本) |
| `Control + Command + Q`  | 立即锁定屏幕                       |
| `Control + Command + F`  | 进入或退出全屏模式                 |
| `Option + Command + Esc` | 强制退出应用                       |
| `Command + ,`            | 打开当前应用的偏好设置             |
| `Fn + ↑`                 | 向上翻页 (Page Up)                 |
| `Fn + ↓`                 | 向下翻页 (Page Down)               |
| `Fn + ←`                 | 滚动到文稿开头 (Home)              |
| `Fn + →`                 | 滚动到文稿末尾 (End)               |

打开取色器

```applescript
on run {input, parameters}
  choose color
  return input
end run
```

**文件目录结构**

```
/Library
  /Screen Savers # 屏保程序
```

## Brew

Brew 是 OS X 上必不可少的软件包管理器, 具体使用可参考[这里](https://github.com/wenerme/wener/blob/master/tricks/manual/brew.md)

## 移动磁盘格式选择

如果想要将移动磁盘与 PC 和 Mac 共用,最好选择 ExtFAT,支持大文件(>4G), 都能被识别和读写,在 Mac 上格式化的时候,需要选择使用主引导记录而不是 GUID, 否则 Windows 识别不了.

## 启动选项

| 启动键             | 描述                                                   |
| ------------------ | ------------------------------------------------------ |
| Command-R          | 恢复模式                                               |
| Command-Option-R   | 网络恢复模式                                           |
| Alt/Option         | 访问启动管理器                                         |
| C                  | 从 CD, DVD, 或 USB 启动                                |
| N                  | NetBoot                                                |
| Shift              | 安全启动                                               |
| Command-V          | 详细模式                                               |
| Command-S          | 单用户模式                                             |
| Command-Option-P-R | 重置 [NVRAM](https://support.apple.com/zh-cn/HT204063) |
| T                  | 启动目标磁盘模式                                       |

常用键盘映射

| Windows     | macOS   |
| ----------- | ------- |
| Windows Key | Command |
| Alt         | Option  |

## 证书

```bash
sudo security add-trusted-cert -d -r trustRoot -k "/Library/Keychains/System.keychain" cert.cer
sudo security remove-trusted-cert -d cert.cer
```

## Finder

- Finder 的主要问题
  - 不能复制当前地址
  - 不能新建文件
  - 不能剪切
- [xtrafinder](http://www.trankynam.com/xtrafinder/)
  - XtraFinder add Tabs and features to Mac Finder.
- [FinderPath](http://bahoom.com/finderpath/)
  - 地址栏

## Install Xcode

```bash
xcode-select --install

xcodebuild -runFirstLaunch
clang -v
```

## license

```bash
sudo xcodebuild -license
```

## 资源下载

- [mac-torrent-download](http://mac-torrent-download.net/)
- http://www.macbed.com/

## 终端启用换行

不换行会被截断

```bash
tput rmam # 禁用换行
tput smam # 启用换行
```

### csrutil

```
Modify the System Integrity Protection configuration. All configuration changes apply to the entire machine.
Available commands:

    clear
        Clear the existing configuration.
    disable
        Disable the protection on the machine. Only available in Recovery OS.
    enable
        Enable the protection on the machine. Only available in Recovery OS.
    status
        Display the current configuration.

    netboot
        add <address>
            Insert a new IPv4 address in the list of allowed NetBoot sources.
        list
            Print the list of allowed NetBoot sources.
        remove <address>
            Remove an IPv4 address from the list of allowed NetBoot sources.
```

```
/System
/sbin
/bin
/usr *
/Applications **

* /usr is protected with the exception of /usr/local subdirectory, which is often used by tools like Homebrew

** /Applications is protected for apps that are pre-installed with Mac OS (Calendar, Photos, Safari, Terminal, Console, App Store, Notes, etc)

log show --predicate 'eventMessage contains "Previous shutdown cause"' --last 24h
```

## FAQ

### Diskutil

```bash
# 格式化为 FAT32
diskutil eraseDisk FAT32 NAME MBRFormat /dev/disk2
```

### BasicIPv6ValidationError

```bash
# 先禁用掉对应网卡的 IPv6
# networksetup -setv6off Wi-Fi
networksetup -setv6off Ethernet
# 然后通过命令行修改配置
networksetup -setmanual Ethernet 192.168.31.2 255.255.255.0 192.168.1.1
# 设置完成后也可以将 IPv6 设置为自动
```

### NTFS 不能写

OS X 因为版权原因不支持 NTFS 的写操作,需要安装第三方软件才能进行写操作.

- Tuxera NTFS

### 使用 USB 以太网

需要安装 [HoRNDIS](https://github.com/jwise/HoRNDIS) 来支持

#### 在 x86 上安装

- [UniBeast: Install macOS Sierra on Any Supported Intel-based PC](https://www.tonymacx86.com/threads/unibeast-install-macos-sierra-on-any-supported-intel-based-pc.200564/)
- [unibeast 7](https://www.tonymacx86.com/resources/unibeast-7-1-1.333/)
  - 支持 macOS Sierra

#### 更新未能被验证

可参考[该文章](http://matrix.sspai.com/p/dd9c2d80).

解决办法,前往 [苹果组合更新下载页面](https://support.apple.com/downloads/combo), 下载需要的版本, 手动进行安装更新.

#### 常见问题诊断

- 重置 NVRAM
- 重置 [SMC](https://support.apple.com/zh-cn/HT201295)
- 磁盘检测 fsck -fy
  - [fsck](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man8/fsck.8.html)
  - [fsck_hfs](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man8/fsck_hfs.8.html)
  - http://www.thegeekstuff.com/2012/08/fsck-command-examples
- 安全启动
- 无法挂载磁盘
  - http://apple.stackexchange.com/a/59166/103557
  - 可以尝试 [asr](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man8/asr.8.html)
  - https://en.wikipedia.org/wiki/Apple_Software_Restore
- http://apple.stackexchange.com/questions/57597/how-to-fix-broken-efi-partition
- http://www.insanelymac.com/forum/topic/312038-how-to-fix-a-bad-or-broken-efi-partition-to-be-working-with-uefi-booters/

```bash
# Ubuntu
apt-get install hfsprogs
fdisk -l
# 检测磁盘是否有问题
fsck.hfsplus /dev/sda2
# 考虑将其挂载上然后把需要的数据拷贝出来
mount -t hfsplus -o force,rw /dev/sdb2 /media/mntpoint
```

### 清除 DNS 缓存

```bash
# OS X 12 (Sierra) and later
sudo killall -HUP mDNSResponder
sudo killall mDNSResponderHelper
sudo dscacheutil -flushcache
# OS X 11 (El Capitan) and OS X 12 (Sierra)
sudo killall -HUP mDNSResponder
```

### 网络

```bash
# 查看路由表
# -n 不做 resolve
netstat -nr
```

### 桥接

- 对 wifi 支持不太好

```bash
sudo ifconfig bridge0 create
sudo ifconfig bridge0 addm en0 addm en1
sudo ifconfig bridge0 up

ifconfig tap0 192.168.0.20 netmask 255.255.255.0

ifconfig bridge0 addm tap0

man ifconfig
```

### tuntap

- http://tuntaposx.sourceforge.net/
  - 目前最新版已经不会加载该扩展
- macOS 支持 utun
- [The Future of Tun and Tap VPNs on macOS](https://tunnelblick.net/cTunTapConnections.html)

```bash
brew cask install tuntap
# 避免 root 访问
sudo chown $USER:staff /dev/tap0

ll /dev/tun*
ll /dev/tap*

# 会创建失败
ifconfig tap0 create
# 在 root shell 中执行该命令会创建
# https://sourceforge.net/p/tuntaposx/mailman/message/30457237/
# The idea is that interfaces only get created when a program opens the corresponding /dev/tapX or /dev/tunX device.
# To try, do exec 3<>/dev/tap0 on a root shell.
exec 3<> /dev/tap0

ifconfig tap0 10.10.10.1 10.10.10.255
ifconfig tap0 up
ping -c1 10.10.10.1

ifconfig tap0 0.0.0.0
sudo ifconfig bridge0 addm tap0
```

### 转发

- [How do I bridge a connection from Wi-Fi to TAP on Mac OS X? (for the emulator QEMU)](https://superuser.com/questions/596095)
- [How do I create a wifi network bridge with qemu on OS X?](https://superuser.com/questions/670545)
- [qemu-tap.sh](https://github.com/ckujau/scripts/blob/master/qemu-tap.sh)

- 新版没有 natd 和 ipfw 了 统一使用 pfctl
- PF - [Network Address Translation](https://www.openbsd.org/faq/pf/nat.html)

```bash
INTERFACE=en0

# ifup
sysctl -w net.inet.ip.forwarding=1
sysctl -w net.link.ether.inet.proxyall=1
sysctl -w net.inet.ip.fw.enable=1
ifconfig bridge0 create
ifconfig bridge0 addm $INTERFACE addm tap0
ifconfig bridge0 up
natd -interface $INTERFACE
ipfw add divert natd ip from any to any via $INTERFACE

# ifdown
sysctl -w net.inet.ip.forwarding=0
sysctl -w net.link.ether.inet.proxyall=0
sysctl -w net.inet.ip.fw.enable=1
```

### 路由

```bash
# -r show routes, -n not resolve
netstat -nr
route delete -host 10.3.2.1
route add -net 10.3 tun0
route add -host 9.8.7.6 tun0
```

### 防火墙

- [OS X PF Manual](https://murusfirewall.com/Documentation/OS%20X%20PF%20Manual.pdf)
- A Cheat Sheet For Using pf in OS X Lion and Up http://krypted.com/mac-os-x/a-cheat-sheet-for-using-pf-in-os-x-lion-and-up/

```bash
cat /etc/pf.conf
# 启用, 可能默认未启用
pfctl -ef /etc/pf.conf
# 语法检测
pfctl -v -n -f /etc/pf.conf
# 应用和重载
pfctl -f /etc/pf.conf
```

### DocumentRevisions-V100

- `/.DocumentRevisions-V100` 可能会占用非常多的空间
- [What will occur if the .DocumentRevisions-V100 folder is deleted?](https://apple.stackexchange.com/a/313112/103557)

### 常见网络名称

- lo0 = loopback
- gif0 = Software Network Interface
- stf0 = 6to4 tunnel interface
- en0 = Ethernet 0
- fw0 = Firewire
- en1 = Ethernet 1
- vmnet1 = Virtual Interface

### Develope

```
security find-identity -v -p codesigning
```

### 命令行开启屏幕共享

```bash
# 开启所有服务，允许所有用户
sudo /System/Library/CoreServices/RemoteManagement/ARDAgent.app/Contents/Resources/kickstart -activate -configure -access -off -restart -agent -privs -all -allowAccessFor -allUsers

# 只开启屏幕共享
sudo defaults write /var/db/launchd.db/com.apple.launchd/overrides.plist com.apple.screensharing -dict Disabled -bool false

sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.screensharing.plist
```

### syslog

- [How to use logger command on Sierra?](https://apple.stackexchange.com/questions/256769)

## 历史

- 乔布斯离开苹果创建 NeXT
- NeXT 专注于个人工作站 - NeXT Computer, NeXTstation, NeXTcube
- NeXT 研发的操作系统 NeXTStep - 基于 BSD, Mach 微内核
  - 添加 OO 系统库，Frameworks， Toolkits - kits
  - 基于 OO 的桌面
  - ObjectC
  - Xcode Interface Builder
  - App Store
- NeXT 分离高层框架为 OpenStep for Mach - 面向 Windows NT, Sun Solaris
- Apple 多次尝试完善 MacOS 以失败告终
- Apple 并购 NeXT - 乔布斯回到 Apple
- MacOS 基于 OpenStep 完善
  - 基于 xnu 内核
  - 构建 Cocoa API
- 未完成 Rhapsody ，完成部分发布为 MacOS X Server 1.0
- Rhapsody -> MacOS X, OS X, macOS
- 参考
  - https://apple.stackexchange.com/a/401881/103557
