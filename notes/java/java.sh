# 注解处理器
lombok.core.AnnotationProcessor
# QueryDSL
com.mysema.query.apt.jpa.JPAAnnotationProcessor

# java 启动时的调试参数
-Xdebug -Xnoagent -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=12345

# 关于 permSize 的解释 http://java.sun.com/docs/hotspot/gc1.4.2/faq.html
The permanent generation is used to hold reflective data of the VM itself such as class objects and method objects. These reflective objects are allocated directly into the permanent generation, and it is sized independently from the other generations.

# 关于 java8 对 permSize 的警告
http://stackoverflow.com/questions/18339707
PermGen space was removed. Memory management has changed a bit.

ReservedCodeCacheSize (and InitialCodeCacheSize) is an option for the (just-in-time) compiler of the Java Hotspot VM. Basically it sets the maximum size for the compilers code cache.

# gc 的调优
http://www.oracle.com/technetwork/java/javase/gc-tuning-6-140523.html
# Java HotSpot VM Options
http://www.oracle.com/technetwork/java/javase/tech/vmoptions-jsp-140102.html
# 查看 vm 工作的工具
https://visualvm.java.net/
# 参考
http://stackoverflow.com/questions/1058991/how-to-monitor-java-memory-usage




