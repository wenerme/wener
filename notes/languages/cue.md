---
title: CUE
---

# CUE

- [cue-lang/cue](https://github.com/cue-lang/cue)
  - Apache-2.0, Go
  - Configuration Language
  - Superset of JSON
- 参考
  - [impl](https://github.com/cue-lang/cue/blob/master/doc/ref/impl.md)
  - https://storage.googleapis.com/pub-tools-public-publication-data/pdf/43438.pdf
  - https://cuelang.org/play/
  - https://cuetorials.com/
  - [The Configuration Complexity Curse](https://blog.cedriccharly.com/post/20191109-the-configuration-complexity-curse/)
  - [How CUE Wins](https://blog.cedriccharly.com/post/20210523-how-cue-wins/)
  - [The Configuration Complexity Clock](https://mikehadlow.blogspot.com/2012/05/configuration-complexity-clock.html)
    - Hard Coded
    - Config Values
    - Rules Engine
    - DSL
- used by dagger

```cue
// Go 实现，导入依赖
import (
  "strings"
)

// 类型
Bob: {
  Name: string
  Age: int
}


// JSON 语法
{
  "Bob": {
    "Name": "Bob Smith",
    "Age": 42
  }
}

// 等同
Bob: Name: "Bob Smith"

// 类型定义
#Person: {
  Name: string
  Email?: string
  Age?: int & >0 & <140
}
Wener: #Person & {
  // 使用导入
  Name: strings.ToTitle("wener"),
  Age: 18
}
```
