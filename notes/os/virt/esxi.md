# ESXi

## Tips
- wikipedia [VMFS](https://en.wikipedia.org/wiki/VMware_VMFS)
- [VMware ESXi](https://en.wikipedia.org/wiki/VMware_ESXi)
  - Elastic Sky X integrated
- [VMware vSphere® Feature Comparison](https://www.vmware.com/content/dam/digitalmarketing/vmware/en/pdf/vsphere/vmw-feature-comparison.pdf)
- [Pricing](https://www.vmware.com/reusable_content/vsphere_pricing.html)

| Item            | Free    | Paid      |
| --------------- | ------- | --------- |
| physical CPUs   | 2       | 768       |
| physical memory | 16TB    | 16TB      |
| vCPUs per VM    | 8 vCPUs | 256 vCPUs |
| vRAM per VM     | 6TB     | 6TB       |

```bash
qemu-img convert -f qcow2 -O vmdk -o adapter_type=lsilogic,subformat=streamOptimized,compat6 SC-1.qcow2 SC-1.vmdk

# https://github.com/alpinelinux/alpine-make-vm-image#creating-image-for-vmware-esxi
qemu-img convert -f qcow2 -O vmdk -o adapter_type=lsilogic,subformat=monolithicFlat alpine.qcow2 alpine.vmdk
```
