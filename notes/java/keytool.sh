

# JavaTM Secure Socket Extension
# http://docs.oracle.com/javase/1.5.0/docs/guide/security/jsse/JSSERefGuide.html#Debug
# 可以参考类 java.security.cert.X509Certificate

# 调试 ssl
java -Djavax.net.debug=all -Djavax.net.ssl.trustStore=trustStore

# 常用的 ssl 命令
http://shib.kuleuven.be/docs/ssl_commands.shtml

# keytool 使用说明
http://docs.oracle.com/javase/1.5.0/docs/tooldocs/solaris/keytool.html

# 获取 cert
echo -n | openssl s_client -connect dl.google.com:443 | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' > dl.google.cert

# 导入到 keystore
keytool -import -alias custom-ssl -file dl.google.cert -keystore C:\custom.truststore

# 修改 eclipse.ini 使用自定义的 keystore
-Djavax.net.ssl.trustStore=C:\custom.truststore
-Djavax.net.ssl.trustStorePassword=qazwsx

# How to Create a Self Signed Certificate using Java Keytool
keytool -genkey -keyalg RSA -alias selfsigned -keystore keystore.jks -storepass password -validity 360 -keysize 2048

www.google.com
Web Development
Google, Inc.
Mountain View
California
US

http://www.sslshopper.com/article-most-common-java-keytool-keystore-commands.html

set CERT=%JAVA_HOME%/jre/lib/security/cacerts
keytool -list -v -keystore %CERT%
# 默认口令为 changeit 在 MAC 上是 changeme, 但有的也可能是 changeit

# Generate a Java keystore and key pair
keytool -genkey -alias mydomain -keyalg RSA -keystore keystore.jks -keysize 2048

# Generate a certificate signing request (CSR) for an existing Java keystore
keytool -certreq -alias mydomain -keystore keystore.jks -file mydomain.csr

# Import a root or intermediate CA certificate to an existing Java keystore
keytool -import -trustcacerts -alias root -file Thawte.crt -keystore keystore.jks

# Import a signed primary certificate to an existing Java keystore
keytool -import -trustcacerts -alias mydomain -file mydomain.crt -keystore keystore.jks

# Generate a keystore and self-signed certificate (see How to Create a Self Signed Certificate using Java Keytool for more info)
keytool -genkey -keyalg RSA -alias selfsigned -keystore keystore.jks -storepass password -validity 360 -keysize 2048

# Check a stand-alone certificate
keytool -printcert -v -file mydomain.crt

# Check which certificates are in a Java keystore
keytool -list -v -keystore keystore.jks

# Check a particular keystore entry using an alias
keytool -list -v -keystore keystore.jks -alias mydomain

# Delete a certificate from a Java Keytool keystore
keytool -delete -alias mydomain -keystore keystore.jks

# Change a Java keystore password
keytool -storepasswd -new new_storepass -keystore keystore.jks

# Export a certificate from a keystore
keytool -export -alias mydomain -file mydomain.crt -keystore keystore.jks

# List Trusted CA Certs
keytool -list -v -keystore $JAVA_HOME/jre/lib/security/cacerts

# Import New CA into Trusted Certs
keytool -import -trustcacerts -file /path/to/ca/ca.pem -alias CA_ALIAS -keystore $JAVA_HOME/jre/lib/security/cacerts