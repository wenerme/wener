
## 在 Mac 上使用 Docker 中的 fdisk 对磁盘进行分区
```bash

```

## 移动磁盘格式选择
如果想要将移动磁盘与 PC 和 Mac 共用,最好选择 ExtFAT,支持大文件(>4G), 都能被识别和读写,在 Mac 上格式化的时候,需要选择使用主引导记录而不是 GUID, 否则 Windows 识别不了.

## 启动选项
启动键 |	描述
----|----
Command-R |	启动为恢复模式
Alt/Option |	访问启动管理器
C	| 从 CD, DVD, 或 USB 启动
N	| NetBoot
Shift	| 安全启动
Command-V	| 详细模式
Command-S	| 单用户模式
Command-Option-P-R	| 重置 PRAM
T	| 启动目标磁盘模式

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

## Tricks
```shell
# 查看可用的分辨率
$ system_profiler SPDisplaysDataType |grep Resolution
$ xrandr
# 统计 Chrome 用的内存
$ ps aux | grep -i chrome | awk '{sum += $4} END {print 4*1024 * (sum/100)}'
```

https://github.com/jwise/HoRNDIS

* [OS X 技巧](http://apple.stackexchange.com/questions/400/please-share-your-hidden-os-x-features-or-tips-and-tricks)

## FAQ

### Installer can't verified 安装器不能被验证
使用旧的安装应用, 2016.2.14 之前,可能会由于证书过期导致无法使用,通过修改系统时间来规避
```
date 0101010116
```
