---
title: F2FS (Flash-Friendly File System)
tags:
  - DevOps
  - Storage
  - FileSystem
  - F2FS
  - Linux
---

# F2FS (Flash-Friendly File System)

F2FS is developed as a flash-friendly file system, making it ideal for SSDs, eMMCs, SD cards, and USB flash drives.

## Information

- [Official Documentation](https://www.kernel.org/doc/Documentation/filesystems/f2fs.txt)
- [ArchWiki - F2FS](https://wiki.archlinux.org/index.php/F2FS)
- [F2FS Documentation Translation (Chinese)](https://cloud.tencent.com/developer/article/1639808)

## Notes

- Kernel commit `94fe2580a2f3bb055fdca86a2adf156d01f15764` enabled erase/discard/trim support for all MMC hosts (default in 5.8).
- TRIM can slow down some drives, especially if it's unqueueable on those devices.
- F2FS is specifically designed to handle the characteristics of storage devices with flash memory.
