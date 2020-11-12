---
id: windows-env
title: Windows 环境
---

# Windows 环境信息

## Tips

## 环境变量

- 目录注册表
  - `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders`
  - `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders`

| Environment Variable           | Vista+                                 | XP                                                       |
| ------------------------------ | -------------------------------------- | -------------------------------------------------------- |
| `%ALLUSERSPROFILE%`            | C:\ProgramData                         | C:\Documents and Settings\All Users                      |
| `%APPDATA%`                    | C:\Users\%USERNAME%\AppData\Roaming    | C:\Documents and Settings\%USERNAME%\Application Data    |
| `%COMMONPROGRAMFILES%`         | C:\Program Files\Common Files          | C:\Program Files\Common Files                            |
| `%COMMONPROGRAMFILES(x86)%`    | C:\Program Files (x86)\Common Files    | C:\Program Files (x86)\Common Files                      |
| `%COMSPEC%`                    | C:\Windows\System32\cmd.exe            | C:\Windows\System32\cmd.exe                              |
| `%HOMEDRIVE%`                  | C:                                     | C:                                                       |
| `%HOMEPATH%`                   | C:\Users\%USERNAME%                    | C:\Documents and Settings\%USERNAME%                     |
| `%LOCALAPPDATA%`               | C:\Users\%USERNAME%\AppData\Local      |
| `%PROGRAMDATA%`                | C:\ProgramData                         |
| `%PROGRAMFILES%`               | C:\Program Files                       |
| `%PROGRAMFILES(X86)%` - 64 bit | C:\Program Files (x86)                 |
| `%PROGRAMFILES%`               | C:\Program Files                       |
| `%PROGRAMFILES(X86)%` - 64 bit | C:\Program Files (x86)                 |
| `%SystemDrive%`                | C:                                     | C:                                                       |
| `%SystemRoot%`                 | C:\Windows                             | C:\Windows                                               |
| `%TEMP%`,`%TMP%`               | C:\Users\%USERNAME%\AppData\Local\Temp | C:\Documents and Settings\%USERNAME%\Local Settings\Temp |
| `%USERPROFILE%`                | C:\Users\%USERNAME%                    | C:\Documents and Settings\%USERNAME%                     |
| `%WINDIR%`                     | C:\Windows                             | C:\Windows                                               |
| `%SystemDirectory%`            | C:\WINDOWS\System32                    |
| `%PUBLIC%`                     | C:\Users\Public                        |

| Environment Variable | Detail                |
| -------------------- | --------------------- |
| `%CD%`               | 当前目录              |
| `%ERRORLEVEL%`       | 上一个命令的退出码    |
| `%OS%`               | 操作系统 - Windows_NT |
| `%USERDOMAIN%`       | 用户域                |
| `%USERNAME%`         | 用户名                |
| `%DATE%`             | 日期                  |
| `%TIME%`             | 时间                  |
| `%RANDOM%`           | 0-32767 随机数        |
