# PostgreSQL & ZFS



https://www.slideshare.net/SeanChittenden/postgresql-zfs-best-practices


Quick ZFS Primer: Features (read: why you must use ZFS)


Never inconsistent (no fsck(8)'s required, ever)
•Filesystem atomically moves from one consistent state to another consistent state
•All blocks are checksummed
•Compression builtin
•Snapshots are free and unlimited
•Clones are easy
•Changes accumulate in memory, flushed to disk in a transaction
•Redundant metadata (and optionally data)
•Filesystem management independent of physical storage management
•Log-Structured Filesystem
•Copy on Write (COW)

Feature Consequences (read: how your butt gets saved)

•bitrot detected and automatically corrected if possible
  •phantom writes
  •misdirected reads or writes by the drive heads
  •DMA parity errors
  •firmware or driver bugs
  •RAM capacitors aren't refreshed fast enough or with enough power
•Phenomenal sequential and random IO write performance
•Performance increase for sequential reads
•Cost of ownership goes down
•New tricks and tools to solve "data gravity" problems


ELI5: Block Filesystems vs Log
Structured Filesystems

Physical Storage is
decoupled
from
Filesystems.

canmount=off

TIL about ZFS: Transactions and Disk Pages

•Transaction groups are flushed to disk ever N seconds (defaults to 5s)
•A transaction group (txg) in ZFS is called a "checkpoint"
•User Data can be modified as its written to disk
•All data is checksummed
•Compression should be enabled by default

ZFS Tip: ALWAYS enable compression

•Across ~7PB of PostgreSQL and mixed workloads and applications:
compression ratio of ~2.8:1 was the average.
•Have seen >100:1 compression on some databases
(cough this data probably didn't belong in a database cough)
•Have seen as low as 1.01:1

I have yet to see compression slow down benchmarking results or real world
workloads. My experience is with:
•spinning rust (7.2K RPM, 10K RPM, and 15KRPM)
•fibre channel connected SANs
•SSDs
•NVME

•Use lz4 by default everywhere.
•Use gzip-9 only for archive servers
•Never mix-and-match compression where you can't suffer the
consequences of lowest-common-denominator performance
•Anxious to see ZStandard support (I'm looking at you Allan Jude)

ZFS Perk: Data Locality

•Data written at the same time is stored near each other because it's frequently
part of the same record
•Data can now pre-fault into kernel cache (ZFS ARC) by virtue of the temporal
adjacency of the related pwrite(2) calls
•Write locality + compression=lz4 + pg_repack == PostgreSQL Dream Team

pg_repack 1.4.2 -- Reorganize tables in PostgreSQL databases with minimal locks



Extreme ZFS Warning: Purge all memory of dedup

•This is not just my recommendation, it's also from the community and author
of the feature.
•These are not the droids you are looking for
•Do not pass Go
•Do not collect $200
•Go straight to system unavailability jail
•The feature works, but you run the risk of bricking your ZFS server.

4.2% -> 34% of SSDs have one UBER per year

Causes of bitrot are Internal and External

External Factors for UBER on SSDs:
• Temperature
• Bus Power Consumption
• Data Written by the System Software
• Workload changes due to SSD failure

VDEV
a virtual device

•Physical drive redundancy is handled at the VDEV level
•Zero or more physical disks arranged like a RAID set:
•mirror
•stripe
•raidz
•raidz2
•raidz3

zpool
an abstraction of physical storage made up of a set of VDEVs


ZPL
ZFS POSIX Layer

•Layer that handles the impedance mismatch between POSIX filesystem
semantics and the ZFS "object database."

ZIL
ZFS Intent Log

•The ZFS analog of PostgreSQL's WAL
•If you use a ZIL:
  •Use disks that have low-latency writes
  •Mirror your ZIL
  •If you loose your ZIL, whatever data had not made it to the main data disks
   will be lost. The PostgreSQL equivalent of: rm -rf pg_xlog/

ARC
Adaptive Replacement Cache

•ZFS's page cache
•ARC will grow or shrink to match use up all of the available memory

TIP: Limit ARC's max size to a percentage of physical memory
minus the shared_buffer cache for PostgreSQL minus the
kernel's memory overhead.


datasets
A filesystem or volume ("zvol")

•A ZFS filesystem dataset uses the underlying zpool
•A dataset belongs to one and only one zpool
•Misc tunables, including compression and quotas are set on the dataset level


ZAP ZFS Attribute Processor
DMU Data Management Unit
DSL Dataset and Snapshot Layer
SPA Storage Pool Allocator
ZVOL ZFS Volume
ZIO ZFS I/O
RAIDZ RAID with variable-size stripes
L2ARC Level 2 Adaptive Replacement Cache
record unit of user data, think RAID stripe size

Dataset Tuning Tips
•Disable atime
•Enable compression
•Tune the recordsize
•Consider tweaking the primarycache

zfs set atime=off rpool/db
zfs set compression=lz4 rpool/db
zfs set recordsize=16K rpool/db
zfs set primarycache=metadata rpool/db

recordsize=16K
•Pre-fault next page: useful for sequential scans
•With compression=lz4, reasonable to expect ~3-4x pages worth of data
in a single ZFS record

Anecdotes and Recommendations:
•Performed better in most workloads vs ZFS's prefetch
•Disabling prefetch isn't necessary, tends to still be a net win
•Monitor arc cache usage


primarycache=metadata
•metadata instructs ZFS's ARC to only cache metadata (e.g. dnode entries),
not page data itself
•Default: cache all data
•Double-caching happens 

Two different recommendations based on benchmark workloads:
•Enable primarycache=all where working set exceeds RAM
•Enable primarycache=metadata where working set fits in RAM

Reasonable Default anecdote: Cap max ARC size ~15%-25%
physical RAM + ~50% RAM shared_buffers

dtrace -s vfs-io-postgre.d


ZFS Always has your back
•ZFS will checksum every read from disk
•A failed checksum will result in a fault and automatic data reconstruction
•Scrubs do background check of every record
•Schedule periodic scrubs
•Frequently for new and old devices
•Infrequently for devices in service between 6mo and 2.5yr 

One dataset per database
•Create one ZFS dataset per database instance
•General rules of thumb:
•Use the same dataset for $PGDATA/ and pg_xlogs/
•Set a reasonable quota
•Optional: reserve space to guarantee minimal available space


postgres -c 'initdb --no-locale -E=UTF8 -n -N -D /db/pgdb1'

•Encode using UTF8, sort using C
•Only enable locale when you know you need it
  •~2x perf bump by avoiding calls to iconv(3) to figure out sort order
  •DO NOT use PostgreSQL checksums or compression


logbias=throughput

•Measure tps/qps
•Time duration of an outage (OS restart plus WAL replay, e.g. 10-20min)
•Measure cost of back pressure from the DB to the rest of the application
•Use a txg timeout of 1 second
Position: since ZFS will never be inconsistent and therefore PostgreSQL will
never loose integrity, 1s of actual data loss is a worthwhile tradeoff for a ~10x
performance boost in write-heavy applications.
Rationale: loss aversion costs organizations more than potentially loosing 1s
of data. Back pressure is a constant cost the rest of the application needs to
absorb due to continual fsync(2)'ing of WAL data. Architectural cost and
premature engineering costs need to be factored in. Penny-wise, pound
foolish.

```
# cat /sys/module/zfs/parameters/zfs_txg_timeout
5
# echo 1 > /sys/module/zfs/parameters/zfs_txg_timeout
# echo 'options zfs zfs_txg_timeout=1' >> /etc/modprobe.d/zfs.conf
# psql -c 'ALTER SYSTEM SET synchronous_commit=off'
ALTER SYSTEM
# zfs set logbias=throughput rpool/db
```
