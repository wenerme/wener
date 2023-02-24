---
title: nacos
---

# nacos

- [alibaba/nacos](https://github.com/alibaba/nacos)
  - dynamic Naming And COnfiguration Service
  - 服务发现、配置管理、服务管理
- https://github.com/alibaba/nacos/blob/master/distribution/conf/application.properties
  - server.servlet.contextPath=/nacos
- https://github.com/alibaba/nacos/blob/master/distribution/bin/startup.sh
  - embedded
    - -DembeddedStorage=true
  - JAVA_OPT
  - MODE=standalone
    - -Xms512m -Xmx512m -Xmn256m -Dnacos.standalone=true
- http://127.0.0.1:8848/nacos/
  - nacos:nacos
- https://github.com/alibaba/nacos/blob/develop/api/src/main/proto/nacos_grpc_service.proto

```http-request
### 注册
POST http://127.0.0.1:8848/nacos/v1/ns/instance?serviceName=nacos.naming.serviceName&ip=20.18.7.10&port=8080

### 服务发现
POST http://127.0.0.1:8848/nacos/v1/ns/instance/list?serviceName=nacos.naming.serviceName

### 发布配置
POST http://127.0.0.1:8848/nacos/v1/cs/configs?dataId=nacos.cfg.dataId&group=test&content=helloWorld

### 获取配置
POST http://127.0.0.1:8848/nacos/v1/cs/configs?dataId=nacos.cfg.dataId&group=test
```


## Deploy

- https://nacos.io/zh-cn/docs/quick-start-docker.html
- [nacos-group/nacos-docker](https://github.com/nacos-group/nacos-docker)
- [nacos-group/nacos-k8s](https://github.com/nacos-group/nacos-k8s)
