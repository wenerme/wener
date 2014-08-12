
> 建议阅读前先参阅 [关于翻译](#ch-about-translation), 以便对本文有更好的理解.

1 简介 {#ch1}
======
该规范定义了一系列用于开发基于Representational State Transfer\[[1]](REST)服务的接口.在阅读前假设读者已经对REST有所了解;关于REST架构风格和RESTful网页服务,可参见:

* Architectural Styles and the Design of Network-based Software Architectures[[1]]
* REST维基 [[2]]
* 维基百科上的REST页面[[3]]

1.1 规范目前状态 {#ch1-1}
--------------------
这是2.0版本的最终发布版,如果有何问题可以在这里查找或提出:
> http://java.net/jira/browse/JAX_RS_SPEC

相关的在线Javadoc可以在这里找到:
> http://jax-rs-spec.java.net/

团队期待关于该规范任何回馈:
> [users@jax-rs-spec.java.net](mailto:users@jax-rs-spec.java.net)

1.2 目标 {#ch1-2}
------------------
基于POJO
: 接口会提供一系列的注解和相关的类/接口来将POJO暴露为Web资源.该标准会定义对象的生命周期和作用域.

以HTTP为中心
: 该标准会假设以HTTP[[4]]作为内部的网络协议,并且会提供一个在HTTP,URI[[5]],相关接口和注解之间的映射.接口会提供常用的HTTP使用模式并且会以非常灵活的方式来支持各种HTTP应用,包括WebDAV[[6]]和Atom Publishing Protocol[[7]].

格式无关
: API可以用在各种HTTP的实体内容上.会标准的形式来提供必要的扩展性实现添加额外的类型支持.

容器无关
: 使用API实现的应用可以被部署在各种Web相关的容器中.标准中会定义如何发布在Servlet[[8]]容器和JAX-WS[[9]] Provider中.

包含在Java EE中
: 该标准会定义托管在JavaEE容器中Web资源量的环境,并且会指明如何在Web资源类中使用JavaEE的特性.

1.3 非相关目标 {#ch1-3}
--------------
支持J2SE6.0以前的版本
: 接口中会使用到注解,会需要J2SE6.0或以后的版本.

描述,注册和发现服务
: 该标准不需要任何关于描述,注册和发现服务的能力.

HTTP栈
: 该标准不会定义新的HTTP栈.HTTP协议的支持是由应用所部署的容器提供的.

数据 模型/格式 类
: API不会定义用于支持或管理实体内容的类,但会提供扩展接口,用于允许使用这样的类.

1.4 约定 {#ch1-4}
--------
文中会以'必须','必须不','需要','必须','不得','应该','不应该','建议','可能'和'可循'的关键词来表达强烈程度.然间RFC 2119[[10]].

Java代码会以以下的方式展现
```java
package com.example.hello;

public class Hello {
	public static void main(String args[]) {
		System.out.println("Hello World");
	}
}
```

会以'http://example.org/...'和'http://example.com/...'的形式来表示上下文无关的URI.

文中的所有会以标准字体显示.非标准字体会作为一些注解和特殊的格式,例如
>__提示__: 这是一个提示

1.5 术语 {#ch1-5}
--------
资源类/Resource class
: 使用JAX-RS注解用来实现相关Web资源的Java类,参见[第三章](#ch3).

根资源类/Root resource class
: 有`@Path`注解的_资源类_.根资源类提供了资源树的根和子资源,参见[第三章](#ch3).

请求方法标识符/Request method designator
: 以`@HttpMethod`标识的运行时注解.用于表示由_资源方法_处理的HTTP请求方法.

资源方法/Resource method
: 被_请求资源标识符_标识的_资源类_的方法,用于处理相关的请求,参见[第三章第三节](#ch3-3).

子资源定位符/Sub-resource locator
: 用于定位子资源的_资源类_方法,参见[3.4.1章节](#ch3-4-1).

子资源方法/Sub-resource method
: 在资源类上用于处理相关请求的子资源的方法,参见[3.4.1章节](#ch3-4-1).

提供器/Provider
: 一个JAX-RS扩展接口的实现,提供了在第[四章]中描述的JAX-RS运行时扩展.

过滤器/Filter
: 一个用过过滤请求和响应的_提供器_

实体拦截器/Entity Interceptor
: 用于对消息体读写调用进行拦截的_提供器_.

调用/Invocation
: 通过进行配置来发起HTTP请求的客户端API.

WebTarget
: _调用_的接收者,以URI标识.

链接/Link
: 附加了元数据(例如:媒体类型,相关关系,标题等)的URI.

1.6 专家组成员 {#ch1-6}
-----------------------
This specification is being developed as part of JSR 339 under the Java Community Process. It is the result of the collaborative work of the members of the JSR 339 Expert Group. The following are the present expert group members:

- Jan Algermissen (Individual Member)
- Florent Benoit (OW2)
- Sergey Beryozkin (Talend)
- Adam Bien (Individual Member)
- Bill Burke (Red Hat Middleware LLC)
- Clinton Combs (Individual Member)
- Bill De Hora (Individual Member)
- Markus Karg (Individual Member)
- Sastri Malladi (Ebay)
- Wendy Raschke (IBM)
- Julian Reschke (Individual Member)
- Guilherme Silveira (Individual Member)
- Dionysios Synodinos (Individual Member)

The following are former group members of the JSR 339 Expert Group:

- Tony Ng (Ebay)

JAX-RS 1.X has been developed as part of JSR 311 under the Java Community Process. The following were group members of the JSR 311 Expert Group:

- Heiko Braun (Red Hat Middleware LLC)
- Larry Cable (BEA Systems)
- Roy Fielding (Day Software, Inc.)
- Harpreet Geekee (Nortel)
- Nickolas Grabovas (Individual Member)
- Mark Hansen (Individual Member)
- John Harby (Individual Member)
- Hao He (Individual Member)
- Ryan Heaton (Individual Member)
- David Hensley (Individual Member)
- Stephan Koops (Individual Member)
- Changshin Lee (NCsoft Corporation)
- Francois Leygues (Alcatel-Lucent)
- Jerome Louvel (Individual Member)
- Hamid Ben Malek (Fujitsu Limited)
- Ryan J. McDonough (Individual Member)
- Felix Meschberger (Day Software, Inc.)
- David Orchard (BEA Systems)
- Dhanji R. Prasanna (Individual Member)
- Julian Reschke (Individual Member)
- Jan Schulz-Hofen (Individual Member)
- Joel Smith (IBM)
- Stefan Tilkov (innoQ Deutschland GmbH)

1.7 感谢 {#ch1-7}
----------------

During the course of this JSR we received many excellent suggestions. Special thanks to Martin Matula, Gerard Davison, Jakub Podlesak and Pavel Bucek from Oracle as well as Pete Muir and Emmanuel Bernard from Red Hat. Also to Gunnar Morling and Ron Sigal (Red Hat) for their suggestions on how to improve resource validation, and to Mattias Arthursson for his insights on hypermedia.
During the course of the JSR 311 we received many excellent suggestions on the JSR and Jersey (RI) mailing lists, thanks in particular to James Manger (Telstra) and Reto Bachmann-Gm¨ur (Trialox) for their contributions. The following individuals (all Sun Microsystems at the time) have also made invaluable technical contributions: Roberto Chinnici, Dianne Jiao (TCK), Ron Monzillo, Rajiv Mordani, Eduardo Pelegri-Llopart, Jakub Podlesak (RI) and Bill Shannon.
The `GenericEntity` class was inspired by the Google Guice `TypeLiteral` class. Our thanks to Bob Lee and Google for donating this class to JAX-RS.

2 应用程序 {#ch2}
==============

一个JAX-RS的应用程序由一个或多个资源组成(参见[第三章](#ch3))和零个或多个提供器(参见[第四章](#ch4))。这一章讲解了使用JAX-RS作为整个应用的各方面，子章节讲了JAX-RS各方面的需求和实现。

2.1 配置 {#ch2-1}
========
JAX-RS应用中使用到的资源和提供器是通过实现一个`Application`的子类实现的。一个实现__可能__提供了其他的机制来定位资源类和提供器(例如:运行时类扫描)但是用`Application`是唯一移植性强的配置方法.

2.2 验证 {#ch2-2}
--------
特定的应用程序需求是贯穿整个标准和JAX-RS的Javadoc.实现__可能__使用了超过在这里说明的步骤.

JAX-RS实现__可能__会在检测到有二义性资源路径时报错,使用的是在[3.7.2章节](#ch3-7-2)中描述的算法.比如说,一个资源中的两个方法有相同的(或交叉的)的注解值,那么这可能会在该算法中是不符合要求的.具体的验证步骤和错误报告机制是实现相关的.

2.3 发布 {#ch2-3}
---------
一个程序以什么方式发布主要依赖于该程序是如何在JavaSE环境中运行的或是在一个容器中如何运行的.这一节描述了一些可选的发布方式

### 2.3.1 Java SE {#ch2-3-1}

在JavaSE环境中,一个配置好的终端类实例可以通过`RuntimeDelegate`的`createEndpoint`方法来取得.该应用提供了一个终端需要的`Application`实例.实现__可能__支持零个和多个终端类型.

至于如何将终端实例化和如何发布应用已经超出本规范的讨论范围.

#### 2.3.1.1 JAX-WS {#ch2-3-1-1}
支持以JAX-WS发布的实现__必须__支持以`javax.xml.ws.Provider`的`createEndpoint`方法.JAX-WS描述了一个基于`Provider`的终端如何能够在SE环境中发布.

### 2.3.2 Servlet {#ch2-3-2}
JAX-RS应用可以以Web应用的方式打包为一个`.war`文件.应用类打包在`WEB-INF/classes`或`WEB-INF/lib`中,必要的库打包在`WEB-INF/lib`下.具体的Web应用打包细节可参阅Servlet标准.

__建议__实现支持对Servlet3框架的扩展机制以增强容器间的可移植性并且可使其利用容器支持的类扫描功能.当使用该扩展机制时__必须__遵循以下条件:

* 如果_没有_`Application`的子类,JAX-RS实现__要求__动态添加一个servlet,并且将名字设置为
	`javax.ws.rs.core.Application`
	且自动发现所有的根资源类和提供器,这些类和提供器__必须__被打包在应用中.除此以外,应用__必须__打包有指定了servlet映射的`web.xml`.一个`web.xml`的示例文件如下:
	```xml
	<web-app version="3.0" xmlns="http://java.sun.com/xml/ns/javaee"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
		http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd">
		<servlet>
			<servlet-name>javax.ws.rs.core.Application</servlet-name>
		</servlet>
		<servlet-mapping>
			<servlet-name>javax.ws.rs.core.Application</servlet-name>
			<url-pattern>/myresources/*</url-pattern>
		</servlet-mapping>
	</web-app>
	```

* 如果有`Application`的子类
	- 如果已经有一个servlet处理了该应用.且这个servlet的初始参数名字为
		`javax.ws.rs.Application`
		即`Application`子类的全限定名,那么JAX-RS的实现不需要额外的配置.
	- 如果_没有_servlet处理该应用,那么JAX-RS的实现__要求__动态的添加一个名为`Application`子类全限定名的servlet.如果`Application`子类有`@ApplicationPath`注解,那么__要求__实现以该注解的值加上`/*`作为servlet的映射.否则应用__必须__打包一个制定了sevlet映射的`web.xml`.比如说,如果`org.example.MyApplication`是`Application`的子类.那么一个示例的`web.xml`应该像这样:
	
	``` xml
	<web-app version="3.0" xmlns="http://java.sun.com/xml/ns/javaee"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
		http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd">
		<servlet>
			<servlet-name>org.example.MyApplication</servlet-name>
		</servlet>
		<servlet-mapping>
			<servlet-name>org.example.MyApplication</servlet-name>
			<url-pattern>/myresources/*</url-pattern>
		</servlet-mapping>
	</web-app>
	```
	当包中有`Application`子类时,如果`Application.getClasses`和`Application.getSingletons`同时返回空集合,那么所有包中的根资源类和提供器__必须__被包含,且JAX-RS实现__要求__能通过扫描`.war`文件来自的发现他们.如果`getClasses`或`getSingletons`返回非空集合,那么只有返回的这些类和单例__必须__被包含在发布的JAX-RS应用中.
	
下表总结了Servlet3框架的扩展机制:

Condition | Action | Servlet Name | web.xml
-|:-:|:-:|:-:
无`Application`子类 | 添加 servlet | `javax.ws.rs.core.Application`|需要给servlet添加映射
`Application`子类由已经存在的servlet处理 | (无) | (已定义) | 不需要
`Application`子类_没有_被存在的servlet处理 | 添加 servlet | 子类名 | 如果`@ApplicationPath`注解,那么需要添加映射

如果没有使用Servlet3的扩展机制(例如:在Servlet3.0之前版本的容器中),在`web.xml`中`servlet-class`或`filter-class`元素__应该__分别添加JAX-RS实现提供的servlet或filter类.`Application`子类__应该__通过`init-param`的`param-name`以`javax.ws.rs.Application`表明.

需要注意的是,以上关于Servlet3扩展机制的描述是基于servlet而不是filter的.在Servlet3.0之前的配置中,更建议使用实现提供的filter类.

### 2.3.3 其它容器 {#ch2-3-3}

实现__可能__提供了其它机制来使JAX-RS应用可以部署在其他类型的容器中,这些机制不在该规范讨论范围之内.	

3 资源 {#ch3}
==============
在使用JAX-RS时,一个Web资源由一个资源类实现,请求由资源方法来处理,这章详细说明了资源类和资源方法.

3.1 资源类 {#ch3-1}
----------
资源类是使用JAX-RS注解实现相关Web资源的Java类.资源类是至少有一个`@Path`注解用于处理请求的方法的POJO.

### 3.1.1 生命周期和环境 {#ch3-1-1}
在默认情况下,每一个对资源的请求都会创建一个对应的资源类.首先会调用构造函数(参见[3.1.2](#ch3-1-2)),然后进行依赖注入(参见[3.2](#ch3-2)),接下来会调用相应的方法(参见[3.3](#ch3-3)),最后该对象即可被垃圾收集器回收.

一个实现__可能__提供其他的资源类生命周期,这些特定机制不在本规范的讨论之中.例如:实现可能基于一个IoC框架,该实现即可支持所有由该框架提供的所有生命周期类型.

### 3.1.2 构造函数 {#ch3-1-2}
根资源类在JAX-RS运行时进行实例化并且__必须__有一个公共的构造函数,该构造函数可以有JAX-RS可提供的参数类型.在这样的规则中,无参也是允许的.

一个公共的构造函数__可能__包含了有以下注解的参数:`@Context`,`@HeaderParam`,`@CookieParam`,`@MatrixParam`,`@QueryParam`或`@PathParam`.当然,更具具体的资源类生命周期和并发,每个请求的信息可能不同,对于构造函数可能没有意义.如果有多个公共的构造函数都适合,那么实现__必须__选择最多参数的那个.如果参数相同,那么选择的构造函数是实现相关的,此时__应该__警告这样的二义性.

非根资源类有应用进行实例化,没有以上关于公共构造函数的限制.

## 3.2 字段和属性 {#ch3-2}

当一个资源类实例化时,有以下注解的字段和属性会设置为相应的值:

__@MatrixParam__ 获取URI中的矩阵参数值

__@QueryParam__ 获取URI中的查询参数值

__@PathParam__ 获取URI模板参数值

__@CookieParam__ 获取Cookie值

__@HeaderParam__ 获取Header值

__@Context__ 注入支持的资源实例,具体细节请参见[第九章](#ch9)和[第十章](#ch10).

因为注入是发生在对象创建时,因此只支持在默认每个请求资源类的字段和属性上使用这些注解(`@Context`除外).在其他生命周期资源类的字段和属性上使用这些注解时,实现__应该__发出警告.

对于JAX-RS实现,在运行时创建的类要求设置有这些注解字段和属性的值.由子资源定位符(参见[3.4.1节](#ch3-4-1))返回的对象由它们的创建者进行初始化.

对于以上注解,具体有效的参数类型已在Javadoc中列举,通常情况下(排除`@Context`),以下的类型是支持的:

1. 通过`ParamConverterProvider`注册了相应类型`ParamConverter`的类型.关于这些类的详细信息请参见javadoc.
2. 原始类型(Primitive types).
3. 类型有一个接受单个`Strng`作为参数的构造函数.
4. 类型有`valueOf`或`fromString`静态方法,且该方法接受以单个`String`作为参数.如果两个方法都有,且类型是枚举那么__必须__使用`fromString`[^why-enum-use-fromstring],否则__必须__使用`valueOf`.
5. List<T>, Set<T>, 或 SortedSet<T>, 其中类型T满足以上的第三和第四条.

  [^why-enum-use-fromstring]: 因为`valueOf`是所有枚举类型的内建方法,有一定限制.当需要写入枚举类型时常会定义一个`fromString`方法.因此,当有`fromString`方法时,会更倾向于使用`fromString`.

在以上有些情况中,可使用`DefaultValue`注解来提供一个默认值,具体使用方法和缺少请求数据时生成值的规则请参考Javadoc中的`DefaultValue`.在字段和属性上可使用`Encoded`注解来禁用自动对URI中`@MatrixParam`,`@QueryParam`和 `@PathParam`的解码.

在参照以上第三或第四条且使用[3.3.4节](#ch3-3-4)描述的方法构造一个字段或属性值时,可能会抛出`WebApplicationException`.其他在参照以上第三或第四条构造字段或属性值时抛出的异常被认为是客户端错误:如果字段或属性值有`@MatrixParam`,`@QueryParam`或`@PathParam`注解,那么实现__必须__实例化一个`NotFoundException`(404状态码)来包装抛出的异常且没有实体;如果字段或属性值有`@HeaderParam`或`@CookieParam`注解,那么实现__必须__实例化一个`BadRequestException`(400状态码)来包装抛出的异常且没有实体.异常__必须__以[3.3.4节](#ch3-3-4)描述的过程处理.

3.3 资源方法 {#ch3-3}
------------
资源方法即资源类的方法中有请求方法标识符的方法.用于处理请求并且__必须__确保符合该节描述的规范.

请求方法标识符是一个运行时的注解,且该注解有`@HttpMethod`注解.JAX-RS针对常见的HTTP请求方法定义了一系列的请求方法标识符: `@GET`,`@POST`,`@PUT`,`@DELETE`,`@HEAD`和`@OPTIONS`.用户可能会定义他们自己的请求方法标识符作为对通用HTTP方法的替换.

### 3.3.1 可见性 {#ch3-3-1}
只有`public`方法才可以作为资源方法.如果用户在非`public`方法上使用了方法标识符或`@Path`注解,实现__应该__对此发出警告.

### 3.3.2 参数 {#ch3-3-2}
当资源方法被调用时,参数上有`@FormParam`或其他在[3.2节](#ch3-2)列举的注解会根据具体注解将请求信息映射到相应的参数上.类似于字段和属性的映射:

	* 可用`DefaultValue`注解来给参数提供默认值.
	* 可用`Encoded`注解避免参数值自动进行URI解码.
	* 在构造参数值时抛出的异常和在构造字段或属性值时抛出的异常一样处理,具体请参考[3.2节](#ch3-2).在构造`@FormParam`注解时抛出的异常会以构造`@HeaderParam`注解时抛出的异常一样处理.

### 3.3.2.1 实体参数 {#ch3-3-2-1}
如果一个参数没有`@FormParam`注解或其他在[3.2节](#ch3-2)列举的注解时,这样的参数即为实体参数,其值会从请求实体映射.请求实体和Java类型之间的转换是有实体提供器(Entity Provider)负责的,参见[4.2节](#ch4-2).资源方法__必须__最多只能有一个实体参数.
	
### 3.3.3 返回类型 {#ch3-3-3}
资源方法__可能__返回`void`,`Response`,`GenericEntity`或其他的Java类型,这些返回类型通过以下的方式映射为一个响应:

void
: 返回一个空实体,204状态码.

Response
: 返回`Response`中的实体内容,使用`Response`中指定的状态码.如果为`null`值则返回204状态码.如果`Response`的状态码没有设置,且`Response`中的实体为非空,则返回200状态码,否则返回204状态码.

GenericEntity
: `GenericEntity`的`Entity`属性会映射为返回的实体内容.如果返回的非`null`,则使用200状态码,否则使用204状态码.

其他
: 返回的实例会映射为结果实体内容;如果这个类是匿名类,则使用其父类.如果返回非`null`则使用200状态码,否则使用204状态码.

如果想要返回一个有附加信息的相应时,应该返回一个`Response`实例,`ResponseBuilder`使用创建模式提供了便捷的方式来构造一个`Response`实例.

请求实体和Java类型之间的转换是由实体提供器负责的,参见[4.2节](#ch4-2).在将返回的其他类型映射为响应的时候,会使用`MessageBodyWriter`的`isWritable`方法来类型是否可以转换,会使用资源方法返回的类型和返回的实体的原始类型(Raw Type)或泛型类型进行判断.判断返回值的原始类型和泛型类型方法如下表:

返回类型 | 返回实例[^note-returned-instance] | 原始类型 | 泛型类型
|:-:|:-:|:-:|:-:|
`GenericEntity` | `GenericEntity`或子类 | `RawType` 属性 | `Type` 属性
`Response` | `GenericEntity`或子类 | `RawType` 属性 | `Type` 属性
`Response` | `Object`或子类 | 实例类型 | 实例类型
其他 | 返回类型或子类 | 实例类型 | 泛型类型或返回类型

  [^note-returned-instance]: 如果返回的类型是`Response`或其子类型,则返回实例是`Entity`属性值.

### 3.3.4 异常 {#ch3-3-4}
资源方法,子资源方法或子资源定位符都可能抛出任何检查的或未检查的异常.实现__必须__捕获所有的这些异常,以以下的过程来处理:

1. 如果异常为`WebApplicationException`或其子类,则__必须__按照以下方法映射为一个响应.如果异常的`response`属性没有包含一个实体并且有对`WebApplicationException`或相应的子类有异常映射提供器(参见[4.4节](#ch4-4)),则实现__必须__使用该提供器来创建一个`Response`实例,否则直接使用`response`属性.`Response`实例的处理方式参照[3.3.3节](#ch3-3-3)
2. 如果对该异常或其父类有相应的异常映射提供器(参见[4.4节](#ch4-4)),那么实现__必须__使用与异常的泛型类型最接近的父类异常提供器来创建一个`Response`实例,`Response`实例的处理方式参照[3.3.3节](#ch3-3-3).如果异常映射提供器在创建`Response`时抛出异常,则将返回服务错误(500状态码)给客户端.
3. 未被映射的未检查的异常和错误__必须__从新抛出以允许传递到底层的容器.
4. 未被映射的检查异常和可抛出类型不能直接抛出__必须__被包装在容器指定的异常类中,然后再次抛出以便于传递到底层的容器.基于Servlet的实现__必须__使用`ServletException`作为包装.基于JAX-WS`Provider`的实现__必须__以`WebServiceException`作为包装

> 提示:以上的第三条和第四条如果需要可允许使用存在的容器工具(例如:Servlet的filter或错误页面)来处理错误.

### 3.3.5 HEAD和OPTIONS请求方法 {#ch3-3-5}
`HEAD`和`OPTIONS`请求接受额外的自动支持.对于`HEAD`请求,实现__必须__遵循:

1. 调用有`HEAD`请求方法标识符的方法,如果有.
2. 调用有`GET`请求方法标识符的方法抛弃返回实体.

注意第二个选择可能会导致一定的性能损失,因为创建实体对象是比较耗费资源的.

对于`OPTIONS`请求,实现__必须__遵循:

1. 调用有`OPTIONS`请求方法标识符的方法,如果有.
2. 使用JAX-RS注解匹配的类和方法提供的元数据生成自动响应.

3.4 URI模板 {#ch3-4}
-----------
根资源类使用`@Path`注解将其固定在一个URI空间.该注解的值是相对的URI模板,其实际URI是由部署上下文和应用路径组成(参见`@ApplicationPath`注解).

URI模板是含有零个或多个参数的字符串,是值符合所有的参数时,即为一个合法的URI[[5]]路径.`@Path`的Javadoc描述了具体的语法.例如:
```java
@Path("widgets/{id}")
public class Widget {
	...
}
```
在上列中,如果`Widget`资源类使用相对URI路径标识为`widgets/xxx`,`xxx`即为`id`参数的值.

> __注意__: 因为'{'和'}'即不再保留的也不再未保留的URI[[5]]中,他们不会出现在一个合法的URI中.

该注解的值会自动被编码.例如以下两行是相同的:
```java
@Path("widget list/{id}")
@Path("widget%20list/{id}")
```
模板参数可使用正则表达式来匹配他们的值.模板的值匹配会匹配所有的文本知道路径段结束,其他的值可以用来修改这样的行为.例如:
```java
@Path("widgets/{path:.+}")
public class Widget {
	...
}
```
在上列中,所有以`widgets`开头的路径都会被`Widget`资源类匹配;`path`参数的值为请求路径中`widgets`后面的值.例如:请求路径为`widgets/small/a`,则`path`的值万恶`small/a`.
URI路径模板中的值可以通过`@PathParam`注入到一个字段,属性或方法参数中.需要注意的是,如果是一个方法上URI模板,那么无法在字段或属性上注入(会被设置为`null`).如下所示:
```
@Path("widgets")
public class WidgetsResource {
	@PathParam("id") String id;

	@GET
	public WidgetList getWidgets() {
		... // id is null here
	}

	@GET
	@Path("{id}")
	public Widget findWidget() {
		return new WidgetResource(id);
	}
}
```
### 3.4.1 子资源 {#ch3-4-1}
当资源类的方法上有`@Path`注解是,这样的方法即是子资源方也也是自资源定位符.子资源方法直接处理一个HTTP请求,而子资源定位符返回一个能够处理HTTP请求的对象.是否有请求方法标识符(例如:`@GET`)的不同之处如下:

存在请求方法标识符
: 这样的方法叫做子资源方法,和一般的资源方法类似(参见[3.3节](@ch3-3)),不同的是这样的方法只处理URI匹配所有资源类的URI模板连接[^how-cancat-url-tpl]起来的URI模板的请求.

  [^how-cancat-url-tpl]: 如果资源类的URI模板没有以`/`结束,那么在连接的时候会自动添加.

不存在请求方法标识符
: 这样的方法为_子资源定位符_,用于动态使用一个对象来处理请求.任何返回的对象都作为一个资源类实例,用于处理一个请求或解析出一个能够处理请求的对象,具体细节参考[3.7节](#ch3-7).实现__必须__动态的判断返回的对象类型,而不是依赖于静态的子资源定位符返回的类型,因为返回的实例可能是定义类型的子类可能有不同的注解,具体的注解继承规则参考[3.6节](ch3-6).子资源除了__必须不能__有实体参数外,可以有和普通的资源方法相同的参数(参见[3.3节](#ch3-3)).如下所示:
```
@Path("widgets")
public class WidgetsResource {
	@GET
	@Path("offers")
	public WidgetList getDiscounted() {...}

	@Path("{id}")
	public WidgetResource findWidget(@PathParam("id") String id) {
		return new WidgetResource(id);
	}
}

public class WidgetResource {
	public WidgetResource(String id) {...}

	@GET
	public Widget getDetails() {...}
}
```
上面代码中,对`widgets/offers`的`GET`请求会直接被`getDiscounted`处理,`WidgetsResource`的子资源方法`getDetails`会处理对`widgets/xxx`的`GET`请求.

> __注意__: 如果多个子资源方法有相同的URL模板,那么在功能上是和一个子资源定位符返回的资源类实例有着相同的资源方法是一样的.

3.5 定义媒体类型 {#ch3-5}
--------------
应用可以通过使用`@Consumes`和`@Produces`注解来定义支持指定的请求和相应的媒体类型.这些注解__可能__被使用在资源方法,资源类或是他提供器上(参考[4-2-3节](#ch4-2-3)).在资源方法上使用这些注解会重写其他资源类或实体提供器指定的参数.如果没有这些注解,则假设支持所有的媒体类型("*/*").具体使用如下所示:
```
@Path("widgets")
@Produces("application/widgets+xml")
public class WidgetsResource {

	@GET
	public Widgets getAsXML() {...}

	@GET
	@Produces("text/html")
	public String getAsHtml() {...}

	@POST
	@Consumes("application/widgets+xml")
	public void addWidget(Widget widget) {...}
}

@Provider
@Produces("application/widgets+xml")
public class WidgetsProvider implements MessageBodyWriter<Widgets> {...}

@Provider
@Consumes("application/widgets+xml")
public class WidgetProvider implements MessageBodyReader<Widget> {...}
```
在上述代码中:

* 当一个`GET`请求指定的媒体类型为`application/widgets+xml`时,会调用`getAsXML`资源方法.返回的`Widgets`实例会被映射为通过`WidgetsProvider`格式化的内容(关于`MessageBodyWriter`的详细信息请参考[4-2节](#ch4-2)).
* 当一个`GET`请求指定的媒体类型为`text/html`时,会调用`getAsHtml`资源方法.返回的包含了`text/html`的`String`类型会使用默认的实现`MessageBodyWriter<String>`写出.
* 当一个`POST`请求指包含媒体类型为`application/widgets+xml`的实体时,会调用`addWidget`资源方法.请求实体会通过`WidgetProvider`映射为`widget`参数(关于`MessageBodyReader`的详细信息请参考[4-2节](#ch4-2)).

实现__必须不能__调用`@Produces`参数不匹配请求`Accept`头的方法.实现__必须不能__调用`@Consumes`参数不匹配请求`Content-Type`头的方法.
是接受多个媒体类型时,客户端通过一个相对因子(q参数)来指定偏爱的类型.q参数的值用于排序可接受的类型.例如,客户端可能将`application/widgets+xml`的q值标为1,将`application/xml`值标为0.8.q值的范围从0(未描述)到1(渴望),如果省略则默认为1.如果一个`GET`请求的可接受头为`text/html; q=1, application/widgets+xml;
q=0.8`,当映射到`WidgetsResource`类时,根据q值将会调用`getAsHtml`而不是`getAsXML`.

服务器也可以使用qs参数来标记偏爱的媒体类型;只有在客户端有多个可接受媒体类型且有相同的q值当才会检查服务端的偏爱媒体类型.如下列:
```
@Path("widgets2")
public class WidgetsResource2 {

	@GET
	@Produces("application/xml", "application/json")
	public Widgets getWidget() {...}

}
```
假设服务端发起一个`GET`请求,请求的接受头为`application/*; q=0.5, text/html`.基于该请求,服务器会认为`application/xml`和`application/json`的偏爱值相同,即q值为0.5.通过在`@Produces`注解中指定服务端的相对质量因子,可以控制选择哪个相应类型:
```
@Path("widgets2")
public class WidgetsResource2 {

	@GET
	@Produces("application/xml; qs=1", "application/json; qs=0.75")
	public Widgets getWidget() {...}

}
```
示例中更新后的`@Produces`参数值,在响应接受头为`application/*; q=0.5`的`@GET`请求时,JAX-RS实现__要求__选择更高qs值的`application/xml`媒体类型.需要注意的是qs值和q值类似,都是相对的值只与其他的在相同`@Produces`注解中qs值做比较.其他信息请参考[3.8节](#ch3-8).

3.6 继承注解 {#ch3-6}
-----------
JAX-RS注解可能在父类方法,方法参数或是实现的接口上使用.这样的注解必须被子类或实现类方法正确的继承,这样的方法上不能有自己的JAX-RS注解.在父类上的注解优先于实现接口指定的注解.注意,继承类或接口是Java不支持的.

如果一个子类或实现方法有任何JAX-RS注解,那么_所有_父类或接口方法上的注解都会被忽略.例如:
```
public interface ReadOnlyAtomFeed {
	@GET @Produces("application/atom+xml")
	Feed getFeed();
}

@Path("feed")
public class ActivityLog implements ReadOnlyAtomFeed {
	public Feed getFeed() {...}
}
```
上列中,`ActivityLog.getFeed`从接口继承了`@GET`和`@Produces`注解.相反:
```
@Path("feed")
public class ActivityLog implements ReadOnlyAtomFeed {
	@Produces("application/atom+xml")
	public Feed getFeed() {...}
}
```
这列中,`ReadOnlyAtomFeed.getFeed`的`@GET`没有被`ActivityLog.getFeed`继承,因为该方法重定义了`@Produces`注解.

便于和其他JavaEE的标准一致,建议总是重复注解而不是依赖于注解继承.

3.7 匹配请求到资源方法 {#ch3-7}
-------------------
这届会讲述如何将一个请求匹配到一个资源类和方法.实现不要求使用这里的算法,但是__必须__生成和这里算法相同的结果.

### 3.7.1 请求预处理 {#ch3-7-1}
在匹配之前,请求的URI需要使用以下的规则进行规范化[^note-on-uri-normalize],对于大小写,路径段(path segment)和对百分号的编码参照RFC3986[[5]]第6.22节进行规范化.规范化请求URI__必须__反应在从注入的`UriInfo`获取的URI中.

  [^note-on-uri-normalize]: __注意__: 有些容器可能在传递请求给实现之前已经进行了这些操作.

匹配请求到资源要经过以下三步:
<!-- __•__  -->

1. 标识一组候选的根资源类来匹配请求.
	__Input__ _U_ = 请求的URI路径, _C_ = { 根资源类 }
	__Output__ _U_ = 最终捕获的尚未匹配的组, _C'_ = { 目前匹配的根资源类 }
	1. 集合 _E_ = {}
	2. 对于每个 _C_ 中的类 _Z_ ,按照以下方式添加一个正则表达式(使用[3.7.3](#ch3-7-3)描述的方法方法$R(A)$计算)到 _E_:
        - 添加 $R(T_Z)$,其中$T_Z$是类_Z_指定的URI模板
	    - 注意,在 _C_ 中的类可能添加多个相同的正则到 _E_ 中,如果他们的注解有相同的URI路径模板(模变量名).
	3. 在 _E_ 过滤所有不再 _U_ 中的成员,如下:
		- 移除不匹配 _U_ 的所有成员
		- 
  
### 3.7.2 请求匹配 {#ch3-7-2}

### 3.7.3 转换URI模板为正则表达式 {#ch3-7-3}

3.8 判断响应的请求类型 {#ch3-8}
----------------------------


4 提供器 {#ch4}
==============

4.1 生命周期和运行环境 {#ch4-1}
----------------------------

### 4.1.1 自动发现 {#ch4-1-1}

### 4.1.2 构造函数 {#ch4-1-2}

4.2 实体提供器 {#ch4-2}
----------------------------

### 4.2.1 MessageBodyReader {#ch4-2-1}
### 4.2.2 MessageBodyWriter {#ch4-2-2}
### 4.2.3 定义媒体类型 {#ch4-2-3}
### 4.2.4 标准实体提供器 {#ch4-2-4}
### 4.2.5 传输编码 {#ch4-2-5}
### 4.2.6 内容编码 {#ch4-2-6}


4.3 上下文提供器 {#ch4-3}
----------------------------

### 4.3.1 定义媒体类型 {#ch4-3-1}

4.4 异常映射提供器 {#ch4-4}
----------------------------

4.5 异常 {#ch4-5}
----------------------------
### 4.5.1 服务运行时 {#ch4-5-1}
### 4.5.2 客户端运行时 {#ch4-5-2}

5 客户端接口 {#ch5}
==============

5.1 启动客户端实例 {#ch5-1}
----------------------------
5.2 访问资源 {#ch5-2}
----------------------------
5.3 客户端目标 {#ch5-3}
----------------------------
5.4 实体类型 {#ch5-4}
----------------------------
5.5 调用 {#ch5-5}
----------------------------
5.6 可配置的类型 {#ch5-6}
----------------------------
### 5.6.1 过滤器和实体拦截器 {#ch5-6-1}

6 过滤器和拦截器 {#ch6}
===============

6.1 简介 {#ch6-1}
------------------------
6.2 过滤器 {#ch6-2}
------------------------
6.3 实体拦截器 {#ch6-3}
------------------------
6.4 生命周期 {#ch6-4}
------------------------
6.5 绑定 {#ch6-5}
------------------------
### 6.5.1 全局绑定 {#ch6-5-1}
### 6.5.2 命名绑定 {#ch6-5-2}
### 6.5.3 动态绑定 {#ch6-5-3}
### 6.5.4 客户端API绑定 {#ch6-5-4}
6.6 优先级 {#ch6-6}
------------------------
6.7 异常 {#ch6-7}
------------------------
### 6.7.1 服务运行时 {#ch6-7-1}
### 6.7.2 客户端运行时 {#ch6-7-2}

7 校验 {#ch7}
======

7.1 约束注解 {#ch7-1}
----------------
7.2 注解和校验器 {#ch7-2}
----------------
7.3 实体校验 {#ch7-3}
----------------
7.4 默认校验模式 {#ch7-4}
----------------
7.5 注解继承 {#ch7-5}
----------------
7.6 校验和错误汇报 {#ch7-6}
----------------


8 异步处理 {#ch8}
==========

8.1 简介 {#ch8-1}
----------------

8.2 服务端API {#ch8-2}
----------------
### 8.2.1 超时和回调 {#ch8-2-1}

8.3 EJB资源类 {#ch8-3}
----------------

8.4 客户端API {#ch8-4}
----------------

9 上下文 {#ch9}
=======
9.1 并发性 {#ch9-1}
------------------
9.2 上下文类型 {#ch9-2}
------------------
### 9.2.1 应用程序 {#ch9-2-1}
### 9.2.2 URI和URI模板 {#ch9-2-2}
### 9.2.3 头信息 {#ch9-2-3}
### 9.2.4 内容协商和先行条件 {#ch9-2-4}
### 9.2.5 安全上下文 {#ch9-2-5}
### 9.2.6 提供器 {#ch9-2-6}
### 9.2.7 资源上下文 {#ch9-2-7}
### 9.2.8 配置 {#ch9-2-8}

10 环境 {#ch10}
=======

10.1 Servlet容器 {#ch10-1}
------------------------

10.2 集成JavaEE技术 {#ch10-2}
------------------------
###  10.2.1 Servlet {#ch10-2-1}
###  10.2.2 Managed Beans {#ch10-2-2}
###  10.2.3 上下文和依赖注入(CDI) {#ch10-2-3}
###  10.2.4 EJB {#ch10-2-4}
###  10.2.5 Bean Validation {#ch10-2-5}
###  10.2.6 Java API for JSON Processing {#ch10-2-6}
###  10.2.7 其他要求 {#ch10-2-7}

10.3 其他 {#ch10-3}
------------------------

11 运行时代理 {#ch11}
=============

11.1 配置 {#ch11-1}
------------------

A 注解总结 {#ch-summary-of-annotations}
=========

B HTTP 头信息支持 {#ch-http-header-support}
===============

C 管道处理 {#ch-processing-popeline}
=========

D Change Log {#ch-change-log}
===========

文献目录 {#ch-bibliography}
========
* [[1]] R. Fielding. Architectural Styles and the Design of Network-based Software Architectures. Ph.d dissertation, University of California, Irvine, 2000. See http://roy.gbiv.com/pubs/dissertation/top.htm.
* [[2]] REST Wiki. Web site. See http://rest.blueoxen.net/cgi-bin/wiki.pl.
* [[3]] Representational State Transfer. Web site, Wikipedia. See http://en.wikipedia.org/wiki/Representational State Transfer.
* [[4]] R. Fielding, J. Gettys, J. C. Mogul, H. Frystyk, and T. Berners-Lee. RFC 2616: Hypertext Transfer Protocol – HTTP/1.1. RFC, IETF, January 1997. See http://www.ietf.org/rfc/rfc2616.txt.
* [[5]] T. Berners-Lee, R. Fielding, and L. Masinter. RFC 3986: Uniform Resource Identifier (URI): Generic Syntax. RFC, IETF, January 2005. See http://www.ietf.org/rfc/rfc3986.txt.
* [[6]] L. Dusseault. RFC 4918: HTTP Extensions for Web Distributed Authoring and Versioning (WebDAV). RFC, IETF, June 2007. See http://www.ietf.org/rfc/rfc4918.txt.
* [[7]] J.C. Gregorio and B. de hOra. The Atom Publishing Protocol. Internet Draft, IETF, March 2007. See http://bitworking.org/projects/atom/draft-ietf-atompub-protocol-14.html.
* [[8]] G. Murray. Java Servlet Specification Version 2.5. JSR, JCP, October 2006. See http://java.sun.com/products/servlet.
* [[9]] R. Chinnici, M. Hadley, and R. Mordani. Java API for XML Web Services. JSR, JCP, August 2005.See http://jcp.org/en/jsr/detail?id=224.
* [[10]] S. Bradner. RFC 2119: Keywords for use in RFCs to Indicate Requirement Levels. RFC, IETF,March 1997. See http://www.ietf.org/rfc/rfc2119.txt.
* [[11]] Gavin King. Context and Dependency Injection for the Java Platform. JSR, JCP, December 2009.See http://jcp.org/en/jsr/detail?id=299.
* [[12]] Rajiv Mordani. Common Annotations for the Java Platform. JSR, JCP, July 2005. See http://jcp.org/en/jsr/detail?id=250.
* [[13]] Emmanuel Bernard. Bean Validation 1.1. JSR, JCP, March 2013. See http://jcp.org/en/jsr/detail?id=349.
* [[14]] Anthony Lai. Concurrency Utilities for Java EE. JSR, JCP, March 2013. See http://jcp.org/en/jsr/detail?id=236.
* [[15]] Jitendra Kotamraju. Java API for JSON Processing. JSR, JCP, March 2013. See http://jcp.org/en/jsr/detail?id=353.
* [[16]] Bill Shannon. JavaBeans Activation Framework. JSR, JCP, May 2006. See http://jcp.org/en/jsr/detail?id=925.



关于翻译 {#ch-about-translation}
========

该中文版规范是严格参照`jsr339`官方规范进行翻译的,在翻译时尽量做到遵循原版.

如果有任何意见和建议请联系[wenermail@gmail.com](mailto:wenermail@gmail.com),或者在 [wenerme/wener](https://github.com/wenerme/wener/) 中发起一个 Issus.

关键词翻译对照表
----------------

英文|中文
:-|-
Endpoint | 终端
Provider | 提供器
Fully qualified name | 全限定名
Field | 字段
Bean property[^whts-is-property] | 属性

  [^whts-is-property]: Bean property 即Java bean 中的 `setter/getter` 对,而不是直接的字段.

其他关键词翻译可参见[术语章节](#ch1.5).

<!-- 查找中文章节格式:\[[^\]]+(章|节) -->
<!-- 在使用中文的章引用时,实际应用的链接转换为`ch章-节`的格式应用.在每个标题都是用`ch章-节`的格式作为锚点 -->


<!-- 引用链接 -->
 [1]:http://roy.gbiv.com/pubs/dissertation/top.htm
 [2]:http://rest.blueoxen.net/cgi-bin/wiki.pl
 [3]:http://en.wikipedia.org/wiki/Representational
 [4]:http://www.ietf.org/rfc/rfc2616.txt
 [5]:http://www.ietf.org/rfc/rfc3986.txt
 [6]:http://www.ietf.org/rfc/rfc4918.txt
 [7]:http://bitworking.org/projects/atom/draft-ietf-atompub-protocol-14.html
 [8]:http://java.sun.com/products/servlet
 [9]:http://jcp.org/en/jsr/detail?id=224
 [10]:http://www.ietf.org/rfc/rfc2119.txt
 [11]:http://jcp.org/en/jsr/detail?id=299
 [12]:http://jcp.org/en/jsr/detail?id=250
 [13]:http://jcp.org/en/jsr/detail?id=349
 [14]:http://jcp.org/en/jsr/detail?id=236
 [15]:http://jcp.org/en/jsr/detail?id=353
 [16]:http://jcp.org/en/jsr/detail?id=925
 
