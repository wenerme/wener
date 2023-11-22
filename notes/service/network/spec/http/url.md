---
title: URL
---

# URL

- 安全字符 / URL Safe characters
- unreserved / 未保留字符
- 安全字符 - `[0-9a-zA-Z-._~]`
- 不安全字符 - ` <>[]{}|\^%#`
- 开发时可考虑用作分隔符的字符
  - `-`, `.`, `~`, `_`

**保留字符**

| name          | char |
| ------------- | ---- |
| ampersand     | `&`  |
| dollar        | `$`  |
| plus sign     | `+`  |
| comma         | `,`  |
| forward slash | `/`  |
| colon         | `:`  |
| semi-colon    | `;`  |
| equals        | `=`  |
| question mark | `?`  |
| 'At' symbol   | `@`  |
| pound         | `#`  |

**不安全字符**

| name                       | char |
| -------------------------- | ---- |
| space                      | ` `  |
| less than and greater than | `<>` |
| open and close brackets    | `[]` |
| open and close braces      | `{}` |
| pipe                       | `\|` |
| backslash                  | `\`  |
| caret                      | `^`  |
| percent                    | `%`  |

- 参考
  - [rfc3986#section-2](https://datatracker.ietf.org/doc/html/rfc3986#section-2)
