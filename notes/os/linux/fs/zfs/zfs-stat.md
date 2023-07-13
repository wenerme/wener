---
title: Stat
---

# Stat

## iostat

```bash
zpool iostat -r
```

- `-r` - request size
  - individual I/O (ind)
  - aggregate I/O (agg)

```
data          sync_read    sync_write    async_read    async_write      scrub         trim
req_size      ind    agg    ind    agg    ind    agg    ind    agg    ind    agg    ind    agg
----------  -----  -----  -----  -----  -----  -----  -----  -----  -----  -----  -----  -----
512             0      0      0      0      0      0      0      0      0      0      0      0
1K              0      0      0      0      0      0      0      0      0      0      0      0
2K              0      0      0      0      0      0      0      0      0      0      0      0
4K           108K      0   355K      0  2.98K      0  1.98M      0    116      0      0      0
8K          2.56K  1.34K  94.6K      0    330    120   127K   583K     14     19      0      0
16K           453  2.47K   443K    831     79    427  13.0K   317K      0      9      0      0
32K             0    222      0  10.2K      0    271      0   123K      0      0      0      0
64K            32     11    128  48.4K      0    281      0   492K      0      0      0      0
128K            0      0      0      0      0     54      0  94.7K      0      0      0      0
256K            0      0      0      0      0      0      0      0      0      0      0      0
512K            0      0      0      0      0      0      0      0      0      0      0      0
1M              0      0      0      0      0      0      0      0      0      0      0      0
2M              0      0      0      0      0      0      0      0      0      0      0      0
4M              0      0      0      0      0      0      0      0      0      0      0      0
8M              0      0      0      0      0      0      0      0      0      0      0      0
16M             0      0      0      0      0      0      0      0      0      0      0      0
----------------------------------------------------------------------------------------------
```

- `-l`  average latency

**SSD**

```
              capacity     operations     bandwidth    total_wait     disk_wait    syncq_wait    asyncq_wait  scrub   trim
pool        alloc   free   read  write   read  write   read  write   read  write   read  write   read  write   wait   wait
----------  -----  -----  -----  -----  -----  -----  -----  -----  -----  -----  -----  -----  -----  -----  -----  -----
data        69.9G  6.92T      2     89  11.4K  2.05M  585us    1ms  559us  358us   21us   14us  155us    1ms  194us      -
```

**HDD**

```
              capacity     operations     bandwidth    total_wait     disk_wait    syncq_wait    asyncq_wait  scrub   trim
pool        alloc   free   read  write   read  write   read  write   read  write   read  write   read  write   wait   wait
----------  -----  -----  -----  -----  -----  -----  -----  -----  -----  -----  -----  -----  -----  -----  -----  -----
data        1.31T  42.3T      9     49   214K  2.35M    4ms   24ms    2ms   10ms  874us    2us    1ms   20ms   36ms      -
```
