---
title: JDWP
---

# JDWP

Java 8,9+

```
-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=0.0.0.0:5005
```

- `address=5005`
  - 只能 localhost
- `address=*:5005`
  - Java9+

```
Listening for transport dt_socket at address: 5005
```

```bash
jdb -attach 127.0.0.1:8000
```

```
stop in Application.<init>
stop in Application.main(java.lang.String[])

eval app.toString()

clear
```
