---
title: SDR
---

# SDR

- SUM - Smart Update Manager
- 惠普提供很多软件来控制服务器
- https://downloads.linux.hpe.com/
- https://downloads.linux.hpe.com/SDR/repo/
- 注意
  - 固件升级只支持 RPM 类的系统,不支持 DEB 系列系统
  - 国内需要通过代理使用

**mcp**

| 包               | 描述                                                      |
| ---------------- | --------------------------------------------------------- |
| hp-health        | HPE System Health Application and Command line Utilities  |
| hponcfg          | HPE RILOE II/iLO online configuration utility             |
| hp-ams           | HPE Agentless Management Service                          |
| hp-snmp-agents   | Insight Management SNMP Agents for HPE ProLiant Systems   |
| hpsmh            | HPE System Management Homepage                            |
| hp-smh-templates | HPE System Management Homepage Templates                  |
| hpssacli         | HPE Command Line Smart Storage Administration Utility     |
| hpssaducli       | HPE Command Line Smart Storage Administration Diagnostics |
| hpssa            | HPE Array Smart Storage Administration Service            |

```bash
#########
# DEB
#########
# 添加 Key
# https://downloads.linux.hpe.com/SDR/keys.html
curl http://downloads.linux.hpe.com/SDR/hpPublicKey1024.pub | apt-key add -
curl http://downloads.linux.hpe.com/SDR/hpPublicKey2048.pub | apt-key add -
curl http://downloads.linux.hpe.com/SDR/hpPublicKey2048_key1.pub | apt-key add -
curl http://downloads.linux.hpe.com/SDR/hpePublicKey2048_key1.pub | apt-key add -

# 添加仓库
# 能在 DEB 类系统下使用的主要有 mcp,minnow,stk
wget https://downloads.linux.hpe.com/SDR/add_repo.sh
# -n 参数可以不添加仓库,而输出会添加的仓库
sh ./add_repo.sh -v mcp
sh ./add_repo.sh -v minnow
sh ./add_repo.sh -v stk
# 更新索引
apt update
# 安装包
apt install -y hp-health hpssacli hp-snmp-agents hpssa hpssacli hp-smh-templates hpsmh hponcfg
# 部分内容会安装到 /opt/hp

#########
# mcp - Management Component Pack
#########
```


