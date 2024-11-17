---
tags:
  - Reference
---

## Number format

```
正数格式;负数格式;零值格式;文本格式
```

```
<POSITIVE>;<NEGATIVE>;<ZERO>;<TEXT>
```

```
#.###.00_);[Red](#.###.00);0.00;"gross receipts for"@
Positive   Negative        Zero Text
```

- `#.###.00_)`
  - `#` 占位符，如果数字中没有相应的位数，则不显示。
  - .：小数点分隔符（不同区域可能用逗号 , 表示）。
  - 00：强制显示两位小数。
  - `_`：添加一个空格，用于对齐正数和负数。
  - `_` 后的 ) 表示空格的宽度与右括号相同。
- @ 表示当前单元格的内容
- `#.???`

| Symbol                            | Result              | Description                                                                                                          |
| --------------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `0`                               | Digit or Zero       | `7` + `00` -> `"07"`                                                                                                 |
| `#`                               | Digit if needed     | `7` + `##` -> `"7"`                                                                                                  |
| `?`                               | Digit or Space      | `7` + `??` -> `" 7"`                                                                                                 |
| `.`                               | Decimal point       |
| `,`                               | Thousands separator | `1234` + `#,##0` -> `"1,234"`. locale.                                                                               |
| `%`                               | Percentage          | `.7` + `0%` -> `"70%"`                                                                                               |
| `E-`, `E+`                        | Exponential format  | `12200000` + `0.00E+00` -> `"1.22E+07"`                                                                              |
| `$`, `-`, `+`, `/`, `(`, `)`, ` ` | Pass-through        | The symbol is printed as-is.                                                                                         |
| `\`                               | Escape              |                                                                                                                      |
| `*`                               | Fill                | Repeat the next character to fill the column; numfmt emits nothing when this is used.                                |
| `_`                               | Skip width          | Skip the width of the next character. By default numfmt emits only a single space when this is used.                 |
| `"text"`                          | Pass-through        | Pass through whatever text is inside the quotation marks as-is. `7` formatted with `0 "bells"` will emit `"7 bells"` |
| `@`                               | Text value          | When value is a text, emit it as is: `foo` formatted with `"bar"@"bar"` will emit `"barfoobar"`                      |
| `yy`                              | Years               | `2024` -> `24`                                                                                                       |
| `yyyy`                            | Years               | `2024` -> `2024`                                                                                                     |
| `m`                               | Month               | 1–12                                                                                                                 |
| `mm`                              | Month               | 01–12                                                                                                                |
| `mmm`                             | Short month         | Jan–Dec. locale                                                                                                      |
| `mmmm`                            | Month name          | January–December. locale                                                                                             |
| `mmmmm`                           | Month name          | J–D. locale                                                                                                          |
| `d`                               | Days                | 1–31                                                                                                                 |
| `dd`                              | Days                | 01–31                                                                                                                |
| `ddd`                             | Weekdays            | Sun–Sat                                                                                                              |
| `dddd`                            | Weekdays            | Sunday–Saturday                                                                                                      |
| `h`                               | Hours               | 0–23, 1–12                                                                                                           |
| `hh`                              | Hours               | 00–23, 01–12                                                                                                         |
| `m`                               | Minutes             | 0–59                                                                                                                 |
| `mm`                              | Minutes             | 00–59                                                                                                                |
| `s`                               | Seconds             | 0–59                                                                                                                 |
| `ss`                              | Seconds             | 00–59                                                                                                                |
| `AM/PM`                           | 12h clock           | AM or PM.                                                                                                            |
| `A/P`                             | 12h clock           | A or P.                                                                                                              |
| `[h]`                             | Hours               | Elapsed time in hours                                                                                                |
| `[m]`                             | Minutes             | Elapsed time in minutes                                                                                              |
| `[s]`                             | Seconds             | Elapsed time in seconds                                                                                              |

---

- ECMA-376
- [borgar/numfmt](https://github.com/borgar/numfmt)
  - npm:numfmt
  - used by: univer
- https://docs.sheetjs.com/docs/csf/features/nf/
  - `.z`
- https://support.microsoft.com/en-us/office/number-format-codes-5026bbd6-04bc-48cd-bf33-80f18b4eae68
- https://www.ablebits.com/office-addins-blog/custom-excel-number-format/#Understanding-Excel-number

```js
import { format } from 'numfmt';

// 1,234.56
console.log(format('#,##0.00', 1234.56));
```
