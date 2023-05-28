---
title: QoDana
---

# QoDana

- docker jetbrains/qodana-{jvm,js,php,python,go,dotnet}

```bash
brew install jetbrains/utils/qodana

# qodana.yaml
# https://www.jetbrains.com/help/qodana/configure-qodana.html
qodana init
qodana scan --show-report


# /data/profile.xml
# --profile-name custom-profile
# .idea/inspectionProfiles
# --show-report 开启 8080 端口
docker run --rm -it -p 8080:8080 \
-v $PWD/:/data/project/ \
-v /tmp/qodana/results:/data/results/ \
jetbrains/qodana-js --show-report
```

- https://www.jetbrains.com/help/qodana
