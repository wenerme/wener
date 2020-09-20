# Go FAQ

## text/template vs html/template
* html/template
  * 输出内容被转义，避免代码注入

## 不会使用 /etc/hosts 就行解析
* 添加 `/etc/nsswitch.conf` 可以解决
  * `echo "hosts: files dns" > /etc/nsswitch.conf`
* [#35305](https://github.com/golang/go/issues/35305) - net: prefer /etc/hosts over DNS when no /etc/nsswitch.conf is present
* [#22846](https://github.com/golang/go/issues/22846) - net: Go DNS resolver does not read /etc/hosts

__/etc/nsswitch.conf__

```
# /etc/nsswitch.conf
#
# As described on the web page https://man7.org/linux/man-pages/man3/gethostbyname.3.html,
# without the nsswitch.conf file, the gethostbyname() and gethostbyaddr() domain queries
# will fail to a local name server, thus the /etc/hosts will take no effect.
#
# For example, when hostaliases are specified for a kubernetes pod, without proper settings
# defined in this file, the hostaliases settings will not take effect.
#
# Following contents of this file is from the ubuntu:16.04 docker image.

passwd:         compat
group:          compat
shadow:         compat
gshadow:        files

hosts:          files dns
networks:       files

protocols:      db files
services:       db files
ethers:         db files
rpc:            db files

netgroup:       nis
```
