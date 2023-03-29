---
title: strongSwan Cookbook
tags:
  - Cookbook
---

# strongSwan Cookbook

- [strongSwan swanctl Tests](https://www.strongswan.org/testing/testresults/swanctl/)

## 基础 ipsec.conf

```ini
config setup
	# strictcrlpolicy=yes
	uniqueids = no

conn %default
	ikelifetime=60m
	keylife=20m
	rekeymargin=3m
	keyingtries=1
	keyexchange=ikev2
	authby=secret

conn vpn
  left=%any
  leftsourceip=%config
  # 远程地址
  right=1.2.3.4
  rightsubnet=0.0.0.0/0
  type=tunnel
  auto=start
```

**ipsec.secrets**

```bash
# 密钥
: PSK "12345678"
```

### 基础 swanctl.conf

```
connections {
	vpn {
		include /etc/swanctl/conf.d/ike_sa_default.conf
		remote_addrs=1.2.3.4
		local_addrs=%any
		vips=0.0.0.0
		children {
			vpn {
				include /etc/swanctl/conf.d/child_sa_default.conf
				start_action=start
				remote_ts=0.0.0.0/0
			}
		}
    remote {
      id="vpn"
      auth=psk
    }
    local {
      id="vpn"
      auth=psk
    }
	}
}
pools {
}
authorities {
}
secrets {
	ike- {
    id="vpn"
		secret="12345678"
	}
}
```
