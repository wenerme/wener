---
title: Windows DLL & Dependencies
tags:
  - Windows
  - DLL
  - Debugging
---

# Windows DLL & Dependencies {#windows-dll}

- [Dependency Walker](http://dependencywalker.com/)

```bash
# Check DLL dependencies (Mingw)
x86_64-w64-mingw32-objdump -p libui.exe | grep -i 'DLL Name'

# Dump dependencies (Visual Studio)
dumpbin /dependents some.dll

# PowerShell list loaded modules
Start-Process -PassThru calc.exe | Get-Process -Module

# Wine Debug
WINEDEBUG=+loaddll wine <program>
```
