---
title: Tuning
tags:
  - Tuning
---

# Java Tuning

| -X   | for               | default     |
| ---- | ----------------- | ----------- |
| -Xms | initial heap size |             |
| -Xmx | max heap size     | 25%,最大25G |

| -XX:flag             | for                  |
| -------------------- | -------------------- |
| InitialRAMPercentage | 初始 **堆内存** 比例 |
| MaxRAMPercentage     | 最大 **堆内存** 比例 |
| MinRAMPercentage     | 最小 **堆内存** 比例 |

```
-Xmx12g -Xms12g -Xmn8g -XX:MaxMetaspaceSize=512m -XX:MaxDirectMemorySize=256M  -XX:+UseContainerSupport -XX:+UseG1GC -XX:MaxGCPauseMillis=200
```

```
-XX:+UseContainerSupport -XX:InitialRAMPercentage=70.0 -XX:MaxRAMPercentage=70.0 -XX:+PrintGCDetails -XX:+PrintGCDateStamps -Xloggc:/home/admin/nas/gc-${POD_IP}-$(date '+%s').log -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/home/admin/nas/dump-${POD_IP}-$(date '+%s').hprof
```

- JAVA_TOOL_OPTIONS
- JDK_JAVA_OPTIONS
  - Java 9+
- https://chriswhocodes.com/
- https://eclipse.dev/openj9/docs/xx_jvm_commands/
- https://www.alibabacloud.com/help/en/sae/latest/best-practices-for-jvm-heap-size-configuration
- https://cloud.tencent.com/developer/article/1198524

## 内存限制 {#memort-limit}

```bash
java -XshowSettings:vm -version
java -XX:+PrintFlagsFinal -version

java -XX:+PrintFlagsFinal -version | grep -E 'Container|RAM|HeapSize'
java -XX:+PrintFlagsFinal -XX:MaxRAMPercentage=100.0 -version | grep -E 'Container|RAM'

# limits
cat /sys/fs/cgroup/memory/memory.limit_in_bytes

# 新版本 JAVA
java -Xlog:os+container=trace -version
```

- UseContainerSupport
  - 默认开启
  - `MaxRAMPercentage=25%`

| limit     | MaxRAM |
| --------- | ------ |
| < 1GB     | 50%    |
| 1GB < 2GB | 512MB  |
| > 2GB     | 75%    |

- `-Xcompressedrefs`

  - 3-bit shift
  - heap size 25GB 上限
  - 可通过 `-XX:MaxRAMPercentage` 或者 `-Xmx` 覆盖

- -verbose:sizes

---

- -Xmx
- -XX:MaxRAMPercentage, -XX:MinRAMPercentage, -XX:InitialRAMPercentage
  - Java 8 update 191+
- -XX:MaxRAMFraction, -XX:MinRAMFraction
  - Java 8 update 131 -> Java 8 update 190

```bash
java -XX:MaxRAMPercentage=50 -XshowSettings:vm -version

java -XshowSettings:vm -version
java -Xmx512m -XshowSettings:vm -version
java -XX:+UseContainerSupport -XshowSettings:vm -version
```

```bash
# 需要/1024
cat /sys/fs/cgroup/cpu/cpu.shares
```

## GC

- https://docs.oracle.com/en/java/javase/17/gctuning/ergonomics.html
