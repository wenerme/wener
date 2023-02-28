---
tags:
  - Awesome
---

# EMail Awesome

## Server

- iRedMail
- [mail-in-a-box/mailinabox](https://github.com/mail-in-a-box/mailinabox)
  - CC0-1.0
- [docker-mailserver/docker-mailserver](https://github.com/docker-mailserver/docker-mailserver)
- [foxcpp/maddy](https://github.com/foxcpp/maddy) - all-in-one mail server
  - GPLv3, Golang
- [tomav/docker-mailserver](https://github.com/tomav/docker-mailserver)
- [Mailu/Mailu](https://github.com/Mailu/Mailu)
  - MIT, Python
  - https://mailu.io/master/demo.html
- [modoboa/modoboa](https://github.com/modoboa/modoboa)
  - ISC, Python
  - Mail hosting made simple
- [albertito/chasquid](https://github.com/albertito/chasquid)
  - Apache-2.0, Golang
  - SMTP (email) server.
  - 特性
    - Easy to configure.
    - Hard to mis-configure in ways that are harmful or insecure (e.g. no open relay, or clear-text authentication).
    - Tracking of per-domain TLS support, prevents connection downgrading.
    - International usernames (SMTPUTF8) and domain names (IDNA).
    - Hooks for easy integration with greylisting, anti-virus and anti-spam.
    - Multiple domains, with per-domain user database and aliases.
    - Multiple TLS certificates.
    - Suffix dropping (user+something@domain → user@domain).
    - Easy integration with Let's Encrypt.
    - SPF checking.
    - Monitoring HTTP server, with exported variables and tracing to help debugging.
    - Supports using Dovecot for authentication (experimental).
- [lavabit/magma](https://github.com/lavabit/magma)
  - C
  - SMTP, POP, IMAP, HTTP, MOLTEN
- [dovecot/core](https://github.com/dovecot/core)
  - IMAP server
  - https://doc.dovecot.org/
- [tutao/tutanota](https://github.com/tutao/tutanota)
  - end-to-end encrypted mail client
- [vdukhovni/postfix](https://github.com/vdukhovni/postfix)
  - IBM Public License, Eclipse Public License
  - https://www.postfix.org/postconf.5.html
- OpenSMTPD
- [lavabit/magma](https://github.com/lavabit/magma)
  - AGPLv3, C
- Webmail
  - [roundcube/roundcubemail](https://github.com/roundcube/roundcubemail)
    - GPLv3, PHP
- Spam
  - greylisting
  - [spamassassin](https://spamassassin.apache.org/)
- Policy
  - http://postgrey.schweikert.ch/
- [Z-Hub/Z-Push](https://github.com/Z-Hub/Z-Push)
  - PHP
  - ActiveSync
- https://poste.io/
  - SMTP + IMAP + POP3 + Antispam + Antivirus
  - Web administration + Web email

---

- Protocol
  - SMTP - Simple Mail Transfer Protocol
  - POP - Post Office Protocol
  - IMAP - Internet Message Access Protocol
  - JMAP - JSON Meta Application Protocol
- Spam
  - Bayesian spam filtering
- MTA - mail transfer agent - Message transfer agent
- [Comparison of mail servers](https://en.wikipedia.org/wiki/Comparison_of_mail_servers)
- [List of mail server software](https://en.wikipedia.org/wiki/List_of_mail_server_software)

## Client

## Templat

- [sofn-xyz/mailing](https://github.com/sofn-xyz/mailing)
  - MIT, TS
  - Build, test, send emails with React

## Library

- [emersion/go-imap](https://github.com/emersion/go-imap)
- [haraka/Haraka](https://github.com/haraka/Haraka)
  - MIT, JS
  - SMTP server
- [jordwest/imap-server](https://github.com/jordwest/imap-server)

# FAQ

- DMARC Domain-based Message Authentication Reporting and Conformance
  - https://www.cloudflare.com/zh-cn/learning/dns/dns-records/dns-dmarc-record/

## 163 code

| Code                                                       | For                                                                                                           |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 554 HL:IHU                                                 | 该 IP 的发送行为触犯了网易的服务条款，被临时挂起。请检查是否有用户不正当的发送行为。                          |
| 554 HL:IPB                                                 | 该 IP 不在网易允许的发送地址列表里。                                                                          |
| 451 HL:MEP                                                 | 该 IP 发送行为异常，被临时禁止连接。                                                                          |
| 421 HL:REP                                                 | 该 IP 发送行为异常，被临时禁止连接。                                                                          |
| 554 HL:ICC                                                 | 该 IP 短期内发送了大量信件，超过了网易的限制，被临时禁止连接。请检查是否有用户发送病毒或者垃圾邮件。          |
| 554 HL:IFQ                                                 | 该 IP 短期内发送了大量信件，超过了网易的限制，被临时禁止连接。请检查是否有用户发送病毒或者垃圾邮件。          |
| 554 HL:ITC                                                 | 该 IP 短期内发送了大量信件，超过了网易的限制，被临时禁止连接。请检查是否有用户发送病毒或者垃圾邮件。          |
| 554 MI:SPB                                                 | 此用户不在网易允许的发信用户列表里。                                                                          |
| 550 MI:NHD                                                 | HELO 命令不允许为空。                                                                                         |
| 550 MI:IMF                                                 | 发信人电子邮件地址不合规范。请参考http://www.rfc-editor.org/关于电子邮件规范的定义。                          |
| 550 MI:SPF                                                 | 发信 IP 未被发送域的 SPF 许可。请参考http://www.openspf.org/关于SPF规范的定义。                               |
| 451 MI:CEL                                                 | 发送行为异常，该发件人被临时禁止发信。                                                                        |
| 451 MI:DMC                                                 | 发送行为异常，该发件人被临时禁止发信。                                                                        |
| 451 MI:CCL                                                 | 发送行为异常，该发件人被临时禁止发信。                                                                        |
| 554 MI:SFQ                                                 | 短期内发送了大量信件，超过了网易的限制，该发件人被临时禁止发信。                                              |
| 550 MI:STC                                                 | 短期内发送了大量信件，超过了网易的限制，该发件人被临时禁止发信。                                              |
| 550 RP:FRL                                                 | 禁止发信到非网易用户。                                                                                        |
| 550 RP:RCL                                                 | 群发收件人数量超过了限额。                                                                                    |
| 550 RP:CEL                                                 | 发件人发送行为异常。                                                                                          |
| 451 RP:DRC                                                 | 群发收件人数量超过了限额。                                                                                    |
| 451 RP:CCL                                                 | 发件人发送行为异常。                                                                                          |
| 550 RP:QRC                                                 | 该用户短期内发送了大量信件，超过了网易的限制，被临时禁止发信。                                                |
| 550 RP:TRC                                                 | 该用户短期内发送了大量信件，超过了网易的限制，被临时禁止发信。                                                |
| 451 DT:SPM                                                 | 发送的邮件内容包含了未被网易许可的信息，或违背了网易的反垃圾服务条款。                                        |
| 554 DT:SPM                                                 | 发送的邮件内容包含了未被网易许可的信息，或违背了网易的反垃圾服务条款。                                        |
| 451 DT:RBL                                                 | 发信 IP 位于一个或多个 RBL 里。请参考http://www.rbls.org/关于RBL的相关信息。                                  |
| 552 Illegal Attachment                                     | 不允许发送该类型的附件，包括以.uu .pif .scr .mim .hqx .bhx .cmd .vbs .bat .com .vbe .vb .js .wsh 等结尾的附件 |
| 554 IP in blacklist                                        | 该 IP 不在网易允许的发送地址列表里。                                                                          |
| 552 Requested mail action aborted: exceeded mailsize limit | 发送的信件大小超过了网易邮箱允许接收的最大限制。                                                              |
| 500 Error: bad syntaxU                                     | 发送的 smtp 命令语法有误。                                                                                    |
| 550 Invalid User                                           | 请求的用户不存在。                                                                                            |
| 550 User in blacklist                                      | 黑名单中的用户。该用户不被允许给网易用户发信。                                                                |
| 550 User suspend                                           | 用户暂停/停用。                                                                                               |

- http://help.mail.163.com/faqDetail.do?code=d7a5dc8471cd0c0e8b4b8f4f8e49998b374173cfe9171305fa1ce630d7f67ac230c558100287331e
