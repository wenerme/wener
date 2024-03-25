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

- BMP - Basic Multilingual Plane
  - 基本多文种平面
  - U+0000 to U+FFFF

## 中文

**中文**

```
/[\u4e00-\u9fa5]/
```

**扩展区A+B**

```
/[\u4e00-\u9fa5\u3400-\u4DBF]|[\u{20000}-\u{2A6DF}]/u
```

- 扩展A区（Extension A）
  - 6,582
  - 罕见汉字、少数民族汉字
- 扩展B区（Extension B）
  - 42,711
  - 罕见、古老汉字
- 扩展C区（U+2A700到U+2B73F）
- 扩展D区（U+2B740到U+2B81F）
- 扩展E区（U+2B820到U+2CEAF）
- 扩展F区（U+2CEB0到U+2EBEF）

## 200b

- U+200B
- 0x8203
- ZWSP
- Zero Width Space
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr

## Remove BOM

```bash
dos2unix test.xml
```

## GBK vs GB2312

- GB2312 - 1980年，6763个字符
- GBK - 1995年，21003个字符
  - 是 GB2312 的扩展/升级
  - 兼容 GB2312
