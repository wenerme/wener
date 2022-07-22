---
title: Provider
---

# Provider

| abbr. | full name           |
| ----- | ------------------- |
|       | Aliyun              |
|       | Kamatera            |
|       | Linode              |
|       | Vultr               |
| AWS   | Amazon Web Services |
| BWG   | [BandwagonHost]     |
| DO    | DigitalOcean        |
| GCP   | Google Cloud        |

[bandwagonhost]: https://bandwagonhost.com/

- Vultr
  - ~~1C0.5G 10GB 0.5TB $2.5/mo - IPv6~~
  - ~~1C0.5G 10GB 0.5TB $3.5/mo - IPv4~~
  - 1C1G 25GB 1TB $5/mo
  - 1C1G 25GB 2TB $6/mo
  - **注意** Alpine 需要通过挂载 ISO 安装，有点麻烦
- Kamatera - 1C1G 20GB 1T $4/mo
- BandwagonHost - 1C1G 20GB 1T $50/an ~ $4.2/mo - 联通专线
  - 速度测试 https://www.bandwagonhost.net/test-ip
  - https://1kb.day/deals.html
- [joedicastro/vps-comparison](https://github.com/joedicastro/vps-comparison)

## Linode

:::tip

- 所有实例共享总流量
- 超出网络流量后 $0.01/GB - 1TB $10
- Linode Image $0.10/mo, 可以做小一点的系统镜像, 不用了保存为 Image 再用恢复即可
- 目前被 akamai 收购

:::

- Nano - 1C1G, 25G, 1T $5/mo $0.0075/hr
- Linode 2 GB - 1C2G, 50GB, 2T $10/mo $0.015
- 如果月中开通，流量会按比例减少
- 流量超出后 $0.01/GB - $10/TB
  - 也可以选择更贵的实例，流量更多
- 速度测试 https://www.linode.com/speed-test/
  - Dallas, United States
  - Atlanta, United States
  - Newark, United States
  - Fremont, United States
  - Tokyo, Japan
  - Mumbai, India
- [价格计算器](https://www.linode.com/cloud-pricing-calculator/)
- https://www.linode.com/pricing/
- [Network Transfer Usage and Costs](https://www.linode.com/docs/guides/network-transfer/)
- [linode/manager](https://github.com/linode/manager)
  - Apache-2.0, TS
- [linode/linodego](https://github.com/linode/linodego)
  - Go client for Linode REST v4 API
- https://www.linode.com/global-infrastructure/
- https://status.linode.com/

<!-- $$('.c-speed-test__links a').map(v=>new URL(v.href).hostname).map(v=>v.match(/speedtest.(\w+).linode.com/)[1]).join(' ') -->
<!-- https://www.linode.com/community/questions/17075/how-do-i-use-your-speed-test -->

```bash
ip=$(curl -sf "https://speedtest.tokyo2.linode.com/getIP.php" | jq -r .processedString | egrep -o '^[0-9.]+')
ping $ip

cat << EOF > curl-format.txt
     time_namelookup:  %{time_namelookup}s\n
        time_connect:  %{time_connect}s\n
     time_appconnect:  %{time_appconnect}s\n
    time_pretransfer:  %{time_pretransfer}s\n
       time_redirect:  %{time_redirect}s\n
  time_starttransfer:  %{time_starttransfer}s\n
      speed_download:  %{speed_download}s\n
                      ----------\n
          time_total:  %{time_total}s\n
EOF

# 测试延迟
curl -w "@curl-format.txt" https://speedtest.tokyo2.linode.com/empty.php
# 测试上传
# curl -X POST -o /dev/null https://speedtest.tokyo2.linode.com/empty.php --data-binary @/dev/null
# 测试下载
# curl -o /dev/null "https://speedtest.tokyo2.linode.com/garbage.php?ckSize=100"
curl -o /dev/null -r -1024000 -w "@curl-format.txt" https://speedtest.tokyo2.linode.com/100MB-tokyo2.bin > tokyo2.txt

# 测试所有区域 - 测试 1MB
for i in newark singapore london frankfurt dallas toronto1 syd1 atlanta tokyo2 mumbai1 fremont; do
  echo "Testing $i"
  curl -o /dev/null -r -1024000 -w "@curl-format.txt" https://speedtest.$i.linode.com/100MB-$i.bin > $i.txt
done

# 最快的三个 - 测试 10MB
for i in dallas syd1 fremont; do
  echo "Testing $i"
  curl -o /dev/null -r -10240000 -w "@curl-format.txt" https://speedtest.$i.linode.com/100MB-$i.bin > $i.txt
done
```
