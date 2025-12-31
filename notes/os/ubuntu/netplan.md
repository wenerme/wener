---
title: Netplan Network Configuration
tags:
  - Linux
  - Ubuntu
  - Network
  - Netplan
---

# Netplan Network Configuration {#netplan-network-configuration}

- [canonical/netplan](https://github.com/canonical/netplan)
  - YAML based network configuration abstraction renderer
  - Supports `networkd`, `NetworkManager`
- Config: `/etc/netplan/*.yaml` (e.g., `50-cloud-init.yaml`)
- Generated: `/run/systemd/network/`
- Docs: [Netplan YAML Reference](https://netplan.readthedocs.io/en/stable/netplan-yaml/)

```bash
netplan try
netplan apply
```

## Examples

```yaml
network:
  version: 2
  ethernets:
    ens3:
      dhcp4: true
    eno1:
      dhcp4: true
```

### Full Syntax

```yaml
network:
  version: 2
  renderer: networkd # or NetworkManager
  ethernets:
    device-id:
      dhcp4: true
      match:
        macaddress: aa:bb:cc:00:11:22
    # SR-IOV
    enp1s16f1:
      link: enp1
  # Other types: bonds, bridges, vlans, wifis, etc.
```

### DNS Settings

```yaml
nameservers:
  search: [lab, home]
  addresses: [8.8.8.8, 'FEDC::1']
```
