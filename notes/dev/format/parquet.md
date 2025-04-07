---
title: Apache Parquet
---

# Parquet

- [apache/parquet-format](https://github.com/apache/parquet-format)
  - Apache-2.0, Thrift
  - 使用 Thrift 来定义和序列化它的文件元数据
- dictionary
- bloom filter
- delta binary packed compression
- 参考
  - [Small Materialized Aggregates: A Light Weight Index Structure for Data Warehousing](https://www.vldb.org/conf/1998/p476.pdf)
  - [Super-Scalar RAM-CPU Cache Compression](https://ir.cwi.nl/pub/15564/15564B.pdf)
  - NodeJS
    - [hyparam/hyparquet](https://github.com/hyparam/hyparquet)
      - MIT, JS
      - npm:hyparquet
    - [LibertyDSNP/parquetjs](https://github.com/LibertyDSNP/parquetjs)
      - MIT, TS, JS
      - npm:@dsnp/parquetjs
    - ~~[ironSource/parquetjs](https://github.com/ironSource/parquetjs)~~
      - npm:parquetjs

| Type                 | Size    | Description                 |
| -------------------- | ------- | --------------------------- |
| BOOLEAN              | 1 bit   | Boolean value               |
| INT32                | 32 bit  | Signed integer              |
| INT64                | 64 bit  | Signed integer              |
| INT96                | 96 bit  | Signed integer (deprecated) |
| FLOAT                | 32 bit  | IEEE floating point         |
| DOUBLE               | 64 bit  | IEEE floating point         |
| BYTE_ARRAY           | varying | Variable length byte array  |
| FIXED_LEN_BYTE_ARRAY | fixed   | Fixed length byte array     |

| Type              | Physical Type  | Description                                |
| ----------------- | -------------- | ------------------------------------------ |
| **String**        |
| STRING            | BYTE_ARRAY     | UTF8 encoded character string              |
| ENUM              |
| UUID              | `FIXED[16]`    | 16-byte UUID                               |
| **Numeric**       |
| INT(bits, signed) |
| DECIMAL           |
| FLOAT16           | `FIXED[2]`     | IEEE 754-2008 16-bit floating point number |
| **Temporal**      |
| DATE              | int32          | Days from Unix epoch                       |
| TIME(utc,unit)    | INT32/INT64    | Time of day                                |
| TIMESTAMP         | INT64          | Timestamp with optional TZ                 |
| INTERVAL          | `FIXED[12]`    | Time interval                              |
| DECIMAL           | INT32/64/FIXED | Decimal numbers                            |
| LIST              | -              | List of values                             |
| MAP               | -              | Key-value pairs                            |
| ENUM              | BYTE_ARRAY     | Enumerated values                          |
| JSON              | BYTE_ARRAY     | JSON encoded data                          |
| BSON              | BYTE_ARRAY     | BSON encoded data                          |

- Deprecated
  - INT_8, INT_16, INT_32, INT_64
  - UINT_8, UINT_16, UINT_32, UINT_64
  - TIME_MILLIS
  - TIME_MICROS
