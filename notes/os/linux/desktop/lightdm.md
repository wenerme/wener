---
title: lightdm
---

# lightdm

- https://github.com/Canonical/lightdm/blob/main/data/lightdm.conf
- https://wiki.archlinux.org/title/LightDM
- https://wiki.gentoo.org/wiki/LightDM
- ~/.dmrc
- /etc/lightdm/Xsession

```bash
apk add lightdm-gtk-greeter
```

## autologin

```bash
groupadd -r autologin
gpasswd -a $USER autologin
```

```ini
[Seat:*]
autologin-user=admin
autologin-user-timeout=0
autologin-user-session=auto

# Uncomment the following, if running Unity
#greeter-session=unity-greeter
```

- session
  - `/usr/share/xsessions/*.desktop`
  - `/usr/share/wayland-sessions/*.desktop`
