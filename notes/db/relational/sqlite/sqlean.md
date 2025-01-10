---
tags:
  - Extension
---

# SQLean

- [nalgeon/sqlean](https://github.com/nalgeon/sqlean)
  - MIT, C
  - 扩展合集
  - crypto: 提供哈希、编码与解码功能
    - `crypto_{blake3,md5,sha1,sha256,sha384,sha512}`
    - `crypto_encode('data',base32|base64|base86|hex|url)`
    - `crypto_decode(text, algo)`
  - define: 用户自定义函数与动态 SQL
    - eval, define, undefine, define_free
    - `create virtual table NAME using define((BODY))`
    - `select * from sqlean_define`
  - fileio: 读写文件
    - `fileio_{read,scan,write,append,mkdir,symlink,ls}`
  - fuzzy: 模糊字符串匹配与音律分析
  - ipaddr: IP 地址操作
  - math: 数学函数
  - regexp: 正则表达式支持
  - stats: 数学统计
  - text: 字符串与 Unicode 函数
  - time: 高精度日期/时间
    - duration, nanosecond precision
    - time_now(), time_date()
    - `time_get_{year,month,day,hour,minute,second,nano,weekday,yearday,isoyear,isoweek}`
    - time_get, time_unix, time_milli, time_micro, time_nano
    - `time_{after,before,compare,equal}`
    - `time_{add,sub,since,until,trunc,round}`
  - uuid: 全局唯一标识符
    - uuid4, uuid7
    - uuid7_timestamp_ms, uuid_str, uuid_blob
  - vsv: CSV 文件虚拟表
  - [nalgeon/sqlean.js](https://github.com/nalgeon/sqlean.js)
    - npm:@antonz/sqlean
  - Playground https://sqlime.org/

## Install

- https://github.com/nalgeon/sqlean/blob/main/docs/install.md
- https://github.com/nalgeon/sqlean/releases
