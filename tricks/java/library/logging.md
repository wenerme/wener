# Java Logging

## Tips
* 现在，选择 log4j2 即可，除非不得不使用 logback
* Spring Boot 默认使用 Logback，但[正在支持 log4j2](https://github.com/spring-projects/spring-boot/issues/16864#issuecomment-492570488)
  * If we were starting Spring Boot today we may well have chosen Log4J2 over Logback
* [logback](https://github.com/qos-ch/logback) 开发不太活跃，两年没有新版本
* log4j2
  * api 分离
  * 即便直接使用也不会被限制为只能使用 log4j2