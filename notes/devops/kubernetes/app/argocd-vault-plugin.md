---
title: argocd-vault-plugin
---

# argocd-vault-plugin

- [argoproj-labs/argocd-vault-plugin](https://github.com/argoproj-labs/argocd-vault-plugin)
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

```yaml
kind: Secret
apiVersion: v1
type: Opaque
metadata:
  name: vault-configuration
  namespace: argocd
stringData:
  VAULT_ADDR: http://vault
  # vault, ibmsecretsmanager, awssecretsmanager, gcpsecretmanager, yandexcloudlockbox, 1passwordconnect
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
