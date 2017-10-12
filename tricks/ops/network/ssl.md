# SSL

## Tips
* https://www.cyberciti.biz/faq/test-ssl-certificates-diagnosis-ssl-certificate/
* FAQ
  * Java 是不支持泛域名的, 但是支持 SAN
* 在线检测
  * https://www.sslchecker.com/sslchecker
  * https://www.sslshopper.com/ssl-checker.html
  * https://sslanalyzer.comodoca.com
* https://www.owasp.org/index.php/Transport_Layer_Protection_Cheat_Sheet
* Java Keystore
  * http://portecle.sourceforge.net/
  * http://keystore-explorer.org/
* Let's Encrypt
  * [Rate Limits](https://letsencrypt.org/docs/rate-limits/)
    * SAN 最多 100
    * 一周证书最多重复 5 次
    * 子域名证书, 第一周 20, 第二周 40, 以此类推
    * 验证失败限制, 5次 每账号 每主机名 每小时
    * new-reg, new-authz, new-cert 共享 20rps 的限制
    * /directory, /acme 共享 40rps 限制
    * 每 IP 每小时 最多创建 10 个账号
    * 每 3 小时 每 IP 段 最多创建 500 个账号
    * 建议只使用一个账号
    * 最多 300 Pending Authorizations
    * 可以申请提升限额
* Tools
  * [crt.sh](https://crt.sh/)
    * 查询分发的证书
  * [shred/acme4j](https://github.com/shred/acme4j)
    * Java client for ACME (Let's Encrypt)
* Automatic Certificate Management Environment (ACME)
## Tips
* PEM - Privacy Enhanced Mail
* DER - Distinguished Encoding Rules,
  * `-inform der`


```bash
mkdir -p ~/.cert/mail.nixcraft.net/
# 显示证书
openssl s_client -showcerts -connect mail.nixcraft.net:443
# 截取证书部分
echo "" | openssl s_client -connect dm-101.data.aliyun.com:443 -prexit 2>/dev/null | sed -n -e '/BEGIN\ CERTIFICATE/,/END\ CERTIFICATE/ p'

cert_fetch(){
  mkdir -p ~/.cert/$1;cd ~/.cert/$1;
  echo "" | openssl s_client -connect $1:443 -prexit 2>/dev/null | \
    sed -n -e '/BEGIN\ CERTIFICATE/,/END\ CERTIFICATE/ p' > $1.pem
}

# https://developer.mozilla.org/en-US/docs/Web/HTTP/Public_Key_Pinning
openssl s_client -servername www.example.com -connect www.example.com:443 | openssl x509 -pubkey -noout | openssl rsa -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64

# 下载 crt
openssl x509 -in <(openssl s_client -connect example.com:443 -prexit 2>/dev/null) -out example.crt
# 导入 crt
sudo keytool -importcert -file example.crt -alias example -keystore $(/usr/libexec/java_home)/jre/lib/security/cacerts -storepass changeit
# 导入 cer
keytool -importcert -file certificate.cer -keystore keystore.jks -alias "Alias"

# 生成 CSR
# https://support.rackspace.com/how-to/generate-a-csr-with-openssl/
# 生成 Key
openssl genrsa -out wener.me.key 4096
# 生成新的 CSR
penssl req -new -sha256 -key wener.me.key -out wener.me.csr
# 然后提交 wener.me.csr 即可
# 拿到分发的 x509 可生成 pem 以供 nginx 使用
openssl x509 -in wener.me.x509 -out wener.me.pem -outform PEM
# 查看证书信息
openssl x509 -in wener.me.pem -text -noout

# Let's Encrypt certbot
brew install certbot
certbot certonly --standalone --preferred-challenges tls-sni -d example.com --staple-ocsp -m example@example.com --agree-tos --work-dir . --config-dir ./config --logs-dir ./logs
```


## FAQ
### Java 启动时 ssl 相关参数
http://docs.oracle.com/javase/1.5.0/docs/guide/security/jsse/JSSERefGuide.html#Debug

```bash
java -Djavax.net.debug=all -Djavax.net.ssl.trustStore=trustStore ...
```
* debug 参数
  * all            turn on all debugging
  * ssl            turn on ssl debugging
* ssl 相关参数

```
record       enable per-record tracing
handshake    print each handshake message
keygen       print key generation data
session      print session activity
defaultctx   print default SSL initialization
sslctx       print SSLContext tracing
sessioncache print session cache tracing
keymanager   print key manager tracing
trustmanager print trust manager tracing
pluggability print pluggability tracing

handshake debugging can be widened with:
data         hex dump of each handshake message
verbose      verbose handshake message printing

record debugging can be widened with:
plaintext    hex dump of record plaintext
packet       print raw SSL/TLS packets
```
