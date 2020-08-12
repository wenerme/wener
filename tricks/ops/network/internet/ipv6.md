# IPv6


```bash
[ -f /proc/net/if_inet6 ] && echo 'IPv6: yes' || echo 'IPv6: no'

modprobe ipv6
cat /proc/net/if_inet6
```
