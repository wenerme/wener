---
title: git-crypt
tags:
  - Security
  - CLI
---

# git-crypt

- [AGWA/git-crypt](https://github.com/AGWA/git-crypt)
  - MIT, C
  - 加密 git 仓库中的敏感信息

```bash
brew install git-crypt # macOS
apk add git-crypt      # Alpine
# docker pull agwa/git-crypt:latest

# 初始化
git-crypt init
# 添加 GPG 用户
git-crypt add-gpg-user USER_ID

# 导出对称密钥
git-crypt export-key /path/to/key

# 解锁仓库（GPG）
git-crypt unlock

# 解锁仓库（对称密钥）
git-crypt unlock /path/to/key

# 查看状态（只看加密文件）
git-crypt status -e

# 锁定仓库
git-crypt lock
```
