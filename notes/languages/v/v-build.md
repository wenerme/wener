---
title: Vlang Build
---

# Vlang Build

```bash

# 支持代码热重载
# 函数添加 [live]
v -live message.v

# 交叉编译
v -os windows .
v -os linux .
```

**pseudo variables**

| var        | desc                                                   |
| ---------- | ------------------------------------------------------ |
| @FN        | name of the current V function                         |
| @METHOD    | replaced with ReceiverType.MethodName                  |
| @MOD       | name of the current V module                           |
| @STRUCT    | name of the current V struct                           |
| @FILE      | path of the V source file                              |
| @LINE      | V line number where it appears (as a string).          |
| @COLUMN    | column where it appears (as a string).                 |
| @VEXE      | path to the V compiler                                 |
| @VEXEROOT  | folder, where the V executable is (as a string).       |
| @VHASH     | shortened commit hash of the V compiler (as a string). |
| @VMOD_FILE | contents of the nearest v.mod file (as a string).      |
| @VMODROOT  | folder, where the nearest v.mod file is (as a string). |
