---
title: Syslog
---

# Syslog

- 实现
  - busybox syslog
  - rsyslog
  - syslog-ng
  - fluentbit
- 默认端口 514
- 默认 UNIX Socket /dev/log
- 参考
  - [What is the difference between syslog, rsyslog and syslog-ng?](https://serverfault.com/questions/692309)


:::tip

- AlpineLinux 默认 busybox syslog
- 如果需要使用更多功能，建议选择 rsyslog

:::

## busybox syslog

- syslogd
- [/etc/syslog.conf](https://git.busybox.net/busybox/tree/docs/syslog.conf.txt)

## rsyslog

- rsyslog [Configuration Wizard](http://www.rsyslog.com/rsyslog-configuration-builder/)

```bash
brew install rsyslog
```

## syslog-ng

- [syslog-ng.conf.doc](https://github.com/balabit/syslog-ng/blob/master/contrib/syslog-ng.conf.doc)
- [syslog-ng.conf](https://github.com/balabit/syslog-ng/blob/master/contrib/rhel-packaging/syslog-ng.conf)
- [Administration Guide](https://www.syslog-ng.com/technical-documents/doc/syslog-ng-open-source-edition/3.22/administration-guide/12)

```conf
@version: 3.9

destination d_general {
  file("/data/log/general.log");
};

source s_remote {
    tcp(ip(0.0.0.0) port(10514));
    udp(ip(0.0.0.0) port(10514));
};

log {
  source(s_remote);
  destination(d_general);
};
```
