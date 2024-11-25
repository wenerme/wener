---
title: MSSQL
tags:
  - Topic
---

# MSSQL

| port | for             |
| ---- | --------------- |
| 1433 | default         |
| 1434 | browser service |


```bash
nmap -p 1433,1434 HOST
```

## 备份

- .bkf
- ntbackup 工具
- [geocar/mtftar](https://github.com/geocar/mtftar)
  - .bkf -> tar

```
Windows NTbackup archive NT, with file catalog, soft size 1*512, software (0x1200): Microsoft SQL Server
```

## 导出

```bash
bcp "SELECT * FROM database.schema.table" queryout "output.csv" -c -t, -S servername -U username -P password

Invoke-Sqlcmd -Query "SELECT * FROM database.schema.table" -ServerInstance "servername" | Export-Csv -Path "output.csv" -NoTypeInformation
```
