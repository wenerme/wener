---
title: Crypto
---

# Crypto

## Tips
* [Comparison of cryptography libraries](https://en.wikipedia.org/wiki/Comparison_of_cryptography_libraries)
* [Symmetric Algorithm Survey: A Comparative Analysis](https://arxiv.org/pdf/1405.0398.pdf)
* 非对称加密 - Asymmetric
  * DH
  * RSA
  * SSL
  * SSH
* 对称加密 - Symmetric
  * AES - Advanced Encryption Standard
    * 取代了 DES
  * Blow Fish - Drop-in replacement for DES or IDEA
  * Rijndael
  * DES - Data Encryption Standard
  * 3DES
  * CAS
  * RC6
  * TEA
  * Mars
  * IDEA - International Data Encryption Algorithm
  * Serpent
  * Two Fish
  * RC4 - Rivest Cipher 4
  * RC5 - Rivest Cipher 5
  * RC6 - Rivest Cipher 6
* 对称加密分为 块、流 算法
* TLS - Transport Layer Security
* SSL - Secure Sockets Layer
  * TLS 前任
* csr - Certificate Signing Request
* crt - certificate
  * x509
* [RSA](https://en.wikipedia.org/wiki/RSA_(cryptosystem))
  * [Public Key Cryptography: RSA Encryption Algorithm](https://youtu.be/wXB-V_Keiu8)
* DES - Data Encryption Standard
  * 已经不是一种安全的加密方法，主要因为它使用的56位密钥过短
* DER
* [X.509](https://en.wikipedia.org/wiki/X.509)
* PKI - Publick Key Infra
* rc2/rc4
* [PKCS](https://en.wikipedia.org/wiki/PKCS) - Public Key Cryptography Standards
* ec - Elliptic Curves
* .pem – Privacy-enhanced Electronic Mail
  * Base64 encoded DER certificate, enclosed between "-----BEGIN CERTIFICATE-----" and "-----END CERTIFICATE-----"
* .cer, .crt, .der
  * usually in binary DER form, but Base64-encoded certificates are common too (see .pem above)
* .p7b, .p7c
  * PKCS#7 SignedData structure without data, just certificate(s) or CRL(s)
* .p12
  * PKCS#12, may contain certificate(s) (public) and private keys (password protected)
* .pfx
  * predecessor of PKCS#12 (usually contains data in PKCS#12 format, e.g., with PFX files generated in IIS)


```bash
# 使用 brew 安装的 openssl
# 或者 brew link openssl --force
alias openssl=$(brew --prefix openssl)/bin/openssl

```

## OpenSSL
* [manpages](https://www.openssl.org/docs/manpages.html)

```
Standard commands
asn1parse         ca                ciphers           cms
crl               crl2pkcs7         dgst              dh
dhparam           dsa               dsaparam          ec
ecparam           enc               engine            errstr
gendh             gendsa            genpkey           genrsa
nseq              ocsp              passwd            pkcs12
pkcs7             pkcs8             pkey              pkeyparam
pkeyutl           prime             rand              req
rsa               rsautl            s_client          s_server
s_time            sess_id           smime             speed
spkac             srp               ts                verify
version           x509

Message Digest commands (see the `dgst' command for more details)
md4               md5               mdc2              rmd160
sha               sha1

Cipher commands (see the `enc' command for more details)
aes-128-cbc       aes-128-ecb       aes-192-cbc       aes-192-ecb
aes-256-cbc       aes-256-ecb       base64            bf
bf-cbc            bf-cfb            bf-ecb            bf-ofb
camellia-128-cbc  camellia-128-ecb  camellia-192-cbc  camellia-192-ecb
camellia-256-cbc  camellia-256-ecb  cast              cast-cbc
cast5-cbc         cast5-cfb         cast5-ecb         cast5-ofb
des               des-cbc           des-cfb           des-ecb
des-ede           des-ede-cbc       des-ede-cfb       des-ede-ofb
des-ede3          des-ede3-cbc      des-ede3-cfb      des-ede3-ofb
des-ofb           des3              desx              idea
idea-cbc          idea-cfb          idea-ecb          idea-ofb
rc2               rc2-40-cbc        rc2-64-cbc        rc2-cbc
rc2-cfb           rc2-ecb           rc2-ofb           rc4
rc4-40            seed              seed-cbc          seed-cfb
seed-ecb          seed-ofb          zlib
```

```bash
# 测试 sha1 速度
# 可用于测试机器性能
openssl speed sha1

# 测试安装的 OpenSSL 是否支持 CPU 加速 AES-NI
openssl speed aes-256-cbc
openssl speed -evp aes-256-cbc

# 创建 certificate request/unsigned key
# ====================================
DOMAIN=wener.me
# 同时创建 key
openssl req -nodes -new -sha256 -keyout $DOMAIN.key.pem -out $DOMAIN.csr.pem
# 使用现有秘钥
openssl req -nodes -new -sha256 -key $DOMAIN.key.pem -out $DOMAIN.csr.pem

# 使用配置文件进行配置
# SubjectAltName 可以使得证书用于多个域名
cat > $DOMAIN.conf << EOF
[req]
distinguished_name = req_distinguished_name
req_extensions = req_ext

[req_distinguished_name]
countryName = Country Name (2 letter code)
countryName_default = US
stateOrProvinceName = State or Province Name (full name)
stateOrProvinceName_default = New York
localityName = Locality Name (eg, city)
localityName_default = New York City
organizationalUnitName = Organizational Unit Name (eg, section)
commonName = Common Name
commonName_default = $DOMAIN
commonName_max = 64

[req_ext]
subjectAltName = @alt_names

[alt_names]
DNS.1   = $DOMAIN
DNS.2   = www.$DOMAIN
EOF
# 使用配置文件进行创建
openssl req -nodes -new -sha256 -key $DOMAIN.key.pem -out $DOMAIN.csr.pem -config $DOMAIN.conf

# 显示秘钥指纹
openssl x509 -subject -dates -fingerprint -in $DOMAIN.key.pem

# 生成 RSA key
openssl genrsa -out $DOMAIN.key.pem 4096
# 生成 EC key (using prime256v1 curve)
openssl ecparam -out $DOMAIN.key.pem -name prime256v1 -genkey

# 显示证书信息
openssl req -text -noout -in $DOMAIN.csr.pem
openssl x509 -in $DOMAIN.crt.pem -noout -text

# 为服务生成 PEM
cat $DOMAIN.key.pem $DOMAIN.crt.pem $DOMAIN.dhp.pem > $DOMAIN.pem

# 生成 PKCS12 文件格式
openssl pkcs12 -export -in $DOMAIN.crt.pem -inkey $DOMAIN.key.pem -out blah.p12 -name "Bill Gates"
# 对 email 加密
openssl smine -sign -in msg.txt -text -out msg.encrypted -signer $DOMAIN.crt.pem -inkey $DOMAIN.key.pem

# 创建 CA
openssl req -new -x509 -keyout private/something-CA.key.pem -out ./something-CA.crt.pem -days 3650
# 导出为 DER 格式, 浏览器使用
openssl x509 -in something-CA.crt.pem -outform der -out something-CA.crt

# 证书回收
openssl ca -revoke $DOMAIN.crt.pem
# Generate Certificate Revocation List (CRL)
openssl ca -gencrl -out crl/$DOMAIN-CA.crl
# Sign Certificate Request
openssl ca -out blah.crt.pem -in $DOMAIN.req.pem
# Create Diffie-Hoffman Parameters for Current CA
openssl dhparam -out $DOMAIN-CA.dhp.pem 1536

# Create self-signed certificate from generated key
openssl req -new -x509 -sha256 -key $DOMAIN.key.pem -out $DOMAIN.crt.pem


# 文件加密
openssl enc -bf -A -in file_to_encrypt.txt
# 文件解密
openssl enc -bf -d -A -in file_to_encrypt.txt

# 主机验证
# =======
# IMAP
openssl s_client -connect localhost:993 -quiet > /dev/null
# SMTP
openssl s_client -connect localhost:465 -quiet > /dev/null
# HTTP
echo HEAD / | openssl s_client -connect localhost:443 -quiet > /dev/null
```


### 配置
* 可以使用 `OPENSSL_CONF` 环境变量来制定配置文件路径
* 默认配置文件名为 `openssl.cnf`
* 配置分为说明和默认值

```bash
# -batch  不询问问题
# -config 指定配置文件
# -utf8   说明内容为 utf8 字符
# -newkey 指定生成 key 信息, rsa:bits, dsa:file, ec:file
openssl req -new -x509 -keyout wener.key.pem -out wener.crt.pem -days 365
```

__req 默认配置__
```
Country Name (2 letter code) [AU]:
State or Province Name (full name) [Some-State]:
Locality Name (eg, city) []:
Organization Name (eg, company) [Internet Widgits Pty Ltd]:
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:
Email Address []:
```

__req 配置示例__
```ini
openssl_conf = conf
[conf]
alg_section = evp_sect
[evp_sect]
fips_mode = no

[req]
distinguished_name = req_distinguished_name

[req_distinguished_name]
countryName = 国家名字(两个字符)
countryName_default = CN
stateOrProvinceName = 省市名字
stateOrProvinceName_default = 上海市
localityName = 城市区域名字
localityName_default = 闵行区
organizationalUnitName = 组织单位名字
organizationalUnitName_default = 文雪科技发展有限公司
commonName = 公共名字
commonName_default = wener.me
commonName_max = 64
```
