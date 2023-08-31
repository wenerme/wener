---
title: smallstep
---

# smallstep

- [smallstep/certificates](https://github.com/smallstep/certificates)
  - CA, ACME server
- [smallstep/cli](https://github.com/smallstep/cli)
- kubernetes
  - step-certificates https://hub.helm.sh/charts/smallstep/step-certificates
  - [smallstep/autocert](https://github.com/smallstep/autocert)
    - 注入 TLS/HTTPS 证书到容器
- 参考
  - [Everything you should know about certificates and PKI but are too afraid to ask](https://smallstep.com/blog/everything-pki)
  - [The case for using TLS everywhere](https://smallstep.com/blog/use-tls)
- step-ca
  - 支持数据库 Badger, BoltDB, MySQL, PostgreSQL
    - 目前正在将 NoSQL 调整为 SQL 逻辑 - 会支持更多 DB [smallstep/certificates#282](https://github.com/smallstep/certificates/issues/282)
- 支持的运行模式
  - 离线 - 不启动服务，离线管理证书
  - 在线 - 启动 step-ca，提供接口能力
  - RA - Registration Authority
    - RA 作为 CA 的前端
    - 例如为 Vault 提供 ACMEv2 server 的能力

:::tip

- vault 不支持作为 acme server，如果需要私有化 acme 可以考虑 step-ca
  - [hashicorp/vault#8690](https://github.com/hashicorp/vault/issues/8690)
  - step-ca 支持将 vault 作为 RA/registration authority
  - 也可以使用 [letsencrypt/boulder](https://github.com/letsencrypt/boulder)

:::

```bash
# macOS
brew install step
# AlpineLinux
apk add step-cli step-certificates -X http://mirrors.sjtug.sjtu.edu.cn/alpine/edge/testing/

step path # 数据目录
STEPPATH=/tmp/step step path
# 配置 $(step path)/config/ca.json


# 生成 CA $HOME/.step/certs/root_ca.crt $HOME/.step/secrets/root_ca_key
cat /dev/urandom | env LC_CTYPE=C tr -dc 'a-zA-Z0-9' | head -c 32 > ./passwd
step ca init --name "Local CA" --provisioner admin --dns localhost --address ":443" --deployment-type=standalone --password-file=./passwd
step ca certificate --offline foo.smallstep.com foo.crt foo.key

step-ca $(step path)/config/ca.json
# 获取当前的 root fingerprint
step certificate fingerprint $(step path)/certs/root_ca.crt
# 另外一个节点
step ca bootstrap --ca-url 127.0.0.1:443 --fingerprint <root fingerprint>

# 生成证书
step ca certificate localhost srv.crt srv.key
# 保持 root ca - 有些场景需要用于认证
step ca root root.crt

# 查看证书信息
step certificate inspect srv.crt --short

# 生成 CSR
step certificate create --csr foo.example.com foo.csr foo.key
# 对 CSR 签名
step ca sign foo.csr foo.crt
# renew 证书
step ca renew foo.crt foo.key
# 回收证书
step ca revoke --cert svc.crt --key svc.key


# 当前支持 provisioner
step ca provisioner list
# 添加后需要重启 ca 生效
step ca provisioner add you@example.com --create

# step 包含 jwt 解码逻辑
echo $TOKEN | step crypto jwe decrypt  | jq

# 生成证书会要求选择 provisioner
step ca certificate mike@example.com mike.crt mike.key

step certificate inspect --short mike.crt

# 添加 google 作为 IdP
step ca provisioner add Google --type oidc --ca-config $(step path)/config/ca.json \
  --client-id 650445034027-jsjdrkiskeq9ke99ud2rqkst82ft8uch.apps.googleusercontent.com \
  --client-secret 6Q7lGMua_Oox4nA92QBXYypT \
  --configuration-endpoint https://accounts.google.com/.well-known/openid-configuration \
  --domain smallstep.com --domain gmail.com


# X5C - 可以再用于生成证书
step ca provisioner add x5c-smallstep --type X5C --x5c-root $(step path)/certs/root_ca.crt
# SSHPOP - renew, revoke, rekey an SSH certificate
step ca provisioner add sshpop --type SSHPOP
# ACME - https://smallstep.com/docs/tutorials/acme-challenge
# 作为 ACMEv2 server
# https://{ca-host}/acme/{provisioner-name}/directory
step ca provisioner add acme --type ACME
# step certificate install

# K8S SA
step ca provisioner add my-kube-provisioner --type K8sSA --pem-keys key.pub
```

## ssh

```bash
# 初始化 CA 带 ssh 证书支持
step ca init --ssh
# 生成配置
step ssh config --roots > /path/to/ssh_user_key.pub
# 配置 CA
cat << EOF >> /etc/ssh/sshd_config
# This is the CA's public key for authenticating user certificates:
TrustedUserCAKeys /path/to/ssh_user_key.pub
EOF
# 生成证书
step ssh certificate alice@smallstep.com id_ecdsa
# 查看生成的证书信息
cat id_ecdsa-cert.pub | tail -1 | step ssh inspect

# 生成 host key
step ssh certificate --host internal.example.com ssh_host_ecdsa_key
cat ssh_host_ecdsa_key-cert.pub | step ssh inspect
# 配置 host key
mv ssh_host_ecdsa_key ssh_host_ecdsa_key-cert.pub /etc/ssh
cat << EOF >> /etc/ssh/sshd_config
# This is our host private key and certificate:
HostKey /etc/ssh/ssh_host_ecdsa_key
HostCertificate /etc/ssh/ssh_host_ecdsa_key-cert.pub
EOF

# 自动更新 host key
cat << EOF > /etc/cron.weekly/rotate-ssh-certificate
#!/bin/sh
export STEPPATH=/root/.step
cd /etc/ssh && step ssh renew ssh_host_ecdsa_key-cert.pub ssh_host_ecdsa_key --force 2> /dev/null
exit 0
EOF
chmod 755 /etc/cron.weekly/rotate-ssh-certificate

# 添加到 known_hosts 信任主机
step ssh config --host --roots
```

## 配置

- STEPPATH
- $(step path --base)/
  - contexts.json
  - current-context.json
  - `authorities/<AUTHORITY>/`
  - `profiles/<PROFILE>/`
    - config/
      - defaults.json
      - ca.json
- AUTHORITY/ - 如果没有 context 则目录为 `$(step path --base)`
  - certs/
    - intermediate_ca.crt
    - root_ca.crt
  - config/
    - ca.json
    - defaults.json
  - db
  - secrets
    - intermediate_ca_key
    - root_ca_key
  - templates

```json tite="contexts.json"
{
  "alpha-one": {
    "authority": "alpha-one.ca.smallstep.com",
    "profile": "alpha-one"
  },
  "alpha-two": {
    "authority": "alpha-two.ca.smallstep.com",
    "profile": "alpha-two"
  },
  "beta": {
    "authority": "beta.ca.smallstep.com",
    "profile": "beta"
  }
}
```
