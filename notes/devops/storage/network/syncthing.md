---
title: Syncthing
---
# Syncthing

- [syncthing/syncthing](https://github.com/syncthing/syncthing)
- https://docs.syncthing.net/users/syncthing.html
- 参考
  - [MobiusSync/syncthing](https://github.com/MobiusSync/syncthing)
    - iOS
    - free 20MB - 意义不大
    - https://apps.apple.com/us/app/m%C3%B6bius-sync/id1539203216
    - https://www.mobiussync.com/faq/

```bash
ST_HOME=$PWD/syncthing
syncthing -generate=$ST_HOME
syncthing -home=$ST_HOME -paths
syncthing -home=$ST_HOME -logfile=$ST_HOME/syncthing.log
```
