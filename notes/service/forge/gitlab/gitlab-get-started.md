---
tags:
  - GetStarted
---

# Gitlab Get Started

> **Note**
>
> 1. 推荐使用 ssh 拉取 - 更快

## 设置中文

1. 前往 https://gitlab.com/-/profile/preferences#localization
2. 选择 Chinese

## 确认 SSH key

> 1. 用于 git 仓库登陆
> 2. 用于服务器登陆
> 3. 有时用于加密解密数据

- id_rsa.pub, id_ed25519.pub

```bash
# Windows
type %HOMEDRIVE%%HOMEPATH%\.ssh\id_rsa.pub
type %USERPROFILE%\.ssh\id_rsa.pub

# macOS, Linux
cat ~/.ssh/id_rsa.pub

# 如果没有则生成
ssh-keygen -t ed25519 -C "user@example.com"
```

- 会输出生成到的位置
- 会要求输入密钥
- 不想要每次都输入密钥可以 `ssh-add`

## 设置共钥

1. 前往 https://gitlab.com/-/profile/keys
2. 获取公钥 - id_rsa.pub, id_ed25519.pub
   ```bash
   # Windows
   # 也可能在 %USERPROFILE%/.ssh/
   type %HOMEDRIVE%%HOMEPATH%\.ssh\id_rsa.pub
   # macOS, Linux
   cat ~/.ssh/id_rsa.pub
   ```
3. 输入提交
