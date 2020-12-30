# ESXi

## Tips
- wikipedia [VMFS](https://en.wikipedia.org/wiki/VMware_VMFS)
- [VMware ESXi](https://en.wikipedia.org/wiki/VMware_ESXi)
  - Elastic Sky X integrated
- [VMware vSphere® Feature Comparison](https://www.vmware.com/content/dam/digitalmarketing/vmware/en/pdf/vsphere/vmw-feature-comparison.pdf)
- [Pricing](https://www.vmware.com/reusable_content/vsphere_pricing.html)
- .vmx, .vmdk, .vmsd, .vmsn

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

## esxcli
* [ESXi 7.0 ESXCLI Command Reference](https://code.vmware.com/docs/11743/esxi-7-0-esxcli-command-reference)

```bash
# 服务器信息
esxcli --server myESXi --username user1 --password 'my_password' --thumbprint

# 输出格式
esxcli --formatter=csv storage filesystem list

esxcli --server MyVC --vihost MyESXi storage filesystem list

# 升级
esxcli software vib
```

```bash
# 系统管理
# ==========
# 维护模式
system maintenanceMode set --enable true

# system module list --module=<module_name>
system module list --enabled=true
system module list --loaded=true
# 启用
system module set --module=<module_name> --enabled=true
# 参数
system module parameters set --module=<module_name> --parameter-string=<parameter_string>
# 验证
system module parameters list --module=<module_name>


# 组件管理
# ==========
# 系统组件
software component list
# 组件信息 <component_name>:<version>
software component get -n <component_name>
software baseimage get
software addon get
# 仓库 - index.xml 或者 zip
software sources component list -d <depot_url_or_offline_bundle_path>
# 详细信息
software sources component get -n <component_name> -d <depot_url_or_offline_bundle_path>
# 安装
software component apply -n <component_name>:<version> -d <depot_url_or_offline_bundle_path>
# 移除
software component remove -n <component_name>

# 管理 baseimage
software sources baseimage list -d <depot_url_or_offline_bundle_path>
software sources baseimage get -b <base_image_version> -d <depot_url_or_offline_bundle_path>
software sources addon list -d <depot_url_or_offline_bundle_path>
software sources addon get -a <add-on_name> -d <depot_url_or_offline_bundle_path>

# 通过 JSON 配置
software apply -s <location_of_software_spec>.json -d <depot_url_or_offline_bundle_path>


# 存储管理
# ==========
# 挂载的卷
storage filesystem list
# 卸载
storage filesystem unmount
# 快照
storage vmfs

# 挂载
storage filesystem volume mount --volume-label=<label>|--volume-uuid=<VMFSUUID>
# 卸载
storage filesystem volume unmount --volume-label=<label>|--volume-uuid=<VMFSUUID>

# 快照列表
storage vmfs snapshot list
storage filesystem unmount
storage vmfs snapshot resignature --volume-label=<label>|--volume-uuid=<id>
```
