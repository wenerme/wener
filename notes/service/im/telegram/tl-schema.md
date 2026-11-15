---
tags:
  - TL Schema
---

# TL Schema

| 维度       | Telegram TL                    | Protobuf                 |
| ---------- | ------------------------------ | ------------------------ |
| 定义文件   | `.tl`                          | `.proto`                 |
| 类型系统   | Constructor / Type             | Message / Enum           |
| RPC 定义   | 内置 Functions                 | Service / RPC            |
| 多态       | 同一 Type 多个 Constructor     | `oneof` 等机制           |
| 可选字段   | Flags 位图                     | `optional` / presence    |
| 二进制编码 | 基于 TL Constructor 与字段顺序 | 基于字段编号与 wire type |
| 向后兼容   | API Layer + Constructor 版本   | 主要依赖稳定字段编号     |
| 生态       | 主要 Telegram                  | 通用 RPC / 数据协议      |
