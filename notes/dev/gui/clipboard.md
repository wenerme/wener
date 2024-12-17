---
title: clipboard
---

# clipboard

- Chrome 66
  - [Clipboard API](https://web.dev/async-clipboard/)
    - navigator.clipboard.writeText
  - 支持 text/plain, text/html, image/png
    - 注意图片都会是 PNG 格式
- Chrome 104 支持自定义格式
  - ClipboardItem
  - 在 blob MIME 前面加 `web `
- 飞书的文档
  - text/plain
  - text/html
  - 会复制为 html
  - 包含一个特殊的 span
  - 内容类似 js，包含数据 data-lark-record-data

```js
navigator.clipboard.read()
navigator.clipboard.readText()

// paste 事件
document.addEventListener('paste', (e) => {
  // 能获取到文件
  // ClipboardEvent.clipboardData.items
  console.log(e.clipboardData);
});
```

## macOS

```bash
# macOS
osascript -e 'the clipboard as record'

echo -n "hello" | pbcopy
pbpaste
```

- https://langui.net/clipboard-viewer/
- https://developer.apple.com/library/archive/samplecode/ClipboardViewer/Introduction/Intro.html

# Broswer

## Failed to execute 'read' on 'Clipboard': Document is not focused.
