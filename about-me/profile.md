目录
===
[toc]

> 一下内容以个人名誉保证 __绝对真实__
> 推荐阅读链接(可能需要翻墙): 
> https://stackedit.io/viewer#!url=https://raw.github.com/wenerme/wener/master/about-me/profile.md


简介
===

|姓名|性别|年龄|籍贯|从事编程时间|
|:-:|:-:|:-:|:-:|:-:|
|陈杨文|男|四川|22|5年|

[Contact Me](#contact-me)
[Where Am I](#where-am-I)

个人项目经验
===========
以下列举我做过的部分项目. 这些项目均由个人设计实现, 部分项目为外包项目.

cbhistroy 西贝历史评论
---------
开发环境
: Java 7
: 核心模块: `Guice`, `GSON`, `Guava`, `SLF4J-*`, `Logback`, `Ormlite`, `C3P0`, `jodd-*`
: 分析扩展模块: `Spring4`, `JPA(Hibernate4)`, `Spring-Data`, `QueryDsl`
: 辅助工具: lombok

开发工具
: Intellij, Maven, Git

项目地址
: https://github.com/wenerme/cbhistory, [Chrome 扩展][cbhistory-chrome-extension]


### 项目简介
因为 [cnbeta] 上的评论会进行定期的清除, 而这些评论个人觉得还比较有价值, 以为能从评论中判读当前 IT 行业热门趋势 和 对一个东西人们的评论都具有一定的代表性. 除此以外, 这些评论也很风趣.因此项目的功能如下:

* 核心模块: 收集 cnbeta 评论
* 服务模块: 提供评论查询, 集成到 cnbeta 网站中提供无缝整合
* 分析模块: 对数据按照各种条件进行分析, 趋势判断 等等

具体的[实现细节][cbhistory]

### 项目亮点

* 模块化程度强
	目前应用大大小小分为 9 个模块,有服务器模块,分析模块,额外的持久模块等.
* 使用了不同的技术栈
	* 扩展分析模块 大型的技术栈 `spring + hibernate`
	* 核心模块 小型的技术栈 `guice + ormlite`
* 主要使用了事件驱动作为核心发现过程的处理
* 高并发
	* 主要应对于同时发现大量的文章和更新大量的评论数据
	* 内部使用 `Guava` 的 异步 `EventBus` ,事件大多为并发处理
* 容错性高
	* 即便是断网或者数据库无效,只要恢复后都能继续运行,
	* 主要得益于事件驱动
* 配置性强
	* 配置可动态加载
	* 使用 `Props` 书写配置非常便捷
	* 可以配置 `Map`, `List` 或 自定义类型配置.
	* 可选的附加定制的配置
* 针对云平台进行了特殊的调整
	* 为了使  `Madvoc` 服务能成功的部署在 `ACE(阿里云擎)` 上
		* 对模块的可容错性有所增强. 并且修改了日志记录(ace 使用 log4j)
		* 由于 ace 不能操作文件
		因此扫描时不能使用 guava 和 madvoc 的包扫描,会导致异常, 
		引入了 `Reflection` 来处理,进行手动的扫描.
* 可以使用我开发的 [Chrome 插件][cbhistory-chrome-extension] 和 [cnbeta] 无缝整合, 提供过期的评论服务.
* 可分析性强, 数据操作能力强, 得益于 `QueryDSL`, 该扩展能力在 `analysis` 模块中.


tellets - Let's Tell
-------
开发环境
: `PHP 5.3`, `FeedWriter`,`Michelf-Markdown`

开发工具
: `PHPStorm`, `Git`

项目地址
: https://github.com/wenerme/tellets, [我的博客(基于 tellets)][my-blog]

### 项目简介
Tellets 为一个轻量级的博客呈现框架, 主要用来呈现博客文章, 其中博客的评论和博客的文章源均不由 tellets 提供. 对于博客评论 tellets 可以和 `DISCU` , `多说` 集成. 而文章源可以静态的放置在指定目录或者是放置在可访问的主机. 目前集成了 `Github` 的支持, 即只要将文章放在 Github 那么 tellets 便能实现更新和获取文章. tellets 可以非常简单的通过插件来提供其他特性的支持. tellets 使用模板系统来呈现页面, 模板非常简单便于编写. tellets 配置性非常强. 此外 tellets 的文章主要由 `Markdown` 书写, 并且能实现永久链接, 分类, 标签等常用的博客功能. tellets 不依赖于数据库, 因此安装非常简单, 只要放置好后进行一次初始化即可.

发现OK - 发现OK 图片收集插件
------
开发工具
: `WEBStrom`, `Google Closure`, `Make`

兼容性
:  已测试 `Chrome` v21 和 搜狗, 360, 猎豹 基于 `Chromium` 内核 v21 后的版本.

> 该项目为外包项目,不便于提供项目地址,
> 部分截图 http://git.oschina.net/wenerme/wener/tree/master/screenshot/faxianok

### 项目简介
在如今社交时代, 在网页中看到好看的有意思的图片难免会想要收藏. 类似于360 自带的图片收集功能. 该插件主要是和 发现OK 网集成采集图片.主要功能:

* 用户登录
* 拖动图片自动弹出图片收集框
* 当鼠标放在图片上的时候,显示收集按钮
* 可以全网页收集,筛选图片
* 给图标添加描述和标签

### 项目亮点
* 界面友好
* 易于操作
* 兼容性强
* 使用了 make 来自动生成发布版
    * 主要是编译压缩 js, less
    * 压缩图片
    * 根据条件编译将 js 编译为发布版


Java WEB 博客
------------
开发环境
: Java 7, Ormlite, H2
: 界面: Bootstrap, LESS, JS 等前端技术

开发工具
: Ecilpse

项目地址
: https://github.com/wenerme/java.blog

其他项目
----------

### GTerist 多人版俄罗斯方块
开发环境|开发工具
-|:-:
Java7|Eclipse

### GreedSnake 控制台版贪吃蛇
开发环境|开发工具
-|:-:
C|  Vim,Mingw

### asp.net 简单说说平台
开发环境|开发工具
-|-
C#, MongoDB|VS2010, Nuget, Mongodb

### 采集网页书籍为 PDF
#### v1.0 之前
开发环境|开发工具
-|-
C#, iTextSharp, CQuery|VS2010, Nuget,
#### v1.0 之后
开发环境|开发工具
-|-
Java7,iText,weblaf,Guava,Guice,Log4j2,jodd-\*,miglayout,jasypt|Intellij

个人技能
========
* 熟练 Java 编程
* 熟练使用大多主流的 Java 开发库
    * 谷歌流的 Guice, GSON, Guava, GWT
    * Apache 的 Commons-\*
    * joda-time, jodd-\*, 
    * ...
* 熟练使用 Spring 相关技术 Spring-Data, Spring-REST, Spring-MVC
* 熟练使用 JPA, Hibernate, MyBatits, Struts2 等开发框架
* 熟练使用 Maven, Git, Cygwin, Eclipse, Intellij IDEA 等开发工具


* 对大数据有一定的认识
    * 能完成 Hadoop, HBase, Hive 的集群配置搭建
    * 熟悉 MR 的简单使用和编写
* 有高并发和分布式编程的意识和编程基础
    - 除了有基础的认识外, 目前写过相关程序
        * 高并发主要基于 简单的`异步事件驱动`
        * <del>分布式则使用 vertx 的分布式事件驱动</del>
    - 熟练搭建 Apache+mod_jk+Tomcat 的集群环境


* 对大多主流的数据库都有所了解
    MongoDB, H2, SQLite, MySql, Oracle, Redis
* 熟练使用前端主流开发技术
    LESS/CSS, JS, HTML, JQuery, Bower, BootStrap, AngularJS ...
    * 你可以在这些地方看到
        * [cbhistory-chrome-extension], [java.blog], [asp.net.SaySay]
        * [tellets], [个人作品页](http://sites.wener.me/works/)
        * ...
* 能够熟练的在 linux 工作
    * 使用了多年的 CentOS, Mingw, Cygwin
    * 我的 [vimfiles], [dotfiles]
* 能熟练的使用 Git , 对 SVN 有所了解.


其他主流编程语言技能
-----------------------
* 熟练使用 C 语言,了解 C++
* 熟练使用 PHP
* 熟练使用 C#, 熟悉 .Net 开发环境
    * 你可以在这些地方看到
        * [BBKSharper](https://github.com/wenerme/BBKSharper)
        * [asp.net.SaySay]
        * [QQ导出消息解析器][1]
        * [对对碰 vb.net](http://download.csdn.net/detail/a3160586/4178509)
        * ...

* 对汇编有所了解
    * 早年写过很多[步步高平台上的汇编](),虽然和正派的汇编有所区别,但是原理都一样.
    * [我的编程历程](#我的编程历程)

个人评价
=======
到这里,似乎是在真正的谈论一个人了.我的[照片][my-image].

我的编程历程
-----------

主要概述我学习主流的编程语言的过程, 对于前端的开发技术没有例举.如果不喜欢 balabala, 可以[跳过](#曾获证书)

* 大概从我 初中 的时候就开始接触到这些东西, 记得那时候是偶然间买了一本 html 的书,一下子觉得很有意思,但是那些时候还没有条件,没有网络,没有手机, 甚至没有一个固定的住所..但为后来埋下了伏笔么 ?
* 或许每个人都有过一段痛苦的经历,虽然那使人成长.而我那段经历恰巧发生在了高三, 那时候沉浸于电脑中, 接触的第一门语言是 php, 傻傻的我按照书上的例子一个一个的写, 但终究还算有那么些效果.
* 高三下期的时候, 去逛步步高学习机的论坛, 那时候手上有一台 9588, 感觉是多么牛了, 而恰巧那上面可以用 BBASIC 编程, 但是bug 很多, 所以很多时候都用 BASM 来写, 运行环境则为 bb 虚拟机.虽然这门汇编语言非常的简单, 但是也让我明白了非常多的底层的东西. 恰巧这又为我后来做了铺垫么 ?
* 到了大学, 一个糊里糊涂的选择让我去了海南, 但是没有后悔过. 在大学里学的第一门语言是 C, 因为有过汇编经验, 所以理解起 C 来其实非常的容易, 开始对这门语言感兴趣, 也开始了解它的一些周边(GCC,LINUX ...)
* 接下来就是 VB.NET 的课了,让我去学这些东西的并不是老师, 而是自己的兴趣, 只是课程中有这些内容对我起了一定的引导作用, 在这期间尝试着写了一个 对对碰游戏, 自己感觉良好, 虽然性能不好, 但是依然有成就感.
* 然后就是 ASP.NET, 至此开始接触了 C#, 自己甚至用 C# 去做了一些外包.
* 大三时, 我决定以后要走java, 最后走上了去培训 java 的历程, 虽然在这之前我也用 java 写过一些东西, 写了一个小游戏 GTetris 等, 但是距离工作还是有一段距离. 然后就到了现在.至于中间还有诸多的小插曲就不一一详述了.


曾获证书
=======

* 中国第七届信航杯 `C语言组` 全国一等奖
* 第五届蓝桥杯 `C/C++` 全国二等奖
* 计算机二级 C语言
* 计算机三级 数据库
* 计算机四级 网络
* 计算机四级 数据库
* 软考 中级程序员
* 英语四级
* 普通话二甲

对证书和学历的看法
------------------

或许证书并不怎么重要,但至少能从某些方面说明一些问题.在考取这些证书的过程中,被迫接受和学习了很多东西,这是很有意义的部分.同时,这些证书也算是我 专科学历 的一个弥补.

因为是在专科学校, 所以在学校主要是依靠自己, 自己的知识主要通过自学, 遇到不懂的问题时, 主要都 google , wikipedia 或在 stackoverflow 上提问解决. 长期在这样的环境下解决问题,所以一般遇到问题都能想得到办法解决.

Contact me
=======

* 电子邮件：[wener.me@qq.com](mailto:wener.me@qq.com)

Where am I
=======

* [wenerme](https://github.com/wenerme/)@github
* [wener](http://stackoverflow.com/users/1870054/wener)@stackoverflow
* 爱抢猪食@Google+
* [个人博客: blog.wener.me](http://blog.wener.me)
    * 基于我自己写的 [tellets][tellets].文章源在[这里][wenerme-wener].
* [个人主页: wener.me](http://wener.me)
    * 没时间打点,主要还是保住这个域名 :-)


> 使用 [stackedit.io](https://stackedit.io/) 编辑并生成 PDF  
> 该文档[源文件](https://github.com/wenerme/blog/about-me/profile.md) https://github.com/wenerme/blog/about-me/profile.md

作品图片展示
============

![asp.net.SaySay][3]  ![asp.net.SaySay][4]

![GTrtris][5]![GTrtris][6]

QQ消息导出解析器
![QQ消息导出解析器][7]

一个小东西
![小东西][8]

一个用来练习的 java 博客
![java.blog][9]

个人简介ppt
![个人简介][10]

我的个人作品网页
![我的个人作品网页][11]

当初用bb 上的汇编写的一个拼图 游戏
![拼图][12]

也是当初写的一个小小的游戏
![囚徒][13]

C 语言写的控制台版的贪吃蛇游戏
![贪吃蛇][14]

vb.net 写的对对碰游戏
![对对碰][15]

部分图片资源保存在 [git.oschina](http://git.oschina.net/wenerme/wener)



  [my-image]: https://git.oschina.net/wenerme/wener/raw/master/personal/sale-myself.jpg
  [tellets]: https://github.com/wenerme/tellets
  [cbhistory]: https://github.com/wenerme/cbhistory
  [cbhistory-chrome-extension]: https://github.com/wenerme/cbhistory-extension
  [java.blog]: https://github.com/wenerme/java.blog
  [vimfiles]: https://github.com/wenerme/vimfiles
  [GTetris]: https://github.com/wenerme/GTetris
  [asp.net.SaySay]: https://github.com/wenerme/asp.net.SaySay
  [dotfiles]: https://github.com/wenerme/dotfiles
  [cnbeta]:http://cnbeta.com
  [wenerme-wener]:https://github.com/wenerme/wener
  [my-blog]:http://blog.wener.me


  [1]: https://github.com/wenerme/QQExportMessageParser
  [2]: https://github.com/wenerme/QQExportMessageParser
  [3]: https://camo.githubusercontent.com/c23a5c85fb6736f35b6894c5e8ff7f22a5a56420/68747470733a2f2f7261772e6769746875622e636f6d2f57656e65724c6f76652f6173702e6e65742e5361795361792f6d61737465722f73637265656e73686f745f696e6465782e706e67
  [4]: https://camo.githubusercontent.com/447dfa23d0e6766473b298d8d6ebb607219d47fe/68747470733a2f2f7261772e6769746875622e636f6d2f57656e65724c6f76652f6173702e6e65742e5361795361792f6d61737465722f73637265656e73686f745f6c6f67676564696e2e706e67
  [5]: https://camo.githubusercontent.com/8fd2b5f8f88c87aa9d9db5209258c21f4366d31f/68747470733a2f2f7261772e6769746875622e636f6d2f57656e65724c6f76652f475465747269732f6d61737465722f73637265656e73686f742d6d61696e2e706e67
  [6]: https://camo.githubusercontent.com/1650b2f8e803cb542a0783f5a48044e836b08094/68747470733a2f2f7261772e6769746875622e636f6d2f57656e65724c6f76652f475465747269732f6d61737465722f73637265656e73686f742e706e67
  [7]: https://camo.githubusercontent.com/918db563b44d253936a178385b4888c11caaeecd/68747470733a2f2f726177322e6769746875622e636f6d2f77656e65726d652f51514578706f72744d6573736167655061727365722f6d61737465722f73637265656e73686f742e706e67
  [8]: https://camo.githubusercontent.com/7759e8a8d5cd4abe28734722438e93ec4e6d2d33/68747470733a2f2f7261772e6769746875622e636f6d2f77656e65726d652f626c6f672f6d61737465722f2545392538322541332545342542412539422545352542302538462545342542382539432545382541352542462f2545382538302538332545352538422541342545372542332542422545372542422539462f73637265656e73686f742e706e67
  [9]: https://camo.githubusercontent.com/10b80a0bc4bb296d798bd29f948f6244a73fa074/68747470733a2f2f7261772e6769746875622e636f6d2f57656e65724c6f76652f6a6176612e626c6f672f6d61737465722f696e6465785f73637265656e73686f742e706e67
  [10]: http://git.oschina.net/wenerme/wener/raw/master/screenshot/%E6%A2%A6%E5%B9%BB%E8%A5%BF%E6%B8%B8%E7%89%88%E4%B8%AA%E4%BA%BA%E7%AE%80%E4%BB%8B-%E6%8C%87%E5%AF%BC.jpg
  [11]: http://git.oschina.net/wenerme/wener/raw/master/screenshot/%E6%88%91%E7%9A%84%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E7%BD%91%E7%AB%99.png
  [12]: http://git.oschina.net/wenerme/wener/raw/master/screenshot/%E8%B6%A3%E5%91%B3%E6%8B%BC%E5%9B%BE.gif
  [13]: http://git.oschina.net/wenerme/wener/raw/master/screenshot/%E5%9B%9A%E5%BE%92%E5%9B%B0%E5%A2%83.gif
  [14]: http://git.oschina.net/wenerme/wener/raw/master/screenshot/%E8%B4%AA%E5%90%83%E8%9B%87-%E6%8E%A7%E5%88%B6%E5%8F%B0%E7%89%88.png
  [15]: http://git.oschina.net/wenerme/wener/raw/master/screenshot/%E5%AF%B9%E5%AF%B9%E7%A2%B0%E6%B8%B8%E6%88%8F.jpg