---
title: rename
---

# rename

- util-linux - rename - c 版本
  - [rename.1](https://man7.org/linux/man-pages/man1/rename.1.html)
- perl 版本 - 支持正则

```bash
# C 版本
# from to files
rename .htm .html *.htm
rename .txt '' *.txt

# Perl 版本
rename 'y/a-z/A-Z/' *
rename 's/\.txt$//' *.txt
```
