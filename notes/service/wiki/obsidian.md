---
title: obsidian
---

# obsidian

## Awesome

- https://obsidian.md/plugins
- https://github.com/vrtmrz/obsidian-livesync
  - MIT, TS
  - couchdb

## Reference

- 属性类型
  - Text
  - List
  - Number
  - Checkbox
  - Date
  - Date & time

```yaml
tags: []
aliases: []
cssclasses: []
# Obsidian Publish
```

| 语法            | 描述                                |
| --------------- | ----------------------------------- |
| `[[Link]]`      | Internal links / 内部链接           |
| `![[Link]]`     | Embed files / 嵌入文件              |
| `![[Link#^id]]` | Embed block references / 嵌入块引用 |
| `^id`           | Define a block ID / 定义块 ID       |
| `[^id]`         | Footnotes / 脚注                    |
| `%%Text%%`      | Comments / 注释                     |
| `~~Text~~`      | Strikethrough / 删除线              |
| `==Text==`      | Highlights / 高亮                   |
| ` ``` `         | Code blocks / 代码块                |
| `- [ ]`         | Incomplete task / 未完成任务        |
| `- [x]`         | Completed task / 已完成任务         |
| `> [!note]`     | Callouts / 提示块                   |

- 支持的嵌入文件类型
  - Markdown: .md
  - Bases: .base
  - JSON Canvas: .canvas
  - Images: .avif, .bmp, .gif, .jpeg, .jpg, .png, .svg, .webp
  - Audio: .flac, .m4a, .mp3, .ogg, .wav, .webm, .3gp
  - Video: .mkv, .mov, .mp4, .ogv, .webm
  - PDF: .pdf
- tags
  - 搜索 tag:#meeting
  - nested tags: #meeting/2023
- aliases
  - `[[Artificial Intelligence|AI]]`
- https://help.obsidian.md/obsidian-flavored-markdown
- https://help.obsidian.md/properties
