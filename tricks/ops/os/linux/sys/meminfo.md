```
# cat /proc/meminfo
MemTotal:         500192 kB
MemFree:           64276 kB
Buffers:           32760 kB
Cached:           112976 kB
SwapCached:            0 kB
Active:           300212 kB
Inactive:          53464 kB
Active(anon):     208268 kB
Inactive(anon):      660 kB
Active(file):      91944 kB
Inactive(file):    52804 kB
Unevictable:           0 kB
Mlocked:               0 kB
SwapTotal:             0 kB
SwapFree:              0 kB
Dirty:                96 kB
Writeback:             0 kB
AnonPages:        207968 kB
Mapped:            22164 kB
Shmem:               988 kB
Slab:              61228 kB
SReclaimable:      42084 kB
SUnreclaim:        19144 kB
KernelStack:        1616 kB
PageTables:         6144 kB
NFS_Unstable:          0 kB
Bounce:                0 kB
WritebackTmp:          0 kB
CommitLimit:      250096 kB
Committed_AS:     753788 kB
VmallocTotal:   34359738367 kB
VmallocUsed:        3480 kB
VmallocChunk:   34359720156 kB
HardwareCorrupted:     0 kB
AnonHugePages:         0 kB
HugePages_Total:       0
HugePages_Free:        0
HugePages_Rsvd:        0
HugePages_Surp:        0
Hugepagesize:       2048 kB
DirectMap4k:       34816 kB
DirectMap2M:      620544 kB
```


MemTotal
The MemTotal line indicates the total amount of memory available, minus a few reserved binary regions. Note that
memory allocated to the GPU is not factored into MemTotal. Some may choose to allocate the minimum of 16 MB to
the GPU to make more memory available.
Model B Model A
MemTotal 448,996 KB 190,836 KB
If we break this down a bit further, accounting for memory allocated to the GPU (see Chapter 16 for more details),
we find that there is about 9.5 MB (1.9%) of memory that is unaccounted for, as shown in Table 6-1.
Table 6-1. GPU and Main Memory Breakdown
Memory Model B Comments
MemTotal 448,996 KB /proc/meminfo
gpu_mem 65,536 KB /boot/config.txt
Total 514,532 KB 502.5 MB
Unaccounted for 9,756 KB 9.5 MB
MemFree
MemFree normally represents the sum of LowFree + HighFree memory in kilobytes on the Intel x86 platform. For ARM,
this simply represents the amount of memory available to user space programs.
Model B Model A
MemFree 340,228 KB 151,352 KB
The Model B has 332.25 MB for application programs, which amounts to about 64.9% (Rev 2.0). The Model A
values indicate about 57.7% of the memory is available.
Buffers
This value represents temporary buffers used within the kernel for raw disk blocks, and so forth. This value should not
get much larger than about 20 MB or so.
Cached
This value represents the read file content that has been cached (page cache). This does not include the content
reported for SwapCached.
Model B Model A
Cached 58,532 KB 20,640 KB
SwapCached
The value shown for SwapCached represents memory that was swapped out and is now swapped back in. For
efficiency, these memory pages are still represented by swap disk space, should they be needed again.
Model B Model A
SwapCached 0 KB 0 KB
The fact that the value is reported as zero is a happy sign that no swapping has occurred, or is no longer pertinent.
Active
The Active memory value represents recently used memory that is not reclaimed, unless absolutely necessary.
Model B Model A
Active 45,948 KB 14,336 KB
Inactive
This value represents memory that is not active and is likely to be reclaimed when memory is needed.
Model B Model A
Inactive 51,564 KB 18,648 KB
Active(anon)
This value represents memory that is not backed up by a file and is active. Active memory is not reclaimed unless
absolutely necessary.
Model B Model A
Active(anon) 24,680 KB 5,468 KB
www.it-ebooks.info
Chapter 6 ■ SDRAM
41
Inactive(anon)
This value represents memory that is not backed up by a file and is not active. Inactive memory is eligible to be
reclaimed if memory is required.
Model B Model A
Inactive(anon) 820 KB 0 KB
Active(file)
This value represents file-backed memory, which is active. Active memory is reclaimed only if absolutely required.
Model B Model A
Active(file) 21,268 KB 8,868 KB
Inactive(file)
This value represents inactive memory that is backed by a file. Inactive memory is eligible for reclamation, when
memory is required.
Model B Model A
Inactive(file) 50,744 KB 18,648 KB
Unevictable
This amount reflects the total amount of memory that cannot be reclaimed. Memory that is locked, for example,
cannot be reclaimed.
Model B Model A
Unevictable 0 KB 0 KB
Mlocked
This value reports the amount of locked memory.
SwapTotal
This value reports the total amount of swap space available in kilobytes.
Model B Model A
SwapTotal 102,396 KB 0 KB
SwapFree
This value reports the remaining amount of swap space available in kilobytes.
Model B Model A
SwapFree 102,396 KB 0 KB
Dirty
This value represents the kilobytes of memory that have been modified and are waiting to be written to disk.
Model B Model A
Dirty 0 KB 0 KB
Writeback
This value reports the amount of memory in kilobytes being written back to disk.
Model B Model A
Writeback 0 KB 0 KB
AnonPages
This represents the non-file-backed pages of memory mapped into user space.
Model B Model A
AnonPages 24,584 KB 5,348 KB
Mapped
This value reports the files that have been mapped into memory. This may include library code.
Shmem
This parameter does not appear to be documented well. However, it represents the amount of shared memory in
kilobytes.
Model B Model A
Shmem 932 KB 136 KB
Slab
This parameter is described as “in-kernel data structures cache.”27
Model B Model A
Slab 6,088 KB 3,712 KB
SReclaimable
This parameter is described as “Part of Slab that might be reclaimed, such as caches.”27
Model B Model A
SReclaimable 2,392 KB 1,584 KB
SUnreclaim
This parameter is described as “Part of Slab that cannot be reclaimed [under] memory pressure.”27
Model B Model A
SUnreclaim 3,696 KB 2,128 KB
KernelStack
This value reports the memory used by the kernel stack(s).
Model B Model A
KernelStack 1,216 KB 944 KB
PageTables
This value reports the amount of memory required by the page tables used in the kernel. Clearly, with more memory
to manage, there is more memory dedicated to page tables.
