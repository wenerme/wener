---
title: Java Library FAQ
tags:
- FAQ
---

## cn.dev33.satoken.secure.BCrypt checkpw

- 纯 Java 实现，性能过于垃圾，生产不要用
- 特别是 登录、注册 这种场景
  - 非常容易攻击
  - **非常容易** 把 CPU 跑完
