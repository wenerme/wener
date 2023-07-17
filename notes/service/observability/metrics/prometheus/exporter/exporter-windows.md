---
title: windows_exporter
---

# windows_exporter

- [prometheus-community/windows_exporter](https://github.com/prometheus-community/windows_exporter)

```bash
msiexec /i <path-to-msi-file> ENABLED_COLLECTORS=os,iis LISTEN_PORT=5000
```

```promql
# hyperv
(sum (rate(windows_hyperv_vm_cpu_hypervisor_run_time{instance=~""}[1m])))
  / ignoring(vm) group_left max (windows_cs_logical_processors{instance=~""}) / 100000

sum (rate(windows_hyperv_vm_cpu_hypervisor_run_time[1m])) by (vm)
(sum (rate(windows_hyperv_vm_cpu_hypervisor_run_time[1m])))
  / ignoring(vm) group_left max (windows_cs_logical_processors) / 100000
```
