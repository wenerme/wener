---
title: MSSQL
tags:
  - Topic
---

# MSSQL

- SQL Server
  - 产品名字
- Microsoft SQL Server
  - 完整产品名字
- MSSQL
  - 常用缩写

| abbr. | stand for                       | mean                  |
| ----- | ------------------------------- | --------------------- |
| MSSQL | Microsoft SQL Server            | 微软 SQL Server       |
| T-SQL | Transact-SQL                    | 事务 SQL              |
| SSMS  | SQL Server Management Studio    | SQL Server 管理工作室 |
| SSDT  | SQL Server Data Tools           | SQL Server 数据工具   |
| SSIS  | SQL Server Integration Services | SQL Server 集成服务   |
| SSRS  | SQL Server Reporting Services   | SQL Server 报告服务   |
| SSAS  | SQL Server Analysis Services    | SQL Server 分析服务   |

| port | for             |
| ---- | --------------- |
| 1433 | default         |
| 1434 | browser service |

```bash
nmap -p 1433,1434 HOST
```

```sql
-- 服务器信息
SELECT @@VERSION;

SELECT SERVERPROPERTY('ProductVersion')      AS ProductVersion,      -- e.g., 15.0.2112.4
       SERVERPROPERTY('ProductLevel')        AS ProductLevel,        -- e.g., RTM, SP1, SP2
       SERVERPROPERTY('ProductMajorVersion') AS ProductMajorVersion, -- e.g., 15 (for SQL 2019)
       SERVERPROPERTY('Edition')             AS Edition -- e.g., Developer Edition, Standard Edition
;


-- LIMIT
SELECT TOP 3 * FROM Users;

-- show tables
SELECT TABLE_SCHEMA, TABLE_NAME
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_SCHEMA, TABLE_NAME;

-- 系统用户
-- type S = SQL Login, U = Windows Login, G = Windows Group
select *
from sys.server_principals;
```

| sql   | mssql |
| ----- | ----- |
| limit | top   |

# Awesome

- [FreeTDS/freetds](https://github.com/FreeTDS/freetds)
  - GPLv2, C
- mssql-tools
- [microsoft/mssql-docker](https://github.com/microsoft/mssql-docker)
  - MIT, Dockerfile
  - microsoft/mssql-tools
    - mcr.microsoft.com/mssql-tools
    - 已经过时，目前没有单独的 mssql-tools 镜像
- SQL Server
  - 镜像 mcr.microsoft.com/mssql/server:2022-latest
    - 2017, 2019, 2022
  - https://mcr.microsoft.com/en-us/artifact/mar/mssql/server/tags
- [microsoft/go-sqlcmd](https://github.com/microsoft/go-sqlcmd)
  - MIT, Go
  - 新的 sqlcmd
  - `SQLCMD_ACCEPT_EULA=YES`
- sqlcmd
  - ODBC-based
  - 包含在 mssql-tools
- https://packages.microsoft.com/

```bash
docker run --rm -it \
  -v $PWD:/host \
  -w /host \
  -e ACCEPT_EULA=Y \
  --name mssql-tools mcr.microsoft.com/mssql-tools

sqlcmd -S localhost -U sa -P password -d master -Q "select @@version"
```

## sqlcmd

- 推荐使用 go-sqlcmd
  - 能管理多个上下文
  - 能在本地管理开发环境，直接启动容器
- 注意⚠️ 没有 bcp 功能
  - 可以考虑 [slingdata-io/sling-cli](https://github.com/slingdata-io/sling-cli)

```bash
# go-sqlcmd
brew install sqlcmd

curl -LO https://github.com/microsoft/go-sqlcmd/releases/download/v1.8.2/sqlcmd-linux-amd64.tar.bz2
tar zxvf sqlcmd-linux-amd64.tar.bz2 sqlcmd
./sqlcmd
```

- 如果服务器太老 SQL Server 2008, 可能只支持 TLS 1.0, 会出现错误

```bash
sqlcmd

# 可以关闭 TLS 避免错误，但是 sqlconfig 方式目前没看到可以设置 Encrypt
sqlcmd -N disable

sqlcmd config current-context
sqlcmd config connection-strings

sqlcmd query "SELECT @@version"
```

| flag                        | env                     | default              | for                                                                                  |
| --------------------------- | ----------------------- | -------------------- | ------------------------------------------------------------------------------------ |
| `-C`                        |                         |                      | TRUSTSERVERCERTIFICATE                                                               |
| `-d <db_name>`              | SQLCMDDBNAME            |                      | `USE <db_name>`                                                                      |
| `-D`                        |                         |                      | server name as DSN                                                                   |
| `-l <login_timeout>`        | SQLCMDLOGINTIMEOUT      | 8                    |
| `-E`                        |                         |                      | trusted connection, 忽略 SQLCMDPASSWORD 变量                                         |
| `-g`                        |                         |                      | Column Encryption                                                                    |
| `-G`                        | SQLCMDUSEAAD            |                      | 使用 Microsoft Entra authentication 连接 Azure SQL Database, Azure Synapse Analytics |
| `-H <workstation_name>`     |                         |                      | SQLCMDWORKSTATION                                                                    |
| `-j`                        |                         |                      | print raw error messages                                                             |
| `-K <application_intent>`   |                         |                      | `ApplicationIntent=ReadOnly`                                                         |
| `-M <multisubnet_failover>` |                         |                      |
| `-N <encrypt>`              |                         |                      | `Encrypt=True`                                                                       |
| `-P <password>`             | SQLCMDPASSWORD          |                      |                                                                                      |
| `-S <server>`               | SQLCMDSERVER            | DefaultLocalInstance |                                                                                      |
| `-U <login_id>`             | SQLCMDUSER              |                      |                                                                                      |
| `-H <>`                     | SQLCMDWORKSTATION       | ComputerName         |
| `-z <new_password>`         |                         |                      |
| `-Z <new_password>`         |                         |                      | 修改密码然后退出                                                                     |
| `-V <error_level>`          |                         |                      | `SQLCMDERRORLEVEL`                                                                   |
| `-t <>`                     | SQLCMDSTATTIMEOUT       | 0                    |
| `-h`                        | SQLCMDHEADERS           | 0                    |
| `-w`                        | SQLCMDCOLWIDTH          | 0                    |
| `-a`                        | SQLCMDPACKETSIZE        | 4096                 |
| `-m`                        | SQLCMDERRORLEVEL        | 0                    |
| `-y`                        | SQLCMDMAXVARTYPEWIDTH   | 256                  |
| `-Y`                        | SQLCMDMAXFIXEDTYPEWIDTH | 0                    |

- env
  - SQLCMDEDITOR
  - SQLCMDINI
- `-S [protocol:]server[\instance_name][,port]`
- -D - 将 `-S server` 作为 DSN
  - odbc.ini
  - ~/.odbc.ini
  - /etc/odbc.ini
- https://learn.microsoft.com/en-us/sql/tools/sqlcmd/sqlcmd-utility

# Admin

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

## 连接字符串 {#connection-string}

```
Server=localhost;Database=master;User Id=sa;Password=your_password;
```

- https://docs.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlconnection.connectionstring
- [ConnectionStrings.com](https://www.connectionstrings.com/)

# FAQ

## TLS Handshake failed: tls: server selected unsupported protocol version 301

- TLS version 1.0
- 尝试 encrypt=disable
- 服务端太老了
