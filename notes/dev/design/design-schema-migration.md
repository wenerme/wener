---
title: Schema Migration
---

# Design Schema Migration

- 既要 fact schema
  - 当前 DB Schema 状态，准确的 create 信息
  - Single Source Of Truth
- 又要 migration schema
  - 记录历史变更
  - 支持回滚
  - 版本控制

## atlas

- [ariga/atlas](https://github.com/ariga/atlas)
  - 支持两种模式 - schema / migration
  - schema 支持 sql / dsl / hcl / json
  - migration 支持特殊的 template / instruction
