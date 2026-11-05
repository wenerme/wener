---
tags:
  - FAQ
---

# OpenBao FAQ

- cubbyhole/
  - 内置 KV
  - 每个 Token 独立
- identity/
- sys/

## OpenBao vs Vault

- 功能和命令基本一一对应，`vault` → `bao`，`VAULT_*` → `BAO_*`
- 许可证：OpenBao 保持 MPL-2.0（开源），Vault 新版本为 BUSL-1.1（受限的源码可见许可）
- 新特性（如 namespace 支持、PKCS#11 集成）在两个项目中可能不同步，升级/迁移前以官方 Changelog 为准
