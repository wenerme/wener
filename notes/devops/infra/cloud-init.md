---
title: Cloud Init
---

# cloud-init

- [cloud-init.io](https://cloud-init.io/) / [cloud-init](https://launchpad.net/cloud-init/)
  - Apply user data to your instances automatically
  - [Document](http://cloudinit.readthedocs.io/en/latest/index.html)
  - GitHub mirror [cloud-init/cloud-init](https://github.com/cloud-init/cloud-init)
- AlpineLinux
  - [cloud-init](https://pkgs.alpinelinux.org/packages?name=cloud-init&branch=edge)
  - [testing/cloud-init/APKBUILD](https://git.alpinelinux.org/cgit/aports/tree/testing/cloud-init/APKBUILD)
- Ubuntu
  - [CloudInit](https://help.ubuntu.com/community/CloudInit)
- ArchLinux
  - [Cloud-init](https://wiki.archlinux.org/index.php/Cloud-init)
- 特性
  - 配置自定义 locale
  - 配置 hostname
  - 生成 SSH 密钥
  - 配置临时挂载点
- 支持
  - terraform-provider-libvirt [libvirt_cloudinit_disk](https://github.com/dmacvicar/terraform-provider-libvirt/blob/master/website/docs/r/cloudinit.html.markdown)
  - Ansible [cloud_init_data_facts_module](https://docs.ansible.com/ansible/latest/modules/cloud_init_data_facts_module.html)
    - 获取 cloud init 配置信息
- /var/log/cloud-init.log

```bash
# < 3.13
# ifupdown-ng
apk add ifupdown-ng iproute2-minimal
apk add cloud-init

cloud-init status --wait

# 阿里云
curl http://100.100.100.200/

# Linode / Akamai
# fd00:a9fe:a9fe::1
curl 169.254.169.254

# GCE
curl http://meta-data.google.internal/computeMetadata/v1/
```

- [cloud init to install docker on ubuntu](https://gist.github.com/syntaqx/9dd3ff11fb3d48b032c84f3e31af9163)

**user-data**

```yaml
#cloud-config
password: password
chpasswd:
  expire: False
```

**meta-data**

```yaml
instance-id: someid/somehostname
```

- Instance Metadata Service (IMDS)
- /
  - meta-data
  - user-data
  - vendor-data
- qemu `-smbios type=1,serial=ds='nocloud;s=http://10.0.2.2:8000/'`
- nocloud
  - https://cloudinit.readthedocs.io/en/latest/reference/datasources/nocloud.html
