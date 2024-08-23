---
tags:
  - Encoding
---

# Encoding

- Encoding 通常指的是字符编码 -> Character Encoding, Character Set
  - 不指代 媒体、文件格式 等编码
- https://encoding.spec.whatwg.org

## The "windows-1252" encoding is not supported

- nodejs 上传 windows-1252 编码的文件会有问题
- 参考
  - [npm:windows-1252](https://www.npmjs.com/package/windows-1252)
    - 检测编码
    - ansi_x3.4-1968, ascii, cp1252, cp819, csisolatin1, ibm819, iso-8859-1, iso-ir-100, iso8859-1, iso88591, iso_8859-1, iso_8859-1:1987, l1, latin1, us-ascii, windows-1252, x-cp1252
  - https://encoding.spec.whatwg.org/#windows-1252
