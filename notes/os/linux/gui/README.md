# GUI


查看显示设备
/sys/class/graphics

https://pkgs.alpinelinux.org/packages?name=xf86-video*&branch=edge&arch=x86_64
https://pkgs.alpinelinux.org/packages?name=xf86-input*&branch=edge&arch=x86_64


-cpu host -smp 4,sockets=1,cores=4,threads=1
-vga virtio -display gtk,gl=on

https://wiki.alpinelinux.org/wiki/Desktop-notes

https://pkgs.alpinelinux.org/package/edge/community/x86/alpine-desktop

https://lxde.org/
https://en.wikipedia.org/wiki/LXDE
https://wiki.lxde.org/en/LXDM
https://pkgs.alpinelinux.org/package/edge/main/x86/lxdm

http://wiki.alpinelinux.org/wiki/XFCE_Setup


fbdev

https://unix.stackexchange.com/questions/273989/how-can-i-make-chromium-start-full-screen-under-x
@chromium-browser -e Fullscreen -a http://google.com

/etc/xdg/lxsession/LXDE/autostart


.xinitrc
iceweasel "http://localhost/"

startx chromium --kiosk --

~/.xinitrc
#!/bin/sh
exec chromium --kiosk http://baidu.com

kiosk 电话亭模式 没有其他的一些操作功能, 只能访问一个页面

Alt+F4 退出
退出相当于退出了 x

https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md

echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
apk add chromium@edge nss@edge

chmod 750 .Xclients  

https://raspberrypi.stackexchange.com/questions/12606/run-a-gui-without-the-desktop

--noerrdialogs
