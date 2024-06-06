---
title: Windows 域控
---

# Windows 域控

- Windows Home Server 也可以做 DC
- [Domain controller](<https://en.wikipedia.org/wiki/Domain_controller_(Windows)>)
- [How domain controllers are located in Windows](http://support.microsoft.com/kb/247811)
- https://en.wikipedia.org/wiki/NT_LAN_Manager
- NTLM https://www.onlinehashcrack.com/
- [NTLM user authentication in Windows](https://support.microsoft.com/en-hk/help/102716)
- NTLMv2
  - https://kb.iu.edu/d/atcb
- %SYSTEMROOT%\SYSVOL
- %SYSTEMROOT%\NTDS

```bash
ntlm_auth --allow-mschapv2 --request-nt-key --domain=COMPANY --username=domainuser --password=userpassword

ntlm_auth = "/usr/bin/ntlm_auth --allow-mschapv2 --request-nt-key
--username=%{%{Stripped-User-Name}:-%{%{User-Name}:-None}}
--challenge=%{%{mschap:Challenge}:-00}
--nt-response=%{%{mschap:NT-Response}:-00}"
```

## AD DS

- [Active Directory Domain Services](https://docs.microsoft.com/en-us/windows-server/identity/ad-ds/active-directory-domain-services)
  - creating scalable, secure, and manageable infrastructures.
  - design, depoly, operation
