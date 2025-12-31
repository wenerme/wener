---
title: Alpine Server
tags:
  - OS
  - Alpine
  - Server
---

# Alpine Server

```bash
setup-keymap us us
setup-timezone -z Asia/Shanghai
apk add bash
apk add shadow
setup-sshd -c openssh
chsh root -s /bin/bash

apk add nano file grep htop rsync curl openssl util-linux iproute2 busybox-extras docker neofetch pciutils
```

```bash
display curses

PermitEmptyPasswords
PasswordAuthentication no

passwd -l root

sudo usermod -aG docker $USER
sudo groupadd docker

$ sudo chown "$USER":"$USER" /home/"$USER"/.docker -R
$ sudo chmod g+rwx "$HOME/.docker" -R

iftop

setup-ntp -c chrony
rc-update add networking
rc-update add docker
rc-update add crond

tinc -n incnet join 2

echo NETWORK: incnet >> /etc/conf.d/tinc.networks

qemu-system-x86_64 -m 4g -net nic -net user,hostfwd=tcp::2225-:22 -accel hax -hda base-3.10.raw
qemu-system-x86_64 -m 4g -net nic -net user,hostfwd=tcp::2225-:22 -accel hax -hda base-3.10.raw
```

## Stress Test

```bash
stress-ng --metrics-brief --cpu $(nproc) -t 1m

# https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1875941
# using perf can crash kernel with a stack overflow

stress-ng --cpu 4 --cpu-method matrixprod --metrics-brief --perf -t 60

# Cannot read perf counters, do not have CAP_SYS_ADMIN capability or /proc/sys/kernel/perf_event_paranoid is set too high (2)

stress-ng --cpu-method which
```

```bash
app1:~$ stress-ng --metrics-brief --cpu 48 -t 1m
stress-ng: info:  [6052] dispatching hogs: 48 cpu
stress-ng: info:  [6052] successful run completed in 60.17s (1 min, 0.17 secs)
stress-ng: info:  [6052] stressor       bogo ops real time  usr time  sys time   bogo ops/s   bogo ops/s
stress-ng: info:  [6052]                           (secs)    (secs)    (secs)   (real time) (usr+sys time)
stress-ng: info:  [6052] cpu              309973     60.06   2878.26      0.00      5161.21       107.69

app2:~$ stress-ng --metrics-brief --cpu 24 -t 1m
stress-ng: info:  [4372] dispatching hogs: 24 cpu
stress-ng: info:  [4372] successful run completed in 60.08s (1 min, 0.08 secs)
stress-ng: info:  [4372] stressor       bogo ops real time  usr time  sys time   bogo ops/s   bogo ops/s
stress-ng: info:  [4372]                           (secs)    (secs)    (secs)   (real time) (usr+sys time)
stress-ng: info:  [4372] cpu              188500     60.03   1438.82      0.00      3140.24       131.01
```

```bash
while true; do
  vcgencmd measure_clock arm
  vcgencmd measure_temp
  sleep 10
done

while true; do
  for v in "measure_clock arm" "measure_clock gpu" "measure_volts core" "measure_volts sdram_c" "measure_volts sdram_i" "measure_volts sdram_p" measure_temp get_throttled; do vcgencmd $v; done
  sleep 2
done

app2
stress-ng --metrics-brief --cpu-method all --cpu $(nproc) -t 5m
```

```
stress-ng: info:  [6291] dispatching hogs: 48 cpu
stress-ng: info:  [6291] successful run completed in 300.18s (5 mins, 0.18 secs)
stress-ng: info:  [6291] stressor       bogo ops real time  usr time  sys time   bogo ops/s   bogo ops/s
stress-ng: info:  [6291]                           (secs)    (secs)    (secs)   (real time) (usr+sys time)
stress-ng: info:  [6291] cpu             1596812    300.07  14376.68      0.06      5321.49       111.07
```

```bash
stress-ng --vm $(nproc) --vm-bytes 3G --timeout 5m
```

```
stress-ng --vm $(nproc) --vm-bytes 180G --timeout 5m

stress-ng: info:  [6707] dispatching hogs: 48 vm
stress-ng: info:  [6707] successful run completed in 300.54s (5 mins, 0.54 secs)
```

```bash
stress-ng --metrics-brief --cpu-method all --cpu 20 --vm 20 --vm-bytes 180G --timeout 5m
```

```
stress-ng: info:  [11566] dispatching hogs: 20 cpu, 20 vm
stress-ng: info:  [11566] successful run completed in 360.95s (6 mins, 0.95 secs)
stress-ng: info:  [11566] stressor       bogo ops real time  usr time  sys time   bogo ops/s   bogo ops/s
stress-ng: info:  [11566]                           (secs)    (secs)    (secs)   (real time) (usr+sys time)
stress-ng: info:  [11566] cpu              810817    360.04   7044.88     90.19      2252.03       113.64
stress-ng: info:  [11566] vm            121530932    360.45   6453.15    694.71    337163.85     17002.42
```

## fio

```bash
# Random Read/Writes – Async mode – 16K block size – Direct IO – 90% Reads/10% Writes
fio --name=randrw --rw=randrw --direct=1 --ioengine=libaio --bs=16k --numjobs=8 --rwmixread=90 --size=10G --runtime=300 --group_reporting
```

```
Jobs: 8 (f=8): [m(8)][100.0%][r=7128KiB/s,w=879KiB/s][r=445,w=54 IOPS][eta 00m:00s]
randrw: (groupid=0, jobs=8): err= 0: pid=21650: Mon Jul 27 22:13:14 2020
  read: IOPS=462, BW=7407KiB/s (7585kB/s)(2170MiB/300022msec)
    slat (usec): min=11, max=261305, avg=15531.17, stdev=12296.43
    clat (nsec): min=1237, max=1722.2k, avg=5495.62, stdev=6680.71
     lat (usec): min=13, max=261313, avg=15538.65, stdev=12297.52
    clat percentiles (nsec):
     |  1.00th=[ 2128],  5.00th=[ 2320], 10.00th=[ 2480], 20.00th=[ 3536],
     | 30.00th=[ 4256], 40.00th=[ 4768], 50.00th=[ 5280], 60.00th=[ 5728],
     | 70.00th=[ 5856], 80.00th=[ 5984], 90.00th=[ 7008], 95.00th=[ 8512],
     | 99.00th=[32384], 99.50th=[34048], 99.90th=[37632], 99.95th=[39168],
     | 99.99th=[67072]
   bw (  KiB/s): min= 2432, max=18784, per=100.00%, avg=7415.71, stdev=681.97, samples=4792
   iops        : min=  152, max= 1174, avg=463.43, stdev=42.62, samples=4792
  write: IOPS=51, BW=823KiB/s (843kB/s)(241MiB/300022msec); 0 zone resets
    slat (usec): min=29, max=142617, avg=15597.42, stdev=12189.95
    clat (nsec): min=1640, max=60142, avg=5569.08, stdev=3828.51
     lat (usec): min=31, max=142625, avg=15605.01, stdev=12190.94
    clat percentiles (nsec):
     |  1.00th=[ 2384],  5.00th=[ 2544], 10.00th=[ 2704], 20.00th=[ 3824],
     | 30.00th=[ 4320], 40.00th=[ 4832], 50.00th=[ 5344], 60.00th=[ 5792],
     | 70.00th=[ 5920], 80.00th=[ 6048], 90.00th=[ 7072], 95.00th=[ 8640],
     | 99.00th=[32384], 99.50th=[34048], 99.90th=[36608], 99.95th=[38656],
     | 99.99th=[57088]
   bw (  KiB/s): min=  251, max= 3200, per=100.00%, avg=874.29, stdev=88.51, samples=4507
   iops        : min=   11, max=  200, avg=54.56, stdev= 5.53, samples=4507
  lat (usec)   : 2=0.40%, 4=24.69%, 10=72.22%, 20=1.11%, 50=1.56%
  lat (usec)   : 100=0.01%, 500=0.01%, 750=0.01%
  lat (msec)   : 2=0.01%
  cpu          : usr=0.11%, sys=1.35%, ctx=126145, majf=0, minf=141
  IO depths    : 1=100.0%, 2=0.0%, 4=0.0%, 8=0.0%, 16=0.0%, 32=0.0%, >=64=0.0%
     submit    : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     complete  : 0=0.0%, 4=100.0%, 8=0.0%, 16=0.0%, 32=0.0%, 64=0.0%, >=64=0.0%
     issued rwts: total=138888,15440,0,0 short=0,0,0,0 dropped=0,0,0,0
     latency   : target=0, window=0, percentile=100.00%, depth=1

Run status group 0 (all jobs):
   READ: bw=7407KiB/s (7585kB/s), 7407KiB/s-7407KiB/s (7585kB/s-7585kB/s), io=2170MiB (2276MB), run=300022-300022msec
  WRITE: bw=823KiB/s (843kB/s), 823KiB/s-823KiB/s (843kB/s-843kB/s), io=241MiB (253MB), run=300022-300022msec
```

```bash
fio --rw=randrw --refill_buffers --norandommap --randrepeat=0 --bs=8k --rwmixread=70 --size=2g --iodepth=16 --numjobs=16 --runtime=60 --group_reporting

fio -direct=1 -iodepth=64 -rw=randread -ioengine=libaio -bs=64k -size=1G -numjobs=8 -runtime=60 -group_reporting

fio --name=randread -direct=1 -iodepth=64 -rw=randread -ioengine=libaio -bs=64k -size=1G -numjobs=8 -runtime=60 -group_reporting
```
