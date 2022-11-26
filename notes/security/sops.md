---
title: SOPS
---

# SOPS

- [mozilla/sops](https://github.com/mozilla/sops)
  - sops 是个 **编辑器**
  - 加密 yaml, json 字段而非整个文件
  - 支持 yaml, json, dotenv, plaintext, ini
  - 支持后端: [age](./age.md), pgp, vault
- 加密后字段 `ENC[算法名字,data:,iv:,add:,tag:]`

:::caution

- 暂不支持 SSH keys + age
  - [#1134](https://github.com/mozilla/sops/pull/1134)
  - [#898](https://github.com/mozilla/sops/pull/898)
- 支持 SSH keys [sops#692](https://github.com/mozilla/sops/issues/692)

:::

```bash
brew install sops # macOS
# 直接下载
curl -Lo ~/bin/sops https://github.com/mozilla/sops/releases/download/v3.7.3/sops-v3.7.3.darwin.amd64
chmod 755 ~/bin/sops

# 配置 git diff 处理 sops 加密文件
git config diff.sopsdiffer.textconv "sops -d"

# 加密部分文件
sops --encrypt --encrypted-regex '^(data|stringData)$' k8s-secrets.yaml
```

- age
  - --age,SOPS_AGE_RECIPIENTS
  - `$XDG_CONFIG_HOME/sops/age/keys.txt`
  - `$HOME/Library/Application Support/sops/age/keys.txt`
  - `%AppData%\sops\age\keys.txt`

```yaml title="加密后的数据"
# 数据
a: 1

# 附加数据
sops:
  kms: []
  gcp_kms: []
  azure_kv: []
  hc_vault: []
  age: []
  lastmodified: '2022-11-08T01:41:42Z'
  mac:
  pgp:
    - created_at: '2022-11-08T01:40:45Z'
      enc: |-
        -----BEGIN PGP MESSAGE-----
        -----END PGP MESSAGE-----
      fp:
  unencrypted_suffix: _unencrypted
  version: 3.7.3
```

**.sops.yaml**

```yaml
creation_rules:
  - path_regex:
```

| env           | for |
| ------------- | --- |
| SOPS_GPG_EXEC |
| EDITOR        | vim |

| flag                                | for |
| ----------------------------------- | --- |
| -d,--decrypt                        |
| -e,--encrypt                        |
| -r,--rotate                         |
| -p,--pgp SOPS_PGP_FP                |
| -a,--age SOPS_AGE_RECIPIENTS        |
| -i,--in-place                       |
| --extract PATH                      |
| --input-type TYPE                   |
| --output-type TYPE                  |
| -s,--show-master-keys               |
| --add-hc-vault-transit VALUE        |
| --rm-hc-vault-transit VALUE         |
| --add-age VALUE                     |
| --rm-age VALUE                      |
| --add-pgp VALUE                     |
| --rm-pgp VALUE                      |
| --ignore-mac                        |
| --unencrypted-suffix SUFFIX         |
| --unencrypted-regex REGEX           |
| --cofig FILE                        |
| --set "PATH VALUE"                  |
| --shamir-secret-sharing-threshold 0 |
| --output FILE                       |
| --enable-local-keyservice           |
| --keyservice PATH                   |
| --verbose                           |

# FAQ

## spawnSync sops ENOENT

- https://github.com/signageos/vscode-sops/issues/4

## vsc

```bash
EDITOR="code --wait" sops values.yaml
```
