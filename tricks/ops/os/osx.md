# OS X

## Tips
* [Identify your Mac mini](https://support.apple.com/en-us/HT201894)
* [Identify your MacBook Pro](https://support.apple.com/en-us/HT201300)
* [Identify your iPad model](https://support.apple.com/en-us/HT201471)

## Brew
Brew 是 OS X 上必不可少的软件包管理器, 具体使用可参考[这里](https://github.com/wenerme/wener/blob/master/tricks/manual/brew.md)

## 移动磁盘格式选择
如果想要将移动磁盘与 PC 和 Mac 共用,最好选择 ExtFAT,支持大文件(>4G), 都能被识别和读写,在 Mac 上格式化的时候,需要选择使用主引导记录而不是 GUID, 否则 Windows 识别不了.

## 启动选项
启动键 |	描述
------|----
Command-R 	|	启动为恢复模式
Alt/Option 	|	访问启动管理器
C						| 从 CD, DVD, 或 USB 启动
N						| NetBoot
Shift				| 安全启动
Command-V		| 详细模式
Command-S		| 单用户模式
Command-Option-P-R	| 重置 [NVRAM](https://support.apple.com/zh-cn/HT204063)
T						| 启动目标磁盘模式

## Finder

Finder 的主要问题

* 不能复制当前地址
* 不能新建文件
* 不能剪切

* [xtrafinder](http://www.trankynam.com/xtrafinder/)
	* XtraFinder add Tabs and features to Mac Finder.
* [FinderPath](http://bahoom.com/finderpath/)
	* 地址栏

## Install Xcode
```
xcode-select --install
```

### 资源下载
* [mac-torrent-download](http://mac-torrent-download.net/)
* http://www.macbed.com/
* http://superuser.com/a/264943/242730

## Tips
* 好看的屏保 https://github.com/JohnCoates/Aerial
	* `brew cask install aerial`
* [iousbhiddriver](https://github.com/thefloweringash/iousbhiddriver-descriptor-override)
	* 支持 Noppoo Choc 的驱动

```bash
# 查看可用的分辨率
system_profiler SPDisplaysDataType |grep Resolution
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
```

* [OS X 技巧](http://apple.stackexchange.com/questions/400/please-share-your-hidden-os-x-features-or-tips-and-tricks)

打开取色器

```applescript
on run {input, parameters}
	choose color
	return input
end run
```

__文件目录结构__
```
/Library
	/Screen Savers # 屏保程序
```

### pmset


```bash
# 查看当前配置
pmset -g
# Active Profiles:
# Battery Power  		1
# AC Power       		-1*
# Currently in use:
#  standbydelay         10800								写入休眠镜像到磁盘之前和停止给内存供电的延迟,秒
#  standby              1										是否让电源管理器自动休眠系统.
#  womp                 1										是否启用网络唤醒
#  halfdim              1										display sleep will use an intermediate half-brightness state between full brightness and fully off
#  hibernatefile        /var/vm/sleepimage	休眠时转储的文件
#  powernap             1										是否启用 Power Nap
#  gpuswitch            2
#  networkoversleep     0
#  disksleep            0										磁盘睡眠定时器
#  sleep                1										系统睡眠定时器,分钟,0 禁用
#  autopoweroffdelay    14400								进入自动停止电源模式的延迟,秒
#  hibernatemode        3										休眠模式,分钟,0 禁用
#  autopoweroff         1										是否自动停止电源
#  ttyskeepawake        1										当任何 tty 处于'激活'的时候都使系统不会进入睡眠.当 tty 的空闲时间超过系统睡眠时间后便不再处于 '激活' 状态.
#  displaysleep         10									显示器睡眠定时器,分钟,0 禁用
#  acwake               0										wake the machine when power source (AC/battery) is changed
#  lidwake              1										wake the machine when the laptop lid (or clamshell) is opened
#  autorestart 是否在断电后自动重启
#  ring - wake on modem ring
#  lessbright - slightly turn down display brightness when switching to this power source
#  sms - use Sudden Motion Sensor to park disk heads on sudden changes in G force
#  networkoversleep - this setting affects how OS X networking presents shared network services during system sleep. This setting is not used by all platforms; changing its value is unsupported.
#  destroyfvkeyonstandby - Destroy File Vault Key when going to standby mode. By default File vault keys are retained even when system goes to standby. If the keys are destroyed, user will be prompted to enter the password while coming out of standby mode.(value: 1 - Destroy, 0 - Retain)
```

```bash
# 避免待机
caffeinate
# 或
pmset noidel

# 其他参数
#  boot 重启系统
#  force 强制 PM(Power Management) 立即激活设置.不讲设置写到磁盘,可以使设置能够很容易被重写.当在特殊场景下 PM 未运行时很有帮助.
#  touch PM 从新从磁盘读取现有配置
#  noidle 避免空闲时进入睡眠模式,该命令已被废弃,使用 caffeinate 替代
#  sleepnow 立即使系统进入睡眠
#  restoredefaults 恢复节能程序到默认值
#  displaysleepnow 使显示器立即进入睡眠
#  resetdisplayambientparams 重置指定显示器的环境光参数

# 修改时指定范围
#		-b 电池
#		-c 链接了电源, UPS ( -u )
#		-u UPS
#		-a 所有

```

* 休眠模式
	* 0 不会讲内存持久化到存储.在断电时内存数据会丢失.
	* 3 会将内存拷贝到存储,当睡眠时也会给内存供电,系统会尝试从内存启动,如果断电会强制从磁盘恢复.
		* 默认为该选项
	* 25 会将内存拷贝到存储,并且停止给内存供电,启动时会从磁盘恢复内存.
		* 省电,电池寿命更久
		* 但睡眠和唤醒更慢
* 如果系统支持 standby, 则在超过 standbydely 后就会写一个休眠镜像
* 如果要完全禁止休眠,可将 hibernatemode, standby 和 autopoweroff 设置为 0

## FAQ

### BasicIPv6ValidationError

```bash
# 先禁用掉对应网卡的 IPv6
# networksetup -setv6off Wi-Fi
networksetup -setv6off Ethernet
# 然后通过命令行修改配置
networksetup -setmanual Ethernet 192.168.31.2 255.255.255.0 192.168.1.1
# 设置完成后也可以将 IPv6 设置为自动
```


### NTFS 不能写
OS X 因为版权原因不支持 NTFS 的写操作,需要安装第三方软件才能进行写操作.

* Tuxera NTFS

### 使用 USB 以太网
需要安装 [HoRNDIS](https://github.com/jwise/HoRNDIS) 来支持

### 制作安装盘
当下载好安装器后可直接使用安装器里附带的程序制作安装包

```bash
# 替换 MyVolume 为实际的挂载盘
# macOS Sierra
sudo /Applications/Install\ macOS\ Sierra.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume --applicationpath /Applications/Install\ macOS\ Sierra.app
# El Capitan:
sudo /Applications/Install\ OS\ X\ El\ Capitan.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume --applicationpath /Applications/Install\ OS\ X\ El\ Capitan.app
# Yosemite:
sudo /Applications/Install\ OS\ X\ Yosemite.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume --applicationpath /Applications/Install\ OS\ X\ Yosemite.app
# Mavericks:
sudo /Applications/Install\ OS\ X\ Mavericks.app/Contents/Resources/createinstallmedia --volume /Volumes/MyVolume --applicationpath /Applications/Install\ OS\ X\ Mavericks.app
```

* [Create a bootable installer for OS X](https://support.apple.com/en-us/HT201372)
* [Disk Maker X](http://diskmakerx.com/)
* 操作系统下载
	* App Store [macOS Sierra](https://search.itunes.apple.com/WebObjects/MZContentLink.woa/wa/link?mt=11&path=mac%2fmacossierra)

#### 在 x86 上安装
* [UniBeast: Install macOS Sierra on Any Supported Intel-based PC](https://www.tonymacx86.com/threads/unibeast-install-macos-sierra-on-any-supported-intel-based-pc.200564/)
* [unibeast 7](https://www.tonymacx86.com/resources/unibeast-7-1-1.333/)
	* 支持 macOS Sierra

#### Installer can't verified 安装器不能被验证
使用旧的安装应用, 2016.2.14 之前,可能会由于证书过期导致无法使用,通过修改系统时间来规避
```bash
# 在安装前进入终端执行
date 0101010116
```

#### 更新未能被验证
可参考[该文章](http://matrix.sspai.com/p/dd9c2d80).

解决办法,前往 [苹果组合更新下载页面](https://support.apple.com/downloads/combo), 下载需要的版本, 手动进行安装更新.

#### 常见问题诊断
* 重置 NVRAM
* 重置 [SMC](https://support.apple.com/zh-cn/HT201295)
* 磁盘检测 fsck -fy
  * [fsck](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man8/fsck.8.html)
  * [fsck_hfs](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man8/fsck_hfs.8.html)
  * http://www.thegeekstuff.com/2012/08/fsck-command-examples
* 安全启动
* 无法挂载磁盘
  * http://apple.stackexchange.com/a/59166/103557
  * 可以尝试 [asr](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man8/asr.8.html)
  * https://en.wikipedia.org/wiki/Apple_Software_Restore
* http://apple.stackexchange.com/questions/57597/how-to-fix-broken-efi-partition
* http://www.insanelymac.com/forum/topic/312038-how-to-fix-a-bad-or-broken-efi-partition-to-be-working-with-uefi-booters/

```bash
# Ubuntu
apt-get install hfsprogs
fdisk -l
# 检测磁盘是否有问题
fsck.hfsplus /dev/sda2
# 考虑将其挂载上然后把需要的数据拷贝出来
mount -t hfsplus -o force,rw /dev/sdb2 /media/mntpoint
```
