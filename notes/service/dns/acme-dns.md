---
title: acme-dns
---

# acme-dns

- 是什么？
  - 专门用于辅助申请 cert 的 dns 服务 - 提供 HTTP 接口
  - 将现有 `_acme-challenge.domain.tld.` CNAME 到从该服务申请的二级域名 - 例如 `abc.auth.example.org`
  - 避免操作现有 DNS 服务
  - 支持 selfhost - acme-dns.io 国内不一定能访问
  - 适用于单个域名需要证书，域名使用的外部 DNS 服务且指向的内部 IP
  - 适用于泛域名证书
- 支持客户端
  - [acme.sh](https://github.com/Neilpang/acme.sh)
  - [Certify The Web](https://github.com/webprofusion/certify)
  - [cert-manager](https://github.com/jetstack/cert-manager)
  - [Lego](https://github.com/xenolf/lego)
  - [Posh-ACME](https://github.com/rmbolger/Posh-ACME)
  - [Sewer](https://github.com/komuw/sewer)
  - [Traefik](https://github.com/containous/traefik)
  - [Windows ACME Simple (WACS)](https://www.win-acme.com)

:::caution

- 一个账号对应一个域名
  - 因为一个账号只能处理两个 record - `domain.tld`,`*.domain.tld`
  - __不能__ 共享账号给不同域名
  - [#110](https://github.com/joohoi/acme-dns/issues/110) Allow more than two records?
  - [#233](https://github.com/joohoi/acme-dns/issues/233) Register multiple domains under single login?

:::

```bash
curl -v -X POST https://auth.acme-dns.io/register
```

```json
{
  "username": "6f449871-18d4-4239-851c-8c221d56750f",
  "password": "1lBTiQ5MowHC1aJ1QmAYJh9PEe5dljFTEk0zXXJv",
  "fulldomain": "96afb9f9-93c2-4d3c-ad4a-e2ebfbf14f7b.auth.acme-dns.io",
  "subdomain": "96afb9f9-93c2-4d3c-ad4a-e2ebfbf14f7b",
  "allowfrom": []
}
```


## cert-manager

```yaml
apiVersion: cert-manager.io/v1
kind: Issuer
metadata:
  name: example-issuer
spec:
  acme:
    solvers:
    - dns01:
        acmeDNS:
          host: https://acme.example.com
          accountSecretRef:
            name: acme-dns
            key: acme-dns.json
```
