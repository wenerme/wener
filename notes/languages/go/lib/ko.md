---
title: ko
---

# ko

- [google/ko](https://github.com/google/ko)
  - Go source to Kubernetes
- KO_DOCKER_REPO
  - KO_DOCKER_REPO=ko.local, -L, --local - 本地，不 push
- KO_CONFIG_PATH=.ko.yaml
- KIND_CLUSTER_NAME
- --platform=linux/amd64,linux/arm64 - 多平台构建
- KO_DATA_PATH=kodata - 静态资源路径
- GOFLAGS

```bash
# macOS
brew install ko
# Go install
go install github.com/google/ko@latest

ko publish ./cmd/app

ko resolve -f config/ > release.yaml
# ko resolve -f config/ | kubectl apply -f -
ko apply -f config/
ko delete -f config/

kustomize build config | ko resolve -f -

# bash completion
ko completion
# go.mod
ko publish -L --bare --platform=linux/amd64 --push=false -t $(git rev-parse HEAD) .
```

```yaml
# 默认基础镜像
defaultBaseImage: gcr.io/distroless/static:nonroot

# 修改基础镜像
baseImageOverrides:
  github.com/my-user/my-repo/cmd/app: registry.example.com/base/for/app
  github.com/my-user/my-repo/cmd/foo: registry.example.com/base/for/foo

# 自定义构建
builds:
  - id: foo
    main: ./foobar/foo
    env:
      - GOPRIVATE=git.internal.example.com,source.developers.google.com
    flags:
      - -tags
      - netgo
    ldflags:
      - -s -w
      - -extldflags "-static"
      - -X main.version={{.Env.VERSION}}
  - id: bar
    main: ./foobar/bar/main.go
    env:
      - GOCACHE=/workspace/.gocache
    ldflags:
      - -s
      - -w
```

- template 支持模板 - 但只支持 环境变量
- `ko publish ./cmd/app` 默认镜像名字 `${KO_DOCKER_REPO}/app-<md5>`
  - --base-import-paths,-B - 忽略 md5
  - --bare - 只用 repo 部分
  - --preserve-import-path,-P - repo 后再加上 模块 路径

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-deployment
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: my-app
          # Import Path
          image: ko://github.com/my-user/my-repo/cmd/app
```
