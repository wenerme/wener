---
tags:
  - API
  - RESTful
---

# PowerDNS AS API

- https://raw.githubusercontent.com/PowerDNS/pdns/master/docs/http-api/swagger/authoritative-api-swagger.yaml
- http://petstore.swagger.io/

```bash
# server id 为 hostname, 大多数时候为 localhost
curl -v -H 'X-API-Key: KEY' http://127.0.0.1:8001/api/v1/servers/localhost | jq .
```
