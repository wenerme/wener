---
title: Batch
---

# Batch

- Windows 批处理
- https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/windows-commands

| cmd  | for            |
| ---- | -------------- |
| chcp | 修改 code Page |

```batch
:: 设置代码页为 UTF-8 - Windows 7+
@chcp 65001>nul

:: 实现一个 CMDRC, 每次启动
reg add "hklm\software\Microsoft\Command Processor" /f /v AutoRun /d "C:\cmdrc.cmd" > NUL
:: 还算简单的一个提示符
prompt $P$_$$$S

:: 后台运行 相当于linux下的 xxx &
START /B xxx.exe

:: SC 服务操作 http://support.microsoft.com/kb/251192
sc create svnserve binpath= "\"C:\Program Files\CollabNet Subversion Server\svnserve.exe\" --service -r \"C:\my repositories\"  " displayname= "Subversion Server" depend= Tcpip start= auto

sc create asperacentral binPath= "C:\Program Files\Aspera\Enterprise Server\bin\Debug\asperacentral.exe" DisplayName= "Aspera Central" start= auto

:: CMD 续行符号为 ^ 相当于 linux的 \

:: 操作菜单中的最佳列表
:: %appdata%\Microsoft\Windows\Recent

:: 跳转菜单中的最近列表
:: %appdata%\microsoft\windows\recent\automaticdestinations
```

| cp    | country/region/language |
| ----- | ----------------------- |
| 437   | United States           |
| 850   | Multilingual (Latin I)  |
| 852   | Slavic (Latin II)       |
| 855   | Cyrillic (Russian)      |
| 857   | Turkish                 |
| 860   | Portuguese              |
| 861   | Icelandic               |
| 863   | Canadian-French         |
| 865   | Nordic                  |
| 866   | Russian                 |
| 869   | Modern Greek            |
| 936   | Chinese                 |
| 65001 | UTF-8                   |

- `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Nls\CodePage\OEMCP`
  - 可以修改默认的 code page
- `HKEY_LOCAL_MACHINE\Software\Microsoft\Command Processor\Autorun`
  - 可以设置自动运行的脚本
