---
title: sdkman
---

# sdkman

```bash
curl -s "https://get.sdkman.io?rcupdate=false" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk list java
sdk install java 8.0.312-tem
cat ~/.sdkman/candidates/java/current/release
java --version


sdk update     # update index cache
sdk selfupdate # update sdkman

# 自定义
export SDKMAN_DIR="/usr/local/sdkman" && curl -s "https://get.sdkman.io?rcupdate=false" | bash
source $SDKMAN_DIR/bin/sdkman-init.sh
```

- SDKMAN_DIR=~/.sdkman
  - /candidates/java/17.0.6-tem
  - /tmp
    - java-17.0.6-tem.bin - 可手动下载
    - visualvm-2.0.2.bin
    - `sdk visualvm 2.0.2`
- 无 musl https://github.com/sdkman/sdkman-cli/issues/1133
