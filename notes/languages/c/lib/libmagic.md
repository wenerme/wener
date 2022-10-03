---
title: libmagic
---

# libmagic

- [file/file](https://github.com/file/file)
- [src/magic.h.in](https://github.com/file/file/blob/master/src/magic.h.in)
- [libmagic](https://man7.org/linux/man-pages/man3/magic_open.3.html)
- [file.1](https://man7.org/linux/man-pages/man1/file.1.html)
- 类似项目
  - go [net/http#DetectContentType](https://pkg.go.dev/net/http#DetectContentType)
    - whatwg [mimesniff](https://mimesniff.spec.whatwg.org/)
  - pure go [h2non/filetype](https://github.com/h2non/filetype)
  - [adrian-thurston/ragel](https://github.com/adrian-thurston/ragel)
  - WASM [npcz/magic](https://github.com/npcz/magic)
    - 只能 detect 文件 - 传递 path

```bash
file -b --mime-type README.md # text/plain
file -bsi /dev/nul            # application/x-empty; charset=binary
```

| flag                     | demo                        |
| ------------------------ | --------------------------- |
| -i,--mime                | `text/plain; charset=utf-8` |
| --mime-type              | `text/plain`                |
| --mime-encoding          | utf-8                       |
| -z,--uncompress          |
| -Z,--uncompress-noreport |

- -P, --parameter
  - bytes=1048576 - 最多读取 1MB
  - encoding=65536 - 扫描多少 bytes
  - elf_notes=256
  - elf_phnum=2048
  - elf_shnum=32768
  - indir=50 - indirect
  - name=50
  - regex=8192

## magic

- [magic.4](https://man7.org/linux/man-pages/man4/magic.4.html)
- [magic/Magdir](https://github.com/file/file/tree/master/magic/Magdir)
  - file 现有的 magic 定义
- /usr/local/share/misc/magic - 未编译
- /usr/local/share/misc/magic.mgc - 编译后
