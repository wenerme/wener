---
title: temporalite
---

# temporalite

- ~~[temporalio/temporalite](https://github.com/temporalio/temporalite)~~
  - 废弃： 使用 Temporal CLI dev server
  - [Temporal](./temporal.md) runs as a single process
  - 支持 SQLite

```bash
# macOS
curl -LO https://github.com/temporalio/temporalite/releases/download/v0.2.0/temporalite_0.2.0_darwin_amd64.tar.gz
tar zxvf temporalite_0.2.0_darwin_amd64.tar.gz

# http://127.0.0.1:8233/namespaces/default/workflows
./temporalite start -f temporalite.db --metrics-port 9090 --ip 0.0.0.0 --port 7233 --ui-port 8233 --sqlite-pragma journal_mode=WAL,synchronous=NORMAL

curl -LO https://github.com/temporalio/tctl/releases/download/v1.17.1/tctl_1.17.1_darwin_amd64.tar.gz
tar zxvf tctl_1.17.1_darwin_amd64.tar.gz

tctl namespace register default
tctl --ns default namespace describe
```
