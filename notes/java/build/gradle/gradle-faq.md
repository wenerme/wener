---
tags:
  - FAQ
---

# Gradle FAQ

## killall

```bash
pkill -9 -f GradleDaemon
kill -9 $(pgrep -f GradleDaemon)
```

## Waiting to acquire shared lock on daemon addresses registry

- ~/.gradle/daemon/6.8/registry.bin.lock

```
[org.gradle.execution.plan.DefaultExecutionPlan] No node could be selected, nodes ready: false
[org.gradle.cache.internal.DefaultFileLockManager] Waiting to acquire shared lock on daemon addresses registry.
[org.gradle.cache.internal.DefaultFileLockManager] Lock acquired on daemon addresses registry.
[org.gradle.cache.internal.DefaultFileLockManager] Releasing lock on daemon addresses registry.
```

```bash
find .gradle/ -name '*.lock'

rm -rf .gradle
rm -rf ~/.gradle/caches
rm -rf ~/.gradle/daemon
```

- lombok val
- https://github.com/gradle/gradle/issues/14531
