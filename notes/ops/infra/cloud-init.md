---
id: cloud-init
title: Cloud Init
---

# cloud-init

## Tips
* [cloud-init.io](https://cloud-init.io/) / [cloud-init](https://launchpad.net/cloud-init/)
  * Apply user data to your instances automatically
  * [Document](http://cloudinit.readthedocs.io/en/latest/index.html)
  * GitHub mirror [cloud-init/cloud-init](https://github.com/cloud-init/cloud-init)
* AlpineLinux
  * [cloud-init](https://pkgs.alpinelinux.org/packages?name=cloud-init&branch=edge)
  * [testing/cloud-init/APKBUILD](https://git.alpinelinux.org/cgit/aports/tree/testing/cloud-init/APKBUILD)
* Ubuntu
  * [CloudInit](https://help.ubuntu.com/community/CloudInit)
* ArchLinux
  * [Cloud-init](https://wiki.archlinux.org/index.php/Cloud-init)
* 特性
  * 配置自定义 locale
  * 配置 hostname
  * 生成 SSH 密钥
  * 配置临时挂载点
* 支持
  * terraform-provider-libvirt [libvirt_cloudinit_disk](https://github.com/dmacvicar/terraform-provider-libvirt/blob/master/website/docs/r/cloudinit.html.markdown)
  * Ansible [cloud_init_data_facts_module](https://docs.ansible.com/ansible/latest/modules/cloud_init_data_facts_module.html)
    * 获取 cloud init 配置信息

```bash
# < 3.13
# ifupdown-ng
apk add ifupdown-ng iproute2-minimal -X https://mirrors.aliyun.com/alpine/edge/main/
apk add cloud-init -X https://mirrors.aliyun.com/alpine/edge/community/
```

* [cloud init to install docker on ubuntu](https://gist.github.com/syntaqx/9dd3ff11fb3d48b032c84f3e31af9163)
