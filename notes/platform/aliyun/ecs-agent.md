---
title: ECS Agent
---

# ECS Agent

```bash
mkdir -p /tmp/dl && cd $_

# 内网 "https://aliyun-client-assist-{regionId}.oss-{regionId}-internal.aliyuncs.com/linux/aliyun_assist_latest.rpm"
curl -LO "https://aliyun-client-assist.oss-accelerate.aliyuncs.com/linux/aliyun_assist_latest_update.zip"

sudo unzip aliyun_assist_latest_update.zip -d /usr/local/share/aliyun-assist/
VERSION=$(cat /usr/local/share/aliyun-assist/version)

sudo apk add psutils procps-ng

sudo chmod a+x /usr/local/share/aliyun-assist/$VERSION/update_install
sudo bash /usr/local/share/aliyun-assist/$VERSION/update_install

service aliyun-service status
```

- /opt/local/share/assist-daemon
- /usr/local/share/assist-daemon
  - assist_daemon
- /usr/local/share/aliyun-assist
- /usr/local/share/aliyun-assist/version
- /usr/local/share/aliyun-assist/$VERSION/

```bash
# by RPM
curl -LO "https://aliyun-client-assist.oss-accelerate.aliyuncs.com/linux/aliyun_assist_latest.rpm"
apk add rpm2cpio
rpm2cpio aliyun_assist_latest.rpm | cpio -idmv
sudo rsync -av ./usr/local/share/aliyun-assist/ /usr/local/share/aliyun-assist/
```

```
bash: line 1: chkconfig: command not found

 * service: Exec format error
```
