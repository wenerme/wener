---
id: cert-manager
title: Cert Manager
---

# cert-manager

## Tips
* [jetstack/cert-manager](https://github.com/jetstack/cert-manager)
* crds
  * issuers.cert-manager.io
  * orders.acme.cert-manager.io
  * certificaterequests.cert-manager.io
  * certificates.cert-manager.io
  * challenges.acme.cert-manager.io
  * clusterissuers.cert-manager.io
* [配置](https://cert-manager.io/docs/configuration/)
* [Ingress](https://cert-manager.io/docs/usage/ingress/)
* 注意
  * DNS01 支持的 Provider 非常少 - 和 LEGO 相比
    * ACMEDNS
    * Akamai
    * AzureDNS
    * CloudFlare
    * DigitalOcean
    * Google CloudDNS
    * RFC-2136
    * Route53
    * [Webhook](https://cert-manager.io/docs/configuration/acme/dns01/webhook/)
      * [pragkent/alidns-webhook](https://github.com/pragkent/alidns-webhook)


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
