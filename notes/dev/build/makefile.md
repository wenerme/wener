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

## warning: overriding commands for target

- 无法关闭错误信息
- 可以考虑 base 使用 `<xxx>-default` 的命名方式
- [Overriding Part of Another Makefile](https://www.gnu.org/software/make/manual/html_node/Overriding-Makefiles.html)
  - 推荐 `$(MAKE) -f base.Makefile`, 但是会产生额外的 进程

```makefile title='base.mk'
build-default:
        echo  'build default'
%:  %-default # 让 build 隐含执行 build-default
        @true
```

```makefile
build: # 必须要定义 target
```

## 默认值

```makefile
NAMESPACE := $(or $(NAMESPACE), $(shell basename $(shell pwd)))
```
