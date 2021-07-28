---
title: Windows Registry
---

# Windows Registry

# FAQ

## sip protocol registry

- 大部分 sip 会自行注册，但可能需要初次启动使用管理员身份

```reg
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\sip]
@="URL:sip Protocol"
"EditFlags"="02000000"
"URL Protocol"=""

[HKEY_CLASSES_ROOT\sip\DefaultIcon]
@="\"C:\\Users\\admin\\AppData\\Local\\CounterPath\\X-Lite\\Current\\X-Lite.exe\",32512"

[HKEY_CLASSES_ROOT\sip\shell]

[HKEY_CLASSES_ROOT\sip\shell\open]

[HKEY_CLASSES_ROOT\sip\shell\open\command]
@="\"C:\\apps\\eyeBeam\\eyeBeam.exe\" -dial=\"%1\""
```
