---
title: Observe
---

# Observe

```bash
java -XX:+PrintFlagsFinal -version | grep HeapSize

jcmd 1 VM.flags
```

## jps

- `[protocol:][[//]hostname][:port][/servername]`

```bash
jps -lvm
```

| flag         | for              |
| ------------ | ---------------- |
| -q           | 不输出 ClassName |
| -m           | 显示参数         |
| -l           | 完整包名         |
| -v           | 虚拟机参数       |
| `-J<option>` |

## jstat

```bash
# Garbage-collected heap statistics.
jstat -gc 1
# Summary of garbage collection statistics.
jstat -gcutil 1
```

```bash
# Memory pool generation and space capacities.
jstat -gccapacity 1
```

| NGCMN   | NGCMX     | NGC     | S0C    | S1C    | EC      | OGCMN    | OGCMX     | OGC      | OC       | MCMN | MCMX      | MC      | CCSMN | CCSMX     | CCSC    | YGC | FGC |
| ------- | --------- | ------- | ------ | ------ | ------- | -------- | --------- | -------- | -------- | ---- | --------- | ------- | ----- | --------- | ------- | --- | --- |
| 81920.0 | 1302528.0 | 50176.0 | 3072.0 | 2560.0 | 44032.0 | 163840.0 | 2605056.0 | 220672.0 | 220672.0 | 0.0  | 1130496.0 | 92888.0 | 0.0   | 1048576.0 | 11776.0 | 751 | 3   |

| col   | for                                          | mean                            |
| ----- | -------------------------------------------- | ------------------------------- |
| NGCMN | Minimum new generation capacity (kB)         | 新生代最小容量 (kB)             |
| NGCMX | Maximum new generation capacity (kB)         | 新生代最大容量 (kB)             |
| NGC   | Current new generation capacity (kB)         | 当前新生代容量 (kB)             |
| S0C   | Current survivor space 0 capacity (kB)       | 当前 survivor space 0 容量 (kB) |
| S1C   | Current survivor space 1 capacity (kB)       | 当前 survivor space 1 容量 (kB) |
| EC    | Current eden space capacity (kB)             | 当前 eden 空间容量 (kB)         |
| OGCMN | Minimum old generation capacity (kB)         | 老年代最小容量 (kB)             |
| OGCMX | Maximum old generation capacity (kB)         | 老年代最大容量 (kB)             |
| OGC   | Current old generation capacity (kB)         | 当前老年代容量 (kB)             |
| OC    | Current old space capacity (kB)              | 当前老年代空间容量 (kB)         |
| MCMN  | Minimum metaspace capacity (kB)              | 元数据空间最小容量 (kB)         |
| MCMX  | Maximum metaspace capacity (kB)              | 元数据空间最大容量 (kB)         |
| MC    | Metaspace capacity (kB)                      | 元数据空间容量 (kB)             |
| CCSMN | Compressed class space minimum capacity (kB) | 压缩 class 空间最小容量 (kB)    |
| CCSMX | Compressed class space maximum capacity (kB) | 压缩 class 空间最大容量 (kB)    |
| CCSC  | Compressed class space capacity (kB)         | 压缩 class 空间容量 (kB)        |
| YGC   | Number of young generation GC events         | 年轻代 GC 次数                  |
| FGC   | Number of full GC events                     | 完全 GC 次数                    |

- https://docs.oracle.com/javase/8/docs/technotes/tools/unix/jstat.html
