---
title: argocd-vault-plugin
---

# argocd-vault-plugin

- [argoproj-labs/argocd-vault-plugin](https://github.com/argoproj-labs/argocd-vault-plugin)
  - ArgoCD 密钥管理
  - 支持后端
    - HashiCorp Vault
    - [SOPS](https://github.com/mozilla/sops)
- AVP -> argocd-vault-plugin
- 安装
  - https://github.com/argoproj-labs/argocd-vault-plugin/tree/main/manifests
- 参考
  - [Multitenancy](https://argocd-vault-plugin.readthedocs.io/en/stable/config/#multitenancy)

```yaml
kind: Secret
apiVersion: v1
metadata:
  name: example-secret
  annotations:
    # 路径
    avp.kubernetes.io/path: 'path/to/secret'
type: Opaque
data:
  password: <password-vault-key>
  # postgres://<username>:<password>@<host>:<port>/<database>?sslmode=require
  # 会先 decode 然后替换，然后 encode
  POSTGRES_URL: cG9zdGdyZXM6Ly88dXNlcm5hbWU+OjxwYXNzd29yZD5APGhvc3Q+Ojxwb3J0Pi88ZGF0YWJhc2U+P3NzbG1vZGU9cmVxdWlyZQ==
```

```yaml
annotations:
  # <path:some/path#secret-key>
  # <path:some/path#secret-key#version>
  avp.kubernetes.io/path: 'path/to/secret'
  # 默认 latest
  avp.kubernetes.io/secret-version: '1'
  avp.kubernetes.io/kv-version: '2'
  # 是否忽略文件
  avp.kubernetes.io/ignore: 'false'
  # 如果值不存在移除 key
  avp.kubernetes.io/remove-missing: 'true'
```

- Modifiers
  - base64encode
  - base64decode
  - jsonPath {.username}
  - jsonParse
  - yamlParse
  - indent

**配置**

```yaml
kind: Secret
apiVersion: v1
type: Opaque
metadata:
  name: vault-configuration
  namespace: argocd
stringData:
  VAULT_ADDR: http://vault
  # vault, sops, ibmsecretsmanager, awssecretsmanager, gcpsecretmanager, yandexcloudlockbox, 1passwordconnect
  # sops 最简单
  # vault 适合小团队 selfhost
  AVP_TYPE: vault
  # approle, github, k8s, token
  AVP_AUTH_TYPE:
  # approle
  AVP_ROLE_ID:
  AVP_SECRET_ID:
  # k8s
  AVP_K8S_MOUNT_PATH:
  AVP_K8S_ROLE:
  AVP_K8S_TOKEN_PATH: /var/run/secrets/kubernetes.io/serviceaccount/token

  # auth/approle, auth/github, auth/kubernetes
  AVP_MOUNT_PATH:

  # avp.kubernetes.io/kv-version
  AVP_KV_VERSION: '2'
```

- ArgoCD 2.4 会添加环境变量前缀 `ARGOCD_ENV_`

## SOPS

- AVP_TYPE: sops

```yaml
# 通过 annotation 配置
kind: Secret
apiVersion: v1
metadata:
  name: test-secret
  annotations:
    avp.kubernetes.io/path: 'example.yaml'
type: Opaque
data:
  password: <test-secret>

---
# Inline
kind: Secret
apiVersion: v1
metadata:
  name: test-secret
type: Opaque
data:
  password: <path:example.yaml#test-secret>
---
# 获取子字段
kind: Secret
apiVersion: v1
metadata:
  name: test-secret
  annotations:
    avp.kubernetes.io/path: 'example.yaml'
type: Opaque
stringData:
  password: <parent | jsonPath {.child}>
```

## 插件工作原理

- Patch argocd-repo-server
  - 挂载 ConfigMap/cmp-plugin
  - 挂载 empty-dir custom-tools
  - initContainers
    - 通过 curl github 下不动 - 建议做镜像或者自己镜像文件
    - 下载 argocd-vault-plugin 到 custom-tools
      ```bash
      curl -L https://github.com/argoproj-labs/argocd-vault-plugin/releases/download/v$(AVP_VERSION)/argocd-vault-plugin_$(AVP_VERSION)_linux_amd64 -o argocd-vault-plugin \
        && chmod +x argocd-vault-plugin \
        && mv argocd-vault-plugin /custom-tools/
      ```
- ConfigMap/cmp-plugin 配置 argocd - 通过 `argocd-vault-plugin generate` 生成

  - avp-kustomize.yaml
    - ConfigManagementPlugin
    ```bash
    # discover.find.command
    find . -name kustomization.yaml
    # generate.command
    kustomize build . | argocd-vault-plugin generate -
    ```
  - avp-helm.yaml

    ```bash
    find . -name 'Chart.yaml' && find . -name 'values.yaml'

    helm template $ARGOCD_APP_NAME -n $ARGOCD_APP_NAMESPACE ${ARGOCD_ENV_HELM_ARGS} . | argocd-vault-plugin generate -
    ```


```bash
AVP_VERSION=1.15.0
curl -LO https://github.com/argoproj-labs/argocd-vault-plugin/releases/download/v${AVP_VERSION}/argocd-vault-plugin_${AVP_VERSION}_linux_amd64
```
