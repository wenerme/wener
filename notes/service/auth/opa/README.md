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
- [StyraInc/awesome-opa](https://github.com/StyraInc/awesome-opa)

```bash
brew install opa
opa run --server \
  --log-level debug \
  --addr https://0.0.0.0:8181

cat << EOF > example.rego
package example

import input.request

default allow = false

allow {
	request.method == "GET"
}
EOF

cat << EOF > input.json
{
    "request": {
        "method": "GET"
    }
}
EOF

# value: true
opa eval -i input.json -d example.rego "data.example.allow"

# --set=default_decision=example/allow
opa run --server example.rego # 服务

# 默认 data.system.main, 传递 data/example 修改调用的 policy
cat << EOF > request.json
{
    "input": $(cat input.json)
}
EOF
curl localhost:8181/v1/data/example -i -d @request.json -H 'Content-Type: application/json'

# 以服务运行，不加载预设
opa run --server \
  --log-format=json-pretty \
  --log-level=debug \
  --set=decision_logs.console=true

curl -X PUT 'localhost:8181/v1/policies/example' --data-binary @example.rego
curl localhost:8181/v1/data/example -d @request.json -H 'Content-Type: application/json' -s | jq

opa capabilities --current                      # 版本功能
opa build -t wasm -e example/allow example.rego # bundle.tar.gz
opa inspect bundle.tar.gz
opa check example.rego
opa fmt example.rego
opa deps --data example.rego data.example.allow

mkdir -p policy
cp example.rego policy
opa build -b policy/ # bundle.tar.gz
```

**--bundle**

```
foo/
  |
  +-- bar/
  |     |
  |     +-- data.json
  |
  +-- baz.rego
  |
  +-- manifest.yaml
```

- https://www.openpolicyagent.org/docs/latest/management-bundles/

## policy-as-code repository

```bash
mkdir -p src/policies
echo '{}' > src/data.json
cat << EOF > src/.manifest
{
  "roots": ["policies"],
  "metadata": {
    "required_builtins": {
      "builtin1": []
    }
  }
}
EOF
cat << EOF > src/policies/example.rego
package example

import input.request

default allow = false

allow {
	request.method == "GET"
}
EOF
opa build src/
# echo '{}' > config.json
# --manifest-config config.json:application/vnd.oci.image.config.v1+json
# oras push ghcr.io/wenerme/opa-policy:1.0.0 bundle.tar.gz:application/vnd.oci.image.layer.v1.tar+gzip
# https://hub.docker.com/r/wener/opa-policy
oras push docker.io/wener/opa-policy:1.0.0 bundle.tar.gz:application/vnd.oci.image.layer.v1.tar+gzip
```

```yaml
services:
  dockercr:
    url: https://dockercr.wener.me
    #url: https://docker.io
    type: oci

bundles:
  authz:
    service: dockercr
    resource: dockercr.wener.me/wener/opa-policy:1.0.0
    persist: true
    polling:
      min_delay_seconds: 30
      max_delay_seconds: 120
# persistence_directory: ${PWD}/.opa
```

```bash
curl localhost:8181/v1/data/example -d @request.json -H 'Content-Type: application/json' -s | jq

ls .opa/bundles/authz/ # 缓存目录 bundle.tar.gz
```

## OIDC

```rego
package oidc

jwks_request(url) := http.send({
    "url": url,
    "method": "GET",
    "force_cache": true,
    "force_cache_duration_seconds": 3600
})

jwt_unverified := io.jwt.decode(input.token)
jwt_header := jwt_unverified[0]

# Use the key ID (kid) from the token as a cache key - if a new kid is encountered
# we obtain a fresh JWKS object as the keys have likely been rotated.
jwks_url := concat("?", [
    "https://authorization-server.example.com/jwks",
    urlquery.encode_object({"kid": jwt_header.kid}),
])
jwks := jwks_request(jwks_url).raw_body

jwt_verified := jwt_unverified {
    io.jwt.verify_rs256(input.token, jwks)
}

claims_verified := jwt_verified[1]
```

- https://www.openpolicyagent.org/docs/latest/oauth-oidc/

## Awesome

- [rond-authz/rond](https://github.com/rond-authz/rond)
  - sidecar proxy
- [aserto-dev/topaz](https://github.com/aserto-dev/topaz)
  - OPA + Zanzibar
- [permitio/opal](./opal.md)
  - 管理和自动推送 Policy 更新
- [opcr-io/policy](https://github.com/opcr-io/policy)
  - building OPA policies into OCI images
- [StyraInc/regal](https://github.com/StyraInc/regal)
  - linter
- [StyraInc/awesome-opa](https://github.com/StyraInc/awesome-opa)
- [fugue/regula](https://github.com/fugue/regula)
