---
title: Signal
---

# Signal

| 编号  | 信号名称          | 描述               | 常见用途                                        |
| :---- | :---------------- | :----------------- | :---------------------------------------------- |
| 1     | SIGHUP            | Hangup             | 终端断开，常用于通知进程重读配置文件            |
| 2     | SIGINT            | Interrupt          | 键盘中断（Ctrl+C）                              |
| 3     | SIGQUIT           | Quit               | 键盘退出（Ctrl+\），会生成 Core Dump            |
| 9     | SIGKILL           | Kill               | 强制终止，不可被捕获或忽略                      |
| 10    | SIGUSR1           | User 1             | 用户自定义信号 1                                |
| 11    | SIGSEGV           | Segmentation fault | 段错误，非法内存访问                            |
| 12    | SIGUSR2           | User 2             | 用户自定义信号 2                                |
| 13    | SIGPIPE           | Broken pipe        | 管道破裂：向无读端的管道写入数据                |
| 14    | SIGALRM           | Alarm clock        | 定时器超时                                      |
| 15    | SIGTERM           | Terminate          | 终止信号，kill 命令默认信号，可被捕获以安全退出 |
| 17    | SIGCHLD           | Child exited       | 子进程状态改变                                  |
| 18    | SIGCONT           | Continue           | 继续执行已停止的进程                            |
| 19    | SIGSTOP           | Stop               | 停止进程，不可被捕获或忽略                      |
| 20    | SIGTSTP           | Terminal stop      | 键盘停止信号（Ctrl+Z）                          |
| 34-64 | SIGRTMIN-SIGRTMAX | Real-time signals  | 实时信号                                        |

## 信号处理

```bash
# 捕获信号：收到 SIGINT 或 SIGTERM 时执行 echo
trap 'echo "Received signal"' SIGINT SIGTERM

# 忽略信号
trap '' SIGINT SIGTERM

# 恢复默认处理逻辑
trap - SIGINT SIGTERM
```

## 信号发送

```bash
# 使用信号名称
kill -SIGINT <pid>
kill -SIGTERM <pid>

# 使用信号编号
kill -9 <pid>  # 发送 SIGKILL
kill -15 <pid> # 发送 SIGTERM

# 发送给进程组
kill -SIGTERM -<pgid>
```
