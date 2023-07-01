---
tags:
- Configuration
---

# 配置

```yaml
services:
  acmecorp:
    url: https://example.com/control-plane-api/v1
    response_header_timeout_seconds: 5
    credentials:
      bearer:
        # by Bearer
        token: "${TOKEN}"
        # by Basic Auth
        scheme: "Basic"
        # base64(<username>:<password>)
        # OCI 不需要手动 base64
        token: "${TOKEN}"

bundles:
  efs:
    resource: file:///some/share/containing/bundle.tar.gz
    polling:
      min_delay_seconds: 10
      max_delay_seconds: 30
decision_logs:
  service: acmecorp
  reporting:
    min_delay_seconds: 300
    max_delay_seconds: 600

default_decision: /system/main
default_authorization_decision: /system/authz/allow
# for bundles.*.persist
persistence_directory: $PWD/.opa
plugins: {}
#  non-deterministic builtins caching
nd_builtin_cache: false

keys:
  _:
    key: ''
    private_key: ''
    algorithm: RS256
    scope: ''
```

- https://www.openpolicyagent.org/docs/latest/configuration/
