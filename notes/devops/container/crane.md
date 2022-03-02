---
title: crane
---

# crane

```bash
# brew install crane
go install github.com/google/go-containerregistry/cmd/crane@latest

echo quay.io | crane auth get # 从 keychain 获取 auth 信息
crane copy quay.io/keycloak/keycloak:17.0.0 registry.cn-hongkong.aliyuncs.com/cmi/keycloak_keycloak

crane pull docker.io/wener/base:v3.15 base-v3.15.tar
crane push base-v3.15.tar registry.cn-hongkong.aliyuncs.com/cmi/wener_base:v3.15
```
