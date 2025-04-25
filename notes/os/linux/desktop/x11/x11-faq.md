---
tags:
  - FAQ
---

# X11 FAQ

- /usr/share/xsessions/*.desktop
- /usr/share/wayland-sessions/*.desktop
- Magic Cookie
  - ~/.Xauthority
  - XAUTHORITY

```bash
# X0
ls /tmp/.X11-unix

ls /tmp/.ICE-unix

cat /tmp/.X0-lock
```

## DISPLAY

- 格式
  - hostname:D.S - hostname:display_number.screen_number
    - D - display 编号
    - S - screen 编号
    - 端口为 TCP 6000+D
  - host/unix:D.S
    - /tmp/.X11-unix/XD
  - :D.S -> host/unix:D.S
