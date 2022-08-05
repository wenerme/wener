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

## Library

- [emersion/go-imap](https://github.com/emersion/go-imap)
- [haraka/Haraka](https://github.com/haraka/Haraka)
  - MIT, JS
  - SMTP server
- [jordwest/imap-server](https://github.com/jordwest/imap-server)

# FAQ

- DMARC Domain-based Message Authentication Reporting and Conformance
  - https://www.cloudflare.com/zh-cn/learning/dns/dns-records/dns-dmarc-record/
