---
title: SOPS
---

# SOPS

- [mozilla/sops](https://github.com/mozilla/sops)
  - 加密 yaml, json 字段而非整个文件
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

```yaml
sops:
  kms:
    - enc:
      enc_ts:
      arn:
  pgp:
    - fp:
      created_at:
  enc:
```

**.sops.yaml**

```yaml
creation_rules:
  - path_regex:
```
