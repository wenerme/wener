---
title: Security Awesome
tags:
  - Awesome
---

# Security Awesome

- https://github.com/zmap
- [jtesta/ssh-audit](https://github.com/jtesta/ssh-audit)
  - [ssh-audit.com](https://www.ssh-audit.com/)
- [ycd/dstp](https://github.com/ycd/dstp)
- [SentryPeer/SentryPeer](https://github.com/SentryPeer/SentryPeer)
  - peer to peer list of bad actor IP addresses and phone numbers collected via a SIP Honeypot
- [undergroundwires/privacy.sexy](https://github.com/undergroundwires/privacy.sexy)
  - Open-source tool to enforce privacy & security best-practices on Windows and macOS
  - [HN](https://news.ycombinator.com/item?id=32436949)
- [google/osv.dev](https://github.com/google/osv.dev)
  - vulnerability DB and triage service
- [soxoj/maigret](https://github.com/soxoj/maigret)
  - Collect a dossier on a person by username from thousands of sites
- [ocsf/ocsf-schema](https://github.com/ocsf/ocsf-schema)
- [vanhauser-thc/thc-hydra](https://github.com/vanhauser-thc/thc-hydra)
  - Apache-2.0

## Service

- [smicallef/spiderfoot](https://github.com/smicallef/spiderfoot)
  - MIT, Python
  - automates OSINT for threat intelligence and mapping your attack surface
  - [OSINT] - Open-source intelligence

[OSINT]: https://en.wikipedia.org/wiki/Open-source_intelligence

## Library

- [google/tink](https://github.com/google/tink)
  - Java/Android, C++, Obj-C, Go, Python
  - 基于 BoringSSL
- [jedisct1/libsodium](https://github.com/jedisct1/libsodium)
  - portable, easy to use crypto library
- [NaCl](https://nacl.cr.yp.to/) - Networking and Cryptography library
  - wikipedia [NaCl](<https://en.wikipedia.org/wiki/NaCl_(software)>)
- [google/paranoid_crypto](https://github.com/google/paranoid_crypto)
  - checks for well known weaknesses on cryptographic
- [Idov31/Sandman](https://github.com/Idov31/Sandman)
- 参考
  - [Comparison of cryptography libraries](https://en.wikipedia.org/wiki/Comparison_of_cryptography_libraries)

## SSL

| impl             | license              | written in | by         | adopted by                 |
| ---------------- | -------------------- | ---------- | ---------- | -------------------------- |
| [BoringSSL]      | ISC                  | C, C++, Go | Google     |
| [Botan]          | BSD                  | C++        |
| Bouncy Castle    | MIT                  | Java,C#    |
| JSSE             | GPLv2                | Java       | Oracle     |
| LibreSSL         | Apache-2.0, BSD, ISC | C          | OpenBSD    | macOS,OpenBSD,DragonflyBSD |
| [MbedTLS]        | Apache-2.0, GPLv2+   | C          | ARM        | PowerDNS,OpenVPN           |
| NSS              | MPL-2.0              | C          | Mozilla... |
| OpenSSL          | Apache-2.0           | C          | OpenSSL    |
| s2n              | Apache-2.0, GPLv2+   | Amazon     |
| Secure Transport | APSL-2.0             | Apple      |
| GnuTLS           | LGPLv2.1             | C          | FSF        |
| wolfssl          | GPLv2+               | C          |

[mbedtls]: https://github.com/Mbed-TLS/mbedtls
[botan]: https://github.com/randombit/botan
[boringssl]: https://github.com/google/boringssl

- Botan
- MbedTLS
  - 适用于嵌入式场景
- LibreSSL
  - 2014-04 - OpenBSD fork OpenSSL
- BoringSSL
  - 2014-06 Google fork OpenSSL
  - Tink - based on BoringSSL
- JSSE - Java Secure Socket Extension
- NSS - Network Security Services

:::info

- 使用最多的是 OpenSSL - OpenSSL 3.0 变动较大
- 2014-04 OpenSSL Heartbleed 事件

:::

- [Comparison of TLS implementations](https://en.wikipedia.org/wiki/Comparison_of_TLS_implementations)

## Private PKI

- [Keyfactor/ejbca-ce](./cert/ejbca.md)
  - LPLv2.1, Java
  - https://hub.docker.com/r/keyfactor/ejbca-ce
- [letsencrypt/boulder](https://github.com/letsencrypt/boulder)
- [dogtagpki/pki](https://github.com/dogtagpki/pki)
  - GPLv2, Java
- [step ca](./cert/smallstep.md)
- [hakwerk/labca](https://github.com/hakwerk/labca)
  - MPLv2+CC, Go
  - WebUI
- [cloudflare/cfssl](./cert/cfssl.md)
  - BSD-2, Go
- Vault Hashicorp
- https://github.com/xipki/xipki
- https://github.com/viralpoetry/awesome-pki

## AV

- https://www.av-comparatives.org/tests/performance-test-april-2022/
- [Cisco-Talos/clamav](https://github.com/Cisco-Talos/clamav)
  - GPLv2, C, C++
  - 唯一广泛使用的开源杀毒软件
- [Tlaster/YourAV](https://github.com/Tlaster/YourAV)
- [Comparison of antivirus software](https://en.wikipedia.org/wiki/Comparison_of_antivirus_software)

## Index

- https://fofa.so/

## Password

- [project-rainbowcrack](http://project-rainbowcrack.com/)

## Crack

- Geetest
  - [yanglbme/geetest-crack](https://github.com/yanglbme/geetest-crack)
  - https://github.com/topics/geetest

## Firewall

- [shorewall](https://shorewall.org/)

## Tools

- [samuel-lucas6/Kryptor](https://github.com/samuel-lucas6/Kryptor)
- [FiloSottile/age](./age.md)
  - file encryption tool
  - [HN](https://news.ycombinator.com/item?id=28435613)
- [FiloSottile/yubikey-agent](https://github.com/FiloSottile/yubikey-agent)
- [str4d/rage](https://github.com/str4d/rage)
  - 类似 age，但 rust 实现
  - 依然还不支持 ssh-agent
- [woodruffw/kbs2](https://github.com/woodruffw/kbs2)
  - secret manager backed by age
- [Ex0dIa-dev/ssh-honeypot-go](https://github.com/Ex0dIa-dev/ssh-honeypot-go)
- [sairson/Yasso](https://github.com/sairson/Yasso)
- [geemion/Khepri](https://github.com/geemion/Khepri)
- [carlospolop/PEASS-ng](https://github.com/carlospolop/PEASS-ng)
  - PEASS - Privilege Escalation Awesome Scripts SUITE
- Repo
  - [StackExchange/blackbox](https://github.com/StackExchange/blackbox)
  - git-secret
  - [AGWA/git-crypt](https://github.com/AGWA/git-crypt)
    - GPLv3, C++
  - [slok/agebox](https://github.com/slok/agebox)
    - Apache-2.0, Golang
    - 基于 age
    - .ageboxreg.yml
- pgp
  - encryption, signing services, key management, web-of-trust, smartcard compat

## Reference

- [scaredos/cfresearch](https://github.com/scaredos/cfresearch)
  research from CloudFlare's Anti-DDoS challenges.

## Web

- [jptosso/coraza-waf](https://github.com/jptosso/coraza-waf)

## AES

- 建议 Key 至少 256
- CBC/CTR/GCM/CCM/EAX
- 不要使用 ECB
- used by
  - US Government to protect their own files - [FIPS 197](http://csrc.nist.gov/publications/fips/fips197/fips-197.pdf)

## Block cipher mode

- https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation

ECB should not be used if encrypting more than one block of data with the same key.

CBC, OFB and CFB are similar, however OFB/CFB is better because you only need encryption and not decryption, which can save code space.

- CTR 并行效率高于 CBC/OFB/CFB
- https://stackoverflow.com/a/1220869/1870054
- https://stackoverflow.com/questions/1220751

## Spam

- [cobaltdisco/Google-Chinese-Results-Blocklist](https://github.com/cobaltdisco/Google-Chinese-Results-Blocklist)

## Scan

- [robertdavidgraham/masscan](https://github.com/robertdavidgraham/masscan)
- [projectdiscovery](https://github.com/projectdiscovery)
  - [nuclei](https://github.com/projectdiscovery/nuclei)
    - vulnerability scanner
    - [nuclei-templates](https://github.com/projectdiscovery/nuclei-templates)
  - [subfinder](https://github.com/projectdiscovery/subfinder)
    - subdomain discovery
  - [interactsh](https://github.com/projectdiscovery/interactsh)
    - OOB
  - [naabu](https://github.com/projectdiscovery/naabu)
    - port scanner
- [aquasecurity/trivy](https://github.com/aquasecurity/trivy)
  - Apache-2.0, Go
  - Scanner for vulnerabilities in container images, file systems, and Git
- 服务
  - https://www.shodan.io/search?query=clickhouse
- [ivre/ivre](https://github.com/ivre/ivre)
  - GPLv3, Python
  - Network recon framework
  - https://ivre.rocks/
- https://www.arachni-scanner.com/
- https://ecsypno.com/
- https://github.com/Arachni
- https://github.com/qadron/
- https://github.com/ecsypno
- https://github.com/scnr/
- [laramies/theHarvester](https://github.com/laramies/theHarvester)
  - E-mails, subdomains and names Harvester - OSINT

---

- Nmap
  - 端口扫描 + 指纹探测 + 简单的漏洞扫描
- AWVS - Acunetix Web Vulnerability Scanner
  - Web 漏洞扫描
- AppScan
- Nessus
  - 系统安全漏洞扫描
- Goby
  - 资产探测和漏洞检查
- NetSparker
- Xray
  - 被动 Web 漏洞检查
- fscan
  - 内网渗透
- burpsuite
- msf sqlmap
- IAST
- https://ipchaxun.com/

## 参考

- wikipedia [DAST](https://en.wikipedia.org/wiki/Dynamic_application_security_testing)
  - Dynamic application security testing
- [Reverse Engineering Crypto Functions: AES](https://www.goggleheadedhacker.com/blog/post/reversing-crypto-functions-aes)
- [klezVirus/vortex](https://github.com/klezVirus/vortex)
  - VPN Overall Reconnaissance, Testing, Enumeration and Exploitation Toolkit
