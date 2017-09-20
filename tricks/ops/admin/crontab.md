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
