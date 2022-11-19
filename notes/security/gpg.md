---
title: GPG
---

# GPG

- [GNU Privacy Guard](https://en.wikipedia.org/wiki/GNU_Privacy_Guard)
- Cheatsheet
  - http://stuff.imeos.org/persistent/gpg-cheatsheet.pdf
  - https://devhints.io/gnupg
  - http://irtfweb.ifa.hawaii.edu/~lockhart/gpg/
- Public keyservers
  - pgp.mit.edu
  - keys.gnupg.net
  - sks-keyservers.net
- `~/.gnupg/pubring.gpg`
- RFC 4880
- KEYID
  - 邮箱
  - 641CA51175E65BF5F319443E1D0D06BE9E196B37
- 参考
  - https://gnupg.org/documentation/manuals/gnupg/GPG-Commands.html
  - https://www.gnupg.org/documentation/manuals.html
- GnuPG
  - gpg - OpenPGP Protocol
  - gpgsm - S/MIME Protocol
  - gpg-card - Smartcards
  - dirmgr - crl, ocsp
  - gpg-agent
  - gpg-wks-client - Web Key Directory, Web Key Service
  - gpg-wks-server
- libgcrypt
- libksba
- libassuan
- GPGME
- Scute

```bash
brew install gpg
# 对话框输入
brew install pinentry-mac

# 生成秘钥 - RSA 推荐至少 4096
gpg --default-new-key-algo rsa4096 --gen-key
# 推荐 ECC
gpg --default-new-key-algo "ed25519/cert,sign+cv25519/encr" --quick-generate-key "wener@wener.me"
# 完整生成逻辑
gpg --full-generate-key

gpg --list-keys --keyid-format=long # 完整的 keyid
gpg --list-secret-keys
gpg --export --armor 0000000000000000 # 导出为 PEM 格式

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

# GnuPG

- GNUPGHOME, `--homedir`
- ~/.gnupg
  - S.gpg-agent
  - S.gpg-agent.ssh - `--enable-ssh-support`, `--enable-putty-support`
    - 实现 ssh-agent
    - SSH_AUTH_SOCK
    - ssh 8.2 才支持 FIDO2/U2F
  - S.gpg-agent.browser
    - keychain
    - 请求和缓存密码
  - S.gpg-agent.extra
    - 允许远程 gpg 使用本地 key
  - pubring.kbx
    - new public keyring using keybox format
  - pubring.gpg
    - legacy public keyring
  - trustdb.gpg
  - openpgp-revocs.d/
    - revocation certificates
    - `<ID>.rev`
  - private-keys-v1.d/
    - `<ID>.key`
- GPG_AGENT_INFO

```bash
# 完整信息
gpg --with-colons --list-keys --with-fingerprint --with-fingerprint
```

- Field 1 - Type of record
- Field 2 - Validity
- Field 3 - Key length
- Field 4 - Public key algorithm
- Field 5 - KeyID
- Field 6 - Creation date
- Field 7 - Expiration date
- Field 8 - Certificate S/N, UID hash, trust signature info
- Field 9 - Ownertrust
- Field 10 - User-ID
- Field 11 - Signature class
- Field 12 - Key capabilities
- Field 13 - Issuer certificate fingerprint or other info
- Field 14 - Flag field
- Field 15 - S/N of a token
- Field 16 - Hash algorithm
- Field 17 - Curve name
- Field 18 - Compliance flags
- Field 19 - Last update
- Field 20 - Origin
- Field 21 - Comment

| abbr. | for                                                   |
| ----- | ----------------------------------------------------- |
| sec   | SECret key                                            |
| ssb   | Secret SuBkey                                         |
| pub   | PUBlic key                                            |
| sub   | public SUBkey - secondary key                         |
| uid   | user id                                               |
| sig   | key signature                                         |
| crt   | X.509 certificate                                     |
| crs   | X.509 certificate and private key available           |
| uat   | User attribute (same as user id except for field 10). |
| rev   | Revocation signature                                  |
| fpr   | Fingerprint (fingerprint is in field 10)              |
| pkd   | Public key data                                       |
| grp   | Keygrip                                               |
| rvk   | Revocation key                                        |
| tru   | Trust database information                            |
| spk   | Signature subpacket                                   |
| cfg   | Configuration data                                    |

- subkeys
  - 在 master key 之下
  - revoked independently
- https://dev.gnupg.org/source/gnupg/browse/master/doc/DETAILS

| abbr.   | for      |
| ------- | -------- |
| rsa2048 | RSA 2048 |
| 4096R   | RSA 4096 |
| cv25519 |
| ed25519 |

**操作**

| flag                                         | for                           |
| -------------------------------------------- | ----------------------------- |
| **Signarure**                                |
| -s,--sign                                    |
| --clearsign,--clear-sign                     |
| -b,--detach-sign                             |
| --check-sigs,--check-signatures              |
| **Enc/Dec**                                  |
| -e,--encrypt                                 |
| -c,--symmetric                               |
| --store                                      |
| -d,--decrypt                                 |
| --verify                                     |
| **Multi**                                    |
| --multifile                                  |
| --verify-files                               | `--multifile --verify`        |
| --encrypt-files                              | `--multifile --encrypt`       |
| --decrypt-files                              | `--multifile --decrypt`       |
| **Keys**                                     |
| -k,--list-keys,--list-pub-keys               | 公钥列表                      |
| -K,--list-secret-keys                        | 私钥列表                      |
| --delete-keys NAME                           |
| --delete-secret-keys NAME                    |
| --delete-secret-and-public-key NAME          |
| --locate-keys,--locate-external-keys         |
| --show-keys                                  | 显示给的 Key 的信息           |
| --fingerprint                                |
| **Smartcard**                                |
| --edit-card,--card-edit                      |
| --card-status                                |
| --change-pin                                 |
| **Export/Restore**                           |
| --export                                     |
| --export-secret-keys,--export-secret-subkeys |
| --export-ssh-key                             |
| --import,--fast-import                       | `--import-options merge-only` |
| --export-ownertrust                          |
| --import-ownertrust                          |
| **Key Server**                               |
| --send-keys KEYIDS                           |
| --recv-keys,--receive-keys KEYIDS            |
| --refresh-keys                               |
| --search-keys NAMES                          |
| --fetch-keys URL                             |
| --update-trustdb                             |
| --check-trustdb                              |
| --rebuild-keydb-caches                       |
| **Misc**                                     |
| --list-packets                               |
| --print-md algo                              |
| --print-mds                                  | 计算文件所有摘要              |
| --gen-random 0\|1\|2\|16\|30 COUNT           | 生成随机数据                  |
| --gen-prime MODE BITS                        |
| --enarmor,--dearmor                          |

| cap | create | for             | note             |
| --- | ------ | --------------- | ---------------- |
| s   | sign   | sign            |
| e   | encr   | encrypt,decrypt |
| a   | auth   | authenticate    | ssh login        |
| c   | cert   | certify         | 签名另外一个 key |

```bash
# 生成 base64 随机
gpg -a --gen-random 1 20
```

### gpg.conf

- https://github.com/drduh/config/blob/master/gpg.conf

## gpg-agent

- for gpg, gpgsm
- 会自动启动

```bash
# 主动退出
gpg-connect-agent /bye
gpgconf --kill gpg-agent

pidof gpg-agent

# 常用设置
GPG_TTY=$(tty)
export GPG_TTY

# .bashrc
export GPG_TTY="$(tty)"
export SSH_AUTH_SOCK=$(gpgconf --list-dirs agent-ssh-socket)
gpgconf --launch gpg-agent

# 查看缓存的 Key
gpg-connect-agent 'keyinfo --list' /bye
gpg-connect-agent "keyinfo --ssh-list --ssh-fpr" /bye
gpg-connect-agent "keyinfo --ssh-list --ssh-fpr=sha1" /bye
```

### gpg-agent.conf

- ~/.gnupg/gpg-agent.conf

```bash
# https://www.gnupg.org/documentation/manuals/gnupg/Agent-Options.html
enable-ssh-support
ttyname $GPG_TTY
pinentry-program /usr/local/bin/pinentry-mac

default-cache-ttl 60
max-cache-ttl 120
# pinentry-program /usr/bin/pinentry-curses
#pinentry-program /usr/bin/pinentry-tty
#pinentry-program /usr/bin/pinentry-gtk-2
#pinentry-program /usr/bin/pinentry-x11
#pinentry-program /usr/bin/pinentry-qt
#pinentry-program /usr/local/bin/pinentry-curses
#pinentry-program /usr/local/bin/pinentry-mac
#pinentry-program /opt/homebrew/bin/pinentry-mac
```

- https://github.com/drduh/config

# FAQ

## rsa2048

GPG 默认 RSA2048，但现在已经不推荐了，建议至少 4096 bit。

- NIST Special Publication 800-57 - July 2012
  - 认为 rsa2048 在 2030 年前还是安全的
- Github 要求 RSA4096+
- 新 key 推荐 ECC/elliptical-curve
- Github 支持的 Key 算法
  - RSA
  - ElGamal
  - DSA
  - ECDH
  - ECDSA
  - EdDSA

## ssh

- gpg-agent 支持作为 ssh-agent
- ssh key 可导入到 gpg 但 **不推荐**
  - [dkg/monkeysphere](https://github.com/dkg/monkeysphere)
    - pem2openpgp

```bash
# 创建用于 SSH 登陆的 keu
gpg --quick-add-key $KEYID ed25519 auth 1y
gpg -k --with-keygrip $KEYID

gpg --export-ssh-key $KEYID
```

```bash
echo enable-ssh-support >> $HOME/.gnupg/gpg-agent.conf

# 启动
unset SSH_AGENT_PID
if [ "${gnupg_SSH_AUTH_SOCK_by:-0}" -ne $$ ]; then
  export SSH_AUTH_SOCK="$(gpgconf --list-dirs agent-ssh-socket)"
fi
export GPG_TTY=$(tty)
gpg-connect-agent updatestartuptty /bye > /dev/null

# 通过 gpgconf 启动
# gpgconf --launch gpg-agent

gpg --list-keys --with-keygrip
echo $KEYGRIP >> ~/.gnupg/sshcontrol
ssh-add -l

# ssh-ed25519 XXXX openpgp:0xABCD
gpg --export-ssh-key $KEYID

# 如果配置了 github 可以测试
ssh -T git@github.com
```

## backup & restore

```bash
KEYID=$(gpg -k wener@wener.me | sed '2q;d' | tr -d '[:blank:]')
gpg -a --export-secret-keys $KEYID > private.gpg
gpg -a --export-secret-subkeys $KEYID >> private.gpg
gpg --batch --yes --delete-secret-and-public-key $KEYID
gpg --show-keys private.gpg
gpg --import private.gpg
```

```bash
# 备份 secret master key
# -a 使用 PEM 格式
gpg -a -o secrets.gpg --export-secret-keys wener@wener.me
gpg -a -o subkeys.gpg --export-secret-subkeys wener@wener.me

gpg --show-keys secrets.gpg subkeys.gpg
gpg --list-packets secrets.gpg
gpg --list-packets subkeys.gpg

KEYID=$(gpg -k wener@wener.me | sed '2q;d' | tr -d '[:blank:]')
# --batch --yes 需要用 fingerprint
gpg --batch --yes --delete-secret-and-public-key $KEYID
gpg -K
gpg -k

# 导入
# key 后面显示 # 表示 key 非本地存储
gpg --import subkeys.gpg
gpg -K
gpg --import secrets.gpg
gpg -K
gpg -k

# 可以合并为单个文件
# cat subkeys.gpg secrets.gpg > backup.gpg

# 信任
echo -e "5\ny\n" | gpg --command-fd 0 --expert --edit-key $KEYID trust
```

## uid unknown

- 重新 trust 即可
- ~/.gnupg/trustdb.gpg

```bash
gpg --edit-key $KEYID
trust
5
save

# 批处理
echo -e "5\ny\n" | gpg --command-fd 0 --expert --edit-key wener@wener.me trust
```

## fingerprint

```bash
gpg -k wener@wener.me | head -n 2 | tail -n 1 | tr -d '[:blank:]'
gpg -k wener@wener.me | sed '2q;d' | tr -d '[:blank:]'
```

## 失效后操作

```bash
gpg --edit-key $KEYID
list

key 0
expire

key 1
expire

list # 确认
save # 保存退出
```

### gpg: lookup_hashtable failed: Unknown system error

```
gpg --fix-trustdb

cd ~/.gnupg
gpg --export-ownertrust > otrust.tmp
rm trustdb.gpg
gpg --import-ownertrust < otrust.tmp
```

## A locale function failed

- 使用 `--batch --yes` 避免
- https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=866023

## subkeys

- https://wiki.debian.org/Subkeys

## No pinentry

```bash
gpgconf --kill gpg-agent
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
