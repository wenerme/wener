

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
