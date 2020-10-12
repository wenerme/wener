---
title: Guava 简介
slug: guava-intro
date: 2015-10-02
---

Overviews - Five Ws
---------
问题 | 答案
---------|----
是什么 | 一套开源的 Java 公共组件
谁开发的 | 主要由 Google 工程师开发维护
哪里用 | 所有使用 Java 的地方
什么时候出现的 | 2008年九月 第一个Google Collection版本出现在 [maven 仓库](http://mvnrepository.com/artifact/com.google.collections/google-collections);<br/>2010年四月第一个Guava版本出现在[maven 仓库](http://mvnrepository.com/artifact/com.google.guava/guava)
什么使用 | 为什么不使用 ?

<!--more-->

Features
----------
> __TIPS__ 可参考[GuavaExplained]的左边栏.

* 集合初始化工具和辅助工具
* 有限的函数式编程支持
* 提供常用的特殊集合类型
* 排序组件
* 事件总线
* 缓存
* 并发辅助组件
* 字符串工具
* 原子类型工具
* IO 辅助
* 哈希组件
* 反射组件
* 数学组件
* ....

Who use Guava
------------------
* 在 Maven 中央仓库大约有 [4500](http://mvnrepository.com/artifact/com.google.guava/guava) 个项目依赖 Guava
* [FriendsOfGuava](https://code.google.com/p/guava-libraries/wiki/FriendsOfGuava) 列举了一些 Guava 友好的项目
* 常见的使用 Guava 的项目
	* GSON
	* Guice
	* Hadoop,HBase,Spark 等 Hadoop 生态圈项目
	* Cassandra
	* ....

vs common-lang
--------------------
* Maven 中央仓库大约有 [3500](http://mvnrepository.com/artifact/commons-lang/commons-lang) 个项目依赖 commons-lang
* Maven 中央仓库大约有 [2000](http://mvnrepository.com/artifact/org.apache.commons/commons-lang3) 个项目依赖 [commons-lang3](http://commons.apache.org/proper/commons-lang/)
* Maven 中央仓库大约有 [4500](http://mvnrepository.com/artifact/com.google.guava/guava) 个项目依赖 Guava

-|版本|生产日期|大小|
----|----|----|----
Guava | 18.0 | 2014.8 | 2.2 MB
commons-lang3 | v3.4 | 2015.4 | 425 KB
commons-lang | v2.6 | 2015.4 | 278 KB

> __TIPS__
> Guava 并没有将各个模块分离开来,而是作为一个大的 jar 包,官方推荐的是,使用 ProGuard 来剔除自己不使用的内容
> commons-lang 只是 Apache Commons 下的一小部分,其他的还有 commons-io 等

Guava 与 Commons-Lang 并不是相互对立的关系,而是可以相互并存的,其交集可能在集合工具组件较多,而其他方面都是各有所长,因为并非二选一的问题.


Reference
------------
* [Guava@Github](https://github.com/google/guava)
* [GuavaExplained]
* [gs-collections](https://github.com/goldmansachs/gs-collections) A supplement or replacement for the Java Collections Framework.


 [GuavaExplained]:https://code.google.com/p/guava-libraries/wiki/GuavaExplained
