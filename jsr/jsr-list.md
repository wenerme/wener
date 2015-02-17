JSR 列表: http://en.wikipedia.org/wiki/Java_Specification_Request
所有 Final 的jsr http://www.jcp.org/en/jsr/stage?listBy=final
JDK Enhancement Proposals JEP: http://openjdk.java.net/jeps/0

Bean Validation
: 303  1.0
: 349  1.1


JAX-RS
: 303 2.0
: 311 1.0,1.1

JPA
: 其他实现 Hibernate, EclipseLink, openJPA
: 317 2.0

NIO
: Grizzly, Netty
: 51
: 203 NIO2

JMS
: 914 1.0,1.1
: 343 2.0

JTA
: 907 1.0,1.1

CDI
: Weld | Open WebBeans
: 299

JSF
: 314 2.0
: 252 1.2

JSTL
: 52 1.0,1.1

JSP
: 53 1.2
: 152 2.0
: 245 2.1

Java EE
: 316 6
: 58 1.3
: 151 1.4
: 244 5

Java SE
: 59 1.4
: 176 5.0(Tiger)
: 270 6(Mustang)

Java ME
: 68 1.0

javax.el
: 341 3.0
: 245 2.2	JSP 2.2 的一部分


* 2.2的单独实现:
	* javadoc http://docs.oracle.com/javaee/6/api/javax/el/package-summary.html
	* http://juel.sourceforge.net/
	* http://mvnrepository.com/artifact/de.odysseus.juel
* 3.0参考实现: 
	* javadoc http://docs.oracle.com/javaee/7/api/javax/el/package-summary.html
	* https://java.net/projects/el-spec/downloads
	* http://mvnrepository.com/artifact/org.glassfish/javax.el/
* tomcat 8 实现了el 3.0
	* http://mvnrepository.com/artifact/org.apache.tomcat/tomcat-jasper-el/8.0.12


EJB
: 19 2.0
: 153 2.1
: 220 3.0

JDBC
: 54 3.0
: 221 4.0

JCR Content Repository
: 283 2.0


JSR|描述|平台
----|----|----
133 | 内存模型和线程规范修订
166 | 并发工具 | J2SE 5.0
201 |扩展的枚举,自动封装,Loop增强和静态导入| J2SE 5.0
223 | 脚本编程| Java SE 6
241 | Groovy编程语言
260 | Javadoc升级
269 | 扩展的注解处理API
277 | 模块系统
296 | Swing程序框架 | SE7
308 | 在Java类型上的注解 | SE8
336 | Java平台,标准版
901 | Java语言规范 | 参考实现 OpenJDK 7
292 | Supporting Dynamically Typed Languages on the JavaTM Platform, `dynamicinvoke`

__servlet__

版本历史 http://en.wikipedia.org/wiki/JSR_154#History

版本|发布|JSR|平台|重大改变
:----:|:-----:|:-----:|:-----:|:-----:
3.1|2013.5|340|JavaEE 7|非阻塞IO,HTTP协议升级机制,参考[3.1新特性][whats-new-in-servlet]
3.0|2009.10|315|JavaEE6,JavaSE6|扩展能力,简单开发,异步Servlet,安全,文件上传
2.5|2005.9|154|JavaEE5,JavaSE5|需要JavaSE 5,支持注解
2.4|2003.11|154|J2EE1.4,J2SE1.3| `web.xml`开始使用 XML Schema
2.3 JSP 1.2| 2001.8| 53 | J2EE1.3 J2SE1.2 | 添加了Filter
2.2|1999.8|-|J2EE1.2 J2SE1.2|成为 J2EE的一部分,引入了独立的Web应用,`.war`文件
2.1|1998.11
2.0|-| -|JDK 1.1 | 成为 Java Servlet Development Kit 2.0 的部分
1.0|1997.7

 [whats-new-in-servlet]:https://blogs.oracle.com/arungupta/entry/what_s_new_in_servlet