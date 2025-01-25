---
title: CIFS
---

# cifs

- CIFS - Common Internet File System
  - SMB 的方言
  - SMB 协议最初由 IBM 在 1980 年代开发，用于文件和打印机共享。
  - 微软扩展和实现了 SMB，成为 Windows 网络文件共享的核心协议。
  - CIFS 是 SMB 的旧版本，对应的是 SMBv1，微软在 1996 年尝试将 SMB 协议重命名为 CIFS，并加入了一些新的功能（例如，更好的支持大文件和改进的网络性能）。
  - 随着 SMBv2 和更高版本（SMBv3）的发布，"CIFS" 这个名称逐渐被弃用，现代版本更统一地称为 SMB。
  - Linux 中的 CIFS 模块（cifs.ko） 支持较新的 SMB 协议，包括 SMBv2 和 SMBv3，通过特定的选项配置。
- 建议统一使用 [SMB](./smb.md)
