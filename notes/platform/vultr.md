---
title: vultr
---

# vultr

- https://www.vultr.com/vultr-vs-linode/

## Regions

```bash
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

# -r -10000000
curl -o /dev/null -w "@curl-format.txt" https://sgp-ping.vultr.com/vultr.com.100MB.bin > sgp.txt
curl -o /dev/null -w "@curl-format.txt" https://sel-kor-ping.vultr.com/vultr.com.100MB.bin > sel-kor.txt
curl -o /dev/null -w "@curl-format.txt" https://bom-in-ping.vultr.com/vultr.com.100MB.bin > bom-in.txt
time curl -o /dev/null -w "@curl-format.txt" https://hnd-jp-ping.vultr.com/vultr.com.100MB.bin > hnd-jp.txt
time curl -o /dev/null -w "@curl-format.txt" https://osk-jp-ping.vultr.com/vultr.com.100MB.bin > osk-jp.txt
time curl -o /dev/null -w "@curl-format.txt" https://lax-ca-us-ping.vultr.com/vultr.com.100MB.bin > lax-ca-us.txt
time curl -o /dev/null -w "@curl-format.txt" https://sjo-ca-us-ping.vultr.com/vultr.com.100MB.bin > lax-ca-us.txt
```

- https://www.vultr.com/features/datacenter-locations/
  - `Array.from(new Set($$('[data-category]').map(v=>v.href))).sort()`
  - `Array.from(new Set($$('[data-category]').map(v=>v.href))).sort().map(v=>new URL(v).hostname).join(' ')`
- https://www.cloudping.cloud/vultr
- https://cloudpingtest.com/vultr

```bash
fping -ac 60 ams-nl-ping.vultr.com blr-in-ping.vultr.com bom-in-ping.vultr.com del-in-ping.vultr.com fl-us-ping.vultr.com fra-de-ping.vultr.com ga-us-ping.vultr.com hnd-jp-ping.vultr.com hon-hi-us-ping.vultr.com il-us-ping.vultr.com jnb-za-ping.vultr.com lax-ca-us-ping.vultr.com lon-gb-ping.vultr.com mad-es-ping.vultr.com mel-au-ping.vultr.com mex-mx-ping.vultr.com nj-us-ping.vultr.com osk-jp-ping.vultr.com par-fr-ping.vultr.com sao-br-ping.vultr.com scl-cl-ping.vultr.com sel-kor-ping.vultr.com sgp-ping.vultr.com sjo-ca-us-ping.vultr.com sto-se-ping.vultr.com syd-au-ping.vultr.com tor-ca-ping.vultr.com tx-us-ping.vultr.com wa-us-ping.vultr.com waw-pl-ping.vultr.com
```
