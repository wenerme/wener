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

# start stop
mutagen daemon run

mutagen sync create --name=dev $PWD/dev svr-1:/data/dev
# localhost:8080 -> :1313
# mutagen forward create --name=web-app tcp:localhost:8080 docker://devcontainer:tcp:localhost:1313

mutagen sync list
mutagen forward list
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
    - 临时存储
  - agents/$VERSION/mutagen-agent
- `--stage-mode=neighboring`
  - .mutagen 存储在相邻目录
  - `.mutagen-temporary-staging-$ID-beta/`

**~/.mutagen.yml**

```yaml
sync:
  defaults:
    ignore:
      vcs: true
      paths:
        - '<ignore1>'
        - '<ignore2>'
```

**project**

```yaml
sync:
  code:
    alpha: '.'
    beta: '<remote>/path/to/remote/code'
    ignore:
      vcs: true
  vcs:
    alpha: '.git'
    beta: '<remote>/path/to/remote/code/.git'
    mode: 'one-way-replica'
    ignore:
      paths:
        - 'index'
        # or just config
        - '*'
        - '!config'
```

## unable to locate agent bundle

- mutagen-agents.tar.gz
