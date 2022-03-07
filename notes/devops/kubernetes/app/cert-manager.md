---
id: cert-manager
title: Cert Manager
---

# cert-manager

- [jetstack/cert-manager](https://github.com/jetstack/cert-manager) 是什么？
  - 自颁发 CA 证书管理
  - ACME 自动证书申请
  - 外部证书管理集成
- crds - 自定义资源
  - issuers.cert-manager.io
  - orders.acme.cert-manager.io
  - certificaterequests.cert-manager.io
  - certificates.cert-manager.io
  - challenges.acme.cert-manager.io
  - clusterissuers.cert-manager.io
- [配置](https://cert-manager.io/docs/configuration/)
- [Ingress](https://cert-manager.io/docs/usage/ingress/)
- 注意
  - DNS01 支持的 Provider 非常少 - 和 LEGO 相比
    - ACMEDNS
    - Akamai
    - AzureDNS
    - CloudFlare
    - DigitalOcean
    - Google CloudDNS
    - RFC-2136
    - Route53
    - [Webhook](https://cert-manager.io/docs/configuration/acme/dns01/webhook/)
      - [pragkent/alidns-webhook](https://github.com/pragkent/alidns-webhook)

:::caution

- 尽量不要创建相同证书 - 如果需要可考虑同步
- DNS01 才支持泛域名证书 - 最简单是使用 ACMEDNS

:::

## Ingress

- [Supported Annotations](https://cert-manager.io/docs/usage/ingress/#supported-annotations)

| annotation                                 | desc                                                                                                                 |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| cert-manager.io/issuer                     | Issuser                                                                                                              |
| cert-manager.io/cluster-issuer             | ClusterIssuer                                                                                                        |
| cert-manager.io/issuer-kind                | 外部 Issuers                                                                                                         |
| cert-manager.io/issuer-group               | 外部 Issuers                                                                                                         |
| kubernetes.io/tls-acme: "true"             | 如果安装时设置了 `ingressShim.defaultIssuer` 则会使用默认 Issuser                                                    |
| acme.cert-manager.io/http01-ingress-class  | 用于 resolve 的 Ingress                                                                                              |
| acme.cert-manager.io/http01-edit-in-place: | 创建新的 Ingress 配置还是修改现有的 Ingress，会设置 `"cert-manager.io/issue-temporary-certificate": "true"` 用于区分 |

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: kuard
  annotations:
    kubernetes.io/ingress.class: 'nginx'
    # 可直接使用指定的 issuser
    cert-manager.io/issuer: 'letsencrypt-staging'

spec:
  tls:
    - hosts:
        - example.example.com
      secretName: quickstart-example-tls
  rules:
    - host: example.example.com
      http:
        paths:
          - path: /
            backend:
              serviceName: kuard
              servicePort: 80
```

## Certificate

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: example-com
  namespace: sandbox
spec:
  # Secret names are always required.
  secretName: example-com-tls
  duration: 2160h # 90d
  renewBefore: 360h # 15d
  subject:
    organizations:
    - jetstack
  # The use of the common name field has been deprecated since 2000 and is
  # discouraged from being used.
  commonName: example.com
  isCA: false
  privateKey:
    algorithm: RSA
    encoding: PKCS1
    size: 2048
  usages:
    - server auth
    - client auth
  # At least one of a DNS Name, URI, or IP address is required.
  dnsNames:
  - example.com
  - www.example.com
  uris:
  - spiffe://cluster.local/ns/sandbox/sa/example
  ipAddresses:
  - 192.168.0.5
  # Issuer references are always required.
  issuerRef:
    name: ca-issuer
    # We can reference ClusterIssuers by changing the kind here.
    # The default value is Issuer (i.e. a locally namespaced Issuer)
    kind: Issuer
    # This is optional since cert-manager will default to this value however
    # if you are using an external issuer, change this to that issuer group.
    group: cert-manager.io
```

```yaml
# ingress 生成的 certificate
spec:
  dnsNames:
    - web.example.com
  issuerRef:
    group: cert-manager.io
    kind: ClusterIssuer
    name: letsencrypt
  secretName: web-cert
  usages:
    - digital signature
    - key encipherment
```

## 安装

```bash
ver=$(curl -Ls https://api.github.com/repos/jetstack/cert-manager/releases/latest | jq -r .tag_name)
# 安装自定义资源
curl -sfLO https://github.com/jetstack/cert-manager/releases/download/$ver/cert-manager.crds.yaml
kubectl apply -f cert-manager.crds.yaml

# 创建 NS
kubectl create namespace cert-manager

# Helm 安装
helm repo add jetstack https://charts.jetstack.io
helm repo update

helm install \
  cert-manager jetstack/cert-manager \
  --namespace cert-manager \
  --version $ver

# Helm 安装 - 通过镜像
helm repo add wener https://charts.wener.tech
helm repo update

cat <<YAML > cert-manager.values.yaml
image:
  repository: registry.cn-hongkong.aliyuncs.com/cmi/jetstack_cert-manager-controller
webhook:
  image:
    repository: registry.cn-hongkong.aliyuncs.com/cmi/jetstack_cert-manager-webhook
cainjector:
  image:
    repository: registry.cn-hongkong.aliyuncs.com/cmi/jetstack_cert-manager-cainjector
installCRDs: true
# 版本相关
extraArgs:
  - --acme-http01-solver-image=registry.cn-hongkong.aliyuncs.com/cmi/jetstack_cert-manager-acmesolver:$ver
YAML

helm install \
  cert-manager wener/cert-manager \
  --namespace cert-manager --create-namespace \
  --version $ver -f cert-manager.values.yaml

# 查看安装状态
kubectl -n cert-manager rollout status deploy/cert-manager
# 验证安装
kubectl -n cert-manager get deploy
```

## ACME

```yaml
# Cloudflare 接口 Token 的 Secret
apiVersion: v1
kind: Secret
metadata:
  name: cloudflare-api-token-secret
type: Opaque
stringData:
  api-token: <API Token>

---
# Cloudflare 接口 Key 的 Secret
apiVersion: v1
kind: Secret
metadata:
  name: cloudflare-api-key-secret
type: Opaque
stringData:
  api-key: <API Key>

---
# letsencrypt staging 环境
apiVersion: cert-manager.io/v1alpha2
kind: ClusterIssuer
metadata:
  name: letsencrypt-staging
  namespace: default
spec:
  acme:
    server: https://acme-staging-v02.api.letsencrypt.org/directory
    # 生产地址
    # server: https://acme-v02.api.letsencrypt.org/directory
    # 账号
    email: user@example.com
    # 存储 ACME 账号私钥的 secret 名字
    privateKeySecretRef:
      name: letsencrypt-staging

    # DNS-01
    solvers:
      # selector 为空匹配所有域名
      - selector: {}
        dns01:
          clouddns:
            # The ID of the GCP project
            # reference: https://docs.cert-manager.io/en/latest/tasks/issuers/setup-acme/dns01/google.html
            project: $PROJECT_ID
            # This is the secret used to access the service account
            serviceAccountSecretRef:
              name: clouddns-dns01-solver-svc-acct
              key: key.json

      # 为 foo.com 使用该 provider
      # 还可以使用 matchLabels 和 dnsZones
      - selector:
          dnsNames:
            - foo.com
        dns01:
          cloudflare:
            email: my-cloudflare-acc@example.com
            # 需要先创建 secret
            # kubectl create secret generic cloudflare-api-key-secret
            # CF 支持 API Token 和 API Key
            apiKeySecretRef:
              name: cloudflare-api-key-secret
              key: api-key
```

# FAQ

## account credentials not found for domain

如果是 dns, 可能是域名不匹配.

例如 申请 sub.domain.tld. 需要配置的是子域名, 不会自动匹配泛域名, 例如配置过 `_acme_changlle.domain.tld` 也不会生效

## Error creating new order :: Domain name "sub.domain.tld" is redundant with a wildcard domain in the same request

```yaml
dnsNames:
  - domain.tld
  - '*.domain.tld'
  # 不能添加这个域名 - 已经被上面覆盖
  # - sub.domain.tld
  - '*.sub.domain.tld'
```

## 证书跨空间

1. 配置 ingress 设置默认 tls secret, 然后之后的 ingress 不配置 secret

- 修改较大，不建议

2. 同步

---

- ~~目前无法修改 secret annotations - [#977](https://github.com/jetstack/cert-manager/issues/977)~~
  - 可以使用预先存在的 secret - 然后配合 kubed 使用
    - 在来源上定义，同步到目标
- [emberstack/kubernetes-reflector](https://github.com/emberstack/kubernetes-reflector)
  - 可替代 kubed - 支持证书 secret 同步
  - 先定义目标再定义来源

**kubed**

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: sandbox
  namespace: cert-manager
spec:
  secretName: sandbox-tls
  commonName: sandbox
  issuerRef:
    name: sandbox-ca
    kind: Issuer
    group: cert-manager.io
  secretTemplate:
    annotations:
      kubed.appscode.com/sync: "cert-manager-tls=sandbox" # Sync certificate to matching namespaces
```

**reflector**

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: source
  namespace: cert-manager
spec:
  secretName: source-tls
  commonName: source
  issuerRef:
    name: source-ca
    kind: Issuer
    group: cert-manager.io
  secretTemplate:
    annotations:
      reflector.v1.k8s.emberstack.com/reflection-allowed: "true"
      reflector.v1.k8s.emberstack.com/reflection-allowed-namespaces: "dev,staging,prod"  # Control destination namespaces
      reflector.v1.k8s.emberstack.com/reflection-auto-enabled: "true" # Auto create reflection for matching namespaces
      reflector.v1.k8s.emberstack.com/reflection-allowed-namespaces: "dev,staging,prod" # Control auto-reflection namespaces
```

直接支持证书

```yaml
apiVersion: cert-manager.io/v1alpha1
kind: Certificate
metadata:
  name: default-cert
  annotations:
    reflector.v1.k8s.emberstack.com/secret-reflection-allowed: 'true'
    reflector.v1.k8s.emberstack.com/secret-reflection-allowed-namespaces: 'namespace-1,namespace-2,namespace-[0-9]*'
spec:
  secretName: certificate-secret
```

## The request must include a value for the "externalAccountBinding" field

- zarossl 需要 EAB 外部账号绑定

```yaml
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: zerossl-prod
spec:
  acme:
    externalAccountBinding:
      keyAlgorithm: HS256
      keyID: XXX
      keySecretRef:
        key: secret
        name: zerossl-eabsecret
    preferredChain: ""
    privateKeySecretRef:
      name: zerossl-prod
    server: https://acme.zerossl.com/v2/DV90
    solvers:
    - http01:
        ingress:
          class: traefik
---
apiVersion: v1
kind: Secret
metadata:
  name: zerossl-eabsecret
  # 注意 ns
  namespace: cert-manager
type: Opaque
# stringData:
#   secret: XXX
data:
  secret: XXX
```

## Failed to retrieve Order resource: 404 urn:ietf:params:acme:error:malformed
