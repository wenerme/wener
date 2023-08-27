---
title: ECS
---

# ECS

```bash
curl http://100.100.100.200/latest/meta-data/region-id
```

## Agent

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

## Logtail

- /usr/local/ilogtail
- ca-bundle.crt
- ilogtail_config.json

```bash
apk add libuuid

wget http://logtail-release-cn-hangzhou.oss-cn-hangzhou.aliyuncs.com/linux64/logtail.sh -O logtail.sh
chmod 755 logtail.sh
./logtail.sh install auto
```

```json
{
  "UUID": "",
  "hostname": "test-debian",
  "instance_id": "XXX",
  "ip": "1.1.1.1",
  "logtail_version": "1.6.0",
  "os": "Linux; 6.1.44-0-virt; #1-Alpine SMP PREEMPT_DYNAMIC Wed, 09 Aug 2023 09:39:37 +0000; x86_64",
  "update_time": "2023-08-18 17:30:07"
}
```

```bash
cat /usr/local/ilogtail/ilogtail_config.json
```

```json
{
  "config_server_address": "http://logtail.cn-chengdu-intranet.log.aliyuncs.com",
  "data_server_list": [
    {
      "cluster": "cn-chengdu",
      "endpoint": "cn-chengdu-intranet.log.aliyuncs.com"
    }
  ],
  "cpu_usage_limit": 0.4,
  "mem_usage_limit": 384,
  "max_bytes_per_sec": 20971520,
  "bytes_per_sec": 1048576,
  "buffer_file_num": 25,
  "buffer_file_size": 20971520,
  "buffer_map_num": 5,
  "streamlog_open": false,
  "streamlog_pool_size_in_mb": 50,
  "streamlog_rcv_size_each_call": 1024,
  "streamlog_formats": [],
  "streamlog_tcp_port": 11111
}
```

```bash
tail -f /usr/local/ilogtail/ilogtail.LOG
```
