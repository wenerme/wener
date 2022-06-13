---
tags:
  - Version
---

# macOS Version

| macOS                | safari      |
| -------------------- | ----------- |
| macOS Monterey 12.3  |
| macOS Monterey 12.0  | Safari 15.0 |
| macOS Catalina 10.15 |
| macOS Big Sur 11.0   | Safari 14.0 |

- https://developer.apple.com/documentation/macos-release-notes

## macOS Monterey 12.3

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
