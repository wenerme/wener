
## 在 REST 中使用 spring-data-rest 分页
```java
// JPA data-rest
@RestResource(path = "nameStartsWith", rel = "nameStartsWith")
public Page findByNameStartsWith(@Param("name") String name, Pageable p);
```

## 记录启动端口和进程 ID
```java
SpringApplication application = new SpringApplication(ServerApplication.class);
application.addListeners(new ApplicationPidFileWriter(), new EmbeddedServerPortFileWriter());
application.run(args);
SpringApplication.run(ServerApplication.class, args);
```

默认 PID 文件为 `application.pid`, 默认 PORT 文件为 application.port

```yml
# 修改 PID 文件
spring.pid.file: app.pid
# 修改 PORT 文件
portfile: app.port
```

## 修改 DATA REST 返回页的条数
```java
@Configuration
static class RepositoryRestConfigurer extends RepositoryRestConfigurerAdapter {
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config
                .setDefaultPageSize(10)
                .setMaxPageSize(20);
    }
}
```

## Spring Boot 启动非常慢 Tomcat SessionIdGeneratorBase
```
INFO 1 --- [localhost-startStop-1] o.a.c.util.SessionIdGeneratorBase        : Creation of SecureRandom instance for session ID generation using [SHA1PRNG] took [48,326] milliseconds.
```

在启动时为 JVM 添加 `-Djava.security.egd=file:/dev/./urandom`.

```
java -Djava.security.egd=file:/dev/./urandom -jar myjar.jar app.Main.
```


## JSON 时间格式选择
http://stackoverflow.com/questions/10286204/the-right-json-date-format

"yyyy-MM-dd'T'HH:mm:ssZ"
"2012-04-23T18:25:43.511Z"              JavaScript built-in JSON object
"2012-04-21T18:25:43-05:00"             ISO 8601

2012-04-23T18:25:43.511Z

Here's why:

It's human readable but also succinct

It sorts correctly

It includes fractional seconds, which can help re-establish chronology

It conforms to ISO 8601

ISO 8601 has been well-established internationally for more than a decade

ISO 8601 is endorsed by W3C, RFC3339, and XKCD

## 配置 Spring MVC 使用 ObjectMapper

默认 Spring MVC 在序列化 JSON 时不会使用系统中配置的 ObjectMapper.

```java
@Configuration
public static class WebMvcConfigurer extends WebMvcConfigurerAdapter {
    @Autowired
    ObjectMapper objectMapper;
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(new MappingJackson2HttpMessageConverter(objectMapper));
    }
}
```

然后可通过配置修改 Jackson 格式
```yaml
spring:
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    serialization-inclusion: non_null
    serialization:
      WRITE_DATES_AS_TIMESTAMPS: false
      WRITE_NULL_MAP_VALUES: false
```

## 修改默认分页数量
1. 通过配置对象修改
```java
@Configuration
static class RepositoryRestConfigurer extends RepositoryRestConfigurerAdapter {
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config
                .setDefaultPageSize(10)
                .setMaxPageSize(20);
    }
}
```
2. 通过配置文件修改
```yaml
spring:
  data:
    rest:
      default-page-size: 10
      max-page-size: 20
```
