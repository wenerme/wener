---
title: Asterisk Inside
tags:
  - Insight
---

# Asterisk Inside

| cli           | type       | desc                                         |
| ------------- | ---------- | -------------------------------------------- |
| astcanary     |            | 异常感知                                     |
| astdb2bdb     |
| astdb2sqlite3 |
| asterisk      |            | 主进程                                       |
| astgenkey     | shell      | 生成 Asterisk IAX2 RSA 证书                  |
| astversion    | shell      | 组件版本和源码信息                           |
| autosupport   | shell      | 生成用于 Digium 支持的诊断信息               |
| rasterisk     | ->asterisk | 等同于 `asterisk -`                          |
| safe_asterisk | shell      | 确保 asterisk 持续运行，异常后重启; 前台运行 |

- 其他
  - [asterisk/contrib/scripts](https://github.com/asterisk/asterisk/tree/master/contrib/scripts)

# astcanary

确保 asterisk 线程没有异常，例如 脱离主进程导致 CPU 跑满，asterisk 无响应。

**工作方式**
asterisk -p 启动时创建一个文件(/var/run/asterisk/alt.asterisk.canary.tweet.tweet.tweet)，
异常时 astcanary 无响应， 120s 未更新文件时间戳，asterisk 会降低优先级，允许管理员操作，避免重启整个系统。

- 参考
  - [What is Astcanary?](https://asteriskfaqs.org/2010/11/24/asterisk-tips/astcanary.html)
