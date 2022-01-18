---
title: Makefile
---

# Makefile

## 平台相关

:::tip

如果有 Go 环境推荐使用 `go env GOOS`

:::

```makefile
accel_Darwin	:=hvf
accel_Linux		:=kvm
platform		  :=$(shell uname -s)
accel			    ?=$(accel_$(platform))
```

- msys2
  - -s 输出 MSYS_NT-10.0-17763
  - -o 输出 Msys
