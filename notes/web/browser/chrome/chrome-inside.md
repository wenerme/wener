---
tags:
  - Insight
---

# Chrome Insight

- https://chromium.googlesource.com/chromium/src/+/master/docs/
- Data Dir - 浏览器维度 - `--user-data-dir`, `CHROME_USER_DATA_DIR`
- Profile Dir - 用户维度
- CRD - Chrome Remote Desktop - ~/.config/chrome-remote-desktop/
- 参考
  - List of Chromium Command Line Switches https://peter.sh/experiments/chromium-command-line-switches/

```bash
file * | grep SQLite | cut -d ':' -f 1
```

## Data Dir

- `$HOME/Library/Application Support/Google/Chrome`
- ~/.config/google-chrome
- `%LOCALAPPDATA%\Google\Chrome\User Data`
- https://superuser.com/questions/951095

**内容**

- Default/ - Profile

## Profile Dir

- Accounts/
  - Avatar Images/
- databases/
- Extensions/
- Google Profile Picture.png

**SQLite**

- Affiliation Database
- Cookies
- Extension Activity
- Extension Cookies
- Favicons
- History
- Login Data
- Login Data For Account
- Media History
- Network Action Predictor
- Reporting and NEL
- Safe Browsing Cookies
- Shortcuts
- Top Sites
- Web Data
- heavy_ad_intervention_opt_out.db
- page_load_capping_opt_out.db

## User Data Dir

- chrome://version
  - Profile Path
- [User Data Dir](https://chromium.googlesource.com/chromium/src/+/master/docs/user_data_dir.md)

## Flags
