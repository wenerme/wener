动态生成SQL/面向对象查询
-----------------------
http://stackoverflow.com/questions/825141/

* jOOQ: http://www.jooq.org
	对使用开源数据库是免费的, Apachev2 协议.
	CUBRID 8.4
	Derby 10.10
	Firebird 2.5
	H2 1.3
	HSQLDB 2.2
	MariaDB 5.2
	MySQL 5.5
	PostgreSQL 9.0
	SQLite
* QueryDSL: http://www.querydsl.com
	Apachev2
	支持 JPA,SQL,Mongodb,JDO,Lucene,集合,Spatial
* JaQu: http://www.h2database.com/html/jaqu.html
* iciql: http://iciql.com/ (a friendly fork of JaQu)
* Quaere: http://quaere.codehaus.org
* Jequel: http://www.jequel.de (in maintenance mode, I think)
* Squiggle: http://code.google.com/p/squiggle-sql (in maintenance mode, I think)

[JDBI](http://jdbi.org/) 虽然不是动态生成SQL,但是辅助JDBC进行操作的,也非常方便.

选择JAX-RS jsr339
---------------
http://programmers.stackexchange.com/questions/155467/

考虑轻量型的解决方案 Dropwizard 

系列技术栈

* Jetty (HTTP)
* Jersey (JAX-RS)
* Jackson (JSON or XML)
* Guava (excellent additions to JDK libraries)
* Metrics (real time application monitoring)
* Hibernate Validator (input verification)
* OAuth (RESTful authentication)

对于 JAX-RS [restlet](http://www.restlet.org) 是非常不错的选择, CXF相对重量级一点.

restlet
: 核心包+JAX-RS大约1M左右 不考虑依赖
: 可以和guice集成
: [JAX-RS示例](http://restlet.com/learn/guide/2.2/extensions/jaxrs)
: 没有在中央仓库

CXF
: 核心包+JAX-RS大约1.7M 不考虑依赖
: 打包后大概2.9M,不包含Jetty
: 目前只能使用 Spring

Jersey
: 核心包+服务端包大概1.6M 不考虑依赖

Dropwizard
: 核心包加依赖,打包后大约 9.5M, 包含了所有的功能
: Apache License v2
: 只需要引入一个坐标,就立即可以进行开发,使用非常方便,搭建好了一系列的框架,使用的都是目前比较好的实现和比较新的版本.避免了很多配置上的麻烦
: 也可以配合 Guice 使用 https://github.com/HubSpot/dropwizard-guice
: JSON 注解 http://wiki.fasterxml.com/JacksonAnnotations
: Bean Validation注解: http://docs.jboss.org/hibernate/validator/5.1/reference/en-US/html_single/#section-builtin-constraints


WebSocket
--------
* 简单的测试WebSocket http://www.websocket.org/echo.html
* js的websocket客户端 https://github.com/gimite/web-socket-js
* 简单的 java WebSocket 实现 https://github.com/TooTallNate/Java-WebSocket
	* __可运行在安卓端__
* 其实 [](http://async-io.org/) 是一个非常不错的框架, 只是似乎不能部署服务端在安卓上






-----

中文 jsr-356 WebSocket
https://jsr-chinese.readthedocs.org/en/latest/jsr-356/index.html