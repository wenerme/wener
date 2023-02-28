---
title: crane
---

# crane

- [google/go-containerregistry/cmd/crane](https://github.com/google/go-containerregistry/blob/main/cmd/crane)
- [recipes.md](https://github.com/google/go-containerregistry/blob/main/cmd/crane/recipes.md)
- config
  - arch, os, rootfs, env, cmd, label, created, history
- manifest
  - layers, size
- layer


```bash
# macOS
brew install crane
# install from source
go install github.com/google/go-containerregistry/cmd/crane@latest
# 手动下载
curl -LO https://github.com/google/go-containerregistry/releases/download/v0.13.0/go-containerregistry_Linux_arm64.tar.gz


echo quay.io | crane auth get # 从 keychain 获取 auth 信息
crane copy quay.io/keycloak/keycloak:17.0.0 registry.cn-hongkong.aliyuncs.com/cmi/keycloak_keycloak

crane pull docker.io/wener/base:v3.15 base-v3.15.tar
crane push base-v3.15.tar registry.cn-hongkong.aliyuncs.com/cmi/wener_base:v3.15

# 查看 tag
crane ls docker.io/wener/base

# 计算镜像大小
crane manifest docker.io/wener/base:v3.15 | jq '.config.size + ([.layers[].size] | add)'
# 格式化显示
crane manifest docker.io/wener/base:v3.15 | jq '.config.size + ([.layers[].size] | add)' | numfmt --to=iec

# diff config
diff <(crane config busybox:1.32 | jq) <(crane config busybox:1.33 | jq)
# diff manifest
diff <(crane manifest busybox:1.32 | jq) <(crane manifest busybox:1.33 | jq)
# diff 内容
diff \
  <(crane export docker.io/wener/base:v3.14 - | tar -tvf - | sort) \
  <(crane export docker.io/wener/base:v3.15 - | tar -tvf - | sort)
```
