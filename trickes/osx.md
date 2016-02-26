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
