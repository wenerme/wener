<!-- title: 四个函数和bb编辑器 -->
<!-- tag: BBK -->
<!-- date: 2011-04-24 01:34:00 -->
<!-- state: published -->

![Lib图片选择](http://upload.eebbk.net/UploadFile/2011-4/201142322592923264.gif)
![菜单式选择](http://upload.eebbk.net/UploadFile/2011-4/2011424048880623.jpg)
![图片调整函数](http://upload.eebbk.net/UploadFile/2011-4/20114232352943219.gif)

原帖**[链接](http://club.eebbk.com/bbkbbs/showtopic/257169/1)**

<!-- more -->

```
'//=========ShowPic_Alpha==========//
'//=========带Alpha显示图片==========//
'作者 Wener
'论坛Id a3160586 (club.eebbk.com   编程区)
'QQ 514403150

说明:
showpic_alpha( srcPage, srcPic, alPic, DisX, DisY, Wid, Hgt, srcX, srcY, showMODE)
相比showpic函数，只多了一个alPic参数 其他都是一样的
这个是alpha的通道图 由于bb的显示颜色数目有限，不会在电脑上看起来一样平滑的

'//=========LibSel==========//
'//=========Lib图片选择函数==========//
'作者 Wener
'论坛Id a3160586 (club.eebbk.com   编程区)
'QQ 514403150

说明：这个函数就是选择Lib中的某一张图片，然后返回图片句柄
这个函数具有比较好的UI，用起来感觉还是比较好的
这个函数要依赖于getLibCount ， getInput 这两个函数
LibSel( Lib_Name$)
这个函数只需要LIB文件名这个参数



'//=========Selector==========//
'//=========菜单式选择==========//
'作者 Wener
'论坛Id a3160586 (club.eebbk.com   编程区)
'QQ 514403150

说明：这个函数就像手机的菜单那种样，就是选择的
Selector_Str$这个为一个数组，调用前请为其赋值字符串
Selector_StrCount 是总的选项个数
调用 Selector( MustChoiceOne)
MustChoiceOne参数是是否必须选择一个 1 为是 也就是是说不能退出
MustChoiceOne为0的时候  退出返回1 确认返回选项在Selector_Str中的位置
也就是Selector_Str$( i)
具体请看 eg.Selector.bas

'//=========PageAdjust==========//
'//=========页面调整函数==========//
'作者 Wener
'论坛Id a3160586 (club.eebbk.com   编程区)
'QQ 514403150

说明：这个函数就像photoshop的一些功能样
平衡颜色，调整rbg通道，调整明暗，使页面黑白化
可镜像，旋转180°图像等，更多请在使用的时候发现吧
这个函数生成的bin文件较大，300多k，因为有留了大部分空白


额外说明：
除了PageAdjust外，其他三个函数都需要SYS_Fe$ 这个全局变量
这个感觉这个是应该都要有的一个变量，所以就都放在了全局
IF GetEnv!() = Env_SIM Then
	SYS_Fe$ = ".rlb"
Else
	SYS_Fe$ = ".lib"
End IF
也就是判断中载入什么格式的
```