---
title: act
---

# act

- [nektos/act](https://github.com/nektos/act)
  - MIT, Golang
  - 本地运行 Github Action

```bash
brew install act

act -l                   # list jobs & events
act workflow_dispatch -l # list jobs for event
act -j test -l           # list events for job

act                                         # 运行 push 事件关联 job
act pull_request                            # 运行 pull_request 事件关联 job
act -j lint -W .github/workflows/checks.yml # 限定运行的 job
act -n                                      # dry run
```

- `$PWD/.actrc`, `~/.actrc`
  - 每行一个 flag
- --artifact-server-path /tmp/artifacts
- -s GITHUB_TOKEN=
- ~/.cache/actcache
- `-P ubuntu-latest=-self-hosted` - 本地运行
  - windows-latest
  - macos-latest=-self-hosted
- GITHUB_WORKSPACE=`$HOME/.cache/act/$ID/hostexecutor`

| flag                                                  | for      |
| ----------------------------------------------------- | -------- |
| --env-file ENVFILE                                    |
| -s KEY=VALUE                                          | secret   |
| --secret-file ENVFILE                                 |
| --input KEY=VALUE                                     |
| --input-file ENVFILE                                  |
| -C,--directory .                                      | 工作目录 |
| -P,--platform IMAGE                                   |
| -a,--actor nektos/act                                 |
| --container-daemon-socket unix:///var/run/docker.sock |

```yaml
# act 忽略某个 step
- name: Some step
  if: ${{ !env.ACT }}
```

```
# 映射 image
-P ubuntu-18.04=nektos/act-environments-ubuntu:18.04 -P ubuntu-latest=ubuntu:latest -P ubuntu-16.04=node:16-buster-slim
```

- macOS orbstack `unix:///Users/$USER/.orbstack/run/docker.sock`
- 会 mount 的内容
- `$DOCKER_SOCK:/var/run/docker.sock`

**Gitea**

```txt title=".actrc"
-W .gitea/workflows/
-P host=-self-hosted
-P alpine=quay.io/wener/base:latest
```
