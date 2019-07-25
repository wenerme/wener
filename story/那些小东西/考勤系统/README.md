---
id: student-checking-sys
title: 学生考勤系统
date: 2013-12-27T04:24:19
tags:
- .NET
- C#
- 编程
---

学生考勤系统
===========

别人作业啥的~~,不过还是学到了[一些技巧](#一些技巧)

尚且还有一些问题没解决的

* 作为阴影的窗口,不能设置 `ShowInTaskBar = false`,
设置后会消失,这个相对比较麻烦,没处理
* 画阴影的函数还不是很完善,只能是类似的阴影

截图
----

![登录页面](https://raw.github.com/wenerme/blog/master/%E9%82%A3%E4%BA%9B%E5%B0%8F%E4%B8%9C%E8%A5%BF/%E8%80%83%E5%8B%A4%E7%B3%BB%E7%BB%9F/screenshot.png "登录页面")

![查询,操作页面](https://raw.github.com/wenerme/blog/master/%E9%82%A3%E4%BA%9B%E5%B0%8F%E4%B8%9C%E8%A5%BF/%E8%80%83%E5%8B%A4%E7%B3%BB%E7%BB%9F/screenshot-main.png "查询,操作页面")

一些技巧
============

让窗口可拖动
----------

是重写的WndProc,而不是传统的鼠标事件

```C#

// Let Windows drag this form for us
protected override void WndProc(ref Message m)
{
	if (m.Msg == 0x0084 /*WM_NCHITTEST*/)
	{
		m.Result = (IntPtr)2;	// HTCLIENT
		return;
	}
	base.WndProc(ref m);
}

```

传统版本

```C#
// In form load

var lastPoint = new Point();
var _isDraging = false;
MouseDown += (sender, e) =>
{
	_isDraging = true;
	lastPoint = e.Location;
};
MouseMove += (sender, e) =>
{
	if (! _isDraging)
		return;

	int ox = e.X - lastPoint.X;
	int oy = e.Y - lastPoint.Y;
	Location = new Point(Location.X + ox, Location.Y + oy);
};
MouseUp += (sender, e) => { _isDraging = false; };

```

实现类似的窗体阴影
----------------

是使用的一个类 `Dropshadow`.

最开始从[这里](http://stackoverflow.com/questions/8793445/windows-7-style-dropshadow-in-borderless-form)
看到能实现阴影的方法,后来有查找了很多东西,修改成了
我自己的 `Dropshadow` 版本.调用方法

```C#
var f = new Dropshadow(this)
{
	BorderRadius = 40,
	ShadowColor = Color.Blue
};

f.RefreshShadow();
```

在 DataGridView 中使用 DateTimePicker
-------------------------------------

这个忘记了具体是在哪里找的了,使用 `CalendarColumn` 
和 `CalendarCell` 即可.在设计时可以直接选择.

圆角边框
----------

```C#
[DllImport("Gdi32.dll", EntryPoint = "CreateRoundRectRgn")]
public static extern IntPtr CreateRoundRectRgn
	(
	int nLeftRect, // x-coordinate of upper-left corner
	int nTopRect, // y-coordinate of upper-left corner
	int nRightRect, // x-coordinate of lower-right corner
	int nBottomRect, // y-coordinate of lower-right corner
	int nWidthEllipse, // height of ellipse
	int nHeightEllipse // width of ellipse
	);

// in form load
Region = Region.FromHrgn(Win32.CreateRoundRectRgn(0, 0, Width, Height, 20, 20));
	
```
