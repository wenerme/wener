---
title: Spring actuator
---

# Spring actuator

- https://docs.spring.io/spring-boot/docs/current/reference/html/actuator.html

```ini
# info,health,prometheus
management.endpoints.web.exposure.include=*
# /actuator/health/liveness
# /actuator/health/readiness
management.health.probes.enabled=true
```

- /actuator/prometheus
  - `management.endpoints.web.exposure.include=health,info,prometheus`
- /actuator/health

```json
{ "status": "UP" }
```

- management.endpoint.health.show-details=always

```json
{
  "status": "UP",
  "components": {
    "diskSpace": {
      "status": "UP",
      "details": {
        "total": 250685575168,
        "free": 12073996288,
        "threshold": 10485760,
        "exists": true
      }
    },
    "ping": {
      "status": "UP"
    }
  }
}
```

- HealthIndicator,HealthContributor
  - DataSourceHealthIndicator
  - MongoHealthIndicator
    - management.health.mongo.enabled=false
  - RedisHealthIndicator
  - CassandraHealthIndicator

## 常见 Endpoint

```
EnvironmentManagerMvcEndpoint
POST  /env 设置环境变量
POST  /env/reset

LoggersMvcEndpoint
GET   /loggers | /loggers.json 获取所有的日志级别
GET   /loggers/{name}
POST  /loggers/{name}

RefreshBusEndpoint
POST /bus/refresh

EndpointMvcAdapter
GET   /archaius
GET   /info | /info.json
GET   /trace | /trace.json
GET   /beans || /beans.json
GET   /consul || /consul.json
GET   /autoconfig || /autoconfig.json
GET   /metrics || /metrics.json
GET   /features || /features.json
GET   /configprops || /configprops.json
GET   /dump | /dump.json 线程转储
GET   /env 获取环境变量
GET   /mappings || /mappings.json

EnvironmentMvcEndpoint
GET   /env/{name:.*}

MetricsMvcEndpoint
GET   /metrics/{name:.*}


GenericPostableMvcEndpoint
POST  /pause || /pause.json

RestartMvcEndpoint
POST  /restart || /restart.json
POST  /resume || /resume.json
POST  /refresh || /refresh.json

HeapdumpMvcEndpoint
GET   /heapdump || /heapdump.json

HealthMvcEndpoint
GET   /health || /health.json


EnvironmentBusEndpoint
POST  /bus/env

org.springframework.cloud.netflix.endpoint.ServletWrappingEndpoint
GET   /hystrix.stream/**
```
