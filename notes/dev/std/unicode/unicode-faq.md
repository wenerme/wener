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
- SIP - Supplementary Ideographic Plane
  - 补充表意文字平面
  - Plane 2 - 第二辅助平面
  - U+20000 to U+2A6DF
- TIP - Tertiary Ideographic Plane
  - 第三辅助平面
  - Plane 3
  - U+2A700 to U+2B73F

## CJK

**中文**

```
/[\u4e00-\u9fa5]/
```

**扩展区A+B**

```
/[\u4e00-\u9fa5\u3400-\u4DBF]|[\u{20000}-\u{2A6DF}]/u
```

- 中日韩统一表意文字（U+4E00－U+9FA5） - `/[\u4e00-\u9fa5]/`
  - 20902
  - 〇 U+3007 - 特殊修正
- 扩展A区（Extension A） - U+3400－U+4DB5
  - 6,582
  - 罕见汉字、少数民族汉字
  - 中日韩统一表意文字扩展区A
  - https://en.wikipedia.org/wiki/CJK_Unified_Ideographs_Extension_A
- 扩展B区（Extension B） - U+20000－U+2A6D6 - A+B
  - 42,711
  - 罕见、古老汉字
- 扩展C区（U+2A700到U+2B73F）
- 扩展D区（U+2B740到U+2B81F）
- 扩展E区（U+2B820到U+2CEAF）
- 扩展F区（U+2CEB0到U+2EBEF）
- 中日韩统一表意文字
  - https://en.wikipedia.org/wiki/CJK_Unified_Ideographs

| 区块名                    | 码位数 | 未分配 | 编码范围        |
| ------------------------- | ------ | ------ | --------------- |
| 中日韩统一表意文字        | 20,992 | 0      | U+4E00-U+9FA5   |
| 中日韩统一表意文字扩展区A | 6,592  | 0      | U+3400-U+4DB5   |
| 中日韩统一表意文字扩展区B | 42,720 | 0      | U+20000-U+2A6DF |

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

## Normalize

- NFC
  - Canonical Decomposition, followed by Canonical Composition.
- NFD
  - Canonical Decomposition.
- NFKC
  - Compatibility Decomposition, followed by Canonical Composition.
- NFKD
  - Compatibility Decomposition.
- Lone leading surrogate
  - `ab\uD800`
  - `ab\uD800c`
- Lone trailing surrogate
  - `\uDFFFab`
  - `c\uDFFFab`
- JS
  - String.prototype.isWellFormed - Chrome 111+, Safari 16.4+, Node 20.0+
    - 避免 encodeURI 时出错
  - String.prototype.toWellFormed
  - String.prototype.normalize - Chrome 34+, Safari 10.1+, Node 0.12+

```js
{
  let string1 = '\u00F1'; // ñ
  let string2 = '\u006E\u0303'; // ñ

  string1 = string1.normalize('NFD');
  string2 = string2.normalize('NFD');

  console.log(string1 === string2); // true
  console.log(string1.length); // 2
  console.log(string2.length); // 2
}

{
  let string1 = '\u00F1'; // ñ
  let string2 = '\u006E\u0303'; // ñ

  string1 = string1.normalize('NFC');
  string2 = string2.normalize('NFC');

  console.log(string1 === string2); // true
  console.log(string1.length); // 1
  console.log(string2.length); // 1
  console.log(string2.codePointAt(0).toString(16)); // f1
}

{
  let string1 = '\uFB00';
  let string2 = '\u0066\u0066';

  console.log(string1); // ﬀ
  console.log(string2); // ff
  console.log(string1 === string2); // false
  console.log(string1.length); // 1
  console.log(string2.length); // 2

  string1 = string1.normalize('NFKD');
  string2 = string2.normalize('NFKD');

  console.log(string1); // ff <- visual appearance changed
  console.log(string2); // ff
  console.log(string1 === string2); // true
  console.log(string1.length); // 2
  console.log(string2.length); // 2
}
```

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
