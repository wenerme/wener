---
title: mutagen
---

# mutagen

- [mutagen-io/mutagen](https://github.com/mutagen-io/mutagen)
  - SSPL, MIT, Go
  - 文件同步、网络转发
- Mutagen Pro
  - XXH128
  - Zstandard

```bash
curl -LO https://github.com/mutagen-io/mutagen/releases/download/v0.17.0/mutagen_darwin_amd64_v0.17.0.tar.gz
tar -zxvf mutagen*.tar.gz

mutagen sync create --name=web-app-code ~/project user@example.org:~/project
# localhost:8080 -> :1313
# mutagen forward create --name=web-app tcp:localhost:8080 docker://devcontainer:tcp:localhost:1313

mutagen sync list
mutagen forward list

mutagen daemon run
```

- MUTAGEN_SSH_PATH
- MUTAGEN_DISABLE_AUTOSTART
- ~/.mutagen/
  - caches/
  - daemon/
  - forwarding/
  - licensing/
  - sessions/
  - staging/
  - agents/$VERSION/mutagen-agent

## unable to locate agent bundle

- mutagen-agents.tar.gz
