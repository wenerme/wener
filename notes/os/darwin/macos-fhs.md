---
title: macOS FHS
tags:
  - 目录结构
---

# macOS FHS

- [FileSystemOverview](https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html)
  - domain - user,local,network,system
- [FileManager](https://developer.apple.com/documentation/foundation/filemanager)
- Uniform Type Identifiers (UTIs)
  - com.apple.bundle
  - com.apple.application-bundle
- 垃圾箱位于 ~/.Trash
- 参考
  - [MacOs Directory Structure](https://difyel.com/apple/macos/macos-directory-structure/)

```bash
man hier

tree -dlL 2 /Volumes
```

| linux | macos                   |
| ----- | ----------------------- |
| /boot | /System/Library/Kernels |
| /home | /Users                  |
| /root | /var/root               |
| /etc  | /private/etc            |

- /etc/auto_master
  - automount

| src   | sym link                  |
| ----- | ------------------------- |
| /etc  | /private/etc              |
| /tmp  | /private/tmp              |
| /var  | /private/var              |
| /home | /System/Volumes/Data/home |

## macOS

- /Applications/
  - Utilities/ - managing the local system
  - Developer/
- /Library/

---

- /Network/
- /Volumes/

---

- /System/
  - Applications/
    - Utilities/
  - Developer/
  - DriverKit/
    - Runtime/
    - System/
    - usr/
  - Library/
  - Volumes/
    - BaseSystem/
    - Data/
    - Hardware/
    - Preboot/
    - Update/
    - Recovery/
    - VM/
      - swapfile
  - iOSSupport/
- /Library/

---

- /Users/
  - Shared/ - 本地用户共享
  - $USER/
    - Applications/
    - Desktop/
    - Documents/
    - Downloads/
    - Library/ - macOS 10.7+ 隐藏
    - Movies/
    - Music/
    - Pictures/
    - Public/ - 共享
    - Sites/

---

## Applications

- /Applications
- /Users/$USER/Applications
- /System/Applications

## Library

- Library - 存储应用相关文件
- [macOS Library Directory Details](https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/MacOSXDirectories/MacOSXDirectories.html)

---

- /Library
  - Documentation/
  - Extensions/ - kext - 内核扩展
  - Developer/
    - CommandLineTools/
      - SDKs/
      - Library/
      - usr/
        - bin/
- /Users/$USER/Library
- /System/Library

---

- Application Support/ - 非用户相关应用数据
  - 同样的应用可以在多处存储不同纬度 Application Support
- Caches/ - 应用缓存，可能会被删除，不会被备份
- Frameworks/ - 多用户共享， iOS 不支持自定义框架
- Preferences/ - 使用 NSUserDefaults 操作，会备份
- PrivateFrameworks/
- Developer/

## BSD

- /bin/ - 基础工具
- /dev/ - block & character device files
  - fd/ - file descriptor
- /etc/ - 系统配置文件和脚本
- /mach_kernel - 内核，启动加载到内存
- /sbin/ - 系统和管理工具
- /tmp/
- /usr/ - 主要用户工具和应用
  - bin/
  - include/
    - arpa/
    - hfs/
    - machine/
    - net/
    - netinet/
    - nfs/
    - objc/
    - protocols/
    - sys/
    - ufs/
  - lib/
  - libexec/ - system daemons & system utilities (executed by other programs)
  - local/ - exec & lib not included by the basic operating system
  - sbin/ - system daemons & system utilities (executed by users)
  - share/
    - calendar/ - `man calendar`
    - dict/ - `man look`
      - web2 - Webster's Second International
      - web2a
      - propernames
      - connectives
      - words -> ./web2
    - man/
    - misc/
    - mk/ - make 模版
    - skel/
    - tabset/ - `man termcap`
    - zoneinfo/ - `man tzfile`
- /var/
  - at/ - `man at`
  - backups/
  - db/
  - log/
  - mail/
  - run/
    - utmpx - `man utmpx`
  - rwho/ - `man rwho`
  - spool/
    - mqueue/ - `man sendmail` - 未发送的邮件
  - tmp/
  - folders/
    per-user temporary files and caches
