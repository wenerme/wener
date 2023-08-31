---
title: ArgoCD Image Updater
---

# ArgoCD Image Updater

:::tip

- 默认间隔 `2m0s` 扫描一次
- 镜像多了后会触发非常多的 仓库 API 请求
- 不支持 webhook [#1](https://github.com/argoproj-labs/argocd-image-updater/issues/1)
  - [#284](https://github.com/argoproj-labs/argocd-image-updater/pull/284)
- write back 会比较复杂，不建议。。。

:::

- [argoproj-labs/argocd-image-updater](https://github.com/argoproj-labs/argocd-image-updater)
  - 基于 argocd 自动更新镜像
  - 支持写回到仓库
- ConfigMap argocd-image-updater-config
- semver 使用 [Masterminds/semver](https://github.com/Masterminds/semver) 实现
- 限制
  - 只能更新 ArgoCD 管理的容器
  - 只能更新 Kustomize 或 Helm 生成的容器
  - pull secrets 必须在相同集群
- Application 维度 添加 annotation
  - argocd-image-updater.argoproj.io/image-list 定义监听的镜像
    - `[<alias_name>=]<image_path>[:<version_constraint>]` - 例如: `foo=org/image:tag`
    - 逗号分隔多个
    - 无 tag 则是 latest
    - tag 可以是版本范围: `~1.26`
    - 如果指定了 alias 可以针对 alias 进行配置
      - 可以跨应用使用
      - 同应用内唯一
      - 🌟 推荐都设置 alias - 因为 有些功能依赖 alias
    - [docs/configuration/images.md](https://github.com/argoproj-labs/argocd-image-updater/blob/master/docs/configuration/images.md)
  - 检测镜像是否使用
  - 检测 仓库 是否有新镜像
    - 检测策略 - `argocd-image-updater.argoproj.io/<image>.update-strategy`
      - semver - 默认 - 版本排序
      - latest
      - digest - 给定 tag 的最新 digest
        - 多分支时很好用
        - 例如: tag 为 main,develop,daily,stage
      - name - 字母排序 tag
  - 如果有 新 镜像，则触发更新
    - 更新方式 - argocd-image-updater.argoproj.io/write-back-method
      - argocd
        - `argocd app set --parameter`
      - git
        - `.argocd-source-<appName>.yaml`

```bash
# 安装
kubectl install -f https://raw.githubusercontent.com/argoproj-labs/argocd-image-updater/stable/manifests/install.yaml

kubectl annotate app guestbook \
  argocd-image-updater.argoproj.io/image-list=gcr.io/heptio-images/ks-guestbook-demo \
  argocd-image-updater.argoproj.io/write-back-method=git

# Github 仓库
# export GITHUB_PULLSECRET="<username>:<token>"
# 测试镜像 - 检测版本、是否升级等
argocd-image-updater test nginx
```

```yaml title="最小配置"
annotations:
  argocd-image-updater.argoproj.io/image-list: >
    web=registry.gitlab.com/example/apps/web,
    server=registry.gitlab.com/example/apps/server
  argocd-image-updater.argoproj.io/update-strategy: digest
  argocd-image-updater.argoproj.io/pull-secret: pullsecret:default/gitlab-dockerconfig
```

**允许 image-updater 访问其他空间的 secret**

```yaml title="argocd-image-updater.rbac.yaml"
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: argocd-image-updater
  namespace: default
rules:
  - apiGroups:
      - ''
    resources:
      - secrets
      - configmaps
    verbs:
      - get
      - list
      - watch

---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: argocd-image-updater
  namespace: default
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: argocd-image-updater
subjects:
  - kind: ServiceAccount
    name: argocd-image-updater
    namespace: argocd
```

```yaml title="配置说明"
argocd-image-updater.argoproj.io/write-back-method: git
# 带认证信息
argocd-image-updater.argoproj.io/write-back-method: git:secret:argocd-image-updater/git-creds
# 可指定分支
argocd-image-updater.argoproj.io/git-branch: main

argocd-image-updater.argoproj.io/myalias.force-update: "true"
# 指定私钥
# secret:<namespace>/<secret_name>#<field>
# pullsecret:<namespace>/<secret_name> 包含 .dockerconfigjson 字段
# env:<variable_name>
# ext:<path_to_script> 脚本生成
argocd-image-updater.argoproj.io/<image_name>.pull-secret: <secret_ref>

# kustomize 修改镜像
# kustomize edit set image quay.io/argoproj/argocd=ghcr.io/argoproj/argocd
argocd-image-updater.argoproj.io/<image_alias>.kustomize.image_name: <original_image_name>

# semver
# 语法 [<alias_name>=]<image_path>[:<version_constraint>]
argocd-image-updater.argoproj.io/image-list: some/image:v1.2.x
# semver 为默认
argocd-image-updater.argoproj.io/<image>.update-strategy: semver

# 升级最新
argocd-image-updater.argoproj.io/image-list: alias=some/image
argocd-image-updater.argoproj.io/<alias>.update-strategy: latest
# 限制 tag
argocd-image-updater.argoproj.io/myimage.allow-tags: regexp:^[0-9a-f]{7}$
# 忽略 tag
argocd-image-updater.argoproj.io/myimage.ignore-tags: latest, master

# 摘要
argocd-image-updater.argoproj.io/image-list: alias=some/image:<tag_name>
argocd-image-updater.argoproj.io/<alias>.update-strategy: digest

# 名字
# tag 排序，适用于 tag 为 YYYY-MM-DD 场景
argocd-image-updater.argoproj.io/image-list: alias=some/image
argocd-image-updater.argoproj.io/<alias>.update-strategy: name

# Demo
# =======
# Helm 参数
argocd-image-updater.argoproj.io/image-list: dex=quay.io/dexidp/dex
argocd-image-updater.argoproj.io/dex.helm.image-name: dex.image.name
argocd-image-updater.argoproj.io/dex.helm.image-tag: dex.image.tag

# Helm 多镜像
argocd-image-updater.argoproj.io/image-list: fooalias=foo/bar, baralias=bar/foo
argocd-image-updater.argoproj.io/fooalias.helm.image-name: foo.image
argocd-image-updater.argoproj.io/fooalias.helm.image-tag: foo.tag
argocd-image-updater.argoproj.io/baralias.helm.image-name: bar.image
argocd-image-updater.argoproj.io/baralias.helm.image-tag: bar.tag
```

```yaml
data:
  # 提交消息模板
  git.commit-message-template: |
    build: automatic update of {{ .AppName }}

    {{ range .AppChanges -}}
    updates image {{ .Image }} tag '{{ .OldTag }}' to '{{ .NewTag }}'
    {{ end -}}
```

## 配置

- cm argocd-image-updater-config

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-image-updater-config
data:
  applications_api: argocd
  # The address of Argo CD API endpoint - defaults to argocd-server.argocd
  argocd.server_addr: <FQDN or IP of your Argo CD server>
  # Whether to use GRPC-web protocol instead of GRPC over HTTP/2
  argocd.grpc_web: true
  # Whether to ignore invalid TLS cert from Argo CD API endpoint
  argocd.insecure: false
  # Whether to use plain text connection (http) instead of TLS (https)
  argocd.plaintext: false

  argocd.token:
  registries.conf:
```

- 默认支持的仓库
  - docker.io
  - quay.io
  - jfrog.io
  - ghcr.io
  - docker.pkg.github.com
  - registry.gitlab.com
  - gcr.io

```yaml title="registries.conf"
registries:
  - name: Docker Hub
    prefix: docker.io
    api_url: https://registry-1.docker.io
    credentials: secret:foo/bar#creds
    defaultns: library
    default: true
  - name: RedHat Quay
    api_url: https://quay.io
    prefix: quay.io
    insecure: yes
    credentials: env:REGISTRY_SECRET
    credsexpire: 5h
    limit: 20
```

# FAQ

## skipping app of type

- https://github.com/argoproj-labs/argocd-image-updater/blob/f12a5ab6d3c69299ccd02473bdebdebc24131cb4/pkg/argocd/argocd.go#L175-L214
- .Status.SourceType
  - 未同步时，字段没有

## x509: certificate signed by unknown authority

- https://github.com/argoproj-labs/argocd-image-updater/issues/412
