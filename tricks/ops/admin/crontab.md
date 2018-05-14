# crontab

## Tips

* [crontab.guru](https://crontab.guru)
  * 时间编辑器

```bash
# 推荐使用一个自己的 crontab 文件, 这样便于管理
nano ~/.crontab
crontab ~/.crontab
crontab -l

# 重定向日志
nano /etc/rsyslog.d/50-default.conf
# 添加
# cron.*
sudo service rsyslog restart

# 或者也可以直接在 sysylog 中找
tail -f /var/log/syslog | grep CRON

# 也可以直接将任务设置为每分钟执行一次,然后将 crond 在前台执行,测试日志输出
crond -nx test
```

```bash
#!/bin/bash
# 简单的服务自动重启
# 然后添加到 @reboot 规则中就可以
until myserver; do
    echo "Server 'myserver' crashed with exit code $?.  Respawning.." >&2
    sleep 1
done
```

## 默认周期性任务
* 守护进程配置 /etc/conf.d/crond
  * 默认 CRON_OPTS="-c /etc/crontabs"
  * 可以修改为 CRON_OPTS="-c /etc/crontabs -L /var/log/crond.log -l 6"
* 默认位置 /etc/crontabs
* 默认周期性任务 /etc/crontabs/root
  * /var/spool/cron/root
* run-parts 会执行一个目录下的脚本
  * 默认的 run-parts 是 busybox 自带的, 也可以额外安装
  * https://pkgs.alpinelinux.org/package/v3.7/main/x86_64/run-parts
  * 检测一个目录下有哪些会被执行 `run-parts --test /etc/periodic/daily`

```
# do daily/weekly/monthly maintenance
# min	hour	day	month	weekday	command
*/15	*	*	*	*	run-parts /etc/periodic/15min
0	*	*	*	*	run-parts /etc/periodic/hourly
0	2	*	*	*	run-parts /etc/periodic/daily
0	3	*	*	6	run-parts /etc/periodic/weekly
0	5	1	*	*	run-parts /etc/periodic/monthly
```

```
# 每两周一次
0 4 * * 6 test $((10#$(date +\%W)\%2)) -eq 1 && run-parts /etc/periodic/bi-weekly
```


## mac
虽然不推荐使用 crontab, 因为其功能都已经被 lanuchd 替代,但简单的工作还是 crontab 更简单

* http://stackoverflow.com/a/23880156/1870054
* [ScheduledJobs](https://developer.apple.com/library/content/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/ScheduledJobs.html)

```bash
# 重定向 cron 日志
sudo nano /etc/syslog.conf
# 添加
# cron.* /var/log/cron.log

# 重启 syslog
sudo launchctl unload /System/Library/LaunchDaemons/com.apple.syslogd.plist
sudo launchctl load /System/Library/LaunchDaemons/com.apple.syslogd.plist
```

## help
```
$ crond --help
BusyBox v1.27.2 (2017-11-28 16:17:30 GMT) multi-call binary.

Usage: crond -fbS -l N -d N -L LOGFILE -c DIR

	-f	Foreground
	-b	Background (default)
	-S	Log to syslog (default)
	-l N	Set log level. Most verbose 0, default 8
	-d N	Set log level, log to stderr
	-L FILE	Log to FILE
	-c DIR	Cron dir. Default:/var/spool/cron/crontabs
```

```
$ crontab --help
BusyBox v1.27.2 (2017-11-28 16:17:30 GMT) multi-call binary.

Usage: crontab [-c DIR] [-u USER] [-ler]|[FILE]

	-c	Crontab directory
	-u	User
	-l	List crontab
	-e	Edit crontab
	-r	Delete crontab
	FILE	Replace crontab by FILE ('-': stdin)
```
