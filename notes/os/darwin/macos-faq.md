---
title: macOS FAQ
---
# macOS 常见问题

## 窗口只能看到边缘没有 Title 如何拖动
* 鼠标放到边缘，变成箭头
* 按住 Cmd 即可拖动

## cannot be opened because the developer cannot be verified

```bash
xattr -r -d com.apple.quarantine $HOME/Development/graalvm/
```

## 刷新 Finder
* 例如挂载 smb 的时候远程目录发生变化

```bash
osascript -e 'tell application "Finder" to tell front window to update every item'
```
