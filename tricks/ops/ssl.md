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
