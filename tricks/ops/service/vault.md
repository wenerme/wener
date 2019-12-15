# Vault

## Tips
* [Vault project](https://www.vaultproject.io/)
* 为什么使用 Vault
  * 避免密钥到处放
  * 提供动态密钥
  * 加密服务
  * 审计日志
  * 便于撤销
* 默认服务端口 8200
* 支持多种授权方式
  * LDAP
  * GitHub
  * JWT/OIDC
  * RADIUS
  * Username/Password
  * Tokens
* 支持多种后端存储
* 支持多种密钥引擎
* 概念
  * 后端存储
    * 存储的是 Vault 的信息
  * 密钥引擎
    * 如何存取密钥
    * 密钥格式用途
    * 内外密钥引擎对接
* Consul vs Vault
  * 最大的区别是一个强调加密一个强调服务发现
  * Consul 的配置是 KV
  * Vault 的是目录格式 - 两个形式上有些类似

```bash
# macOS
brew instal vault

# 启动开发模式的服务 - 用于本地实验
# 会输出 root token - 用于登陆授权
# unseal key
vault server -dev

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

## vault agent
* 自动授权
* 缓存
* 模板

```bash
cat <<EOF > agent.json
{
  "pid_file": "./vault.pid",
  "vault": {"address":"https://myvault:8200"},
  "auto_auth": {
      "sink":{
        "file":{
          "config":{
            "path":"./vault.file"
          }
        }
      }
  },
  "cache":{"use_auto_auth_token": true}
}
EOF
cache {
        use_auto_auth_token = true
}

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
