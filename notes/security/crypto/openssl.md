---
title: OpenSSL
---

# OpenSSL

- [openssl/openssl](https://github.com/openssl/openssl)
  - Apache-2.0, C, Perl
- libssl, libcrypto, openssl
- 参考
  - [manpages](https://www.openssl.org/docs/manpages.html)
  - https://www.openssl.org/docs/manmaster/

```bash
# macOS 默认不带新版 openssl（LibreSSL），用 brew 安装的版本
# 或者 brew link openssl --force
alias openssl=$(brew --prefix openssl)/bin/openssl
```

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
# 测试 sha1 速度，可用于测试机器性能
openssl speed sha1

# 测试安装的 OpenSSL 是否支持 CPU 加速 AES-NI
openssl speed aes-256-cbc
openssl speed -evp aes-256-cbc

# 文件加密/解密
openssl enc -bf -A -in file_to_encrypt.txt
openssl enc -bf -d -A -in file_to_encrypt.txt
```

## 密钥/证书

```bash
DOMAIN=example.org

# 生成 RSA key + 查看
openssl genrsa -out $DOMAIN.key 2048
openssl rsa -in $DOMAIN.key -noout -text
# 生成 EC key（prime256v1 曲线）
openssl ecparam -out $DOMAIN.key -name prime256v1 -genkey

# 导出/查看公钥
openssl rsa -in $DOMAIN.key -pubout -out $DOMAIN.pubkey
openssl rsa -in $DOMAIN.pubkey -pubin -noout -text

# 生成 CSR（证书签名请求）+ 查看
openssl req -new -key $DOMAIN.key -out $DOMAIN.csr
openssl req -in $DOMAIN.csr -noout -text
# 同时生成 key + CSR（不加密私钥）
openssl req -nodes -new -sha256 -keyout $DOMAIN.key -out $DOMAIN.csr

# 显示密钥指纹/有效期
openssl x509 -subject -dates -fingerprint -in $DOMAIN.crt
```

### SubjectAltName（多域名证书）

```bash
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

openssl req -nodes -new -sha256 -key $DOMAIN.key -out $DOMAIN.csr -config $DOMAIN.conf
```

## CA

```bash
# 自建 CA
openssl genrsa -out ca.key 2048
openssl req -new -x509 -key ca.key -out ca.crt
# 导出为 DER 格式，供浏览器导入
openssl x509 -in ca.crt -outform der -out ca.der

# 用 CA 签发证书（基于前面生成的 CSR）
openssl x509 -req -in $DOMAIN.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out $DOMAIN.crt
openssl x509 -in $DOMAIN.crt -noout -text
# 拼成证书链
cat $DOMAIN.crt ca.crt > $DOMAIN.bundle.crt

# 创建自签名证书（不经过单独的 CA）
openssl req -new -x509 -sha256 -key $DOMAIN.key -out $DOMAIN.crt -days 360

# Diffie-Hellman 参数（用于 PFS），为服务拼出完整 PEM
openssl dhparam -out $DOMAIN.dhp.pem 1536
cat $DOMAIN.key $DOMAIN.crt $DOMAIN.dhp.pem > $DOMAIN.pem

# 证书吊销 / CRL
openssl ca -revoke $DOMAIN.crt
openssl ca -gencrl -out crl/$DOMAIN-CA.crl
openssl ca -out $DOMAIN.crt -in $DOMAIN.csr

# 转换为 PKCS#12/pfx（打包私钥+证书，常用于导入系统/浏览器）
openssl pkcs12 -export -in $DOMAIN.crt -inkey $DOMAIN.key -out $DOMAIN.p12 -name "$DOMAIN"

# S/MIME 邮件签名加密
openssl smime -sign -in msg.txt -text -out msg.encrypted -signer $DOMAIN.crt -inkey $DOMAIN.key
```

## 查看远程证书

```bash
# 查看服务器证书
openssl s_client -servername cloudflare.com -connect cloudflare.com:443

# 获取证书并保存为 PEM
openssl s_client -servername cloudflare.com -connect cloudflare.com:443 < /dev/null | openssl x509 -outform PEM > cloudflare.com.crt

# 查看 Subject / SAN（DNS/IP）
openssl x509 -in cloudflare.com.crt -text -noout | grep -E 'Subject:|DNS:'
# 直接从连接中提取并查看 SAN，不落盘
openssl s_client -servername wener.me -connect wener.me:443 2>/dev/null | openssl x509 -noout -text | egrep 'DNS:|IP:'

# 查看指纹（sha256/sha1/md5）
echo -sha256 -sha1 -md5 | xargs -n1 openssl x509 -noout -fingerprint -inform pem -in ca.crt

# 查看证书有效期（notBefore/notAfter）
openssl x509 -in wener.me.crt -noout -dates

# 简化输出，只保留关心的字段
openssl x509 -in cerfile.cer -noout -text -certopt no_subject,no_header,no_version,no_serial,no_signame,no_validity,no_issuer,no_pubkey,no_sigdump,no_aux

# 主机验证（检查证书是否能正常协商 TLS）
openssl s_client -connect localhost:993 -quiet > /dev/null # IMAP
openssl s_client -connect localhost:465 -quiet > /dev/null # SMTP
echo HEAD / | openssl s_client -connect localhost:443 -quiet > /dev/null # HTTP
```

- https://gist.github.com/Soarez/9688998

## 配置

- 可以用 `OPENSSL_CONF` 环境变量指定配置文件路径
- 默认配置文件名为 `openssl.cnf`
- 配置分为说明文字和默认值两部分

```bash
# -batch  不询问问题
# -config 指定配置文件
# -utf8   说明内容为 utf8 字符
# -newkey 指定生成 key 信息, rsa:bits, dsa:file, ec:file
openssl req -new -x509 -keyout wener.key.pem -out wener.crt.pem -days 365
```

**req 默认配置（交互提示）**

```
Country Name (2 letter code) [AU]:
State or Province Name (full name) [Some-State]:
Locality Name (eg, city) []:
Organization Name (eg, company) [Internet Widgits Pty Ltd]:
Organizational Unit Name (eg, section) []:
Common Name (e.g. server FQDN or YOUR name) []:
Email Address []:
```

**req 配置示例**

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

## 版本

### OpenSSL 3.0

> AlpineLinux 3.17, RHEL 9 并存

- 2021-09-07
- FIPS 140
- Apache 2.0
- Supporting Kernel TLS - Linux 4.13 - 2017
- [OpenSSL 3.0](https://wiki.openssl.org/index.php/OpenSSL_3.0)

### OpenSSL 1.1.1

- 2018-09-11
- TLS1.3
- SHA-3
- X448, Ed448 - RFC 7748
- SipHash
- ARIA
- multi-prime RSA (RFC 8017)
- SM2, SM3, SM4
- Heartbleed,QNX removed

# FAQ

## variable lookup failed for ca::default_ca

## SSL certificate verify result: unable to get local issuer certificate (20), continuing anyway

The root certificate is not in the local database of trusted root certificates. The local database of trusted root certificates was not give or queried by OpenSSL.

```bash
openssl s_client -servername wener.me -connect wener.me:443
```
</content>
