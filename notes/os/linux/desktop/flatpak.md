---
title: flatpak
---

# flatpak

- /var/lib/flatpak/
- /var/lib/flatpak/repo/
- ~/.local/share/flatpak/
- ~/.local/share/flatpak/repo/
- app/
- runtime/

```bash
apk add flatpak # AlpineLinux

# root
flatpak remote-add flathub https://flathub.org/repo/flathub.flatpakrepo
# user
flatpak --user remote-add flathub https://flathub.org/repo/flathub.flatpakrepo

flatpak list
flatpak list --user

flatpak install org.freedesktop.Sdk/x86_64/23.08
flatpak list --runtime

flatpak --user install com.visualstudio.code

curl -LO https://github.com/rustdesk/rustdesk/releases/download/1.2.3/rustdesk-1.2.3-x86_64.flatpak
flatpak install rustdesk-1.2.3-x86_64.flatpak
```

- https://docs.flatpak.org/en/latest/available-runtimes.html

**常用应用**

| id                             | name        | 用途     |
| ------------------------------ | ----------- | -------- |
| com.visualstudio.code          | VSC         | 编辑器   |
| om.vscodium.codium             | Codium      | 编辑器   |
| org.chromium.Chromium          | Chromium    | 浏览器   |
| org.mozilla.firefox            | Firefox     | 浏览器   |
| org.telegram.desktop           | Telegram    | 即时聊天 |
| com.valvesoftware.Steam        | Steam       | 游戏     |
| org.mozilla.Thunderbird        | Thunderbird | 邮件     |
| org.filezillaproject.Filezilla | Filezilla   | 文件     |
