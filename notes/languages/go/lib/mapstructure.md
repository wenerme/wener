---
title: mapstructure
---

# mapstructure

- [mitchellh/mapstructure](https://github.com/mitchellh/mapstructure)
  - 对象映射

```go
type Person struct {
  Family    `mapstructure:",squash"` // embed
  Location  `mapstructure:",squash"`
  Pref      `mapstructure:",omitempty"`
  FirstName string
  Other map[string]interface{} `mapstructure:",remain"` // 其他剩余
}
```
