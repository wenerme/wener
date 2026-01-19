---
title: Unicode
---

# Unicode

- spec
  - [UNICODE TEXT SEGMENTATION](https://www.unicode.org/reports/tr29/)
  - [COMMON REFERENCES FOR UNICODE STANDARD ANNEXES](https://www.unicode.org/reports/tr41/tr41-28.html)
- [Unicode character property](https://en.wikipedia.org/wiki/Unicode_character_property)
- https://unicodebook.readthedocs.io/unicode.html
- https://en.wikipedia.org/wiki/Halfwidth_and_fullwidth_forms
  - U+FF00–FFEF
- https://altcodeunicode.com/
- Language codes https://www.ibm.com/docs/en/content-manager/8.6.0?topic=definition-language-codes
- https://shapecatcher.com/
  - 符号识别

https://zh.wikipedia.org/wiki/ISO_639-1%E4%BB%A3%E7%A0%81%E8%A1%A8

https://en.wikipedia.org/wiki/Language_code

[Unicode Character Ranges](http://jrgraphix.net/research/unicode.php)
[CJK Unified Ideographs (Unicode block)](<https://en.wikipedia.org/wiki/CJK_Unified_Ideographs_(Unicode_block)>)
[What's the complete range for Chinese characters in Unicode?](https://stackoverflow.com/a/1366113/1870054)

    1.	U+4E00 - U+62FF

```
Block                                   Range       Comment
CJK Unified Ideographs                  4E00-9FFF   Common
CJK Unified Ideographs Extension A      3400-4DBF   Rare
CJK Unified Ideographs Extension B      20000-2A6DF Rare, historic
CJK Unified Ideographs Extension C      2A700–2B73F Rare, historic
CJK Unified Ideographs Extension D      2B740–2B81F Uncommon, some in current use
CJK Unified Ideographs Extension E      2B820–2CEAF Rare, historic
CJK Compatibility Ideographs            F900-FAFF   Duplicates, unifiable variants, corporate characters
CJK Compatibility Ideographs Supplement 2F800-2FA1F Unifiable variants
```

Detech language
https://cloud.google.com/translate/docs/reference/rest

https://github.com/git/git/tree/master/po

- https://datahub.io/core/language-codes

## Symbol

- 数学
  - +−×÷±≤≥≈
- ⤷⤵︎⤴︎⤶
- ✓✔︎𐄂✔️✅
- ✅❌❓❔❗️❕❎⚠️
- 📝

<!-- ❓⭐️🌟🔴🟠🟡🟢🔵🟣⚫️⚪️🟤🔺🔻🔸🔹🔶🔷🔳🔲▪️▫️◾️◽️◼️◻️🟥🟧🟨🟩🟦🟪⬛️⬜️🟫❌⭕️⛔️✅❎ 🚧 -->

## Blank and Fill Symbols

| State | Symbol | Description           |
| :---- | :----: | :-------------------- |
| Blank |   ⬜️   | White Large Square    |
| Fill  |   ⬛️   | Black Large Square    |
| Blank |   ⚪️   | White Circle          |
| Fill  |  ⚫️   | Black Circle          |
| Blank |   ☐    | Ballot Box            |
| Fill  |   ☑   | Ballot Box with Check |
| Blank |   🔲   | Black Square Button   |
| Fill  |   🔳   | White Square Button   |

## Dashes and Hyphens

| Glyph | Name                | Alias | HTML Entity |
| :---: | :------------------ | :---: | :---------: |
|   -   | Hyphen-Minus        |  `-`  |             |
|   ‐   | Hyphen              |       | `&hyphen;`  |
|   ‑   | Non-Breaking Hyphen |       |  `&#8209;`  |
|   ‒   | Figure Dash         |       |  `&#8210;`  |
|   –   | En Dash             | `--`  |  `&ndash;`  |
|   —   | Em Dash             | `---` |  `&mdash;`  |
|   ―   | Horizontal Bar      |       | `&horbar;`  |
|   ⸺   | Two-Em Dash         |       | `&#11834;`  |
|   ⸻   | Three-Em Dash       |       | `&#11835;`  |

## Emoji

- https://github.com/github/gemoji
- https://dev.to/jorik/country-code-to-flag-emoji-a21

## CJK

- U+4E00–U+9FA5 - 20,902 汗字, Unicode 1.0.1, Unified Repertoire and Ordering, URO
- CJK Unified Ideographs
- 现代汉语与日语最常用的汉字
- https://zh.wikipedia.org/wiki/中日韓統一表意文字列表

## Unicode character class

- https://pkg.go.dev/regexp/syntax

## Currency symbols

| sym | Name        | Unicode | UTF-8  |
| --- | ----------- | ------- | ------ | ------ |
| €   | euro sign   | 20AC    | E282AC | 欧元   |
| $   | dollar sign | 0024    | 24     | 美元   |
| ¢   | cent sign   | 00A2    | C2A2   | 分     |
| £   | pound sign  | 00A3    | C2A3   | 英镑   |
| ¥   | yen sign    | 00A5    | C2A5   | 人民币 |
| ƒ   |             | 0192    | C692   |

| sym | Ticker | name             |
| --- | ------ | ---------------- |
| ₿   | BTC    | bitcoin          |
| Ξ   | ETH    | Ethereum         |
| ⟠   | ETH    | Ethereum         |
| ₮   | USDT   | Tether           |
| ξ   | ETC    | Ethereum Classic |
| Ł   | LTC    | Litecoin         |
| ◈   | DAI    | Dai              |
| Ƀ   | BCH    | Bitcoin Cash     |

- https://github.com/yonilevy/crypto-currency-symbols
- https://en.wikipedia.org/wiki/Currency_symbol
- https://unicode-explorer.com/articles/cryptocurrency-unicode-symbols

## Keyboard

| sym     | name                                   | code point |
| ------- | -------------------------------------- | ---------- |
| ⌘       | Command                                | U+2318     |
| ⇧       | Shift                                  | U+21E7     |
| ⇮       | Alt,Option                             | U+2325     |
| ⎇       | Alt                                    | U+2387     |
| ⌥       | Alt - Apple macOS                      | U+2325     |
| ◆       | Alt - Sun Microsystems Type 6 Keyboard | U+25C6     |
| ⎈       | Ctrl,HELM                              | U+2388     |
| ⇬       | CapsLock                               | U+21EA     |
| ⎆       | Enter                                  | U+23B6     |
| ^       | Option                                 | U+005E     |
| ⌃       | Option                                 | U+2303     |
| ❖       | Windows                                | U+2756     |
| ↩ ↵ ⏎  | Enter                                  | U+21A9     |
| ▤ ☰ 𝌆 | Menu                                   | U+25A0     |
| ↹ ⇥     | Tab                                    | U+21B9     |
| ⇥       | Tab                                    | U+21B9     |
| ⇄ ⇤ ↤ ↦ | Tab symbol                             | U+21C4     |
| ⎋       | ESC                                    | U+238B     |
| ⌫ ⟵     | Backspace                              | U+232B     |
| 🌐      | Apple fn                               | U+1F5A0    |
| ⌦       | Delete                                 | U+2326     |
| ⌧       | Clear                                  | U+2327     |
| ⌤       | Enter                                  | U+23B6     |
| ⏏      | Eject                                  | U+23CF     |
| ⎀       | Power                                  | U+2380     |

- http://xahlee.info/kbd/apple_keyboard_key_symbols.html
- http://xahlee.info/comp/unicode_computing_symbols.html
- https://github.com/drmingdrmer/cheatsheet/blob/master/sheets/unicode/from-xahlee-info/keyboard-keys.txt

## 希腊字母

| sym | upper | for     |
| :-- | :---- | :------ |
| α   | Α     | alpha   |
| β   | Β     | beta    |
| γ   | Γ     | gamma   |
| δ   | Δ     | delta   |
| ε   | Ε     | epsilon |
| ζ   | Ζ     | zeta    |
| η   | Η     | eta     |
| θ   | Θ     | theta   |
| ι   | Ι     | iota    |
| κ   | Κ     | kappa   |
| λ   | Λ     | lambda  |
| μ   | Μ     | mu      |
| ν   | Ν     | nu      |
| ξ   | Ξ     | xi      |
| ο   | Ο     | omicron |
| π   | Π     | pi      |
| ρ   | Ρ     | rho     |
| σ   | Σ     | sigma   |
| τ   | Τ     | tau     |
| υ   | Υ     | upsilon |
| φ   | Φ     | phi     |
| χ   | Χ     | chi     |
| ψ   | Ψ     | psi     |
| ω   | Ω     | omega   |

- https://unicode-table.com/cn/sets/greek-symbols/

## 罗马数字

| sym | num  |
| --- | ---- |
| I   | 1    |
| V   | 5    |
| X   | 10   |
| L   | 50   |
| C   | 100  |
| D   | 500  |
| M   | 1000 |

- 小的在前面是减法，大的在前面是加法
  - 11 -> XI
  - 4 -> IV

## 常用

| sym | a       | b     |
| --- | ------- | ----- |
| 🚧  |
| 🌟  |
| ⚠️  |
| ❌  |
| ✅  |
| 📝  |
| ✨  |
| 💵  |
| 💰  |
| 💴  |
| 🏷  |
| 💬  |
| 🛒  |
| 📆  |
| ⚡️ |
| ￼   |
| »   | &raquo; | &187; |
| «   | &laquo; | &171; |
| 🏘️  |
| 👨‍👩‍👧‍👦  |
| ⚠️  |
| ℹ️  |
| 📝  |

## 避免渲染 emoji

- ✔
- FE0E 避免渲染 emoji `\2714\FE0E`
- `font-family: monospace`

```html
❤&#xFE0E;
```

## space

- `&nbsp;&ensp;&emsp;&thinsp;&zwnj;&zwj;`

## math

| sym  | name                     | html                       | latex    |
| ---- | ------------------------ | -------------------------- | -------- |
| `+`  | plus                     | &plus;                     | $+$      |
| `-`  | minus                    | &minus;                    | $-$      |
| `*`  | times                    |                            | $\times$ |
| `×`  | times                    | &times;                    | $\times$ |
| `/`  | divide                   |                            | $\div$   |
| `÷`  | divide                   | &divide;                   | $\div$   |
| `=`  | equal                    | &equal;                    | $=$      |
| `<`  | less than                | &less than;                | $<$      |
| `>`  | greater than             | &greater than;             | $>$      |
| `<=` | less than or equal to    | &less than or equal to;    | $\leq$   |
| `>=` | greater than or equal to | &greater than or equal to; | $\geq$   |
