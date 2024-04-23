---
title: hexdump
---

# hexdump

- 参考
  - wikipedia [Hex dump](https://en.wikipedia.org/wiki/Hex_dump)

**Chrome Websocket binary dump**

```
00000000: 0000 0000 0000 0000 0000 0000 0000 0000  ................
```

**hexdump -C**

```bash
echo -n 0123456789ABCDEF | hexdump -C
```

```
00000000  30 31 32 33 34 35 36 37  38 39 41 42 43 44 45 46  |0123456789ABCDEF|
```

| hexdump        | for              |
| -------------- | ---------------- |
| -b             | 1 字节           |
| -c             | 1 字符           |
| -d             | 2 字节           |
| -o             | 2 八进制         |
| -x             | 2 十六进制       |
| `-C`           | 显示 ASCII       |
| `-c`           | 显示 ASCII 字符  |
| -n LENGTH      | 显示字节数       |
| -s OFFSET      | 跳过字节数       |
| `-v`           | 不显示重复行     |
| -e FORMAT      | 格式化输出       |
| -f FORMAT_FILE | 从文件读取格式化 |
