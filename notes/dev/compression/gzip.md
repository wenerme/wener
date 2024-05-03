---
tags:
  - Compression
---

# gzip

![](https://kroki.io/bytefield/svg/eNp9kktvgzAMgO_7FVF2aaUhhZY-xm3d2vu0Y9VDAAfQQkBJqtJV_Pe5j_Eq3eETkfXFxnZGEQhurTbED2In1gCKnHyRSknoM2dCcEar8dOoox1ByvzQeEIMe0WqvttWwIas8Mi7NbngA7n2upDQeOAFM7E4exeRhLncZ8qRPABpyJYy-kJdZIJMEQ-ZIXNkgSyRV-QNWSHvyAeyRjZ0dy1PgrwE4xSgHY0Nu_Mm7BzSyCbEY-eQ5gfn9gMJ8Ai0-YuiSVjpbpYrsj35psBWJ1Vr1jvSNqmQMa1Ft2pNuycmkb4Tz-PuaTbNwFieFY3sVfXUe3I5VH0gaW4eWm3ta_1J-01ft9jNN7JQWkIlKNT9jNtkh1-zD3AcKcgIl0FaeZrLMS9uiqF16VsQn4riGdDuHhgb32lhnmWg7EPz0guosFcizJW9Xmt7oQ6nk7tZD24QD8SkP_CPXevW5tn4FwytIU0=)

<!--
(defattrs :bg-green {:fill "#a0ffa0"})
(defattrs :bg-yellow {:fill "#ffffa0"})
(defattrs :bg-pink {:fill "#ffb0a0"})
(defattrs :bg-cyan {:fill "#a0fafa"})
(defattrs :bg-purple {:fill "#e4b5f7"})

(def column-labels ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"])
(def boxes-per-row 16)
(def box-width 40)
(draw-column-headers)
(draw-box 0x1F8B [{:span 2} :bg-green ] )
(draw-box "flg" [{:span 1} :bg-yellow] )
(draw-box "hdr" [{:span 1} :bg-pink] )
(draw-box "timestamp" [{:span 4} :bg-cyan] )
(draw-box "xflg" [{:span 1} :bg-pink] )
(draw-box "os" [{:span 1} :bg-pink] )

(draw-box "SEQ" [{:span 2} :bg-purple] )
(draw-box (text "len" [:math] [:sub "field"])  [{:span 2}] )
(draw-gap "fields")

(draw-gap "file name")
(draw-box 0x00)
(draw-gap "file comment")
(draw-box 0x00)
(draw-box "enc")

(draw-gap "content")

(draw-box "crc32" [{:span 4} :bg-yellow] )
(draw-box "raw size" [{:span 4} :bg-yellow] )

(draw-bottom)
-->

| flg | -                     |
| --- | --------------------- |
| 0   | store - 不压缩        |
| 1   | compress              |
| 2   | pack - 打包           |
| 3   | lzh 使用 lzh 算法压缩 |
| 4-7 | 保留                  |
| 8   | deflate - 常用        |

| hdr        | -                     |
| ---------- | --------------------- |
| 0b00000001 | 可能为文本格式        |
| 0b00000010 | 多压缩文件 - 存在序列 |
| 0b00000100 | 包含附加字段          |
| 0b00001000 | 包含文件名            |
| 0b00010000 | 包含文件注释          |
| 0b00100000 | 加密                  |
| 0b11000000 | 保留                  |

| os   |
| ---- | -------------------------- |
| 0x00 | Windows                    |
| 0x01 | Amiga                      |
| 0x02 | VMS/OpenVMS                |
| 0x03 | Unix/Linux/macOS           |
| 0x04 | VM/CMS                     |
| 0x05 | Atari TOS                  |
| 0x06 | HPFS filesystem (OS/2, NT) |
| 0x07 | Macintosh                  |
| 0x08 | Z-System                   |
| 0x09 | CP/M                       |
| 0x0a | TOPS-20                    |
| 0x0b | NTFS filesystem (NT)       |
| 0x0c | QDOS                       |
| 0x0d | Acorn RISCOS               |
| 0xff | unknown                    |

---

- [rfc1952](https://datatracker.ietf.org/doc/html/rfc1952) GZIP file format specification version 4.3
