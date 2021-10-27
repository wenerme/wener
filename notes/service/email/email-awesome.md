---
tags:
  - Awesome
---

# EMail Awesome

## Server

- [Comparison of mail servers](https://en.wikipedia.org/wiki/Comparison_of_mail_servers)
- iRedMail
- [mail-in-a-box/mailinabox](https://github.com/mail-in-a-box/mailinabox)
- [foxcpp/maddy](https://github.com/foxcpp/maddy) - all-in-one mail server
  - GPLv3, Golang
- [tomav/docker-mailserver](https://github.com/tomav/docker-mailserver)
- [Mailu/Mailu](https://github.com/Mailu/Mailu)
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

## Client

- Dovecot
- postfix
- [tutao/tutanota](https://github.com/tutao/tutanota)
  - end-to-end encrypted mail client

## Library

- [emersion/go-imap](https://github.com/emersion/go-imap)
- [haraka/Haraka](https://github.com/haraka/Haraka)
  - MIT, JS
  - SMTP
- [jordwest/imap-server](https://github.com/jordwest/imap-server)
