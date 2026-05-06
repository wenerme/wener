---
title: wechat-decrypt
---

# wechat-decrypt

- [ylytdeng/wechat-decrypt](https://github.com/ylytdeng/wechat-decrypt)
  - Python

```
kernel32.OpenProcess
kernel32.VirtualQueryEx
kernel32.ReadProcessMemory
```

- `db_storage/*.db`
  - `salt`
  - 读取内存，找到 key/salt
  - 用 HMAC 校验确认 key 是否正确
  - 用 key 解密 SQLite 页面


```
AES-256-CBC
HMAC-SHA512
PBKDF2-HMAC-SHA512
page size = 4096
reserve = 80
```

```
mac_salt = salt xor 0x3a
mac_key = PBKDF2-HMAC-SHA512(enc_key, mac_salt, 2)
HMAC(page1 data + page number)
```

```pwsh
ls C:\Users\$env:USERNAME\xwechat_files\wxid_*\db_storage\*
```

```bash
sudo uv run python find_all_keys.py

#
ls all_keys.json
```

