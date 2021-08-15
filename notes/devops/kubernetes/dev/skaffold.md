---
title: skaffold
---

# skaffold

- skaffold
  - source to kubernetes 工具
  - building, pushing, deploying
- SKAFFOLD_INSECURE_REGISTRY
- SKAFFOLD_DEFAULT_REPO

```bash
# macOS
brew install skaffold
# 手动按照
curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-darwin-amd64 && \
sudo install skaffold /usr/local/bin/

skaffold config set --global collect-metrics false

# 项目初始化 - 生成 skaffold.yaml
# 自动检测 Dockerfile、K8S 和语言环境
skaffold init

# 端到端操作
skaffold dev
skaffold run
skaffold debug

# CI/CD 操作
skaffold build
skaffold test
skaffold deploy
skaffold render
skaffold apply
skaffold delete
```

```yaml
apiVersion: skaffold/v2beta19
kind: Config
metadata:
  name: skaffold
# 构建
build:
  artifacts:
    - image: skaffold-example
      # 可以包含仓库名字
      # image: gcr.io/k8s-skaffold/example
      docker:
        dockerfile: Dockerfile
      # 依赖
      requires:
        - image: image2
          # build-arg
          alias: IMAGE2
      context:
      # 文件同步
      sync:
        manual:
          - src: 'content/en/**/*.md'
            dest: content
            strip: 'content/en/'
        # 从 Dockerfile 推导
        infer: []
        auto: true # buildpacks & Jib
        hooks: { before: {}, after: {} }
      # 生命周期 Hook
      hooks:
        before:
          - command: []
            os: [ darwin, linux, windows ]
        after:
    - image: image2
      # 配置为使用 kaniko
      kaniko:
        reproducible: true
        dockerfile: Dockerfile
        # 默认镜像无法访问
        # initImage: gcr.io/k8s-skaffold/skaffold-helpers/busybox
        # image: gcr.io/kaniko-project/executor
        # 使用镜像
        initImage: registry.cn-hongkong.aliyuncs.com/cmi/k8s-skaffold_skaffold-helpers_busybox
        image: registry.cn-hongkong.aliyuncs.com/cmi/kaniko-project_executor
        useNewRun: false # 实验性质 - 可提速 75%
        cache:
          repo: # 默认会自行推测
          hostPath: # 要求预先存在 - kaniko-warmer
          ttl: # 缓存失效 - 单位小时
    - image: image1
      # 自定义构建
      # 环境变量 IMAGE PUSH_IMAGE BUILD_CONTEXT
      # 集群变量 KUBECONTEXT NAMESPACE PULL_SECRET_NAME DOCKER_CONFIG_SECRET_NAME TIMEOUT
      custom:
        buildCommand: docker build --build-arg IMG2 .
        # 文件依赖
        dependencies:
          dockerfile:
            path:
            buildArgs: {}
          # 输出依赖文件名字
          command:
          paths: []
          ignore: []
  # 本地 Docker 配置
  local:
    # 默认使用 engine api
    useDockerCLI: false
    useBuildkit: false
    # 0 为不限制
    concurrency: 1
    # 推送到仓库
    push:
    tryImportMissing: false

  # Kaniko Cluster 配置
  cluster:
    # 拉 Secret
    pullSecretName: kaniko-secret
    # OR
    pullSecretPath: path-to-service-account-key-file
    pullSecretMountPath:
    namespace:
    # 推 Secret
    dockerConfig:
      path: ~/.docker/config.json # 使用本地
      # OR
      # 不能是 kubernetes.io/dockerconfigjson
      # 用 opaque 且 key 为 config.json
      secretName: docker-config-secret-in-kubernetes
    serviceAccount:
    tolerations:
    randomPullSecret:
    randomDockerConfigSecret:

  # Tag 策略
  tagPolicy:
    gitCommit: {}
    inputDigest: {}
    # latest
    sha256: {}
    envTemplate:
      template: "{{.FOO}}"
    dateTime:
      format: "2006-01-02_15-04-05.999_MST"
      timezone: "Local"
    customTemplate:
      template: "{{.FOO}}_{{.BAR}}"
      components:
      - name: FOO
        dateTime:
          format: "2006-01-02"
          timezone: "UTC"
      - name: BAR
        gitCommit:
          variant: AbbrevCommitSha

# 部署
deploy:
  # Kubectl 部署
  kubectl:
    # 部署清单 - 支持通配
    manifests:
      - ["k8s/*.yaml"]
    remoteManifests: []
    # 不同命令的额外 flag
    flags:
      global: []
      apply: []
      delete: []
      disableValidation: false
    defaultNamespace:

  # kustomize 部署
  kustomize:
    paths: ['.']
    flags: # 和 kubectl flags 相同
    buildArgs:
    defaultNamespace:

  # helm 部署
  helm:
    releases:
      - name: my-chart
        chartPath: helm
        remoteChat:
        valuesFiles: []
        artifactOverrides:
          imageKey: gcr.io/my-project/my-image
        namespace:
        version:
        setValues: {}
        setValueTemplates: {}
        setFiles: {}
        createNamespace: false
        wait: false
        recreatePods: false
        skipBuildDependencies: false
        useHelmSecrets: false
        # --repo
        repo:
        # chartPath 默认 false  remoteChart 默认 true
        upgradeOnChange:
        # --f
        overrides:
        # helm package 参数
        packaged:
        # ArtifactOverrides 策略
        imageStrategy:
          fqn: {} # 默认 提供完整的 image
          helm: {} # 提供额外的 repo 字段 imageKey.repository:imageKey.tag
          helm:
            # {key}.registry, {key}.repository, {key}.tag
            explicitRegistry: true

# 测试
test:
  - image: gcr.io/k8s-skaffold/skaffold-example
    # 检测文件是否存在 结构是否正确
    structureTests:
      - './structure-test/*'
    structureTestsArgs:
  - image: custom-test-example
    # 自定义测试
    command: ./test.sh

# 多环境
deploy:
  # 默认部署上下文
  kubeContext: minikube
# skaffold run -p profile-1,profile-2
profiles:
  - name: profile-1
    deploy:
      kubeContext: docker-for-desktop
  - name: profile-2
    activation:
      - kubeContext: minikube
```

**structure-test/test.yaml**

```yaml
schemaVersion: 2.0.0

fileExistenceTests:
  - name: 'no go binary'
    path: '/usr/bin/go'
    shouldExist: false
```

```dockerfile title="Dockerfile"
FROM golang:1.16 as builder
COPY main.go .
# `skaffold debug` sets SKAFFOLD_GO_GCFLAGS to disable compiler optimizations
ARG SKAFFOLD_GO_GCFLAGS
RUN go build -gcflags="${SKAFFOLD_GO_GCFLAGS}" -o /app main.go

FROM alpine:3
# Define GOTRACEBACK to mark this container as using the Go language runtime
# for `skaffold debug` (https://skaffold.dev/docs/workflows/debug/).
ENV GOTRACEBACK=single
CMD ["./app"]
COPY --from=builder /app .
```
