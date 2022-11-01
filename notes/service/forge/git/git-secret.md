---
title: git-secret
---

# git-secret

- [sobolevn/git-secret](https://github.com/sobolevn/git-secret)
  - MIT, Shell
  - 依赖: bash 3.2+, gawk 4+, git 1.8+, gpg 1.4-2.x, sha256sum 8.21+
- 默认 gpg
- 配置 SECRETS_GPG_COMMAND 可使用兼容的命令
- 存储于 .gitsecret/ - SECRETS_DIR

```bash
brew install git-secret # macOS

git secret init # .gitsecret/
git secret tell -m
echo SECREY > secret.txt     # 希望隐藏的密钥信息
echo secret.txt > .gitignore # 避免 git 处理
git secret add secret.txt    # 加密
git secret hide              # 隐藏
rm secret.txt                # 删除原始
git secret reveal            # 恢复
```
