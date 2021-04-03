---
id: vault
title: Vault
---

# Vault
* 是什么？
  * 提供密钥管理、证书管理、外部授权集成
  * 提供角色访问密钥权限控制
  * 实现 CA 服务
  * Secret as a Service - 密钥即服务
    * 例如 阿里云 KMS、AWS KMS
* [Vault project](https://www.vaultproject.io/)
* 为什么使用 Vault
  * 避免密钥到处放
  * 提供动态密钥
  * 加密服务
  * 审计日志
  * 便于撤销
  * 服务应用集成
    * 例如 自动创建 db 账号密码、SSH密钥管理
* 默认服务端口 8200
* 支持多种授权方式
  * AppRole
  * alicloud
  * LDAP
  * GitHub
  * JWT/OIDC
  * RADIUS
  * Username/Password
  * Tokens
  * Kubernetes
  * Kerberos
* 支持多种后端存储 - consul,etcd,file,inmem,mysql,postgresql,raft,s3,zppkeeper
* 概念
  * 后端存储
    * 存储的是 Vault 的信息
  * 密钥引擎
    * 存储、生成、加密数据
    * 被挂载到一个目录
    * 部分直接存储数据，部分与外部系统交互
    * 生命周期： Enable、Disable、Move、Tune
      * Tune 类似于配置
    * 引擎只能看到挂载目录下内容 - 类似于 chroot
* 环境变量
  * VAULT_ADDR 服务端地址
  * VAULT_TOKEN 请求的 Token

```bash
# macOS
brew instal vault

# 启动开发模式的服务 - 用于本地实验
# 会输出 root token - 用于登陆授权
# unseal key
# 固定 root token 方便调试
vault server -dev -dev-root-token-id="root"
export VAULT_ADDR='http://127.0.0.1:8200'
vault plugin list

# docker 启动 - 开发模式
# VAULT_LOCAL_CONFIG 可以用 JSON 进行配置
# VAULT_DEV_ROOT_TOKEN_ID - 自定义 Token
docker run --rm -it \
  -p 8200:8200 \
  -v $PWD/vault/log:/vault/logs \
  -v $PWD/vault/data:/vault/file \
  -v $PWD/vault/config:/vault/config \
  --cap-add=IPC_LOCK \
  --name vault vault

# 生产运行
# 如果数据目录没有数据 - 那么进入 UI 会进行初始化
docker run --rm -it \
  -p 8200:8200 \
  -v $PWD/vault/log:/vault/logs \
  -v $PWD/vault/data:/vault/file \
  -v $PWD/vault/config:/vault/config \
  -e 'VAULT_LOCAL_CONFIG={"ui":true,"listener":{"tcp":{"address":"0.0.0.0:8200","tls_disable":true}},"backend": {"file": {"path": "/vault/file"}}, "default_lease_ttl": "168h", "max_lease_ttl": "720h"}' \
  --cap-add=IPC_LOCK \
  --name vault vault server

# 客户端的链接地址
export VAULT_ADDR='http://127.0.0.1:8200'
```

## 基础操作

```bash
echo '{"ui":true,"listener":{"tcp":{"address":"0.0.0.0:8200","tls_disable":true}},"backend": {"file": {"path": "vault-file"}}, "default_lease_ttl": "168h", "max_lease_ttl": "720h"}' > config.json
# 启动服务端
vault server -config=config.json > vault.log &
export VAULT_ADDR='http://127.0.0.1:8200'
vault init -key-shares=2 -key-threshold=1
vault unseal
vault login
# KV 写入
vault write secret/hello value=world
echo -n '{"value":"itsasecret"}' | vault write secret/password -
echo -n "itsasecret" | vault write secret/password value=-
# { "value": "itsasecret" }
cat data.json
vault write secret/password @data.json
# itsasecret
cat data.txt
vault write secret/password value=@data.txt
vault read secret/hello
vault read -format=json secret/hello | jq ".data.value" -r
vault read -field=value secret/password
```

## approle
```bash
# 先使用 ROOT 登陆
vault login

# 只读
cat <<EOF | vault policy write secret-read -
path "secret/*" {
  capabilities = [ "read" ]
}
EOF

cat <<EOF | vault policy write secret-management -
path "secret/*" {
  capabilities = [ "create", "read", "update", "delete", "list" ]
}
EOF

# 启用 approle
vault auth enable approle

# macOS 下是大写
# 也可以不预定义 ROLE_ID
ROLE_ID=$(uuidgen|tr '[:upper:]' '[:lower:]')
vault write auth/approle/role/secret-reader role_id=$ROLE_ID
# 赋予策略
vault write auth/approle/role/secret-reader policies="secret-read"
# 刚才创建的角色 ID
vault read auth/approle/role/secret-reader/role-id
# secret 不能查看 - 可以修改
vault read auth/approle/role/secret-reader/secret-id
# 从新生成 SECRET_ID
# 将结果更新到变量
SECRET_ID=$(vault write -f auth/approle/role/secret-reader/secret-id -format=json | jq -r '.data.secret_id')
# 添加到登陆
# 会生成 TOKEN - 重复操作会生成新的 Token 但之前的也会有效
TOKEN=$(vault write --format=json auth/approle/login role_id=$ROLE_ID secret_id=$SECRET_ID | jq -r '.auth.client_token')

# 验证 Token 有效
VAULT_TOKEN=$TOKEN vault read auth/token/lookup-self

# 写入测试数据
vault secrets enable -path=secret kv
vault kv put secret/test test_password=$ROLE_ID

# 使用该 TOKEN 查询
VAULT_TOKEN=$TOKEN vault kv get -field=test_password secret/test

# 可以尝试在另外一个会话使用 TOKEN 登陆
vault login $TOKEN
```

## vault agent
* 自动授权
* 缓存
* 模板
* Agent 配置对象定义 [config.go](https://gopkgs.io/src/github.com/hashicorp/vault/command/agent/config/config.go)

```bash
# APP ROLE 拿到的角色信息
echo $ROLE_ID > role_id.vault.txt
echo $SECRET_ID > secret_id.vault.txt

# remove_secret_id_file_after_reading - 默认为 true - secret_id 读取后会被删除
cat <<EOF > agent.json
{
  "pid_file": "./vault.pid",
  "vault": {
    "address": "$VAULT_ADDR"
  },
  "listener": {
    "tcp": {
      "address": "0.0.0.0:8200",
      "tls_disable": true
    }
  },
  "auto_auth": {
    "method": {
      "type": "approle",
      "config": {
        "role_id_file_path": "role_id.vault.txt",
        "secret_id_file_path": "secret_id.vault.txt"
      }
    },
    "sink": [
      {
        "type": "file",
        "config": {
          "path": "./agent-token.file"
        }
      }
    ]
  },
  "cache": {
    "use_auto_auth_token": true
  }
}
EOF

vault agent -config agent.json

# 使用本地和获取到的 Token
export VAULT_ADDR=http://127.0.0.1:8200
VAULT_TOKEN=$(cat agent-token.file) vault read auth/token/lookup-self

# 登陆后则可以一直访问
vault login $(cat agent-token.file)
vault read auth/token/lookup-self
```

## Consul Secret
* 基于 Consul 的 ACL 策略动态生成 Consul API 的 Token
* 依赖 global-management 的 token

```bash
# 如果没有配置过 token
consul acl bootstrap

# 启用 consul secret
vault secrets enable consul
# 创建 token
CONSUL_HTTP_TOKEN=d54fe46a-1f57-a589-3583-6b78e334b03b consul acl token create -policy-name=global-management
# 使用新创建的 token
vault write consul/config/access \
    address=127.0.0.1:8500 \
    token=7652ba4c-0f6e-8e75-5724-5e083d72cfe4

# 新增角色 - 关联策略
vault write consul/roles/my-role policy=$(base64 <<< 'key "" { policy = "read" }')
# 角色关联现有策略
vault write consul/roles/my-role policies=readonly
# 获取授权信息
vault read consul/creds/my-role
```

## PostgreSQL 存储

```sql
CREATE TABLE vault_kv_store (
  parent_path TEXT COLLATE "C" NOT NULL,
  path        TEXT COLLATE "C",
  key         TEXT COLLATE "C",
  value       BYTEA,
  CONSTRAINT pkey PRIMARY KEY (path, key)
);

CREATE INDEX parent_path_idx ON vault_kv_store (parent_path);
```

```hcl
storage "postgresql" {
  connection_url = "postgres://user123:secret123!@localhost:5432/vault?sslmode=disable"
}
```

## 密码生成

```bash
vault write sys/plugins/catalog/secrets-gen \
  sha_256=$(docker run --rm wener/vault sha256sum /etc/vault/plugins/vault-secrets-gen|cut -d ' ' -f 1) \
  command=vault-secrets-gen

vault secrets enable -path=gen -plugin-name=secrets-gen plugin

vault write gen/password length=36 symbols=0

vault write sys/plugins/catalog/secrets-gen \
    sha_256="${SHA256}" \
    command="vault-secrets-gen"
```


## 配置
* https://www.vaultproject.io/docs/configuration/

```hcl
# 存储
storage "consul" {
  address = "127.0.0.1:8500"
  path    = "vault"
  # token   = "abcd1234"
}

listener "tcp" {
  address     = "127.0.0.1:8200"
  tls_disable = 1
}

ui = true

#telemetry {
#  statsite_address = "127.0.0.1:8125"
#  disable_hostname = true
#}
```

```bash
vault server -config=vault.hcl
export VAULT_ADDR='http://127.0.0.1:8200'
vault operator init
# 输入指定次数 unseal token
vault operator unseal
# 使用 root token 登陆
vault login
```

__consul.acl.json__

```json
{
  "key_prefix": {
    "vault/": {
      "policy": "write"
    }
  },
  "node_prefix": {
    "": {
      "policy": "write"
    }
  },
  "service": {
    "vault": {
      "policy": "write"
    }
  },
  "agent_prefix": {
    "": {
      "policy": "write"
    }
  },
  "session_prefix": {
    "": {
      "policy": "write"
    }
  }
}
```

# FAQ
## Consul vs Vault
* 最大的区别是一个强调加密一个强调服务发现
* Consul 的配置是 KV
* Vault 的是目录格式 - 两个形式上有些类似
