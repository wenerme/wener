"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["65576"],{8479:function(e,n,i){i.r(n),i.d(n,{assets:function(){return a},contentTitle:function(){return t},default:function(){return x},frontMatter:function(){return d},metadata:function(){return r},toc:function(){return c}});var r=i(90348),s=i(52676),l=i(79938);let d={slug:"alpinelinux-setup-xfce",title:"AlpineLinux \u5B89\u88C5 Xfce \u684C\u9762",tags:["Alpine","Desktop","Xfce"]},t="AlpineLinux \u5B89\u88C5 Xfce \u684C\u9762",a={authorsImageUrls:[]},c=[{value:"setup xorg",id:"setup-xorg",level:2},{value:"setup lightdm",id:"setup-lightdm",level:2},{value:"setup xfce",id:"setup-xfce",level:2},{value:"\u5E94\u7528",id:"\u5E94\u7528",level:2},{value:"flatpak",id:"flatpak",level:3},{value:"AppImage",id:"appimage",level:3},{value:"\u5176\u4ED6\u670D\u52A1",id:"\u5176\u4ED6\u670D\u52A1",level:2},{value:"xfce \u652F\u6301\u9AD8\u5206\u8FA8\u7387",id:"xfce-\u652F\u6301\u9AD8\u5206\u8FA8\u7387",level:2},{value:"DISPLAY \u4FE1\u606F",id:"display-\u4FE1\u606F",level:2},{value:"\u67E5\u770B\u5F53\u524D\u663E\u5361\u548C\u58F0\u5361\u4FE1\u606F",id:"\u67E5\u770B\u5F53\u524D\u663E\u5361\u548C\u58F0\u5361\u4FE1\u606F",level:2},{value:"kernel: i915 0000:00:02.0: [drm] <em>ERROR</em> CPU pipe A FIFO underrun",id:"kernel-i915-000000020-drm-error-cpu-pipe-a-fifo-underrun",level:2},{value:"VNC \u8FDC\u7A0B\u684C\u9762",id:"vnc-\u8FDC\u7A0B\u684C\u9762",level:2},{value:"KMS: DRM_IOCTL_MODE_CREATE_DUMB failed: Permission denied",id:"kms-drm_ioctl_mode_create_dumb-failed-permission-denied",level:2},{value:"xrandr auto",id:"xrandr-auto",level:2},{value:"kiskos",id:"kiskos",level:2}];function h(e){let n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,l.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsxs)(n.p,{children:["\u5047\u8BBE\u5DF2\u7ECF\u6709\u4E00\u4E2A\u57FA\u7840\u53EF\u7528\u7684 AlpineLinux, \u5982\u679C\u6CA1\u6709\u53EF\u524D\u5F80 ",(0,s.jsx)(n.a,{href:"https://github.com/wenerme/alpine-image",children:"wenerme/alpine-image"})," \u4E0B\u8F7D\u6216\u81EA\u884C\u5236\u4F5C"]}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"setup-xorg",children:"setup xorg"}),"\n",(0,s.jsx)(n.p,{children:"\u5B89\u88C5 X server \u548C\u57FA\u7840\u786C\u4EF6\u9A71\u52A8"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"# xfce + xorg\nsetup-xorg-base xfce4 xfce4-terminal dbus-x11 sudo pm-utils\n\nservice dbus start\nrc-update add dbus\n\n# xorg \u8F93\u5165\u8BBE\u5907\n# apk add xf86-input-mouse xf86-input-keyboard kbd\n# \u9ED8\u8BA4\u5305\u542B libinput\n# \u5176\u4ED6 synaptics vmmouse wacom mtrack\napk add xf86-input-libinput xf86-input-evdev kbd\n\n# Intel \u82AF\u7247\u96C6\u6210\u663E\u5361\napk add xf86-video-intel\n# AMD \u663E\u5361\napk add xf86-video-amdgpu\n# QEMU\n# apk add xf86-video-qxl\n# \u5982\u679C\u4EE5\u4E0A\u90FD\u4E0D\u652F\u6301\u5219\u8003\u8651\u4F7F\u7528 framebuffer\n# https://pkgs.alpinelinux.org/packages?name=xf86-video-*\n# apk add xf86-video-fbdev\n"})}),"\n",(0,s.jsxs)(n.p,{children:["\u6B64\u65F6\u5DF2\u7ECF\u53EF\u4EE5\u8FDB\u5165 xfce \u684C\u9762, \u6CA1\u6709\u767B\u9646\u754C\u9762, \u8FDB\u5165\u754C\u9762\u540E\u53EF\u53F3\u4E0A\u89D2\u9000\u51FA\u767B\u9646\u6216\u8005 ",(0,s.jsx)(n.code,{children:"Ctrl+Alt+F1"})," \u6765\u5207\u6362\u56DE\u547D\u4EE4\u884C\u4F1A\u8BDD\u3002"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"# \u901A\u8FC7 xorg \u63D0\u4F9B\u7684 startx \u542F\u52A8\nstartx\n# \u6216\u8005\u6307\u5B9A\u542F\u52A8 xfce4\nstartxfce4\n"})}),"\n",(0,s.jsx)(n.h2,{id:"setup-lightdm",children:"setup lightdm"}),"\n",(0,s.jsx)(n.p,{children:"\u5B89\u88C5 lightdm \u540E\u53EF\u4EE5\u53EF\u4EE5\u901A\u8FC7\u8D26\u53F7\u5BC6\u7801\u767B\u9646, \u4E5F\u53EF\u4EE5\u8FDC\u7A0B VNC \u8FDB\u5165 xfce \u4F1A\u8BDD\u3002"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"apk add lightdm-gtk-greeter\n\n# \u6DFB\u52A0\u975E root \u7528\u6237 admin \u5BC6\u7801 admin - \u4E0D\u5C11\u5E94\u7528\u9700\u8981\u975E root \u7528\u6237\nadduser -D admin\necho 'admin:admin' | chpasswd\necho 'admin ALL=(ALL) NOPASSWD: ALL' >> /etc/sudoers\n\n# \u5F00\u673A\u8FDB\u5165\u767B\u9646\u754C\u9762\nrc-update add lightdm\n# \u7ACB\u5373\u542F\u52A8 lightdm \u8FDB\u884C\u767B\u9646\nservice lightdm start\n"})}),"\n",(0,s.jsx)(n.h2,{id:"setup-xfce",children:"setup xfce"}),"\n",(0,s.jsx)(n.p,{children:"\u5B89\u88C5\u5E38\u7528\u7684\u5305"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"# \u9ED8\u8BA4\u65E0\u6CD5\u663E\u793A\u4E2D\u6587\u5B57\u7B26\napk add font-noto-cjk\n\n# \u5141\u8BB8\u975E root \u901A\u8FC7 fuse \u8BBF\u95EE\u8BBE\u5907\napk add gvfs-fuse gvfs-smb\nservice fuse start\nrc-update add fuse\n\n# \u81EA\u52A8\u6302\u8F7D \u5916\u90E8\u8BBE\u5907\napk add thunar-volman udisks2\n# \u90E8\u5206\u8BBE\u5907\u9700\u8981\u989D\u5916\u7684\u5305\n# gvfs-mtp - MTP - \u5A92\u4F53\u64AD\u653E\u5668\u548C\u79FB\u52A8\u8BBE\u5907\n# gvfs-gphoto2 - PTP - \u76F8\u673A\u548C\u79FB\u52A8\u8BBE\u5907\n# gvfs-afc - \u82F9\u679C\u79FB\u52A8\u8BBE\u5907\n\n# \u6587\u4EF6\u7BA1\u7406\u5668\u652F\u6301\u538B\u7F29\u548C\u89E3\u538B\napk add thunar-archive-plugin\napk add file-roller # thunar-archive-plugin \u652F\u6301\u7684\u7BA1\u7406\u5668\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u5B89\u88C5\u4E86\u76F8\u5173\u63D2\u4EF6\u540E\u6700\u597D\u9000\u51FA\u4F1A\u8BDD\u91CD\u65B0\u767B\u9646\u786E\u4FDD\u751F\u6548\u3002"}),"\n",(0,s.jsx)(n.h2,{id:"\u5E94\u7528",children:"\u5E94\u7528"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"# \u5C4F\u4FDD, \u4EFB\u52A1\u7BA1\u7406\u5668\napk add xfce4-screensaver xfce4-taskmanager\n\n# \u8C37\u6B4C\u6D4F\u89C8\u5668 - \u4E5F\u53EF\u4EE5\u901A\u8FC7 flatpak \u5B89\u88C5\napk add chromium\n# \u706B\u72D0\u6D4F\u89C8\u5668\n# apk add firefox-esr\n"})}),"\n",(0,s.jsx)(n.h3,{id:"flatpak",children:"flatpak"}),"\n",(0,s.jsx)(n.p,{children:"Linux \u56E0\u4E3A\u53D1\u5E03\u7248\u592A\u5927\u4E86\uFF0C\u5E94\u7528\u5206\u53D1\u6BD4\u8F83\u6DF7\u4E71\uFF0C\u4E14\u4E0D\u5C11\u5E94\u7528\u5E76\u4E0D\u76F4\u63A5\u652F\u6301 musl\uFF0C\u4F7F\u7528 flatpak \u6253\u5305\u7684\u5E94\u7528\u53EF\u907F\u514D\u8FD9\u4E9B\u95EE\u9898\u3002"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"apk add flatpak xdg-user-dirs\n# https://flathub.org/setup/Alpine\nflatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo\n\n# \u5B89\u88C5\nflatpak install flathub com.visualstudio.code\n# \u542F\u52A8\nflatpak run com.visualstudio.code\n\nflatpak install flathub org.chromium.Chromium\n"})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"\u5E38\u7528\u5E94\u7528"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,s.jsxs)(n.table,{children:[(0,s.jsx)(n.thead,{children:(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.th,{children:"id"}),(0,s.jsx)(n.th,{children:"name"}),(0,s.jsx)(n.th,{children:"\u7528\u9014"})]})}),(0,s.jsxs)(n.tbody,{children:[(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"com.visualstudio.code"}),(0,s.jsx)(n.td,{children:"VSC"}),(0,s.jsx)(n.td,{children:"\u7F16\u8F91\u5668"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"om.vscodium.codium"}),(0,s.jsx)(n.td,{children:"Codium"}),(0,s.jsx)(n.td,{children:"\u7F16\u8F91\u5668"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"org.chromium.Chromium"}),(0,s.jsx)(n.td,{children:"Chromium"}),(0,s.jsx)(n.td,{children:"\u6D4F\u89C8\u5668"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"org.mozilla.firefox"}),(0,s.jsx)(n.td,{children:"Firefox"}),(0,s.jsx)(n.td,{children:"\u6D4F\u89C8\u5668"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"org.telegram.desktop"}),(0,s.jsx)(n.td,{children:"Telegram"}),(0,s.jsx)(n.td,{children:"\u5373\u65F6\u804A\u5929"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"com.valvesoftware.Steam"}),(0,s.jsx)(n.td,{children:"Steam"}),(0,s.jsx)(n.td,{children:"\u6E38\u620F"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"org.mozilla.Thunderbird"}),(0,s.jsx)(n.td,{children:"Thunderbird"}),(0,s.jsx)(n.td,{children:"\u90AE\u4EF6"})]}),(0,s.jsxs)(n.tr,{children:[(0,s.jsx)(n.td,{children:"org.filezillaproject.Filezilla"}),(0,s.jsx)(n.td,{children:"Filezilla"}),(0,s.jsx)(n.td,{children:"\u6587\u4EF6"})]})]})]}),"\n",(0,s.jsx)(n.h3,{id:"appimage",children:"AppImage"}),"\n",(0,s.jsxs)(n.p,{children:["\u4E0D\u901A\u8FC7 flatpak \u9700\u8981\u5B89\u88C5\uFF0CAppImage \u662F\u5C01\u88C5\u597D\u7684\u4E00\u4F53\u5316\u5E94\u7528\uFF0C\u7C7B\u4F3C\u5BB9\u5668\uFF0C\u7C7B\u4F3C macOS \u5E94\u7528\u3002\n\u4F46\u76EE\u524D\u7531\u4E8E glibc \u517C\u5BB9\u95EE\u9898 Alpine \u65E0\u6CD5\u8FD0\u884C AppImage \u53C2\u89C1 ",(0,s.jsx)(n.a,{href:"https://github.com/AppImage/AppImageKit/issues/1015",children:"AppImage/AppImageKit#1015"}),"\u3002"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"\u5DF2\u77E5\u63D0\u4F9B AppImage \u7684\u5E94\u7528"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Jetbrain Toolbox"}),"\n",(0,s.jsx)(n.li,{children:"Lens - Kubernetes IDE"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"\u5176\u4ED6\u670D\u52A1",children:"\u5176\u4ED6\u670D\u52A1"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"xrdp - RDP \u670D\u52A1\u7AEF - \u652F\u6301 Windows \u76F4\u63A5\u8FDC\u7A0B\u767B\u9646"}),"\n",(0,s.jsx)(n.li,{children:"gvncviewer - VNC \u5BA2\u6237\u7AEF"}),"\n"]}),"\n",(0,s.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,s.jsx)(n.h2,{id:"xfce-\u652F\u6301\u9AD8\u5206\u8FA8\u7387",children:"xfce \u652F\u6301\u9AD8\u5206\u8FA8\u7387"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"# \u4E24\u500D\u7F29\u653E\n# Settings Manager > Appearance > Settings > Window Scaling\nxfconf-query -c xsettings -p /Gdk/WindowScalingFactor -s 2\n# \u8C03\u6574\u4E3B\u9898\u4E3A \u9ED8\u8BA4 xhdpi\n# Settings Manager > Window Manager > Style\nxfconf-query -c xfwm4 -p /general/theme -s Default-xhdpi\n"})}),"\n",(0,s.jsx)(n.h2,{id:"display-\u4FE1\u606F",children:"DISPLAY \u4FE1\u606F"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"apk add xrandr\nDISPLAY=:0 xrandr\n"})}),"\n",(0,s.jsx)(n.h2,{id:"\u67E5\u770B\u5F53\u524D\u663E\u5361\u548C\u58F0\u5361\u4FE1\u606F",children:"\u67E5\u770B\u5F53\u524D\u663E\u5361\u548C\u58F0\u5361\u4FE1\u606F"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"apk add inxi\ninxi -AG\n"})}),"\n",(0,s.jsxs)(n.h2,{id:"kernel-i915-000000020-drm-error-cpu-pipe-a-fifo-underrun",children:["kernel: i915 0000:00:02.0: [drm] ",(0,s.jsx)(n.em,{children:"ERROR"})," CPU pipe A FIFO underrun"]}),"\n",(0,s.jsxs)(n.p,{children:["\u5982\u679C\u8BE5\u9519\u8BEF\u5BFC\u81F4\u95EA\u70C1\u53EF\u6DFB\u52A0\u542F\u52A8\u53C2\u6570\u907F\u514D ",(0,s.jsx)(n.code,{children:"i915.enable_psr=0"})]}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://wiki.archlinux.org/index.php/Intel_graphics#Screen_flickering",children:"Intel graphics#Screen flickering"})}),"\n",(0,s.jsx)(n.p,{children:"\u53EF\u80FD\u7531\u4E8E Intel \u96C6\u6210\u663E\u5361\u7684\u8282\u80FD\u529F\u80FD\u5BFC\u81F4"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"vnc-\u8FDC\u7A0B\u684C\u9762",children:"VNC \u8FDC\u7A0B\u684C\u9762"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'apk add x11vnc\n\n# \u542F\u52A8\u670D\u52A1\u7AEF\u8BBF\u95EE\u5DF2\u6253\u5F00\u4F1A\u8BDD\nx11vnc -display :0 -auth /var/run/lightdm/root/\\:0\n# \u7136\u540E\u8BBF\u95EE vnc://<IP>:5900 \u5373\u53EF\n\n# \u4E0D\u9000\u51FA\nx11vnc -display :0 -auth /var/run/lightdm/root/\\:0 --loop\n\n# \u8BBF\u95EE\u65F6\u521B\u5EFA\u65B0\u7684\u4F1A\u8BDD\n# \u786E\u4FDD init \u80FD\u542F\u52A8\necho "exec startxfce4" >> ~/.xinitrc\napk add xvfb\nx11vnc -ncache_cr -display :1 -auth /var/run/lightdm/root/\\:1 --create\n\n# \u4E0D\u8B66\u544A\u6CA1\u6709\u8BBE\u7F6E\u5BC6\u7801\necho nopw >> ~/.x11vncrc\n\n# \u53EF\u8BBE\u7F6E\u4E3A\u5F00\u673A\u542F\u52A8\n# x11vnc -create -xkb -noxrecord -noxfixes -noxdamage -display :0 -auth /var/run/lightdm/root/:0 -rfbauth /etc/x11vnc.pass -rfbport 5900\n\n# \u767B\u9646\u4E4B\u524D\u5F00\u542F VNC\n# x11vnc -auth guess -display :0\n'})}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsx)(n.p,{children:"\u5982\u679C\u670D\u52A1\u5E38\u5F00\uFF0C\u5EFA\u8BAE\u8BBE\u7F6E\u5BC6\u7801"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"kms-drm_ioctl_mode_create_dumb-failed-permission-denied",children:"KMS: DRM_IOCTL_MODE_CREATE_DUMB failed: Permission denied"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"DRM - Direct Rendering Manager"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"xrandr-auto",children:"xrandr auto"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"xrandr --auto\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"xrandr: Output DP1 is not disconnected but has no modes\nxrandr: Output HDMI2 is not disconnected but has no modes\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"export DISPLAY=:0\nxrandr --query\n"})}),"\n",(0,s.jsx)(n.h2,{id:"kiskos",children:"kiskos"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",metastring:'title="~/.initrc"',children:"xset -dpms     # Disable DPMS (Energy Star) features\nxset s off     # Disable screen saver\nxset s noblank # Don't blank the video device\nexec chromium-browser --kiosk --no-first-run --no-sandbox 'https://wener.me'\n"})}),"\n",(0,s.jsx)(n.h1,{id:"\u53C2\u8003",children:"\u53C2\u8003"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["AlpineLinux ",(0,s.jsx)(n.a,{href:"https://wiki.alpinelinux.org/wiki/Xfce_Setup",children:"Xfce Setup"})]}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://wiki.archlinux.org/index.php/HiDPI#Xfce",children:"HiDPI#Xfce"})}),"\n",(0,s.jsxs)(n.li,{children:["flatpak ",(0,s.jsx)(n.a,{href:"https://flathub.org/apps",children:"\u5E94\u7528\u5217\u8868"})]}),"\n",(0,s.jsxs)(n.li,{children:["archlinux ",(0,s.jsx)(n.a,{href:"https://wiki.archlinux.org/index.php/x11vnc",children:"x11vnc"})]}),"\n"]})]})}function x(e={}){let{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},79938:function(e,n,i){i.d(n,{Z:function(){return t},a:function(){return d}});var r=i(75271);let s={},l=r.createContext(s);function d(e){let n=r.useContext(l);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:d(e.components),r.createElement(l.Provider,{value:n},e.children)}},90348:function(e){e.exports=JSON.parse('{"permalink":"/story/alpinelinux-setup-xfce","editUrl":"https://github.com/wenerme/wener/edit/master/story/../story/2021/2021-02-26-alpinelinux-setup-xfce.md","source":"@site/../story/2021/2021-02-26-alpinelinux-setup-xfce.md","title":"AlpineLinux \u5B89\u88C5 Xfce \u684C\u9762","description":"\u5047\u8BBE\u5DF2\u7ECF\u6709\u4E00\u4E2A\u57FA\u7840\u53EF\u7528\u7684 AlpineLinux, \u5982\u679C\u6CA1\u6709\u53EF\u524D\u5F80 wenerme/alpine-image \u4E0B\u8F7D\u6216\u81EA\u884C\u5236\u4F5C","date":"2021-02-26T00:00:00.000Z","tags":[{"inline":true,"label":"Alpine","permalink":"/story/tags/alpine"},{"inline":true,"label":"Desktop","permalink":"/story/tags/desktop"},{"inline":true,"label":"Xfce","permalink":"/story/tags/xfce"}],"readingTime":5.495,"hasTruncateMarker":true,"authors":[],"frontMatter":{"slug":"alpinelinux-setup-xfce","title":"AlpineLinux \u5B89\u88C5 Xfce \u684C\u9762","tags":["Alpine","Desktop","Xfce"]},"unlisted":false,"prevItem":{"title":"\u8BB0\u5F55\u4E00\u6B21\u4FEE\u590D init \u811A\u672C\u7684\u7ECF\u5386","permalink":"/story/fix-init-script"},"nextItem":{"title":"\u4E3A\u4EC0\u4E48\u9700\u8981 GraphQL","permalink":"/story/why-need-graphql"}}')}}]);