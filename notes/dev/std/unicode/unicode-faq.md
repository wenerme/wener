---
tags:
  - FAQ
---

# Unicode FAQ

```bash
iconv -f UTF-8 -t GB2312 input.txt > output.txt

# c4 e3 ba c3 21 0a
echo '你好!' | iconv -f UTF-8 -t GB2312 - | hexdump -C
```

| code     | symbol | name                | ref                                              |
| -------- | ------ | ------------------- | ------------------------------------------------ |
| &#65021; | ﷽      | Arabic sign Basmala | [Basmala](https://en.wikipedia.org/wiki/Basmala) |

## Remove BOM

```bash
dos2unix test.xml
```

## GBK vs GB2312

- GB2312 - 1980年，6763个字符
- GBK - 1995年，21003个字符
  - 是 GB2312 的扩展/升级
  - 兼容 GB2312
