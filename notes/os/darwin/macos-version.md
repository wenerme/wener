---
keyworks:
  - 版本历史
  - 发布历史
tags:
  - Version
---

# macOS Version

| macOS        | Name     | Darwin | Date       | Safari      | Note                     |
| ------------ | -------- | ------ | ---------- | ----------- | ------------------------ |
| [macOS 13]   | Ventura  | 22     | 2022-06-22 |             | Virtualization.framework |
| [macOS 12.3] | Monterey | 21     |            |
| macOS 12.0   | Monterey | 21     | 2021-06-07 | Safari 15.0 |
| macOS 11.0   | Big Sur  | 20     | 2020-06-22 | Safari 14.0 |
| macOS 10.15  | Catalina | 19     | 2019-06-03 |

[macos 13]: #macos-13
[macos 12.3]: #macos-123

- [macOS version history](https://en.wikipedia.org/wiki/MacOS_version_history)
- https://developer.apple.com/documentation/macos-release-notes

## macOS 13

- Virtualization.framework
  - 支持 UEFI
  - [Running GUI Linux in a virtual machine on a Mac](https://developer.apple.com/documentation/virtualization/running_gui_linux_in_a_virtual_machine_on_a_mac?language=objc)
  - [Code-Hex/vz](https://github.com/Code-Hex/vz)
  - [mac-vz/macvz](https://github.com/mac-vz/macvz)

## macOS 12.3

- 移除了 python2
  - 无法直接执行 python - /usr/bin/python
  - vsc 命令行 code 用到了 python
- 新增了 python3 - /usr/bin/python3

```bash
# 临时解决 - brew
ln -fs /usr/local/bin/python3 $HOME/bin/python
# 全局
sudo ln -fs $(which python3) $(dirname $(which python3))/python
```
