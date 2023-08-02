---
title: arthas
---

# arthas

- [alibaba/arthas](https://github.com/alibaba/arthas)
- IDEA 插件
  - https://plugins.jetbrains.com/plugin/13581-arthas-idea
- OGNL 语法

```bash
curl -O https://arthas.aliyun.com/arthas-boot.jar

# web console http://127.0.0.1:8563
# --tunnel-server 'ws://127.0.0.1:7777/ws'
java -jar arthas-boot.jar -h # 帮助
java -jar arthas-boot.jar 1  # 交互式命令行 - Docker 里 pid 为 1

# Alpine
curl -O https://arthas.aliyun.com/arthas-boot.jar
touch /proc/1/cwd/.attach_pid1 && kill -SIGQUIT 1 && sleep 2 && ls /proc/1/root/tmp/.java_pid$1
java -jar arthas-boot.jar 1
```

```bash
sc -d com.wener.Application
vmtool --action getInstances --className java.lang.String --limit 10
```

- https://arthas.aliyun.com/doc/dashboard.html
- https://github.com/alibaba/arthas/issues/71
- https://github.com/younggungun/Arthas-Learning/issues/1

## 常用

```bash
# 观察 Spring HTTP 请求的响应时间
watch org.springframework.web.servlet.DispatcherServlet doService '{params[0].getRequestURI()+" "+ #cost}' -n 5 -x 3 '#cost>1'

# 观察 Spring 响应头信息
watch org.springframework.web.servlet.DispatcherServlet doService '{params[0].getRequestURI()+"  header="+params[1].getHeaders("trace-id")}' -n 10 -x 3 -f

# 观察 MyBatis SQL
watch org.apache.ibatis.mapping.BoundSql getSql '{params,returnObj,target.parameterObject,throwExp}' -n 5 -x 3

# JDBC
watch java.sql.Connection prepareStatement '{params,throwExp}' -n 5 -x 3 'clazz.getName().startsWith("com.mysql") and params.length==1' and #cost>1

watch java.sql.Connection prepareStatement '{params,throwExp}' -n 5 -x 3

tt -t org.springframework.data.redis.connection.jedis.JedisConnectionFactory getConnection
tt -t org.springframework.data.redis.cache.DefaultRedisCacheWriter get

# Controller 方法内不慢，但整体慢时，排查请求方法前的逻辑
# getMethodArgumentValues 慢说明注解校验问题
# doInvoke 慢说明是方法慢
trace org.springframework.web.method.support.InvocableHandlerMethod invokeForRequest
```

- https://github.com/WangJi92/arthas-idea-plugin/issues/80

## Commands

- tt - TimeTunnel - 记录现场，通过 index 回查
  - `-l` list
  - `-s` search, Advice 对象
  - `-i INDEX` 回查
- trace - 跟踪向下调用方法时间消耗
- stack - 获取调用链 - 尝试往上排查慢的节点

```bash
trace demo.MathGame run
```

### redefine

```bash
# 生成源码
jad --source-only com.example.demo.arthas.user.UserController > /tmp/UserController.java
# 编译
mc /tmp/UserController.java -d /tmp
# 加载
redefine /tmp/com/example/demo/arthas/user/UserController.class
```

- 不支持新方法新字段

## Arthas Tunnel

```bash
java -jar arthas-tunnel-server.jar
```

## Spring Boot Starter

- http://localhost:8080/actuator/arthas

```xml
<dependency>
    <groupId>com.taobao.arthas</groupId>
    <artifactId>arthas-spring-boot-starter</artifactId>
    <version>${arthas.version}</version>
</dependency>
```

```ini
arthas.agent-id=XXX
arthas.tunnel-server=ws://127.0.0.1:7777/ws
```

# FAQ

## Unable to get pid of LinuxThreads manager thread

alpine docker 里 java 8 为 pid 1 时出现。

```bash
curl -O https://arthas.aliyun.com/arthas-boot.jar
pid=1
touch /proc/${pid}/cwd/.attach_pid${pid} && kill -SIGQUIT ${pid} && sleep 2 && ls /proc/${pid}/root/tmp/.java_pid${pid}
java -jar arthas-boot.jar 1
```

```bash
# musl 无法判断线程模型
getconf GNU_LIBPTHREAD_VERSION

# https://github.com/jattach/jattach
apk add jattach
jattach 1 properties
```

- OpenJDK 11+ 修复
- 通过 -XX:+StartAttachListener 可避免问题
- https://github.com/alibaba/arthas/issues/362#issuecomment-1336190202
- https://github.com/docker-library/openjdk/issues/76
