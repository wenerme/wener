---
title: Chrome
---

# Chrome

- KHTML -> Webkit -> Blink
- [chrome://chrome-urls](./chrome-urls.md)
  Chrome 内部页面
- Windows XP/2003
  - https://github.com/win32ss/supermium

```bash
curl -O https://dl.google.com/chrome/mac/universal/stable/GGRO/googlechrome.dmg
# 旧版本 87
curl -O https://dl.google.com/chrome/mac/stable/GGRO/googlechrome.dmg

# Linux https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

# Windows
curl -o googlechrome.exe "https://dl.google.com/tag/s/appguid={8A69D345-D564-463c-AFF1-A69D9E530F96}&iid={91A77F18-01A2-47AF-8B2B-7A9A78D677F7}&lang=en&browser=3&usagestats=1&appname=Google%20Chrome&needsadmin=prefers&ap=x64-stable&dl=installdata&sig=O/bkTtzTzkDKc+QWtHbLtnf9XzOs+rE2ZS+JKIIaD4="
```

## 快捷键 {#keyboard-shortcuts}

| Shortcuts         | macOS       | for                 |
| ----------------- | ----------- | ------------------- |
| Ctrl+1-9          |             | Select tab          |
| Ctrl+Tab          |             | Next tab            |
| Ctrl+T            |             | New tab             |
| Ctrl+W            |             | Close tab           |
| Ctrl+N            |             | New window          |
| Ctrl+Shift+N      | Cmd+Shift+N | open Incognito      |
| Ctrl+Shift+Delete |             | Clear browsing data |
| Ctrl+L            | Cmd+L       | 聚焦 搜索栏         |
| Shift+Esc         |             | task manager        |

- https://support.google.com/chrome/answer/157179

---

- OmiBox Add Calender
  - `http://www.google.com/calendar/event?ctext=+%s+&action=TEMPLATE&pprop=HowCreated%3AQUICKADD`
