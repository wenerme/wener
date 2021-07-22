---
title: BB急速截图
slug: bbk-quick-screenshot
tags:
  - 编程
  - 步步高
  - BBVM
date: 2011-03-22 1:56:00
---

![运行截图](https://github.com/wenerme/wener/raw/master/story/%E6%88%91%E9%82%A3%E4%BA%9B%E6%AD%A5%E6%AD%A5%E9%AB%98%E7%9A%84%E6%95%85%E4%BA%8B/BB%E6%80%A5%E9%80%9F%E6%88%AA%E5%9B%BE/%E6%88%AA%E5%9B%BE.gif)

原帖[链接](http://club.eebbk.com/bbkbbs/showtopic/255787/1)

<!-- more -->

```
'//=========截图类函数v1.0==========//
'作者 Wener
'论坛Id a3160586 (club.eebbk.com   编程区)
'QQ 514403150
'date: 1:56 AM 2011-3-22
特色：
截图函数极其的快  1.5s > 平均
可保存为lib和bmp
supper可由用户自由选择设置，带有较好的ui
源代码公开，可任意使用到你们自己的作品中

使用请保留原作者信息，谢谢 ^o^
；==========================================
函数说明：
截图类函数，故名思议。
共有三个函数
默认全屏截图
ScreenPrint_ALL( ScrP_p_page, ScrP_p_BMP_FileName$)
ScrP_p_page 截图页面
ScrP_p_BMP_FileName$ 保存为的bmp文件名。若保为lib则参数为 "" 空字符
矩形框截图
ScreenPrint_Rect( ScrP_p_PAGE, ScrP_p_x, ScrP_p_y, ScrP_p_Wid, ScrP_p_Hgt, ScrP_p_BMP_FileName$)
两个参数同上
ScrP_p_x, ScrP_p_y 截图起点
ScrP_p_Wid, ScrP_p_Hgt 截图宽高
用户自定义裁剪截图
ScreenPrint_Supper( ScrP_p_page)
ScrP_p_page 截图页面

；==========================================
详细说明：
此类函数都需要一个文件句柄，可在const中自定义
const ScreenPrint_Use_File_ID = ？？


ScreenPrint_ALL和ScreenPrint_Rect函数要求较低，代码也不是很多，因此若要求不高，则可以仅仅使用这两个函数就可以了

ScreenPrint_Supper要求较高，带ui，共需要4个页面句柄，ui界面是自动判别使用环境的，也就是说自动选择读取lib或者是rlb。
supper函数中包含了大量计算，难以避免的有点点卡，在淡出的时候有点卡。

压缩包中的 PT_res.lib 和 PT_res.rlb 都是测试时使用的 ，与Super_example.bas 有关

源代码中的变量命名有些有点混乱。
有 Scrp_（screenPrint）开头的,有screenPrint_开头的，有screenCapture开头的 三个函数.bas这个文件中已经修正
其实我那样命名也是为了在区别汇编和bb  bb中是scrp 汇编中是 screenPrint.  screenCapture只有两次

在使用的时候请将ScreenPrint.lib一起复制，这个文件只是个空文件，只是为了为lib的存储“占地盘”，存放索引。转换为lib的结果都在这个文件当中。
```
