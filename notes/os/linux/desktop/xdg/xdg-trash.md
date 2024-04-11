---
tags:
  - 目录结构
---

# FreeDesktop.org Trash

- https://specifications.freedesktop.org/trash-spec/trashspec-1.0.html
- `$XDG_DATA_HOME/Trash`
  - files/
    - 实际被删除内容
    - 恢复不应该依赖这里的名字
    - 这里的名字只用于暂存
    - 重复删除相同路径不会被覆盖
  - info/
    - 维护每个文件的删除信息
    - 文件匹配 files - 添加 .trashinfo 后缀
  - directorysizes
    - 缓存被删除文件目录大小
- /.Trash
  - 非 home 场景时
- `/.Trash-$uid`

```ini title="foo/hello.txt.trashinfo"
[Trash Info]
Path=foo/hello.txt
DeletionDate=20040831T22:32:08
```

```tsv title=""
# [size] [mtime] [percent-encoded-directory-name]
16384 15803468 Documents
8192 15803582 Another_Folder
```
