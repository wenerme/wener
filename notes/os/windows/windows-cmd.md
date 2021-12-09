---
title: Windows 命令
---

# Windows 命令

| cmd        | full name         | desc         |
| ---------- | ----------------- | ------------ |
| gpedit     | Group Policy Edit | 组策略编辑   |
| services   | Service Manager   | 服务         |
| control    | Control Panel     | 控制面板     |
| eventvwr   | Event Viewer      | 事件查看器   |
| systeminfo |                   | 查看系统信息 |

```batch
# 服务管理
net startservice
net stopservice
net pauseservice
net continueservice
# 禁用服务
sc config "Name Of Service" start= disabled
```

## 快捷方式

- https://stackoverflow.com/questions/32438204
- https://en.wikipedia.org/wiki/Shortcut_(computing)
- [Shell Link (.LNK) Binary File Format](https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-shllink/16cb4ca1-9339-4d0c-a68d-bf1d6cc0f943)

## PowerShell

```bash
# tail
Get-Content filenamehere -Wait -Tail 30
```

## Auto run

- 启动顺序
- (Login Screen)
- `HKLM\Software\Microsoft\Windows\CurrentVersion\RunOnce`
- `HKLM\Software\Microsoft\Windows\CurrentVersion\Run`
- `HKCU\Software\Microsoft\Windows\CurrentVersion\Run`
- StartUp Folder
  - `shell:startup` - 当前用户
    - `C:\Users\Administrator\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup`
  - `shell:common startup` - 公共
    - `C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp`
- `HKCU\Software\Microsoft\Windows\CurrentVersion\RunOnce`

```nsis
WriteRegStr HKLM “Software\Microsoft\Windows\CurrentVersion\Run” “Monitor” “X:\Monitor.exe”
WriteRegStr HKCU “Software\Microsoft\Windows\CurrentVersion\Run” “Monitor” “X:\Monitor.exe”

CreateShortCut “$SMSTARTUP\Monitor.lnk” “$INSTDIR\Monitor.exe”
```
