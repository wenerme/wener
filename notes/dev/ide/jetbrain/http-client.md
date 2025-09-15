---
tags:
  - Client
---

# HTTP Client

- .http , .rest
- `{{variable}}`
- In Place 变量定义 `@myhost = example.org`
- `request.variables.set` 请求变量定义
- `{{$env.ENV_VAR}}`
- 如果变量为数组，则会遍历变量
  - request.iteration() - 当前迭代
- `request.templateValue(0)`
- JSON Path `{{users[*].name}}`
- JS 上下文
  - console.log
  - client.log
  - DOM response.body
    - HTML 返回
  - DOMParser
  - URLSearchParams
  - btoa
  - atob
  - Shell
    - exec, execFile, execSync, execFileSync, spawn, spawnSync
- 参考
  - https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html

```bash
# Standalone
# ==================================================
docker pull jetbrains/intellij-http-client
curl -f -L -o ijhttp.zip "https://jb.gg/ijhttp/latest"
brew install ijhttp
```

| 变量名                         | 说明                                       |
| ------------------------------ | ------------------------------------------ |
| `$uuid`, `$random.uuid`        | 生成一个 UUID-v4                           |
| `$timestamp`                   | 生成当前的 UNIX 时间戳                     |
| `$isoTimestamp`                | 生成当前的 ISO-8601 格式时间戳 (UTC)       |
| `$randomInt`                   | 生成 0 到 1000 之间的随机整数              |
| `$random.integer(from, to)`    | 生成指定范围内的随机整数                   |
| `$random.float(from, to)`      | 生成指定范围内的随机浮点数                 |
| `$random.alphabetic(length)`   | 生成指定长度的随机字母序列                 |
| `$random.alphanumeric(length)` | 生成指定长度的随机字母数字下划线序列       |
| `$random.hexadecimal(length)`  | 生成指定长度的随机十六进制字符串           |
| `$random.email`                | 生成一个随机的电子邮件地址                 |
| `$exampleServer`               | 内置 Web 服务器地址，仅供 HTTP Client 访问 |
| `$random.address`              | 生成随机地址                               |
| `$random.beer`                 | 生成随机啤酒相关内容                       |
| `$random.bool`                 | 生成随机布尔值                             |
| `$random.business`             | 生成随机商业相关内容                       |
| `$random.ChuckNorris.fact`     | 生成随机 Chuck Norris 事实                 |
| `$random.code`                 | 生成随机代码片段                           |
| `$random.color`                | 生成随机颜色                               |
| `$random.commerce`             | 生成随机商业信息                           |
| `$random.company`              | 生成随机公司名称                           |
| `$random.crypto`               | 生成随机加密相关内容                       |
| `$random.educator`             | 生成随机教育相关内容                       |
| `$random.finance`              | 生成随机金融相关内容                       |
| `$random.hacker`               | 生成随机黑客相关内容                       |
| `$random.idNumber`             | 生成随机身份证号                           |
| `$random.internet`             | 生成随机互联网相关内容                     |
| `$random.lorem`                | 生成随机文本（Lorem Ipsum）                |
| `$random.name`                 | 生成随机姓名                               |
| `$random.number`               | 生成随机数字                               |
| `$random.phoneNumber`          | 生成随机电话号码                           |
| `$random.shakespeare`          | 生成随机莎士比亚相关内容                   |
| `$random.superhero`            | 生成随机超级英雄相关内容                   |
| `$random.team`                 | 生成随机团队名称                           |
| `$random.university`           | 生成随机大学名称                           |

- 基于 javafaker
  - https://javadoc.io/doc/com.github.javafaker/javafaker/latest/com/github/javafaker/package-summary.html
