---
tags:
  - 目录结构
---

# Windows FHS

- shell:RecycleBinFolder
- [SID] - User's Security Identifier
  - S-R-X-Y1-Y2-Yn-1-Yn
    - R - revision
    - X - identifier authority
    - Y - subauthority
  - S-1-5-32-544
    - R = revision level 1
    - X = 5 - NT Authority
    - 32,Builtin - domain identifier
    - 544, Administrators - relative identifier
  - HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList
  - `wmic useraccount get name,sid`
  - `wmic useraccount where name="USER" get sid`
  - `wmic useraccount where sid="S-1-5-21-992878714-4041223874-2616370337-1001" get name`
- RID - relative identifier
- LSA - Local Security Authority
- SAM - Security Accounts Manager

[sid]: https://docs.microsoft.com/en-us/windows/security/identity-protection/access-control/security-identifiers

- [Local File Systems](https://docs.microsoft.com/en-us/windows/win32/fileio/file-systems)
- wikipedia [Directory structure](https://en.wikipedia.org/wiki/Directory_structure)

---

# C:

- $Recycle.Bin
  - %SID%
- $SysReset
- PerfLogs/
- Program Files/
  - Common Files/
- Program Files (x86)/
- ProgramData/
  - Microsoft/
    - Windows Defender/
- Users/
  - Public/
  - %USERNAME%/
    - AppData/
      - Roaming/ - 会同步
      - Local/
      - LocalLow/
- WinSxS/
- Windows/
  - System/
  - System32/
    - wbem/
    - drivers/
      - etc/
        - hosts
        - lmhosts
        - protocol
        - networks
        - services
  - System64/
- Temp/

## XP

- Documents and Settings/
  - User/
    - Local Settings/
      - Application Data/
