# ufw

* [ufw.8](http://manpages.ubuntu.com/manpages/trusty/en/man8/ufw.8.html)

__语法__

```
ufw [--dry-run] enable|disable|reload

ufw [--dry-run] default allow|deny|reject [incoming|outgoing|routed]

ufw [--dry-run] logging on|off|LEVEL

ufw [--dry-run] reset

ufw [--dry-run] status [verbose|numbered]

ufw [--dry-run] show REPORT

ufw [--dry-run] [delete] [insert NUM] allow|deny|reject|limit  [in|out]
[log|log-all] PORT[/PROTOCOL]

ufw  [--dry-run]  [rule]  [delete] [insert NUM] allow|deny|reject|limit
[in|out [on INTERFACE]] [log|log-all] [proto  PROTOCOL]  [from  ADDRESS
[port PORT]] [to ADDRESS [port PORT]]

ufw  [--dry-run]  route  [delete]  [insert NUM] allow|deny|reject|limit [in|out on INTERFACE]  [log|log-all]  [proto PROTOCOL]  [from  ADDRESS [port PORT]] [to ADDRESS [port PORT]]

ufw [--dry-run] delete NUM

ufw [--dry-run] app list|info|default|update
```

__示例__

```bash
# 允许给定接口的指定端口
ufw allow in on eth1 to eth1接口地址 port 80 proto tcp

ufw allow 22
ufw allow 80
ufw allow 443
# mosh
ufw allow 60000:61000/udp

# ikev2-vpn
# ufw allow 500/udp
# ufw allow 4500/udp

ufw default deny
ufw enable

# 允许 UDP 广播
sudo ufw allow in proto udp to 224.0.0.0/4
sudo ufw allow in proto udp from 224.0.0.0/4
```
