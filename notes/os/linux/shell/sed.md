---
title: sed
---

# sed

:::caution

- sed 一次只能操作一行

:::

| command | stand for                          |
| ------- | ---------------------------------- |
| :       | label                              |
| =       | line_number                        |
| a       | append_text_to_stdout_after_flush  |
| b       | branch_unconditional               |
| c       | range_change                       |
| d       | pattern_delete_top/cycle           |
| D       | pattern_ltrunc(line+nl)\_top/cycle |
| g       | pattern=hold                       |
| G       | pattern+=nl+hold                   |
| h       | hold=pattern                       |
| H       | hold+=nl+pattern                   |
| i       | insert_text_to_stdout_now          |
| l       | pattern_list                       |
| n       | pattern_flush=nextline_continue    |
| N       | pattern+=nl+nextline               |
| p       | pattern_print                      |
| P       | pattern_first_line_print           |
| q       | flush_quit                         |
| r       | append_file_to_stdout_after_flush  |
| s       | substitute                         |
| t       | branch_on_substitute               |
| w       | append_pattern_to_file_now         |
| x       | swap_pattern_and_hold              |
| y       | transform_chars                    |

- 参考
  - [Command Summary for sed](https://docstore.mik.ua/orelly/unix/sedawk/appa_03.htm)

```bash
sed '/pattern/d' file

# perl in place replace
# 可以 替换 \r\n - sed 不可以
# -i.bak 可生成备份文件
perl -ipe 's/\n//' file
```

## 替换片段

```bash
lead='^### BEGIN COMMON'
tail='^### END COMMON'
sed -e "/$lead/,/$tail/{ /$lead/{p; r stub/Makefile
}; /$tail/p; d }"  commons/Makefile
```
