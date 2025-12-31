---
title: SSD Optimization & TRIM
tags:
  - DevOps
  - Storage
  - SSD
  - TRIM
  - Linux
---

# SSD Optimization & TRIM

Detailed guides and notes on optimizing Solid State Drives (SSD) performance and longevity.

## Resources

- [Debian Wiki - SSD Optimization](https://wiki.debian.org/SSDOptimization)
- [ArchWiki - Solid State Drive](https://wiki.archlinux.org/index.php/Solid-state_drive)
- [Wikipedia - TRIM](https://en.wikipedia.org/wiki/TRIM)
- [Unix StackExchange - TRIM explanation](https://unix.stackexchange.com/a/218083/47774)

## TRIM Overview

TRIM does at least three things:

1. Minimize write amplification.
2. Prevent long-term performance degradation.
3. Irrecoverably delete your data.

### Implementation Types

- **Continuous TRIM**
  - Controlled by the filesystem.
  - Mount option: `-o discard`
- **Periodic TRIM**
  - Run manually or via cron/systemd timer (e.g., once a week).

## Commands & Verification

```bash
# Verify TRIM support
# DISC-GRAN (discard granularity)
# DISC-MAX (discard max bytes)
lsblk --discard

# Check features via hdparm
apk add hdparm
hdparm -I /dev/sda | grep TRIM

# Check drive health and attributes
apk add smartmontools
smartctl -a /dev/sda

# Enable discard option on ext4
tune2fs -o discard /dev/sdXY

# Securely wipe data (requires unmount)
# blkdiscard /dev/sdX
```

### fstab Example

```fstab
/dev/sda1  /           ext4  defaults,discard   0  1
```

## SSD Utility Scripts

- [Script source (AskUbuntu)](https://askubuntu.com/a/865793/267103)

```bash
cat << 'SHELL' > ssh-info.sh
#!/bin/bash

#######################################
# Variables                           #
#######################################

SSD_DEVICE=${1:-/dev/sda}

ON_TIME_TAG="Power_On_Hours"
WEAR_COUNT_TAG="Wear_Leveling_Count"
LBAS_WRITTEN_TAG="Total_LBAs_Written"
LBA_SIZE=512 # Value in bytes

BYTES_PER_MB=1048576
BYTES_PER_GB=1073741824
BYTES_PER_TB=1099511627776

#######################################
# Get total data written...           #
#######################################

# Get SMART attributes
SMART_INFO=$(sudo /usr/sbin/smartctl -A "$SSD_DEVICE")

# Extract required attributes
ON_TIME=$(echo "$SMART_INFO" | grep "$ON_TIME_TAG" | awk '{print $10}')
WEAR_COUNT=$(echo "$SMART_INFO" | grep "$WEAR_COUNT_TAG" | awk '{print $4}' | sed 's/^0*//')
LBAS_WRITTEN=$(echo "$SMART_INFO" | grep "$LBAS_WRITTEN_TAG" | awk '{print $10}')

# Convert LBAs -> bytes
BYTES_WRITTEN=$(echo "$LBAS_WRITTEN * $LBA_SIZE" | bc)
MB_WRITTEN=$(echo "scale=3; $BYTES_WRITTEN / $BYTES_PER_MB" | bc)
GB_WRITTEN=$(echo "scale=3; $BYTES_WRITTEN / $BYTES_PER_GB" | bc)
TB_WRITTEN=$(echo "scale=3; $BYTES_WRITTEN / $BYTES_PER_TB" | bc)

# Output results...
echo "------------------------------"
echo " SSD Status:   $SSD_DEVICE"
echo "------------------------------"
echo " On time:      $(echo $ON_TIME | sed ':a;s/\B[0-9]\{3\}\>/,&/;ta') hr"
echo "------------------------------"
echo " Data written:"
echo "           MB: $(echo $MB_WRITTEN | sed ':a;s/\B[0-9]\{3\}\>/,&/;ta')"
echo "           GB: $(echo $GB_WRITTEN | sed ':a;s/\B[0-9]\{3\}\>/,&/;ta')"
echo "           TB: $(echo $TB_WRITTEN | sed ':a;s/\B[0-9]\{3\}\>/,&/;ta')"
echo "------------------------------"
echo " Mean write rate:"
echo "        MB/hr: $(echo "scale=3; $MB_WRITTEN / $ON_TIME" | bc | sed ':a;s/\B[0-9]\{3\}\>/,&/;ta')"
echo "------------------------------"
echo " Drive health: ${WEAR_COUNT} %"
echo "------------------------------"
SHELL

chmod +x ssh-info.sh
sudo ./ssh-info.sh /dev/sda
```

### smartctl -a ssd

```
smartctl 7.1 2019-12-30 r5022 [x86_64-linux-5.4.43-1-lts] (local build)
Copyright (C) 2002-19, Bruce Allen, Christian Franke, www.smartmontools.org

=== START OF INFORMATION SECTION ===
Model Family:     Samsung based SSDs
Device Model:     Samsung SSD 750 EVO 120GB
Serial Number:    S2TTNDAH131915J
LU WWN Device Id: 5 002538 da03bb229
Firmware Version: MAT01B6Q
User Capacity:    120,034,123,776 bytes [120 GB]
Sector Size:      512 bytes logical/physical
Rotation Rate:    Solid State Device
Device is:        In smartctl database [for details use: -P show]
ATA Version is:   ACS-2, ATA8-ACS T13/1699-D revision 4c
SATA Version is:  SATA 3.1, 6.0 Gb/s (current: 6.0 Gb/s)
Local Time is:    Fri Aug 21 16:57:08 2020 CST
SMART support is: Available - device has SMART capability.
SMART support is: Enabled

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
ID# ATTRIBUTE_NAME          FLAG     VALUE WORST THRESH TYPE      UPDATED  WHEN_FAILED RAW_VALUE
  5 Reallocated_Sector_Ct   0x0033   100   100   010    Pre-fail  Always       -       0
  9 Power_On_Hours          0x0032   098   098   000    Old_age   Always       -       6710
 12 Power_Cycle_Count       0x0032   098   098   000    Old_age   Always       -       1517
177 Wear_Leveling_Count     0x0013   094   094   000    Pre-fail  Always       -       30
179 Used_Rsvd_Blk_Cnt_Tot   0x0013   100   100   010    Pre-fail  Always       -       0
181 Program_Fail_Cnt_Total  0x0032   100   100   010    Old_age   Always       -       0
182 Erase_Fail_Count_Total  0x0032   100   100   010    Old_age   Always       -       0
183 Runtime_Bad_Block       0x0013   100   099   010    Pre-fail  Always       -       0
187 Uncorrectable_Error_Cnt 0x0032   100   100   000    Old_age   Always       -       0
190 Airflow_Temperature_Cel 0x0032   059   046   000    Old_age   Always       -       41
195 ECC_Error_Rate          0x001a   200   200   000    Old_age   Always       -       0
199 CRC_Error_Count         0x003e   099   099   000    Old_age   Always       -       49
235 POR_Recovery_Count      0x0012   099   099   000    Old_age   Always       -       109
241 Total_LBAs_Written      0x0032   099   099   000    Old_age   Always       -       7409347670

SMART Error Log Version: 1
No Errors Logged

SMART Self-test log structure revision number 1
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
```

### hdparam -I

```
ATA device, with non-removable media
	Model Number:       Samsung SSD 750 EVO 120GB
	Serial Number:      S2TTNDAH131915J
	Firmware Revision:  MAT01B6Q
	Transport:          Serial, ATA8-AST, SATA 1.0a, SATA II Extensions, SATA Rev 2.5, SATA Rev 2.6, SATA Rev 3.0
Standards:
	Used: unknown (minor revision code 0x0039)
	Supported: 9 8 7 6 5
	Likely used: 9
Configuration:
	Logical		max	current
	cylinders	16383	16383
	heads		16	16
	sectors/track	63	63
	--
	CHS current addressable sectors:    16514064
	LBA    user addressable sectors:   234441648
	LBA48  user addressable sectors:   234441648
	Logical  Sector size:                   512 bytes
	Physical Sector size:                   512 bytes
	Logical Sector-0 offset:                  0 bytes
	device size with M = 1024*1024:      114473 MBytes
	device size with M = 1000*1000:      120034 MBytes (120 GB)
	cache/buffer size  = unknown
	Nominal Media Rotation Rate: Solid State Device
Capabilities:
	LBA, IORDY(can be disabled)
	Queue depth: 32
	Standby timer values: spec'd by Standard, no device specific minimum
	R/W multiple sector transfer: Max = 1	Current = 1
	DMA: mdma0 mdma1 mdma2 udma0 udma1 udma2 udma3 udma4 udma5 *udma6
	     Cycle time: min=120ns recommended=120ns
	PIO: pio0 pio1 pio2 pio3 pio4
	     Cycle time: no flow control=120ns  IORDY flow control=120ns
Commands/features:
	Enabled	Supported:
	   *	SMART feature set
	    	Security Mode feature set
	   *	Power Management feature set
	   *	Write cache
	   *	Look-ahead
	   *	Host Protected Area feature set
	   *	WRITE_BUFFER command
	   *	READ_BUFFER command
	   *	NOP cmd
	   *	DOWNLOAD_MICROCODE
	    	SET_MAX security extension
	   *	48-bit Address feature set
	   *	Device Configuration Overlay feature set
	   *	Mandatory FLUSH_CACHE
	   *	FLUSH_CACHE_EXT
	   *	SMART error logging
	   *	SMART self-test
	   *	General Purpose Logging feature set
	   *	WRITE_{DMA|MULTIPLE}_FUA_EXT
	   *	64-bit World wide name
	    	Write-Read-Verify feature set
	   *	WRITE_UNCORRECTABLE_EXT command
	   *	{READ,WRITE}_DMA_EXT_GPL commands
	   *	Segmented DOWNLOAD_MICROCODE
	   *	Gen1 signaling speed (1.5Gb/s)
	   *	Gen2 signaling speed (3.0Gb/s)
	   *	Gen3 signaling speed (6.0Gb/s)
	   *	Native Command Queueing (NCQ)
	   *	Phy event counters
	   *	READ_LOG_DMA_EXT equivalent to READ_LOG_EXT
	   *	DMA Setup Auto-Activate optimization
	   *	Device-initiated interface power management
	   *	Asynchronous notification (eg. media change)
	   *	Software settings preservation
	    	Device Sleep (DEVSLP)
	   *	SMART Command Transport (SCT) feature set
	   *	SCT Write Same (AC2)
	   *	SCT Error Recovery Control (AC3)
	   *	SCT Features Control (AC4)
	   *	SCT Data Tables (AC5)
	   *	reserved 69[4]
	   *	DOWNLOAD MICROCODE DMA command
	   *	SET MAX SETPASSWORD/UNLOCK DMA commands
	   *	WRITE BUFFER DMA command
	   *	READ BUFFER DMA command
	   *	Data Set Management TRIM supported (limit 8 blocks)
Security:
	Master password revision code = 65534
		supported
	not	enabled
	not	locked
		frozen
	not	expired: security count
		supported: enhanced erase
	2min for SECURITY ERASE UNIT. 8min for ENHANCED SECURITY ERASE UNIT.
Logical Unit WWN Device Identifier: 5002538da03bb229
	NAA		: 5
	IEEE OUI	: 002538
	Unique ID	: da03bb229
Device Sleep:
	DEVSLP Exit Timeout (DETO): 50 ms (drive)
	Minimum DEVSLP Assertion Time (MDAT): 30 ms (drive)
Checksum: correct
```
