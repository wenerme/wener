---
title: Kerberos FAQ
tags:
  - FAQ
---

# Kerberos FAQ

## Cannot set GSSAPI authentication names, aborting

- 域缺少 `kadmin/admin` 或 `kadmin/changepw` principal

## ntlm vs kerberos

- NTLM
  - three-way handshake
  - **password hashing**
- Kerberos
  - two-part process
    - ticket granting service / key distribution center.
  - **encryption**
- Kerberos NTLM as the default authentication tool on Windows 2000
- https://www.crowdstrike.com/cybersecurity-101/ntlm-windows-new-technology-lan-manager/
- [NTLM vs KERBEROS](https://answers.microsoft.com/en-us/msoffice/forum/all/ntlm-vs-kerberos/d8b139bf-6b5a-4a53-9a00-bb75d4e219eb)

```
WWW-Authenticate: Negotiate
WWW-Authenticate: NTLM
```
