---
title: Linode
---

# Linode

:::tip

- 所有实例共享总流量
- 超出网络流量后 $0.01/GB - 1TB $10
- Linode Image $0.10/mo, 可以做小一点的系统镜像, 不用了保存为 Image 再用恢复即可
- 目前被 akamai 收购

:::

- 中国大陆区域速度
  - 最快 东京、新加坡、佛利蒙/Fremont
- Nano - 1C1G, 25G, 1T $5/mo $0.0075/hr
- Linode 2 GB - 1C2G, 50GB, 2T $10/mo $0.015
- GPU
  - $1,000/mo ($1.50/hr) 1 GPU 8 vCPU 32 GB, 640GB SSD
  - RTX 6000
  - https://www.linode.com/pricing/#compute-gpu
  - https://www.linode.com/docs/products/compute/compute-instances/plans/gpu/
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
- https://www.linode.com/global-infrastructure/availability/
  - 区域

## Service

## Regions

```bash
curl https://api.linode.com/v4/regions | jq '.data[].id' -r
```

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

# 测试所有区域 - 测试 10MB
for i in newark singapore london frankfurt dallas toronto1 syd1 atlanta tokyo2 mumbai1 fremont; do
  echo "Testing $i"
  curl -o /dev/null -r -10000000 -w "@curl-format.txt" https://speedtest.$i.linode.com/100MB-$i.bin > $i.txt
done

# 最快的 - 测试 50MB
for i in atlanta dallas syd1 toronto1 fremont; do
  echo "Testing $i"
  curl -o /dev/null -r -50000000 -w "@curl-format.txt" https://speedtest.$i.linode.com/100MB-$i.bin > $i.txt
done

# 最快的两个
for i in dallas fremont; do
  echo "Testing $i"
  curl -o /dev/null -r -100000000 -w "@curl-format.txt" https://speedtest.$i.linode.com/100MB-$i.bin > $i.txt
done

curl -o /dev/null -w "@curl-format.txt" https://speedtest.dallas.linode.com/100MB-dallas.bin > dallas.txt
curl -o /dev/null -w "@curl-format.txt" https://speedtest.singapore.linode.com/100MB-singapore.bin > singapore.txt

fping -ac 60 speedtest.{newark,singapore,london,frankfurt,dallas,toronto1,syd1,atlanta,tokyo2,mumbai1,fremont}.linode.com
```
