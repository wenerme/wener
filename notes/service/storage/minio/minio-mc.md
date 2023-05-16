---
title: mc
---

# mc

```bash
# https://dl.min.io/client/mc/release/
curl -LO https://dl.min.io/client/mc/release/linux-amd64/mc
chmod +x ./mc
sudo mv mc /usr/local/bin/

mc alias set svr https://s3.example.com $KEY $SECRET
cat ~/.mc/config.json

# https://min.io/docs/minio/linux/reference/minio-mc/mc-mirror.html
mc mirror --watch --overwrite --remove
```
