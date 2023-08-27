---
title: isolate
tags:
  - Security
---

# isolate

- [ioi/isolate](https://github.com/ioi/isolate)
  - GPLv2, C
  - 执行不安全程序
- adopted by
  - [cms-dev/cms](https://github.com/cms-dev/cms)
    - OnlineJudge
  - activepieces
- 参考
  - A New Contest Sandbox http://mj.ucw.cz/papers/isolate.pdf
  - http://www.ucw.cz/moe/isolate.1.html
  - https://juejin.cn/post/6927151461625233416

```bash
isolate --init
isolate --run -- ls .
isolate --cleanup
```

```bash
cd /var/local/lib/isolate/1/box/ && timeout -s 15 -k 5s 10s /usr/local/gcc-7.2.0/bin/g++ -Wl,-rpath,/usr/local/gcc-7.2.0/lib64 main.cpp 2>&1
isolate --cg -s -b 3 -M /var/local/lib/isolate/3/meta.txt -t 2.0 -x 0.5 -w 5.0 -k 64000 -p30 --cg-mem=128000 --no-cg-timing -f 1024 -E HOME=/var/local/lib/isolate/3 -E LANG -E LANGUAGE -E LC_ALL -d '/etc':'noexec' --run -- ./a.out < /var/local/lib/isolate/3/stdin.txt > /var/local/lib/isolate/3/stdout.txt 2> /var/local/lib/isolate/3/stderr.txt
```
