---
title: age
---

# age

- [FiloSottile/age](https://github.com/FiloSottile/age)
  - BSD-3, Go
  - 简单加密工具
  - 文件维度
  - X25519

:::caution

- age 不支持 ssh agent - [age#244](https://github.com/FiloSottile/age/discussions/244)

:::

```bash
apk add age      # AlpineLinux
brew install age # macOS

age-keygen -o key.txt # 创建 key

age -e -p -o secret.txt.age secret.txt # 使用密码加密 - 默认输出为 binary 除非 -a,--armor
age -d secret.txt.age                  # 解密
age -e -i passwd.txt secret.txt        # 使用 passwd.txt 做对称加密

# 目录加密
tar cvz ~/data | age -r $RECIPIENT > data.tar.gz.age
age --decrypt -i key.txt data.tar.gz.age > data.tar.gz

age -R ~/.ssh/id_ed25519.pub example.jpg > example.jpg.age # 使用 SSH pubkey 加密
age -d -i ~/.ssh/id_ed25519 example.jpg.age > example.jpg  # 使用 SSH private key 解密
```



| flag                       | for            |
| -------------------------- | -------------- |
| -e, --encrypt              | 加密 - 默认    |
| -d, --decrypt              | 解密           |
| -o, --output OUTPUT        | 输出文件       |
| -a, --armor                | 输出 PEM 格式  |
| -p, --passphrase           | 使用密码       |
| -r, --recipient RECIPIENT  | 加密给接收人   |
| -R, --recipients-file PATH | 接收人列表目录 |
| -i, --identity PATH        |                |

- recipient 为 pubkey
  - 一行一个
  - age pubkey 格式为 `ageXXXXX` - X25519
  - ssh pubkey 格式为 `ssh-ed25519 AAAA`, `ssh-rsa AAAA`
- identity 为 key - `AGE-SECRET-KEY-1`
  - 一行一个
