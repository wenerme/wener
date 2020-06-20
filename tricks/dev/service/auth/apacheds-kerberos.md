---
id: apacheds-kerberos
title: ApacheDS Kerberos
---

# ApacheDS Kerberos
## Tips

* [ApacheDS 2.0 Kerberos User Guide](https://directory.apache.org/apacheds/kerberos-user-guide.html)
  * KDC (Key DIstribution Center)
  * TGS (Ticket Granting Server) 
  * AS (Authentication Server)
* 实现了 Kerberos V5
* 支持加密 - des-cbc-md5, des3-cbc-sha1-kd, aes128-cts-hmac-sha1-96, aes256-cts-hmac-sha1-96, rc4-hmac encryption
* 支持 UDP TCP
* 每次修改密码 version 会增加
* 注意
  * 必须要明文密码生成 krb5 key
    * 密码最终也会以 SHA

# 本地实验

## 启动
```bash
# 映射目录后本地也可以使用
docker run --rm -it -e TZ=Asia/Shanghai \
  -p 10389:10389 -p 10636:10636 \
  -p 60088:60088 -p 60464:60464  -p 60088:60088/udp -p 60464:60464/udp \
  -v $PWD/apacheds:/opt/apacheds/instances \
  --name apacheds wener/apacheds
```

## 初始配置
* 创建服务
* 参考
  * http://directory.apache.org/apacheds/kerberos-ug/4-using-kerberos.html

```ldif
# 基础顶层架构
dn: dc=security,dc=example,dc=com
objectClass: top
objectClass: domain
dc: security

dn: ou=services,dc=security,dc=example,dc=com
objectClass: top
objectClass: organizationalUnit
ou: services

dn: ou=users,dc=security,dc=example,dc=com
objectClass: top
objectClass: organizationalUnit
ou: users

# 创建用户 wener
dn: uid=wener,ou=users,dc=security,dc=example,dc=com
objectClass: top
objectClass: krb5KDCEntry
objectClass: inetOrgPerson
objectClass: krb5Principal
objectClass: person
objectClass: organizationalPerson
cn: Wener Chen
krb5KeyVersionNumber: 1
krb5PrincipalName: wener@EXAMPLE.COM
sn: Wener
uid: wener
userPassword: secret

# 创建服务
dn: uid=ldap,ou=services,dc=security,dc=example,dc=com
objectClass: top
objectClass: organizationalUnit
objectClass: krb5KDCEntry
objectClass: uidObject
objectClass: krb5Principal
krb5KeyVersionNumber: 0
krb5PrincipalName: ldap/example.net@EXAMPLE.COM
uid: ldap
userPassword: randomKey
ou: LDAP

dn: uid=krbtgt,ou=services,dc=security,dc=example,dc=com
objectClass: top
objectClass: organizationalUnit
objectClass: krb5KDCEntry
objectClass: uidObject
objectClass: krb5Principal
krb5KeyVersionNumber: 0
krb5PrincipalName: krbtgt/EXAMPLE.COM@EXAMPLE.COM
uid: krbtgt
userPassword:: randomkey
ou: TGT

dn: uid=kpasswd,ou=services,dc=security,dc=example,dc=com
objectClass: top
objectClass: organizationalUnit
objectClass: krb5KDCEntry
objectClass: uidObject
objectClass: krb5Principal
krb5KeyVersionNumber: 0
krb5PrincipalName: kadmin/changepw@EXAMPLE.COM
uid: kpasswd
userPassword:: randomkey
ou: KPasswd
```

## 客户端

相同节点客户端配置，修改 hosts `example.com` 指向本地

__/etc/krb5.conf__

```ini
 [logging]
 default = FILE:/var/log/krb5libs.log
 kdc = FILE:/var/log/krb5kdc.log
 admin_server = FILE:/var/log/kadmind.log

[libdefaults]
debug = true
default_realm = EXAMPLE.COM
dns_lookup_realm = false
dns_lookup_kdc = false
ticket_lifetime = 24h
renew_lifetime = 7d
rdns = false
forwardable = true
allow_weak_crypto = yes

[realms]
 EXAMPLE.COM = {
  kdc = 127.0.0.1:60088
  chpasswd_server = 127.0.0.1:60464
  kpasswd_server = 127.0.0.1:60464
  default_domain = EXAMPLE.COM
 }


[domain_realm]
.EXAMPLE.COM = EXAMPLE.COM
EXAMPLE.COM = EXAMPLE.COM
```


## FAQ

### Server not found in Kerberos database while getting initial credentials
* 可能是加密算法需要安全扩展，尝试调整
* 可能是没有创建相应的服务

```
[21:35:42] ERROR [org.apache.directory.server.KERBEROS_LOG] - ERR_152 Unexpected exception: null
java.lang.NullPointerException
	at org.apache.directory.server.kerberos.kdc.authentication.AuthenticationService.verifyEncryptedTimestamp(AuthenticationService.java:335)
	at org.apache.directory.server.kerberos.kdc.authentication.AuthenticationService.execute(AuthenticationService.java:129)
	at org.apache.directory.server.kerberos.protocol.KerberosProtocolHandler.messageReceived(KerberosProtocolHandler.java:217)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$TailFilter.messageReceived(DefaultIoFilterChain.java:1015)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:650)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.access$1300(DefaultIoFilterChain.java:49)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$EntryImpl$1.messageReceived(DefaultIoFilterChain.java:1128)
	at org.apache.mina.filter.codec.ProtocolCodecFilter$ProtocolDecoderOutputImpl.flush(ProtocolCodecFilter.java:413)
	at org.apache.mina.filter.codec.ProtocolCodecFilter.messageReceived(ProtocolCodecFilter.java:257)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:650)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.access$1300(DefaultIoFilterChain.java:49)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain$EntryImpl$1.messageReceived(DefaultIoFilterChain.java:1128)
	at org.apache.mina.core.filterchain.IoFilterAdapter.messageReceived(IoFilterAdapter.java:122)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.callNextMessageReceived(DefaultIoFilterChain.java:650)
	at org.apache.mina.core.filterchain.DefaultIoFilterChain.fireMessageReceived(DefaultIoFilterChain.java:643)
	at org.apache.mina.transport.socket.nio.NioDatagramAcceptor.readHandle(NioDatagramAcceptor.java:314)
	at org.apache.mina.transport.socket.nio.NioDatagramAcceptor.processReadySessions(NioDatagramAcceptor.java:270)
	at org.apache.mina.transport.socket.nio.NioDatagramAcceptor.access$700(NioDatagramAcceptor.java:68)
	at org.apache.mina.transport.socket.nio.NioDatagramAcceptor$Acceptor.run(NioDatagramAcceptor.java:181)
	at org.apache.mina.util.NamePreservingRunnable.run(NamePreservingRunnable.java:64)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1149)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:624)
	at java.lang.Thread.run(Thread.java:748)
```
