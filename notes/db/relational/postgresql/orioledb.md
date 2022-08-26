---
title: OrioleDB
---

# OrioleDB

- [orioledb/orioledb](https://github.com/orioledb/orioledb)
  - storage engine
  - [slide](https://www.slideshare.net/AlexanderKorotkov/solving-postgresql-wicked-problems)
  - [HN](https://news.ycombinator.com/item?id=30462695)
    author [akorotkov](https://news.ycombinator.com/threads?id=akorotkov)

| pg                          | oriole                                              |
| --------------------------- | --------------------------------------------------- |
| Block-level WAL             | Row-level WAL                                       |
| Buffer mapping              | Direct page links                                   |
| Buffer locking              | Lock-less access                                    |
| Bloat-prone MVCC            | Undo log                                            |
| Block-level WAL replication | Raft-based multimaster replication of row-level WAL |
