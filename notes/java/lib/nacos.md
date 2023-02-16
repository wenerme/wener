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

## Deploy

- [nacos-group/nacos-docker](https://github.com/nacos-group/nacos-docker)
- [nacos-group/nacos-k8s](https://github.com/nacos-group/nacos-k8s)
