# CPU

## Tips

```bash
# Linux
cat /proc/cpuinfo
# macOS
sysctl machdep.cpu.features
```

## MIPS

Microprocessor without Interlocked Pipeline Stages
https://en.wikipedia.org/wiki/MIPS_architecture

## Core

CPU 版本后面的意思

- U: Ultra Low Power. The U rating is only for laptop processors. These draw less power and are better for the battery.
- Y: Low Power. Typically found on older generation laptop and mobile processors.
- T: Power Optimized for desktop processors.
- Q: Quad-Core. The Q rating is only for processors with four physical cores.
- H: High-Performance Graphics. The chipset has one of Intel’s better graphics units in it.
- K: Unlocked. This means you can overclock the processor above its rating.

## MIPS vs ARM

http://www.differencebetween.com/difference-between-mips-and-vs-arm/

## virtualization

- [X86_virtualization](https://en.wikipedia.org/wiki/X86_virtualization)
- Intel VT-x
  - Intel x86 虚拟化能力
- I/O MMU virtualization - Input–output memory management unit
  - 输入输出内存管理单元
  - AMD-Vi
  - Intel VT-d
  - 设备 passthrough/透传
- VMX - Virtual Machine Extensions
  - VMPTRLD, VMPTRST, VMCLEAR, VMREAD, VMWRITE, VMCALL, VMLAUNCH, VMRESUME, VMXOFF, VMXON, INVEPT, INVVPID, VMFUNC

## CPUs

- Intel Celeron N3150 (4) @ 2.080GHz

| name             | value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| processor        | 0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| vendor_id        | GenuineIntel                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| cpu family       | 6                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| model            | 76                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| model name       | Intel(R) Celeron(R) CPU N3150 @ 1.60GHz                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| stepping         | 3                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| microcode        | 0x351                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| cpu MHz          | 480.000                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| cache size       | 1024 KB                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| physical id      | 0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| siblings         | 4                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| core id          | 0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| cpu cores        | 4                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| apicid           | 0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| initial apicid   | 0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| fpu              | yes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| fpu_exception    | yes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| cpuid level      | 11                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| wp               | yes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| flags            | fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush dts acpi mmx fxsr sse sse2 ss ht tm pbe syscall nx rdtscp lm constant_tsc arch_perfmon pebs bts rep_good nopl xtopology tsc_reliable nonstop_tsc cpuid aperfmperf tsc_known_freq pni pclmulqdq dtes64 monitor ds_cpl vmx est tm2 ssse3 cx16 xtpr pdcm sse4_1 sse4_2 movbe popcnt tsc_deadline_timer aes rdrand lahf_lm 3dnowprefetch epb pti tpr_shadow vnmi flexpriority ept vpid tsc_adjust smep erms dtherm ida arat |
| bugs             | cpu_meltdown spectre_v1 spectre_v2 mds msbds_only                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| bogomips         | 3201.33                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| clflush size     | 64                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| cache_alignment  | 64                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| address sizes    | 36 bits physical, 48 bits virtual                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| power management |
