---
title: 密码加密方式
---

# 密码加密方式

:::tip

- 默认选择 bcrypt

:::

- KDF - Key Derivation Function - 密钥派生函数
  - PBKDF2 - Password-Based Key Derivation Function 2 - 基于密码的密钥派生函数 2
  - bcrypt - Blowfish-based Adaptive Cryptographic Hash Function - 基于 Blowfish 的自适应密码哈希函数
  - argon2 - Argon2 - Argon2 密码哈希函数
  - scrypt - 用于密码哈希的内存密集型密钥派生函数
- PHF - Password Hashing Function - 密码哈希函数
  - scrypt - 用于密码哈希的内存密集型密钥派生函数
  - sha256_crypt - SHA-256 Crypt - SHA-256 密码
  - sha512_crypt - SHA-512 Crypt - SHA-512 密码
  - md5_crypt - MD5 Crypt - MD5 密码
  - sha1_crypt - SHA-1 Crypt - SHA-1 密码
  - bcrypt - Blowfish-based Adaptive Cryptographic Hash Function - 基于 Blowfish 的自适应密码哈希函数
- MCF - Modular Crypt Format - 模块化密码格式
  - Deprecated (as of 2016) in favor of the PHC String Format
  - https://github.com/ademarre/binary-mcf
  - https://passlib.readthedocs.io/en/stable/modular_crypt_format.html
- PHC String Format
  - https://github.com/P-H-C/phc-string-format/blob/master/phc-sf-spec.md
  - https://man7.org/linux/man-pages/man3/crypt.3.html

```
$<id>[$v=<version>][$<param>=<value>(,<param>=<value>)*][$<salt>[$<hash>]]
```

| Scheme ID | Schema                                   |
| --------- | ---------------------------------------- |
| 1         | MD5                                      |
| 2a        | Blowfish / bcrypt                        |
| 2b        |
| 2x        | 兼容 2a                                  |
| 2y        | 兼容 2a                                  |
| 3         | NTHASH                                   |
| 5         | SHA-256                                  |
| 6         | SHA-512                                  |
| md5       | Solaris MD5                              |
| sha1      | PBKDF1 with SHA-1                        |
| argon2d   |
| argon2i   |
| argon2id  |
| pbkdf2    | PBKDF2 with SHA-1                        |
| scrypt    | 使用内存密集型密钥导出函数的密码哈希算法 |
| bcrypt    | 使用 Blowfish 加密算法的密码哈希算法     |

```bash
# 不是所有 mkpasswd 都支持 rounds 和 -m
mkpasswd --rounds 1000 -m sha-512 --salt $(head -c 40 /dev/random | base64 | sed -e 's/+/./g' | cut -b 10-25) 'password'
```

- sha
  - rounds
- argon2
  - m - 内存 - 1 - `(2^32)-1`
    - WebApp - 64Mib
    - 敏感数据离线 - 1Gib
  - t - 迭代
  - p - 并行 - 1 - 255
  - keyid - 0-8 bytes, b64 0-11 char
  - data - 0-32 bytes, b64 0-43 char
  - salt - 8-48 bytes, b64 11-64 char
  - hash - 16-64 bytes, b64 22-86 char - 默认 32 bytes 43 char
  - 推荐 argon2id
- Argon2d（数据依赖）：这个变体使用数据依赖的内存访问模式，使得它具有较强的抵抗侧信道攻击能力。但是，由于其数据依赖性，它可能对时间空间权衡攻击（TMTO）较为敏感。Argon2d 适用于需要较高抗侧信道攻击能力的场景，但不需要考虑 TMTO 攻击的情况。
- Argon2i（数据独立）：这个变体使用数据独立的内存访问模式，使其对时间空间权衡攻击具有较好的抵抗能力。但是，相对于 Argon2d，它的抗侧信道攻击能力较弱。Argon2i 适用于需要考虑 TMTO 攻击抵抗能力，但抗侧信道攻击能力要求较低的场景。
- Argon2id（混合）：这个变体是 Argon2d 和 Argon2i 的混合，结合了它们的优点。它首先使用数据独立的内存访问模式（类似于 Argon2i），然后在后续的过程中切换为数据依赖的内存访问模式（类似于 Argon2d）。这种方法既提供了较强的抗侧信道攻击能力，又具有较好的抵抗时间空间权衡攻击能力。Argon2id 是一种通用的密码哈希方案，适用于大多数场景。
- https://github.com/P-H-C/phc-string-format/blob/master/phc-sf-spec.md
  - PHC - Password Hashing Competition
- https://argon2.online/

## 库 {#library}

- argon2
  - [ranisalt/node-argon2](https://github.com/ranisalt/node-argon2)
    - npm argon2
- bcrypt
  - npm - bcryptjs
- crypto-js
- crypto-browserify
- crypt -> scrypt
- SpringSecurity
  - https://docs.spring.io/spring-security/reference/features/authentication/password-storage.html
- https://w3c.github.io/webappsec-change-password-url/

## 常见服务加密算法

- `$algorithm$[cost]$[salt][hash]`

### Gitea

- `PASSWORD_HASH_ALGO=pbkdf2`
- 可选 argon2, pbkdf2, pbkdf2_v1, pbkdf2_hi, scrypt, bcrypt

**可以给参数**

```
argon2$<time>$<memory>$<threads>$<key-length>
bcrypt$<cost>
pbkdf2$<iterations>$<key-length>
scrypt$<n>$<r>$<p>$<key-length>
```

**默认为**

```
argon2: argon2$2$65536$8$50
bcrypt: bcrypt$10
pbkdf2: pbkdf2$50000$50
pbkdf2_v1: pbkdf2$10000$50
pbkdf2_v2: pbkdf2$50000$50
pbkdf2_hi: pbkdf2$320000$50
scrypt: scrypt$65536$16$2$50
```

- https://docs.gitea.io/en-us/administration/config-cheat-sheet/

### OpenLDAP

```
userPassword: {SSHA}DkMTwBl+a/3DQTxCYEApdUtNXGgdUac3
userPassword: {CRYPT}aUihad99hmev6
userPassword: {CRYPT}$1$czBJdDqS$TmkzUAb836oMxg/BmIwN.1
userPassword: {MD5}Xr4ilOzQ4PCOq3aQ0qbuaQ==
userPassword: {SMD5}4QWGWZpj9GCmfuqEvm8HtZhZS6E=
userPassword: {SMD5}g2/J/7D5EO6+oPdklp5p8YtNFk4=
userPassword: {SHA}5en6G6MezRroT3XKqkdPOmY/BfQ=

userPassword: {SASL}username@realm
```

**OpenLDAP 内置**

- MD5
- SMD5 - MD5 + Salt
- SHA - SHA-1
- SSHA - SHA1 + Salt

**Pass-Through authentication**

- CRYPT
- SASL - Cyrus SASL

---

- https://www.openldap.org/doc/admin25/security.html

### ApacheDirectory Server

- SHA, SSHA, SHA-{256,384,512}, SSHA-{256,384,512}, MD5, SMD5, crypt, PLAIN
- https://directory.apache.org/apacheds/advanced-ug/4.1.1.2-name-password-authn.html

### Gitlab

- bcrypt - 默认 - Stretching 10
- PBKDF2 + SHA512 - 20,000

---

- https://docs.gitlab.com/ee/security/password_storage.html

## Key stretching

- https://en.wikipedia.org/wiki/Key_stretching

# FAQ

## argon2 vs bcrypt vs scrypt vs pkdf2

:::caution

- argon2 和 scrypt 会用非常多的内存

:::

在项目中选择密码哈希算法时，主要考虑以下因素：安全性、性能、可用性和社区支持。以下是关于 Argon2、bcrypt、scrypt 和 PBKDF2 的简要比较：

1. 安全性：
   - Argon2：目前被认为是最安全的密码哈希算法。它赢得了密码哈希竞赛（PHC），并且具有很好的内存密集度，抵抗侧信道攻击和时间-空间权衡攻击。
   - bcrypt：也是一种安全的密码哈希算法，但相较于 Argon2，它的内存密集度较低，抵抗侧信道攻击和时间-空间权衡攻击的能力较弱。
   - scrypt：设计为内存密集型算法，以抵抗大规模定制硬件攻击。它的安全性优于 bcrypt，但仍然低于 Argon2。
   - PBKDF2：相对于其他三种算法，PBKDF2 的安全性最低，因为它没有针对 GPU 或 ASIC 攻击的内存密集特性。
2. 性能：
   - Argon2、bcrypt 和 scrypt 的性能可以通过调整参数（如内存、迭代次数等）来控制。你可以根据项目的需求和硬件资源调整这些参数。
   - PBKDF2 性能主要取决于迭代次数，但与其他算法相比，它在现代硬件上的性能相对较差。
3. 可用性：
   - 大多数编程语言和框架都支持这四种哈希算法，但在某些情况下，Argon2 的支持可能不如其他算法广泛。在选择算法时，需要确保所选算法在项目使用的技术栈中可用。
4. 社区支持：
   - Argon2、bcrypt 和 scrypt 都拥有相对广泛的社区支持，而且这些算法已经得到了安全研究人员的审查和推荐。PBKDF2 也得到了一定的支持，但相对较弱。

综合考虑上述因素，Argon2（尤其是 Argon2id 变体）通常是首选算法，因为它在安全性和性能方面表现最佳。如果项目中 Argon2 的支持有限，可以考虑使用 bcrypt 或 scrypt。PBKDF2 应该作为最后的选择，仅在其他选项不可用时使用。

## 破解时间 {#crack-time}

**password count**

| n   | num   | alpha | alphanum |
| --- | ----- | ----- | -------- |
| 6   | 10^6  | 52^6  | 62^6     |
| 7   | 10^7  | 52^7  | 62^7     |
| 8   | 10^8  | 52^8  | 62^8     |
| 9   | 10^9  | 52^9  | 62^9     |
| 10  | 10^10 | 52^10 | 62^10    |
| 11  | 10^11 | 52^11 | 62^11    |
| 12  | 10^12 | 52^12 | 62^12    |

- Nvidia RTX 4090 hashcat 164 GH/s, 164亿次/秒
- bcrypt
- https://specopssoft.com/blog/hashing-algorithm-cracking-bcrypt-passwords/
