---
id: email
---

# 邮件

## Server
* [Comparison of mail servers](https://en.wikipedia.org/wiki/Comparison_of_mail_servers)
* iRedMail
* [foxcpp/maddy](https://github.com/foxcpp/maddy) - all-in-one mail server
  * Golang
  * GPLv3

## 实现
* [albertito/chasquid](https://github.com/albertito/chasquid)
  * SMTP (email) server.
  * Golang
  * 特性
    * Easy to configure.
    * Hard to mis-configure in ways that are harmful or insecure (e.g. no open relay, or clear-text authentication).
    * Tracking of per-domain TLS support, prevents connection downgrading.
    * International usernames (SMTPUTF8) and domain names (IDNA).
    * Hooks for easy integration with greylisting, anti-virus and anti-spam.
    * Multiple domains, with per-domain user database and aliases.
    * Multiple TLS certificates.
    * Suffix dropping (user+something@domain → user@domain).
    * Easy integration with Let's Encrypt.
    * SPF checking.
    * Monitoring HTTP server, with exported variables and tracing to help debugging.
    * Supports using Dovecot for authentication (experimental).
