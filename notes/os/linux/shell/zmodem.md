---
title: ZMODEM
---

# ZMODEM

推荐 [tssh](./tssh.md)

```bash
brew install lrzsz
```

# iterm2

```bash
# rz sz
curl --output-dir ~/bin/ --remote-name-all https://raw.githubusercontent.com/aikuyun/iterm2-zmodem/master/{iterm2-send-zmodem.sh,iterm2-recv-zmodem.sh}
chmod +x ~/bin/{iterm2-send-zmodem.sh,iterm2-recv-zmodem.sh}

# which sz
# 修改 sh 里 sz 的路径
```

- `Cmd + ,` - Profile - Adavance - Trigger
- 配置好 trigger 后服务端执行 rz 会出现文件选择

| Regular Expression    | Action               | Parameters                        |
| --------------------- | -------------------- | --------------------------------- |
| `\*\*B0100`           | Run Silent Coprocess | `$HOME/bin/iterm2-send-zmodem.sh` |
| `\*\*B00000000000000` | Run Silent Coprocess | `$HOME/bin/iterm2-recv-zmodem.sh` |
