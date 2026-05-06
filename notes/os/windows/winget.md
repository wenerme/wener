---
title: winget
---

# winget

- Windows 可直接使用
- 类似于 macOS brew

```bash
winget install Warp Zellij Git bottom Casey.Just

winget install --id Python.Python.3.13 --source winget --accept-source-agreements --accept-package-agreements
winget install --id astral-sh.uv --source winget --accept-source-agreements --accept-package-agreements

winget upgrade --all --accept-source-agreements --accept-package-agreements
```

| id                       | app    | source         | notes |
| ------------------------ | ------ | -------------- | ----- |
| Tencent.WeCom            |        | winget,msstore |
| Tencent.WeChat           |        | winget,msstore |
| Tencent.WeChat.Universal |        | winget,msstore | 4.x   |
| Zellij.Zellij            | zellij |
| Git.Git                  | git    |
| bufbuild.buf             | buf    |
| SQLite.SQLite            | sqlite |

# FAQ

- Winget 会安装 symlink `...\WinGet\Links`, 会导致 ssh 进入可能会导致没办法访问
