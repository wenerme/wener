---
tags:
  - FAQ
---

# Jetbrain FAQ

## Project Storage

```bash
# projects/default
ls $HOME/Library/Application\ Support/JetBrains/DataGrip*

ls $HOME/Library/Application\ Support/JetBrains/DataGrip2023.3/consoles/db
```

- .idea/dataSources.xml

## macOS 获取 datasource 的密码

- 复制 datasource - 实际为 XML
- 粘贴出来，获取到 UUID
- 打开 Keychain Access，在 login 里 搜索 UUID
- 查看密码即可

## Code Vision hints evaluation

- 显示使用情况
- 占用更多 CPU
- https://www.jetbrains.com/help/rider/Code_Vision.html

## Cannot connect to already running IDE instance. Exception: Process 621 is still running

```bash
ls "$HOME/Library/Application Support/JetBrains/IntelliJIdea2023.2"

ls $HOME/Library/Application\ Support/JetBrains/*/.lock
rm $HOME/Library/Application\ Support/JetBrains/*/.lock
```
