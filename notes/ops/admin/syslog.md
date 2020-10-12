# Syslog


## syslog


## rsyslog
* rsyslog [Configuration Wizard](http://www.rsyslog.com/rsyslog-configuration-builder/)

## syslog-ng
* [syslog-ng.conf.doc](https://github.com/balabit/syslog-ng/blob/master/contrib/syslog-ng.conf.doc)
* [syslog-ng.conf](https://github.com/balabit/syslog-ng/blob/master/contrib/rhel-packaging/syslog-ng.conf)

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
