---
title: S.M.A.R.T.
---

# S.M.A.R.T.

- S.M.A.R.T. - Self-Monitoring, Analysis and Reporting Technology
- https://linux.die.net/man/8/smartctl
- https://www.smartmontools.org
- https://pkgs.alpinelinux.org/package/edge/main/x86_64/smartmontools

```bash
apk add smartmontools

# 检查是否有 SMART 支持
smartctl -i /dev/sda1

# 全部信息
smartctl -a /dev/sda
# 包含额外信息
smartctl -x /dev/sda
# 健康信息
smartctl  -H /dev/sdb

# 开启监控
smartctl --smart=on --offlineauto=on --saveauto=on /dev/sdb

# 检查
smartctl -t short /dev/sda
# 检查完成查看结果
smartctl -H /dev/sda
```

## 硬盘生命周期

- 硬性限制
  - cycle count over device lifetime - 10000
  - load-unload count over device lifetime - 300000
- 使用时长
  - Accumulated power on time

> 一年大约 8640 小时

```
Accumulated power on time, hours:minutes 11364:04
Manufactured in week 24 of year 2016
Specified cycle count over device lifetime:  10000
Accumulated start-stop cycles:  151
Specified load-unload count over device lifetime:  300000
Accumulated load-unload cycles:  239
Elements in grown defect list: 8
```

---

**检查错误情况**

```
Error counter log:
           Errors Corrected by           Total   Correction     Gigabytes    Total
               ECC          rereads/    errors   algorithm      processed    uncorrected
           fast | delayed   rewrites  corrected  invocations   [10^9 bytes]  errors
read:   232366863        0         0  232366863          0      44654.348           0
write:         0        0         0         0          0      21812.815           0
verify: 81711711        0         0  81711711          0      61007.393           0

Non-medium error count:        4
```

## SSD 生命周期和健康状况

- 查看属性表

```
ID# ATTRIBUTE_NAME          FLAG     VALUE WORST THRESH TYPE      UPDATED  WHEN_FAILED RAW_VALUE
  5 Reallocated_Sector_Ct   0x0033   100   100   010    Pre-fail  Always       -       0
  9 Power_On_Hours          0x0032   097   097   000    Old_age   Always       -       13543
 12 Power_Cycle_Count       0x0032   098   098   000    Old_age   Always       -       1293
177 Wear_Leveling_Count     0x0013   090   090   000    Pre-fail  Always       -       50
179 Used_Rsvd_Blk_Cnt_Tot   0x0013   100   100   010    Pre-fail  Always       -       0
181 Program_Fail_Cnt_Total  0x0032   100   100   010    Old_age   Always       -       0
182 Erase_Fail_Count_Total  0x0032   100   100   010    Old_age   Always       -       0
183 Runtime_Bad_Block       0x0013   100   099   010    Pre-fail  Always       -       0
187 Uncorrectable_Error_Cnt 0x0032   100   100   000    Old_age   Always       -       0
190 Airflow_Temperature_Cel 0x0032   053   047   000    Old_age   Always       -       47
195 ECC_Error_Rate          0x001a   200   200   000    Old_age   Always       -       0
199 CRC_Error_Count         0x003e   097   097   000    Old_age   Always       -       2988
235 POR_Recovery_Count      0x0012   099   099   000    Old_age   Always       -       147
241 Total_LBAs_Written      0x0032   099   099   000    Old_age   Always       -       10909128771
```

### SSD output

- Total_LBAs_Written
  - LBA = Logical block addressing
  - TBW = LBA/Sector
  - TBW = 21811089703/512 ~= 11TB - 实际
  - TBW = 120GB * 3000 ~= 300TB - 总计

```
=== START OF INFORMATION SECTION ===
Model Family:     Samsung based SSDs
Device Model:     Samsung SSD 750 EVO 120GB
Serial Number:    S2TTNDAH131915J
LU WWN Device Id: 5 000000 000000000
Firmware Version: MAT01B6Q
User Capacity:    120,034,123,776 bytes [120 GB]
Sector Size:      512 bytes logical/physical
Rotation Rate:    Solid State Device
TRIM Command:     Available
Device is:        In smartctl database [for details use: -P show]
ATA Version is:   ACS-2, ATA8-ACS T13/1699-D revision 4c
SATA Version is:  SATA 3.1, 6.0 Gb/s (current: 6.0 Gb/s)
Local Time is:    Fri Oct  8 00:56:37 2021 CST
SMART support is: Available - device has SMART capability.
SMART support is: Enabled
AAM feature is:   Unavailable
APM feature is:   Unavailable
Rd look-ahead is: Enabled
Write cache is:   Enabled
DSN feature is:   Unavailable
ATA Security is:  Disabled, frozen [SEC2]
Wt Cache Reorder: Enabled

=== START OF READ SMART DATA SECTION ===
SMART overall-health self-assessment test result: PASSED

General SMART Values:
Offline data collection status:  (0x00)	Offline data collection activity
					was never started.
					Auto Offline Data Collection: Disabled.
Self-test execution status:      (   0)	The previous self-test routine completed
					without error or no self-test has ever
					been run.
Total time to complete Offline
data collection: 		(    0) seconds.
Offline data collection
capabilities: 			 (0x53) SMART execute Offline immediate.
					Auto Offline data collection on/off support.
					Suspend Offline collection upon new
					command.
					No Offline surface scan supported.
					Self-test supported.
					No Conveyance Self-test supported.
					Selective Self-test supported.
SMART capabilities:            (0x0003)	Saves SMART data before entering
					power-saving mode.
					Supports SMART auto save timer.
Error logging capability:        (0x01)	Error logging supported.
					General Purpose Logging supported.
Short self-test routine
recommended polling time: 	 (   2) minutes.
Extended self-test routine
recommended polling time: 	 (  64) minutes.
SCT capabilities: 	       (0x003d)	SCT Status supported.
					SCT Error Recovery Control supported.
					SCT Feature Control supported.
					SCT Data Table supported.

SMART Attributes Data Structure revision number: 1
Vendor Specific SMART Attributes with Thresholds:
ID# ATTRIBUTE_NAME          FLAGS    VALUE WORST THRESH FAIL RAW_VALUE
  5 Reallocated_Sector_Ct   PO--CK   100   100   010    -    0
  9 Power_On_Hours          -O--CK   096   096   000    -    16599
 12 Power_Cycle_Count       -O--CK   098   098   000    -    1558
177 Wear_Leveling_Count     PO--C-   031   031   000    -    344
179 Used_Rsvd_Blk_Cnt_Tot   PO--C-   100   100   010    -    0
181 Program_Fail_Cnt_Total  -O--CK   100   100   010    -    0
182 Erase_Fail_Count_Total  -O--CK   100   100   010    -    0
183 Runtime_Bad_Block       PO--C-   100   099   010    -    0
187 Uncorrectable_Error_Cnt -O--CK   100   100   000    -    0
190 Airflow_Temperature_Cel -O--CK   056   039   000    -    44
195 ECC_Error_Rate          -O-RC-   200   200   000    -    0
199 CRC_Error_Count         -OSRCK   099   099   000    -    49
235 POR_Recovery_Count      -O--C-   099   099   000    -    126
241 Total_LBAs_Written      -O--CK   099   099   000    -    21811089703
                            ||||||_ K auto-keep
                            |||||__ C event count
                            ||||___ R error rate
                            |||____ S speed/performance
                            ||_____ O updated online
                            |______ P prefailure warning

General Purpose Log Directory Version 1
SMART           Log Directory Version 1 [multi-sector log support]
Address    Access  R/W   Size  Description
0x00       GPL,SL  R/O      1  Log Directory
0x01           SL  R/O      1  Summary SMART error log
0x02           SL  R/O      1  Comprehensive SMART error log
0x03       GPL     R/O      1  Ext. Comprehensive SMART error log
0x06           SL  R/O      1  SMART self-test log
0x07       GPL     R/O      1  Extended self-test log
0x09           SL  R/W      1  Selective self-test log
0x10       GPL     R/O      1  NCQ Command Error log
0x11       GPL     R/O      1  SATA Phy Event Counters log
0x13       GPL     R/O      1  SATA NCQ Send and Receive log
0x30       GPL,SL  R/O      9  IDENTIFY DEVICE data log
0x80-0x9f  GPL,SL  R/W     16  Host vendor specific log
0xa1           SL  VS      16  Device vendor specific log
0xa5           SL  VS      16  Device vendor specific log
0xce           SL  VS      16  Device vendor specific log
0xe0       GPL,SL  R/W      1  SCT Command/Status
0xe1       GPL,SL  R/W      1  SCT Data Transfer

SMART Extended Comprehensive Error Log Version: 1 (1 sectors)
No Errors Logged

SMART Extended Self-test Log Version: 1 (1 sectors)
No self-tests have been logged.  [To run self-tests, use: smartctl -t]

SMART Selective self-test log data structure revision number 1
 SPAN  MIN_LBA  MAX_LBA  CURRENT_TEST_STATUS
    1        0        0  Not_testing
    2        0        0  Not_testing
    3        0        0  Not_testing
    4        0        0  Not_testing
    5        0        0  Not_testing
  255        0    65535  Read_scanning was never started
Selective self-test flags (0x0):
  After scanning selected spans, do NOT read-scan remainder of disk.
If Selective self-test is pending on power-up, resume after 0 minute delay.

SCT Status Version:                  3
SCT Version (vendor specific):       256 (0x0100)
Device State:                        SCT command executing in background (5)
Current Temperature:                    44 Celsius
Power Cycle Min/Max Temperature:     40/56 Celsius
Lifetime    Min/Max Temperature:      0/70 Celsius
Under/Over Temperature Limit Count:  3758096367/4294901760
SMART Status:                        0xffff (Reserved)

SCT Temperature History Version:     2
Temperature Sampling Period:         1 minute
Temperature Logging Interval:        10 minutes
Min/Max recommended Temperature:      0/70 Celsius
Min/Max Temperature Limit:            0/70 Celsius
Temperature History Size (Index):    128 (8)

Index    Estimated Time   Temperature Celsius
   9    2021-10-07 03:40    44  *************************
 ...    ..(  2 skipped).    ..  *************************
  12    2021-10-07 04:10    44  *************************
  13    2021-10-07 04:20    45  **************************
  14    2021-10-07 04:30    44  *************************
  15    2021-10-07 04:40    45  **************************
  16    2021-10-07 04:50    44  *************************
  17    2021-10-07 05:00    44  *************************
  18    2021-10-07 05:10    45  **************************
  19    2021-10-07 05:20    44  *************************
 ...    ..(  4 skipped).    ..  *************************
  24    2021-10-07 06:10    44  *************************
  25    2021-10-07 06:20    45  **************************
  26    2021-10-07 06:30    44  *************************
 ...    ..(  9 skipped).    ..  *************************
  36    2021-10-07 08:10    44  *************************
  37    2021-10-07 08:20    45  **************************
  38    2021-10-07 08:30    45  **************************
  39    2021-10-07 08:40    44  *************************
  40    2021-10-07 08:50    45  **************************
 ...    ..( 32 skipped).    ..  **************************
  73    2021-10-07 14:20    45  **************************
  74    2021-10-07 14:30    44  *************************
 ...    ..( 30 skipped).    ..  *************************
 105    2021-10-07 19:40    44  *************************
 106    2021-10-07 19:50    45  **************************
 ...    ..( 12 skipped).    ..  **************************
 119    2021-10-07 22:00    45  **************************
 120    2021-10-07 22:10    44  *************************
 ...    ..( 15 skipped).    ..  *************************
   8    2021-10-08 00:50    44  *************************

SCT Error Recovery Control:
           Read: Disabled
          Write: Disabled

Device Statistics (GP/SMART Log 0x04) not supported

Pending Defects log (GP Log 0x0c) not supported

SATA Phy Event Counters (GP Log 0x11)
ID      Size     Value  Description
0x0001  2            0  Command failed due to ICRC error
0x0002  2            0  R_ERR response for data FIS
0x0003  2            0  R_ERR response for device-to-host data FIS
0x0004  2            0  R_ERR response for host-to-device data FIS
0x0005  2            0  R_ERR response for non-data FIS
0x0006  2            0  R_ERR response for device-to-host non-data FIS
0x0007  2            0  R_ERR response for host-to-device non-data FIS
0x0008  2            0  Device-to-host non-data FIS retries
0x0009  2            3  Transition from drive PhyRdy to drive PhyNRdy
0x000a  2            3  Device-to-host register FISes sent due to a COMRESET
0x000b  2            0  CRC errors within host-to-device FIS
0x000d  2            0  Non-CRC errors within host-to-device FIS
0x000f  2            0  R_ERR response for host-to-device data FIS, CRC
0x0010  2            0  R_ERR response for host-to-device data FIS, non-CRC
0x0012  2            0  R_ERR response for host-to-device non-data FIS, CRC
0x0013  2            0  R_ERR response for host-to-device non-data FIS, non-CRC
```
