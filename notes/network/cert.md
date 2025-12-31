---
title: Certificate Management
tags:
  - Network
  - Certificate
  - CA
  - Security
---

# Certificate Management

- [cloudflare/cfssl](https://github.com/cloudflare/cfssl)
  - [Introducing CFSSL](https://blog.cloudflare.com/introducing-cfssl/)
  - [cloudflare/sslconfig](https://github.com/cloudflare/sslconfig)
  - [cloudflare/cfssl_trust](https://github.com/cloudflare/cfssl_trust)
  - [cloudflare/certmgr](https://github.com/cloudflare/certmgr)
- [square/certstrap](https://github.com/square/certstrap)
  - Tools to bootstrap CAs, certificate requests, and signed certificates.
- [FiloSottile/mkcert](https://github.com/FiloSottile/mkcert)
  - A simple zero-config tool to make locally trusted development certificates with any names you'd like. [mkcert.dev](https://mkcert.dev)
- [Generate Self-Signed Certificates](https://coreos.com/os/docs/latest/generate-self-signed-certificates.html)
- [smallstep/certificates](https://github.com/smallstep/certificates)

## CFSSL

- `cfssl`: Command line tool
- `multirootca`: Certificate authority server with multiple keys
- `mkbundle`: Build certificate pool bundles
- `cfssljson`: JSON output to file

```bash
go get -v -u github.com/cloudflare/cfssl/cmd/{cfssl,multirootca,mkbundle,cfssljson}

# CA 的 CSR - 按需修改
cfssl print-defaults csr > ca-csr.json
# 生成 CA
cfssl gencert -initca ca-csr.json | cfssljson -bare ca -

# 配置 - 包含了预定义的 profile - 按需修改
cfssl print-defaults config > ca-config.json
# 生成 www 的 csr - 按需修改
cfssl print-defaults csr > www.json
# 生成证书
cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=www www.json | cfssljson -bare www

# 生成 client 证书 - 可以不用 csr 直接生成 - 也可以先生成 csr 进行修改
echo '{"CN":"client","hosts":[""],"key":{"algo":"rsa","size":2048}}' | cfssl gencert -ca=ca.pem -ca-key=ca-key.pem -config=ca-config.json -profile=client - | cfssljson -bare client
```

```json
{
  /* 公司名字 */
  "CN": "Wener Inc",
  /* 加密算法 - 也可以使用常见的 {"algo": "rsa","size": 2048} */
  "key": {
    "algo": "ecdsa",
    "size": 256
  },
  "names": [
    {
      /* 国家 */
      "C": "CN",
      /* 省市/州 */
      "ST": "SH",
      /* 区 */
      "L": "Ming Hang",
      /* 组织名字 - 一般为公司名字 */
      "O": "Shanghai Wener Inc"
      /* 组织部门 - 一般可以不用 "OU": "DevTech" */
    }
  ]
}
```

https://www.digicert.com/csr-ssl-installation/nginx-openssl.htm

```nginx
server {

listen   443;

ssl    on;
ssl_certificate    /etc/ssl/your_domain_name.pem; (or bundle.crt)
ssl_certificate_key    /etc/ssl/your_domain_name.key;

server_name your.domain.com;
access_log /var/log/nginx/nginx.vhost.access.log;
error_log /var/log/nginx/nginx.vhost.error.log;
location / {
root   /home/www/public_html/your.domain.com/public/;
index  index.html;
}

}
```

## CA

https://www.phildev.net/ssl/creating_ca.html
https://www.phildev.net/ssl/opensslconf.html
