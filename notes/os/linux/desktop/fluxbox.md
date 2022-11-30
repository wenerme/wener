---
title: fluxbox
---

# fluxbox

- [fluxbox/fluxbox](https://github.com/fluxbox/fluxbox)
  - MIT, C++
- 参考
  - http://fluxbox.org/help/
  - https://lumina-desktop.org/
    - DE based on fluxbox
- fluxbox
- fbrun - display run dialog window
- startfluxbox
- ~/.xinitrc
  - `exec startfluxbox`
- /usr/share/fluxbox/
  - menu
  - windowmenu
  - styles/bloe
  - keys
  - init
- ~/.fluxbox/init
- Layers
  - Above Dock
  - Dock
  - Top
  - Normal
  - Button
  - Desktop
- slit - DockApps

```bash
fluxbox -no-slit # 启动

fluxbox -i # 配置信息
```

```txt title="$HOME/.fluxbox/init"
session.screen0.workspaces: 4


session.menuFile:	~/.fluxbox/menu
session.keyFile: ~/.fluxbox/keys
session.styleFile: /usr/share/fluxbox/styles/bloe
session.configVersion:	13
```

- https://addy-dclxvi.github.io/post/my-fluxbox/
- https://gist.github.com/TBog/16458da478209d630328ce248f0b0b2f
- Theme
  - https://www.box-look.org/browse?cat=139&tag=
  - http://tenr.de/styles/
- https://wiki.archlinux.org/title/fluxbox
- https://www.ocf.berkeley.edu/~reinholz/freebsd/fluxconfig.html

```bash
# -r random
fbsetbg -r /usr/share/fluxbox/backgrounds/
fbsetbg -f /usr/share/fluxbox/backgrounds/x.png
# 或
feh --bg-scale /usr/share/fluxbox/backgrounds/
```

- https://manpages.ubuntu.com/manpages/jammy/man5/fluxbox-menu.5.html

## Customize

- fluxbox-generate_menu
- mmaker
  - Menu Maker

**/usr/share/fluxbox/menu**

```
[begin] (Fluxbox-1.3.7)
[encoding] {UTF-8}
      [exec] (xterm) {xterm}
      [exec] (firefox) {}
[submenu] (Net)
[submenu] (IRC)
      [exec]   (weechat) {xterm -e weechat}
[end]
[end]
[submenu] (Editors)
      [exec]   (vi) {xterm -e vi}
[end]
[submenu] (System Tools)
      [exec]   (top) {xterm -e top}
      [exec]   (htop) {xterm -e htop}
[end]
[submenu] (Fluxbox menu)
      [config] (Configure)
[submenu] (System Styles) {Choose a style...}
      [stylesdir] (/usr/share/fluxbox/styles)
[end]
[submenu] (User Styles) {Choose a style...}
      [stylesdir] (~/.fluxbox/styles)
[end]
      [workspaces] (Workspace List)
      [commanddialog] (Fluxbox Command)
      [reconfig] (Reload config)
      [restart] (Restart)
      [exec] (About) {(fluxbox -v; fluxbox -info | sed 1d) | xmessage -file - -center}
      [separator]
      [exit] (Exit)
[end]
[endencoding]
[end]
```
