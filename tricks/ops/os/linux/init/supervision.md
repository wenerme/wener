---
id: supervision
title: Process supervision
---

# Process supervision
## Tips
* [Process supervision](https://en.wikipedia.org/wiki/Process_supervision)
* 通常 init 系统都包含 
* supervision 比 init 有优势
  * 服务重启
  * 不需要 pid 文件
  * 清除进程状态
  * 更可靠的日志 - 会捕获 stdout、stderr
  * 更快 - 并行
  * 监控告警
* 纯粹的 supervision
  * monit
  * pm2
  * [s6](http://www.skarnet.org/software/s6/)
  * [immortal](https://immortal.run/) [immortal/immortal](https://github.com/immortal/immortal/)
    * Go 语言实现
