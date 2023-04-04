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
fping -ac 60 {ams-nl,blr-in,bom-in,del-in,fl-us,fra-de,ga-us,hnd-jp,hon-hi-us,il-us,jnb-za,lax-ca-us,lon-gb,mad-es,mel-au,mex-mx,nj-us,osk-jp,par-fr,sao-br,scl-cl,sel-kor,sgp,sjo-ca-us,sto-se,syd-au,tor-ca,tx-us,wa-us,waw-pl}-ping.vultr.com
```
