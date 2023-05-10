---
title: OPA
---

# OPA

- [open-policy-agent/opa](https://github.com/open-policy-agent/opa)
  - REST API、gRPC API、SDK
  - 通用的、独立的政策引擎
- Rego
  - https://play.openpolicyagent.org/
- [REST API](https://www.openpolicyagent.org/docs/latest/rest-api/)
- npm [@open-policy-agent/opa-wasm](https://github.com/open-policy-agent/npm-opa-wasm)

```bash
opa build -t wasm -e example/allow example.rego
```
