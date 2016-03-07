<!--
title: Vault 基础
date: 2016-2-18
link: vault
-->

## 开始
```
vault server -dev
```

```
vault write secret/hello value=world
vault read secret/hello
```

## 基础

__conf.hcl__

```
backend "file" {
  path = "memo"
}

listener "tcp" {
 address = "127.0.0.1:8200"
 tls_disable = 1
}
```

```
$ vault server -config=conf.hcl > vault.log &
$ export VAULT_ADDR='http://127.0.0.1:8200'
$ vault init -key-shares=2 -key-threshold=1
$ vault unseal
$ vault auth
$ vault write secret/hello value=world
$ echo -n '{"value":"itsasecret"}' | vault write secret/password -
$ echo -n "itsasecret" | vault write secret/password value=-
$ cat data.json
{ "value": "itsasecret" }
$ vault write secret/password @data.json
$ cat data.txt
itsasecret
$ vault write secret/password value=@data.txt
$ vault read secret/hello
$ vault read -format=json secret/hello | jq ".data.value" -r
$ vault read -field=value secret/password
```

## 参考

* [Vault project](https://www.vaultproject.io/)
