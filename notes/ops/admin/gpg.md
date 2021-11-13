---
title: GPG
---

# GPG

- [GNU Privacy Guard](https://en.wikipedia.org/wiki/GNU_Privacy_Guard)
- https://gnupg.org/documentation/manuals/gnupg/GPG-Commands.html
- Cheatsheet
  - http://stuff.imeos.org/persistent/gpg-cheatsheet.pdf
  - https://devhints.io/gnupg
  - http://irtfweb.ifa.hawaii.edu/~lockhart/gpg/
- Public keyservers
  - pgp.mit.edu
  - keys.gnupg.net
  - sks-keyservers.net
- `~/.gnupg/pubring.gpg`

```bash
brew install gpg
# 对话框输入
brew install pinentry-mac

# 生成秘钥
gpg --gen-key

# gpg -k
gpg --list-keys
gpg --list-secret-keys

# 提交到服务器
gpg --keyserver hkp://pgp.mit.edu --send-keys $KEYID
# 验证是否成功
gpg --keyserver hkp://pgp.mit.edu --recv-keys $KEYID

# 导出
gpg --export-secret-keys $KEYID > private.key
# 导入
gpg --import private.key

# 配置信息
gpgconf --list-components
# check password
gpg --dry-run --passwd $KEYID
```

## gpg-agent.conf

- ~/.gnupg/gpg-agent.conf

```bash
pinentry-program /usr/local/bin/pinentry-mac
```

## FAQ

### 失效后操作

```bash
gpg --edit-key $KEYID
list

key 0
expire

key 1
expire

list    # 确认
save    # 保存退出
```

### gpg: lookup_hashtable failed: Unknown system error

```
gpg --fix-trustdb

cd ~/.gnupg
gpg --export-ownertrust > otrust.tmp
rm trustdb.gpg
gpg --import-ownertrust < otrust.tmp
```

## gpg --help

```
gpg (GnuPG) 2.2.5
libgcrypt 1.8.2
Copyright (C) 2018 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <https://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

Home: /Users/user/.gnupg
支持的算法：
公钥：RSA, ELG, DSA, ECDH, ECDSA, EDDSA
对称加密：IDEA, 3DES, CAST5, BLOWFISH, AES, AES192, AES256,
     TWOFISH, CAMELLIA128, CAMELLIA192, CAMELLIA256
散列：SHA1, RIPEMD160, SHA256, SHA384, SHA512, SHA224
压缩：不压缩, ZIP, ZLIB, BZIP2

Syntax: gpg [options] [files]
Sign, check, encrypt or decrypt
Default operation depends on the input data

指令：

 -s, --sign                  make a signature
     --clear-sign            make a clear text signature
 -b, --detach-sign           生成一份分离的签名
 -e, --encrypt               加密数据
 -c, --symmetric             仅使用对称加密
 -d, --decrypt               解密数据(默认)
     --verify                验证签名
 -k, --list-keys             列出密钥
     --list-signatures       列出密钥和签名
     --check-signatures      列出并检查密钥签名
     --fingerprint           列出密钥和指纹
 -K, --list-secret-keys      列出私钥
     --generate-key          生成一副新的密钥对
     --quick-generate-key    quickly generate a new key pair
     --quick-add-uid         quickly add a new user-id
     --quick-revoke-uid      quickly revoke a user-id
     --quick-set-expire      quickly set a new expiration date
     --full-generate-key     full featured key pair generation
     --generate-revocation   生成一份吊销证书
     --delete-keys           从公钥钥匙环里删除密钥
     --delete-secret-keys    从私钥钥匙环里删除密钥
     --quick-sign-key        quickly sign a key
     --quick-lsign-key       quickly sign a key locally
     --sign-key              为某把密钥添加签名
     --lsign-key             为某把密钥添加本地签名
     --edit-key              编辑某把密钥或为其添加签名
     --change-passphrase     change a passphrase
     --export                导出密钥
     --send-keys             把密钥导出到某个公钥服务器上
     --receive-keys          从公钥服务器上导入密钥
     --search-keys           在公钥服务器上搜寻密钥
     --refresh-keys          从公钥服务器更新所有的本地密钥
     --import                导入/合并密钥
     --card-status           打印卡状态
     --edit-card             更改卡上的数据
     --change-pin            更改卡的 PIN
     --update-trustdb        更新信任度数据库
     --print-md              print message digests
     --server                run in server mode
     --tofu-policy VALUE     set the TOFU policy for a key

选项：

 -a, --armor                 输出经 ASCII 封装
 -r, --recipient USER-ID     encrypt for USER-ID
 -u, --local-user USER-ID    use USER-ID to sign or decrypt
 -z N                        set compress level to N (0 disables)
     --textmode              使用标准的文本模式
 -o, --output FILE           write output to FILE
 -v, --verbose               详细模式
 -n, --dry-run               不做任何改变
 -i, --interactive           覆盖前先询问
     --openpgp               行为严格遵循 OpenPGP 定义

(请参考在线说明以获得所有命令和选项的完整清单)

Examples:

 -se -r Bob [file]          sign and encrypt for user Bob
 --clear-sign [file]        make a clear text signature
 --detach-sign [file]       make a detached signature
 --list-keys [names]        show keys
 --fingerprint [names]      show fingerprints

请向 <https://bugs.gnupg.org> 报告程序缺陷。
请向 <zuxyhere@eastday.com> 反映简体中文翻译的问题。
```
