# NetworkManager

* https://wiki.gnome.org/Projects/NetworkManager
* https://pkgs.alpinelinux.org/package/edge/community/x86_64/networkmanager

* en – Ethernet interface
* wl – Wlan interface
* ww – Wwam interface
* sl – Serial line IP (slip)


```bash
# alpine
apk add networkmanager
rc-service networkmanager start
nmcli dev

# 终端图形界面
nmtui


nm-edit
nmtui-edit
```


## 重载

```bash
nmcli c down ens192 && nmcli c up ens192
systemctl restart NetworkManager.service
nmcli networking off && nmcli networking on
nmcli d reapply enp03
```
