---
title: Vercel Golang
---

# Vercel Golang

- 依然使用路径匹配

**/api/index.go**

```golang
package handler

import (
  "fmt"
  "net/http"
)

func Handler(w http.ResponseWriter, r *http.Request) {
  fmt.Fprintf(w, "<h1>Hello from Go!</h1>")
}
```
